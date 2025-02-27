import asyncio
from twilio.rest import Client
from django.conf import settings
from fastapi import APIRouter, status, HTTPException, Response, Form
from models.index import ORGANIZERS, DOCUMENTS, USERS
from schemas.index import Organizer, Document, Login, User, GenericResponseModel
from sqlalchemy.orm import Session 
from fastapi import Depends
from config.db import get_db
from utils.jwt import get_hashed_password, verify_password, create_refresh_token, create_access_token, get_current_user
from uuid import uuid4
from sqlalchemy import and_, or_, select
from uuid import uuid4
import shortuuid
import http
from utils.general import model_to_dict
import httpx
from typing import Dict
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel
from sqlalchemy import func, cast

# from fastapi_pagination import LimitOffsetPage, Page
# from fastapi_pagination.ext.sqlalchemy import paginate

#routes
userRouter = APIRouter()

import random
import string

# Replace these values with your actual Twilio Account SID, Auth Token, and Phone Number
TWILIO_ACCOUNT_SID = "AC72b3ce65db8944f030eac41796c4b1b8"
TWILIO_AUTH_TOKEN = "9efa0a1a93ced4b4e1dcf96027c93dac"
TWILIO_PHONE_NUMBER = "+19362255631"

# In-memory storage for OTPs (replace with a proper database in production)
otp_storage: Dict[str, str] = {}

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

class Token(BaseModel):
    access_token: str
    token_type: str

def generate_otp(length=6):
    return ''.join(random.choices(string.digits, k=length))

async def send_otp(to_number, otp):
    client = Client(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)

    body = f"Your OTP for verification is: {otp}"

    return client.messages.create(
        from_=TWILIO_PHONE_NUMBER,
        to=to_number,
        body=body
    )

def verify_otp(phone: str, otp: str):
    stored_otp = otp_storage.get(phone)
    return stored_otp and stored_otp == otp

@userRouter.post('/send_otp')
async def send_otp_route(phone: str):
    otp = generate_otp()
    otp_storage[phone] = otp

    await send_otp(phone, otp)

    return {"message": "OTP sent successfully", "otp": otp}


@userRouter.post('/verify_otp')
async def verify_otp_route(phone_no: str, otp: str, db: Session=Depends(get_db)):
    user = db.query(USERS.phone_no).all()

    if verify_otp(phone_no, otp):
        # If OTP is valid, you might generate a JWT token for authentication
        # Here, I'm returning a simple message
        return {"message": "OTP verified successfully"}
    else:
        raise HTTPException(status_code=400, detail="Invalid OTP")


# # login functionality with access token creation
@userRouter.post('/login')
async def user_login(phone_no:str, otp: str, db: Session=Depends(get_db)):
    user = db.query(USERS).filter(USERS.phone_no == phone_no).first()
    if verify_otp(phone_no, otp):
        if user is None:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="No user found"
            )
        return {
            'status': 'success',
            'message': 'login successfully',
            'data': user,
            'access_token': create_access_token(user.id)
        }
    else:
        raise HTTPException(status_code=400, detail="Invalid OTP")



@userRouter.post('/login/fake')
async def user_login(phone_no:str, db: Session=Depends(get_db)):
    user = db.query(USERS).filter(USERS.phone_no == phone_no).first()
    return {
        'status': 'success',
        'message': 'login successfully',
        'data': user,
        'access_token': create_access_token(user.id)
    }



@userRouter.get('/')
async def fetch_all_users(db: Session = Depends(get_db)):
    return  db.query(USERS).all()

@userRouter.get('/{userMail}')
async def fetch_user_by_mail(orgMail, db: Session = Depends(get_db)):
    user = db.query(USERS).filter(USERS.email_id == orgMail).first()
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="user not found"
        )
    return user




# login functionality with access token creation
# @userRouter.post('/login')
# async def user_login(phone_no:int, db: Session=Depends(get_db)):
#     user = db.query(USERS).filter(USERS.phone_no == phone_no).first()
#     if user is None:
#         raise HTTPException(
#             status_code=status.HTTP_400_BAD_REQUEST,
#             detail="Incorrect email or password"
#         )
#     return {
#         'status': 'success',
#         'message': 'login successfully',
#         'data': user,
#         'access_token': create_access_token(user.id)
#     }









