

from sqlalchemy import Column, ForeignKey, Integer, String, Float, Date, DateTime, Boolean, Enum
from sqlalchemy.orm import relationship
import enum
import datetime
from config.db import Base


class USERS(Base):
    __tablename__ = "USERS"
    
    id = Column(String(30), primary_key=True, index=True)
    full_name = Column(String(255))
    email_id = Column(String(80), nullable=False, unique=True)
    phone_no = Column(String(20), nullable=False, unique=True)
    college = Column(String(255), nullable=True)
    address = Column(String(2550), nullable=True)
    password = Column(String(100), nullable=False)
    verified = Column(Integer, default=0)
    gender = Column(String(20), default=None)
    dob = Column(Date, default=None)
    profile_url = Column(String(150), default="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJJ7NRetidOXGwJVnAJXbKD-aTCpm2iDzT6g&usqp=CAU")
    createdAt = Column(DateTime, default=datetime.datetime.utcnow)

    
class WISHLIST(Base):
    __tablename__ = "WISHLIST"
    id = Column(String(30), primary_key=True, index=True)
    user_id = Column(String(30), ForeignKey("USERS.id", ondelete="CASCADE"), nullable=False)
    user = relationship("USERS")
    tournament_id = Column(String(30), ForeignKey('TOURNAMENT.id',ondelete="CASCADE"), nullable=False)
    tournament = relationship("TOURNAMENT")
    createdAt = Column(DateTime, default=datetime.datetime.utcnow)
    
    
class PLAYERS(Base):
    __tablename__ = "PLAYERS"
    
    id = Column(Integer, primary_key=True,index=True)
    user_id = Column(String(30), ForeignKey("USERS.id", ondelete="CASCADE"), nullable=False)
    user = relationship("USERS")
    ranking  = Column(Integer, default=1)
    plays = Column(String(100))


class ORGANIZERS(Base):
    __tablename__ = "ORGANIZERS"
    
    id = Column(Integer, primary_key=True,index=True)
    user_id = Column(String(30), ForeignKey("USERS.id", ondelete="CASCADE"), nullable=False)
    user = relationship("USERS")
    name = Column(String(150), nullable=True)
    about = Column(String(150), nullable=True)

    def __repr__(self):
        return 'ItemModel(name=%s)' % (self.name)

class DOCUMENTS(Base):
    __tablename__ = "DOCUMENTS"
    
    id = Column(Integer, primary_key=True,index=True)
    user_id = Column(String(30), ForeignKey("USERS.id", ondelete="CASCADE"), nullable=False)
    user = relationship("USERS")
    document_type = Column(String(100), nullable=False)
    document_url = Column(String(150), nullable=False)
    verified = Column(Integer, default=0)
    createdAt = Column(DateTime, default=datetime.datetime.utcnow)

    
