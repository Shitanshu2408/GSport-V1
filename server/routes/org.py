import uuid
from fastapi import APIRouter, Query
from models.index import ORGANIZERS, TOURNAMENT, TOURNAMENT_GAMES
from schemas.index import Organizer, Tournament,GenericResponseModel, Tournament_Games, Umpires, Grounds, Winners, Losers, Commentry
from sqlalchemy.orm import Session, load_only
from fastapi import Depends
from config.db import get_db
from utils.jwt import  get_current_user
from uuid import uuid4
from sqlalchemy import and_, select
from uuid import uuid4
from service.tournament import TournamentService
from service.tournament_games import Tournament_Game_Service
import http
from typing import List
from fastapi import UploadFile, File
from fastapi.responses import JSONResponse
from fastapi.responses import FileResponse
IMAGEDIR = "images/"
#routes
organizerRouter = APIRouter()


@organizerRouter.get('/stats')
async def get_stats(user_id: str = Depends(get_current_user), db: Session = Depends(get_db)):
    response = TournamentService(db).get_stats(user_id)
    return response


@organizerRouter.get('/tournament')
async def get_tournaments_of_organizer(page: int = Query(0, ge=0), limit: int = Query(5, le=100), user_id: str = Depends(get_current_user), db: Session = Depends(get_db)):
    response = TournamentService(db).get_tournaments(page, limit, user_id)
    return response


@organizerRouter.post('/tournament')
async def create_new_tournament(
    tournament: Tournament,
    user_id: str = Depends(get_current_user),
    db: Session = Depends(get_db)
    )->GenericResponseModel:   
    response = TournamentService(db).create_tournament(tournament)
    db.commit()
    return response




@organizerRouter.post("/files")
async def upload_image(
    file: UploadFile = File(...)
    ):
    file.filename = f"{uuid.uuid4()}.jpg"
    contents = await file.read()
    
    with open(f"{IMAGEDIR}{file.filename}", "wb") as image:
        image.write(contents)
    
    # Return the file as a response along with the image URL
    return file.filename



@organizerRouter.get("/images/{filename}")
async def get_image(filename: str):
    file_path = f"{IMAGEDIR}{filename}"
    return FileResponse(file_path)



@organizerRouter.patch('/tournament/{tournament_id}')
async def update_tournament(tournament_id: str,user_id: str = Depends(get_current_user),tournament: dict={},  db: Session = Depends(get_db))->GenericResponseModel:
    return TournamentService(db).update_tournament(tournament, tournament_id, user_id)




@organizerRouter.post('/tournament/{tournament_id}/games')
async def add_games_to_tournament(game: Tournament_Games,tournament_id: str,user_id: str = Depends(get_current_user),  db: Session = Depends(get_db))->GenericResponseModel:
    response = TournamentService(db).add_game(game, tournament_id, user_id)
    db.commit()
    return response

@organizerRouter.post('/tournament/{tournament_id}/comments')
async def add_comments(
    comment: Commentry,
    tournament_id: str,
    user_id: str = Depends(get_current_user),  
    db: Session = Depends(get_db)
    )->GenericResponseModel:
    response = TournamentService(db).add_comment(
        comment,
        tournament_id,
        user_id
        )
    db.commit()
    return response


@organizerRouter.patch('/tournament/{tournament_id}/games')
async def update_game(game_id: str,user_id: str = Depends(get_current_user),game: dict={},  db: Session = Depends(get_db))->GenericResponseModel:
    return TournamentService(db).update_game(game, game_id, user_id)


@organizerRouter.post('/tournament/{tournament_id}/games/{game_id}')
async def add_grounds_umpries(umpires: List[Umpires], grounds: List[Grounds], tournament_id: str, game_id: str , user_id: str=Depends(get_current_user), db: Session = Depends(get_db))->GenericResponseModel:
    """
    game_id: The tournament game id 
    """
    response = Tournament_Game_Service(db).add_grounds_umpries(tournament_id, umpires, grounds, user_id)
    return response


@organizerRouter.patch('/tournament/{tournament_id}/games/{game_id}/ground/')
async def update_ground(ground_id:int,user_id: str=Depends(get_current_user), ground: dict={},db: Session = Depends(get_db))->GenericResponseModel:
    response = Tournament_Game_Service(db).update_ground_for_game(ground_id, ground, user_id)
    return response


@organizerRouter.delete('/tournament/{tournament_id}/games/{game_id}/ground/')
async def delete_ground_for_game( tournament_id: str, game_id: str, ground_id:str, user_id: str=Depends(get_current_user), db: Session = Depends(get_db))->GenericResponseModel:
    response = Tournament_Game_Service(db).delete_ground_for_game(tournament_id, ground_id, user_id)
    return response