# @userRouter.post('/login')
# async def user_login(phone_no:str, otp: str, db: Session=Depends(get_db)):
#     user = db.query(USERS).filter(func.concat('+91', USERS.phone_no) == phone_no).first()
#     if verify_otp(phone_no, otp):
#         if user is None:
#             raise HTTPException(
#                 status_code=status.HTTP_400_BAD_REQUEST,
#                 detail="No user found"
#             )
#         return {
#             'status': 'success',
#             'message': 'login successfully',
#             'data': user,
#             'access_token': create_access_token(user.id)
#         }
#     else:
#         raise HTTPException(status_code=400, detail="Invalid OTP")
    
# adding new org to db
@userRouter.post('/register')
async def add_new_user(user: User, otp: str, db: Session = Depends(get_db)):
    user_check = db.query(USERS).filter(or_(USERS.email_id == user.email_id, USERS.phone_no==user.phone_no)).first()
    if user_check is not None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User with this email or phone already exist"    
        )
    if verify_otp(user.phone_no, otp):
        newUser = USERS( **dict(user))
        newUser.id = shortuuid.uuid()[:10]
        db.add(newUser)  
        db.commit()
        return {
            'status': 'success',
            'message': 'login successfully',
            'data': newUser,
            'access_token': create_access_token(newUser.id)
        }
        return GenericResponseModel(status='success', access_token=create_access_token(newUser.id),  data=model_to_dict(newUser), message='User added successfully', status_code=http.HTTPStatus.CREATED)


# update certain fields of the organizer
@userRouter.patch("/details")
async def user_update(user_id: str = Depends(get_current_user), updated_data: dict = {}, db: Session=Depends(get_db)):
    user = db.query(USERS).filter(USERS.id == user_id).first()
    if user is None:
        return GenericResponseModel(status='error', message='User not found', status_code=http.HTTPStatus.BAD_REQUEST)


    for key, value in updated_data.items():
        setattr(user, key, value)

    db.add(user)
    db.commit()
    return GenericResponseModel(status='success', data=model_to_dict(user),message='User updated successfully', status_code=http.HTTPStatus.CREATED)


# uploading document of organizer
@userRouter.post('/document')
async def user_documents_upload(document: Document, user_id: str=Depends(get_current_user), db:Session=Depends(get_db)):
    user = db.query(USERS).filter(USERS.id == user_id).first()
    if user is None:
        return GenericResponseModel(status='error', message='User not found', status_code=http.HTTPStatus.BAD_REQUEST)

    
    #checking if already is there is any document if yes only update it
    prevDoc = db.query(DOCUMENTS).filter(and_( DOCUMENTS.user_id==user_id, DOCUMENTS.document_type==document.document_type)).first()
    print("\n")
    print(prevDoc)
    if prevDoc is not None:
        prevDoc.document_url = document.document_url
        user.verified = False
        db.add(user)
        db.add(prevDoc)
        
    else:   
        user.verified = False
        db.add(user)
        newDoc = DOCUMENTS(**dict(document))
        db.add(newDoc)
    
    db.commit()
    print(http.HTTPStatus.CREATED)

    return GenericResponseModel(status='success',message='users documents uploaded successfully', status_code=http.HTTPStatus.CREATED)


# get uploaded documents of the users
@userRouter.get('/document')
async def user_documents_upload( user_id: str=Depends(get_current_user), db:Session=Depends(get_db)):
    user = db.query(USERS).filter(USERS.id == user_id).first()
    if user is None:
        return GenericResponseModel(status='error', message='User not found', status_code=http.HTTPStatus.BAD_REQUEST)

    documents = db.query(DOCUMENTS).filter(DOCUMENTS.user_id==user_id).all()
    # print(user_id)
    document_list = [model_to_dict(doc) for doc in documents]
    return GenericResponseModel(status='success',data=document_list, message='data found successfully', status_code=http.HTTPStatus.CREATED)
    
# to delete certain document 
@userRouter.delete('/document')
async def delete_document( user_id: str=Depends(get_current_user), db:Session=Depends(get_db)):
    return 'will be added in future'