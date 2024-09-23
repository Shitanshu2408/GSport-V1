from schemas.index import GenericResponseModel, Vtb, Wishlist
from models.index import TEAMS,FIXTURES,TOURNAMENT,GAMES, U_PAST_PARTICIPATION,TOURNAMENT_GAMES,GROUNDS, WISHLIST
from sqlalchemy.orm import Session, joinedload, load_only
from sqlalchemy import and_, or_, desc
import shortuuid
from utils.general import model_to_dict
import http
from typing import List

class PLAYERS_Serivce():

    def __init__(self, db: Session):
        self.db = db


    def add_to_wishlist(self, wishlist: Wishlist) -> GenericResponseModel:
            wishlist_obj = WISHLIST(
                user_id=wishlist.user_id,
                tournament_id=wishlist.tournament_id
            )
            wishlist_obj.id = shortuuid.uuid()[:16]

            self.db.add(wishlist_obj)
            self.db.commit()

            return GenericResponseModel(
                status='success',
                message='Item added to wishlist successfully',
                data=wishlist_obj.id,
                status_code=201
            )
    
    
    
    def get_previous_participation(self, user_id: str):
        data = self.db.query(U_PAST_PARTICIPATION).options(
                joinedload(U_PAST_PARTICIPATION.tournament_game).options(
                    joinedload(TOURNAMENT_GAMES.game),
                    joinedload(TOURNAMENT_GAMES.tournament)
                )
            ).filter(U_PAST_PARTICIPATION.user_id==user_id).order_by(desc(U_PAST_PARTICIPATION.createdAt)).all()
        
        return {'status': 'success', 'data': data, 'message': 'Previous participation', 'status_code':http.HTTPStatus.OK}
        
    def get_wishlist(self, user_id: str):
        data = (
            self.db.query(WISHLIST)
            .filter(WISHLIST.user_id == user_id)
            .join(TOURNAMENT, WISHLIST.tournament_id == TOURNAMENT.id)
            .options(joinedload(WISHLIST.tournament).joinedload(TOURNAMENT.tournament_games))
            .all()
        )


        return {'status': 'success', 'data': data, 'message': 'Wishlist', 'status_code': http.HTTPStatus.OK}

    def get_umpiring_tasks(self, user_id: str):
        pass
        data = self.db.query(FIXTURES).options(
                load_only(FIXTURES.match_number, FIXTURES.round_no),
                joinedload(FIXTURES.tournament_game).load_only(TOURNAMENT_GAMES.name),
                joinedload(FIXTURES.game).load_only(GAMES.name),
                joinedload(FIXTURES.team_1).load_only(TEAMS.name),
                joinedload(FIXTURES.team_2).load_only(TEAMS.name),
                joinedload(FIXTURES.winner).load_only(TEAMS.name),
                joinedload(FIXTURES.ground).load_only(GROUNDS.name, GROUNDS.location)
            ).filter(FIXTURES.umpire_id==user_id).all()
        
        if data is None or len(data)==0:
            return {'status': 'success', 'data': [], 'message': 'No tasks related to umpiring', 'status_code':http.HTTPStatus.OK}

        return {'status': 'success', 'message': 'Umpiring tasks (hint if winner is present dont provide button to scoring)',
                 'data': data, 'status_code':http.HTTPStatus.OK}

            