@organizerRouter.delete('/tournament/{tournament_id}/games/{game_id}/umpire/')
async def delete_umpire_for_game( tournament_id: str, game_id: str, umpire_id:str, user_id: str=Depends(get_current_user), db: Session = Depends(get_db))->GenericResponseModel:
    response = Tournament_Game_Service(db).delete_umpire_for_game(tournament_id, umpire_id, user_id)
    return response


@organizerRouter.get('/tournament/{tournament_id}/games/{tournament_game_id}/fixtures/')
async def get_fixtures(tournament_id:str, tournament_game_id: str, game_id:int, user_id: str=Depends(get_current_user), db: Session=Depends(get_db)):
    return Tournament_Game_Service(db).get_fixtures(tournament_id, tournament_game_id, user_id)


# tournament_type - 1(single elimination) 2(playoffs just like ipl)
@organizerRouter.post('/tournament/{tournament_id}/games/{tournament_game_id}/fixtures/')
async def create_fixtures(tournament_id:str, tournament_game_id: str, game_id:int, user_id: str=Depends(get_current_user), db: Session=Depends(get_db)):
    return Tournament_Game_Service(db).create_fixtures(tournament_id, tournament_game_id, game_id, user_id)


@organizerRouter.post('/tournament/{tournament_id}/games/{tournament_game_id}/applyfixtures/')
async def apply_fixtures(tournament_id:str, tournament_game_id: str,game_id:int, user_id: str=Depends(get_current_user), db: Session=Depends(get_db)):
    return Tournament_Game_Service(db).apply_fixtures(tournament_id, tournament_game_id, game_id, user_id)


# define buy if any match needs to be given buy if opponent is not there
@organizerRouter.post('/tournament/{tournament_id}/games/{tournament_game_id}/fixtures/{fixture_id}/give_buy')
async def give_buy(tournament_id:str, tournament_game_id: str, fixture_id:int, user_id: str=Depends(get_current_user), db: Session=Depends(get_db)):
    return Tournament_Game_Service(db).give_buy(tournament_id, tournament_game_id, fixture_id, user_id)
    

# define match result declaration
@organizerRouter.post('/tournament/{tournament_id}/games/{tournament_game_id}/fixtures/{fixture_id}/results')
async def post_match_results(tournament_id: str, tournament_game_id: str, fixture_id:int, winner: Winners, loser: Losers, user_id: str=Depends(get_current_user), db: Session=Depends(get_db)):
    return Tournament_Game_Service(db).post_match_results(tournament_game_id, fixture_id, winner, loser )
    

# @organizerRouter.post('/tournament/{tournament_id}/games/{tournament_game_id}/fixtures/{fixture_id}/lost')
# async def update_losing_team_points(tournament_id: str, tournament_game_id: str, fixture_id:int, loser: Losers, user_id: str=Depends(get_current_user), db: Session=Depends(get_db)):
#     return Tournament_Game_Service(db).update_losing_team_points(tournament_game_id, fixture_id, loser )
    


@organizerRouter.get('/tournament/{tournament_id}/games/{tournament_game_id}/teams')
async def get_registered_teams(tournament_id: str, tournament_game_id: str, user_id: str=Depends(get_current_user), db: Session = Depends(get_db)):
    return TournamentService(db).get_registered_teams(tournament_id, tournament_game_id)



## route for approving teams registered for the particular tournament and all
@organizerRouter.post('/tournament/{tournament_id}/games/{tournament_game_id}/teams/verification')
async def teams_approval(tournament_id: str, tournament_game_id: str, team_id: str, approve: bool, user_id: str=Depends(get_current_user), db: Session=Depends(get_db))->GenericResponseModel:
    check1 = db.query(TOURNAMENT).filter(and_(TOURNAMENT.id==tournament_id, TOURNAMENT.organizer_id==user_id)).first()
    print("\n\n",tournament_id,"\n\n")
    if check1 is None:
        return GenericResponseModel(status='error', message='Tournament id incorrect or organizer did not match', status_code=http.HTTPStatus.BAD_REQUEST)
    
    check = db.query(TOURNAMENT_GAMES).options(load_only(TOURNAMENT_GAMES.max_teams)).filter(and_(TOURNAMENT_GAMES.id==tournament_game_id)).first()
    if check is None:
        return GenericResponseModel(status='error', message='Tournament id incorrect or organizer did not match', status_code=http.HTTPStatus.BAD_REQUEST)

    return TournamentService(db).team_verification(tournament_id, tournament_game_id, team_id, approve, check.max_teams)