class TOURNAMENT(Base):
    __tablename__ = "TOURNAMENT"
    id = Column(String(30), primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    about = Column(String(100), nullable=False)
    organizer_id = Column(String(30), ForeignKey("USERS.id", ondelete="CASCADE"), nullable=False)
    organizer = relationship("USERS")
    organizer_name = Column(String(100), nullable=False)
    organizer_info = Column(String(150), nullable=False)
    start_date = Column(DateTime, nullable=False)
    end_date = Column(DateTime, nullable=False)
    image = Column(String(255), nullable=True)
    is_payment_done = Column(Boolean, default=True)
    payment_id = Column(String(100), nullable=True)
    is_active = Column(Boolean, default=True)
    tournament_games = relationship("TOURNAMENT_GAMES", back_populates="tournament")
    commentry = relationship("COMMENTRY")


class GAMES(Base):
    __tablename__ = "GAMES"
    id = Column(Integer, primary_key=True)
    name = Column(String(100), nullable=False)
    
class COMMENTRY(Base):
    __tablename__ = "COMMENTRY"
    id = Column(Integer, primary_key=True,index=True, autoincrement=True)
    comment = Column(String(900), nullable=False)
    tournament_id = Column(String(30), ForeignKey('TOURNAMENT.id',ondelete="CASCADE"), nullable=False)
    tournament = relationship("TOURNAMENT")
    
    createdAt = Column(DateTime, default=datetime.datetime.utcnow)
    

class TOURNAMENT_GAMES(Base):
    __tablename__ = "TOURNAMENT_GAMES"
    id = Column(String(30), primary_key=True,index=True)    
    name = Column(String(100), nullable=False)
    info = Column(String(100), default=None)
    tournament_id = Column(String(30), ForeignKey('TOURNAMENT.id',ondelete="CASCADE"), nullable=False)
    tournament = relationship("TOURNAMENT")
   
    participation_fees = Column(Integer, default=0, nullable=False)
    prize_pool = Column(Integer, default=0,  nullable=False)
    max_teams = Column(Integer, default=8,  nullable=False)
    team_size = Column(Integer, default=1,  nullable=False)
    min_girls = Column(Integer,  nullable=False)
    min_boys= Column(Integer,  nullable=False)
    # open to 1(boys) 0(girls) 2(mix ups)
    open_to  = Column(Integer,  nullable=False)
    total_rounds = Column(Integer, default=3)
    #type denotes the tournament type like 1-single elimination
    type = Column(Integer, default=1)
    # if type 2 then this fields matter
    num_groups = Column(Integer, default=None)
    teams_per_group = Column(Integer, default=None)
    # if type 2 ends
    is_active = Column(Boolean, default=True)
    min_age = Column(Integer, default=17, nullable=False)
    max_age = Column(Integer, default=21, nullable=False)
    avg_duration = Column(Integer, default=30)
    start_date = Column(DateTime, nullable=False)
    end_date = Column(DateTime, nullable=False)
    umpires = relationship("UMPIRES", back_populates="game")
    grounds = relationship("GROUNDS", back_populates="game")
    tournament = relationship("TOURNAMENT", back_populates="tournament_games")


class TEAMS(Base):
    __tablename__ = "TEAMS"
    id = Column(String(30), primary_key=True,index=True)    
    name = Column(String(100), nullable=False)
    admin_id = Column(String(30), ForeignKey("USERS.id"), nullable=False)
    admin = relationship("USERS")
    tournament_id = Column(String(30), ForeignKey('TOURNAMENT.id',ondelete="CASCADE"), nullable=False)
    tournament = relationship("TOURNAMENT")
    tournament_game_id = Column(String(30), ForeignKey('TOURNAMENT_GAMES.id',ondelete="CASCADE"), nullable=False)
    tournament_game = relationship("TOURNAMENT_GAMES")
    # 0 denotes yet to verify 1(verified) -1(rejected)
    verified = Column(Integer, default=0)
    payment_id = Column(String(100), nullable=True)
    no_of_boys = Column(Integer, nullable=False)
    no_of_girls = Column(Integer, nullable=False)
    image = Column(String(255), nullable=True)
    matches = Column(Integer, default=0)
    win = Column(Integer, default=0)
    loose = Column(Integer, default=0)
    points = Column(Integer, default=0)
    score = Column(Integer, default=0)
    # if tournament was type 2 that is league one
    # then 
    group = Column(Integer, nullable=None)
    points = Column(Integer, nullable=None)
    nr = Column(Float, nullable=None)
    # ends
    team_players = relationship("TEAM_PLAYERS", back_populates="team")
    createdAt = Column(DateTime, nullable=False, default=datetime.datetime.utcnow)


class TEAM_PLAYERS(Base):
    __tablename__ = "TEAM_PLAYERS"
    id = Column(Integer, primary_key=True,index=True)  
    team_id = Column(String(30), ForeignKey('TEAMS.id',ondelete="CASCADE"), nullable=False)
    team = relationship("TEAMS",  back_populates="team_players")
    player_id = Column(String(30), ForeignKey('USERS.id',ondelete="CASCADE"), nullable=False)
    player = relationship("USERS")
    createdAt = Column(DateTime, default=datetime.datetime.utcnow)


class UMPIRES(Base):
    __tablename__ = 'UMPIRES'
    id = Column(Integer,primary_key=True , index= True )
    user_id =Column (String(30),ForeignKey('USERS.id'),nullable =False)
    user =relationship("USERS")
    game_id = Column(String(30), ForeignKey('TOURNAMENT_GAMES.id'))
    game = relationship("TOURNAMENT_GAMES", back_populates="umpires")
    

class GROUNDS(Base):
    __tablename__='GROUNDS'
    id = Column(Integer,primary_key=True , index= True )
    name = Column(String(100), nullable=False)
    # tournament game id
    game_id = Column(String(30), ForeignKey('TOURNAMENT_GAMES.id'))
    game = relationship("TOURNAMENT_GAMES", back_populates="grounds")
    location = Column(String(100), default=None)



class FIXTURES(Base):
    __tablename__ ='FIXTURES'
    id = Column(Integer,primary_key=True , index= True )
    match_number = Column(Integer)
    tournament_id = Column(String(30), ForeignKey('TOURNAMENT.id',ondelete="CASCADE"), nullable=False)
    tournament = relationship("TOURNAMENT")
    tournament_game_id = Column(String(30), ForeignKey('TOURNAMENT_GAMES.id',ondelete="CASCADE"), nullable=False)
    tournament_game = relationship("TOURNAMENT_GAMES")
    
    game_id = Column(Integer, ForeignKey('GAMES.id'), nullable=False)
    game = relationship("GAMES")

    round_no= Column(Integer,default=1)

    team_1_id = Column(String(30), ForeignKey("TEAMS.id"), nullable=True)
    team_1 = relationship("TEAMS", foreign_keys=[team_1_id])
    team_2_id = Column(String(30), ForeignKey("TEAMS.id"), nullable=True)
    team_2 = relationship("TEAMS", foreign_keys=[team_2_id])

    winner_id = Column(String(30), ForeignKey("TEAMS.id"), nullable=True)
    winner = relationship("TEAMS", foreign_keys=[winner_id])
    # if type of tournaemnt was 2 then round 1 needs to have fixture of group
    group = Column(Integer, default=None)
    # start
    ground_id = Column(Integer, ForeignKey("GROUNDS.id"), nullable=False)
    ground = relationship("GROUNDS")
    umpire_id = Column(String(30), ForeignKey("USERS.id"), nullable=False)
    umpire = relationship("USERS")
    
    start_time = Column(DateTime)
    end_time = Column(DateTime)



# Games 
# type 1 : volleyball, tt, badminton (working)
# type 2 : football
# type 3 : cricket

class VTB(Base):
    """
    game class for volleyball tt badminton 
    """
    __tablename__ ="VTB"
    id = Column(Integer, primary_key=True)
    team_id =  Column(String(30), ForeignKey("TEAMS.id"), nullable=False)
    team = relationship("TEAMS")
    scored_by = Column(String(30), ForeignKey("USERS.id"), nullable=False)
    scorer = relationship("USERS")
    points = Column(Integer, nullable=False)
    fixture_id = Column(Integer, ForeignKey("FIXTURES.id"))
    fixture = relationship("FIXTURES")
    created_at = Column(DateTime, default=datetime.datetime.now)




# tables needed for doing football games 
class GoalsType(str, enum.Enum):
    NORMAL_GOAL = "Normal Goal"
    FREE_KICK = "Free Kick"
    OWN_GOAL = "Own Goal"
    HEADER = "Header"
    PENALTY = "Penalty"

class FOOTBALL_GOALS(Base):
    __tablename__ ="FOOTBALL_GOALS"
    id = Column(Integer, primary_key=True)
    team_id =  Column(String(30), ForeignKey("TEAMS.id"), nullable=False)
    team = relationship("TEAMS")
    scored_by = Column(String(30), ForeignKey("USERS.id"), nullable=False)
    scorer = relationship("USERS", foreign_keys=[scored_by])
    assist_by = Column(String(30), ForeignKey("USERS.id"), nullable=True)
    assist = relationship("USERS", foreign_keys=[assist_by])
    goal_type = Column(Enum(GoalsType), nullable=False)
    fixture_id = Column(Integer, ForeignKey("FIXTURES.id"))
    fixture = relationship("FIXTURES")
    minute = Column(Integer)

class FOOTBALL_CARDS(Base):
    __tablename__="FOOTBALL_CARDS"
    id = Column(Integer,primary_key= True )
    fixture_id = Column(Integer, ForeignKey("FIXTURES.id"))
    fixture = relationship("FIXTURES")
    team_id =  Column(String(30), ForeignKey("TEAMS.id"), nullable=False)
    team = relationship("TEAMS")
    player_id = Column(String(30), ForeignKey("USERS.id"), nullable=False)
    player = relationship("USERS")
    reason = Column(String(50), nullable=True)
    card_type = Column(String(50), nullable=False)
    minute = Column(Integer)


class FOOTBALL_SHOOTOUT(Base):
    __tablename__="FOOTBALL_SHOOTOUT"
    id = Column(Integer,primary_key= True )
    fixture_id = Column(Integer, ForeignKey("FIXTURES.id"))
    fixture = relationship("FIXTURES")
    team_id =  Column(String(30), ForeignKey("TEAMS.id"), nullable=False)
    team = relationship("TEAMS")
    player_id = Column(String(30), ForeignKey("USERS.id"), nullable=False)
    player = relationship("USERS")
    number = Column(Integer)
    # 1 - scored   0 -missed
    result = Column(Integer, nullable=False)

class FOOTBALL_TIME(Base):
    __tablename__="FOOTBALL_TIME"
    id = Column(Integer,primary_key= True )
    fixture_id = Column(Integer, ForeignKey("FIXTURES.id"))
    fixture = relationship("FIXTURES")
    duration = Column(Integer)
    time_type = Column(String(30), nullable=False)
    total_goals_scored = Column(Integer)    
    total_yellow_cards = Column(Integer)    
    total_red_cards = Column(Integer)    


# class for users past participation
class U_PAST_PARTICIPATION(Base):
    __tablename__="U_PAST_PARTICIPATION"
    id = Column(Integer,primary_key=True)
    user_id = Column(String(30), ForeignKey("USERS.id"), nullable=False)
    user = relationship("USERS")
    tournament_game_id = Column(String(30), ForeignKey('TOURNAMENT_GAMES.id',ondelete="CASCADE"), nullable=False)
    tournament_game = relationship("TOURNAMENT_GAMES")
    team_id = Column(String(30), ForeignKey('TEAMS.id',ondelete="CASCADE"), nullable=False)
    team = relationship("TEAMS")
    createdAt = Column(DateTime, nullable=False, default=datetime.datetime.utcnow)