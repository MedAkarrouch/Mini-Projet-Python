# from server.auth.models import User
from auth.schemas import RegisterUser,LoginUser,AuthenticatedUser
from fastapi import HTTPException,status
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from models import User
from auth.helpers import AuthHelper

def create_user(user: RegisterUser, db: Session,authHelper : AuthHelper ):
  try:
    # Check if username already exists
    existing_user = db.query(User).filter(User.username == user.username).first()
    if existing_user:
      return  {
        "status_code" : 400,
        "detail" :   "Username already taken!"
      },None
    
    created_user = User(
      username=user.username,
      full_name=user.full_name,
      password=authHelper.hash_password(user.password)
    )
    db.add(created_user)
    db.commit()
    db.refresh(created_user)
    return None,created_user
  
  except Exception as e:
    return {
      "status_code" : 500,
      "content" : {"detail" : str(e)}
    },None
  
def login_user(user: LoginUser, db : Session,authHelper : AuthHelper): 
  try:
    existing_user = db.query(User).filter(User.username == user.username).first()
    if not existing_user or not authHelper.verify_password(user.password , existing_user.password) :
      return {
        "status_code" : status.HTTP_401_UNAUTHORIZED,
        "detail" : "Username or password is incorrect!"
      },None
    
    return None,existing_user
  except Exception as e:
    return {
      "status_code" : 500,
      "detail" : str(e)
    },None