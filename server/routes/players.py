from fastapi import APIRouter, status, HTTPException, Response, WebSocket
from models.index import PLAYERS, DOCUMENTS, TEAMS, TEAM_PLAYERS, USERS, WISHLIST
from schemas.index import Player, Document, Login, Teams, Wishlist, TeamPlayers,GenericResponseModel
from sqlalchemy.orm import Session, joinedload, load_only
from fastapi import Depends
from config.db import get_db
from utils.jwt import  get_current_user
from uuid import uuid4
from sqlalchemy import and_
from service.index import TournamentService,PLAYERS_Serivce
import http
from utils.general import model_to_dict
import asyncio
from pydantic import BaseModel

playersRouter = APIRouter()

@playersRouter.get('/')
async def fetch_all_players(db: Session = Depends(get_db)):
    return db.query(PLAYERS).all()

# @playersRouter.post('/plays')
# async def add_plays(game: str, user_id: str, db: Session = Depends(get_db)):
#     pass


# Simple in-memory storage for the countdown status
countdown_status = {"running": False, "duration": 0}
connected_clients = set()


class CountdownStartRequest(BaseModel):
    duration: int


@playersRouter.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    connected_clients.add(websocket)

    try:
        while True:
            await asyncio.sleep(1)
            if countdown_status["running"]:
                await asyncio.gather(
                    *[client.send_json({"status": "running", "duration": countdown_status["duration"]}) for client in connected_clients]
                )
    except asyncio.CancelledError:
        connected_clients.remove(websocket)


@playersRouter.post("/api/countdown/start")
async def start_countdown(request: CountdownStartRequest):
    countdown_status["running"] = True
    countdown_status["duration"] = request.duration
    await asyncio.gather(
        *[client.send_json({"status": "running", "duration": request.duration}) for client in connected_clients]
    )
    await asyncio.sleep(request.duration)
    countdown_status["running"] = False
    await asyncio.gather(
        *[client.send_json({"status": "stopped", "duration": 0}) for client in connected_clients]
    )
    return {"status": "success", "message": "Countdown completed"}




@playersRouter.post('/create_team')
async def join_game(team: Teams, user_id: str=Depends(get_current_user), db: Session = Depends(get_db)):
    return TournamentService(db).create_team(team, user_id)

@playersRouter.patch('/create_team/{team_id}')
async def update_team(
    team_id: str,
    user_id: str = Depends(get_current_user),
    team: dict={},  
    db: Session = Depends(get_db)
    )->GenericResponseModel:
    return TournamentService(db).update_team(team, team_id, user_id)



@playersRouter.post('/join_team')
async def join_team(
    team: Teams,  
    team_id: str, 
    user_id: str=Depends(get_current_user), 
    db: Session = Depends(get_db)):
    return TournamentService(db).join_team(team, team_id, user_id)
    
@playersRouter.get('/team/{team_id}')
async def get_team_by_id(team_id: str, user_id: str=Depends(get_current_user), db: Session = Depends(get_db)):
    team = db.query(TEAMS).options(
        load_only(TEAMS.name, TEAMS.admin_id, TEAMS.tournament_game_id, TEAMS.image, TEAMS.matches, TEAMS.win, TEAMS.loose, TEAMS.points, TEAMS.createdAt, TEAMS.score),
        joinedload(TEAMS.admin).load_only(USERS.full_name, USERS.email_id, USERS.profile_url, USERS.dob, USERS.gender, USERS.college),
        joinedload(TEAMS.team_players).load_only(TEAM_PLAYERS.id).joinedload(TEAM_PLAYERS.player).load_only(USERS.full_name, USERS.email_id, USERS.profile_url, USERS.dob, USERS.gender),
    ).filter(TEAMS.id == team_id).first()
    if team is None:
        return GenericResponseModel(status='error', message='Invalid team id passed', status_code=http.HTTPStatus.BAD_REQUEST)

    return {'status': 'success', 'message': 'Team details', 'status_code': http.HTTPStatus.OK, 'data': team}


@playersRouter.get('/team/tournament_id/{tournament_game_id}')
async def get_team_by_id(tournament_game_id: str, db: Session = Depends(get_db)):
    team = db.query(TEAMS).options(
        load_only(TEAMS.name, TEAMS.admin_id, TEAMS.tournament_game_id, TEAMS.image, TEAMS.matches, TEAMS.win, TEAMS.loose, TEAMS.points, TEAMS.createdAt, TEAMS.score),
        joinedload(TEAMS.admin).load_only(USERS.full_name, USERS.email_id, USERS.profile_url, USERS.dob, USERS.gender, USERS.college),
        joinedload(TEAMS.team_players).load_only(TEAM_PLAYERS.id).joinedload(TEAM_PLAYERS.player).load_only(USERS.full_name, USERS.email_id, USERS.profile_url, USERS.dob, USERS.gender),
    ).filter(TEAMS.tournament_game_id == tournament_game_id).all()
    if team is None:
        return GenericResponseModel(status='error', message='Invalid team id passed', status_code=http.HTTPStatus.BAD_REQUEST)

    return {'status': 'success', 'message': 'Team details', 'status_code': http.HTTPStatus.OK, 'data': team}



@playersRouter.get('/previous_participation')
async def get_previous_participation(
    user_id: str=Depends(get_current_user), 
    db: Session = Depends(get_db)
    ):
    response = PLAYERS_Serivce(db).get_previous_participation(user_id)
    return response


@playersRouter.get('/get_wishlist')
async def get_wishlist(
    user_id: str=Depends(get_current_user), 
    db: Session = Depends(get_db)
    ):
    response = PLAYERS_Serivce(db).get_wishlist(user_id)
    return response



@playersRouter.post("/add_to_wishlist", response_model=GenericResponseModel)
def add_to_wishlist(wishlist: Wishlist, db: Session = Depends(get_db)):
    wishlist_service = PLAYERS_Serivce(db)
    result = wishlist_service.add_to_wishlist(wishlist)
    return result



# to check if user has any umpiring duty
@playersRouter.get('/umpiring_task')
async def get_umpiring_tasks( user_id: str=Depends(get_current_user), db: Session = Depends(get_db)):
    response = PLAYERS_Serivce(db).get_umpiring_tasks(user_id)
    return response