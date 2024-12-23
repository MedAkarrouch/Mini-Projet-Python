from fastapi import APIRouter,Depends,Request,HTTPException
from auth.schemas import RegisterUser,LoginUser,AuthenticatedUser,UpdatePassword,UpdateUsername
from fastapi.responses import JSONResponse
from auth.crud import create_user,login_user
from sqlalchemy.orm import Session
from auth.helpers import AuthHelper
from models import User
from utils.helpers import GlobalHelper
from auth.schemas import RegisterUser
from auth.dependencies import protect
from database import get_db
from sqlalchemy import and_

router = APIRouter()

@router.post("/register")
def register(user : RegisterUser,db :Session = Depends(get_db) ,authHelper : AuthHelper = Depends(AuthHelper)):
  # Create User
  err,created_user = create_user(user,db,authHelper)
  
  if isinstance(err,dict) : 
    raise HTTPException(
      status_code=err["status_code"],
      detail=err["detail"]
    )
  
  userr = AuthenticatedUser.from_orm(created_user).model_dump()
  
  # Create token
  token = authHelper.create_access_token(created_user.id)

  return JSONResponse(
    status_code=201,
    content={"token":token,"user": userr}
  )

@router.post("/login")
def login(user : LoginUser, db : Session = Depends(get_db) ,authHelper : AuthHelper = Depends(AuthHelper)):
  # Get user
  err,logged_in_user = login_user(user,db,authHelper)
  
  if isinstance(err,dict) : 
    raise HTTPException(
      status_code=err["status_code"],
      detail=err["detail"]
    )
  
  userr = AuthenticatedUser.from_orm(logged_in_user).model_dump()
  # Create token
  token = authHelper.create_access_token(logged_in_user.id)
  return JSONResponse(content={"token":token,"user":userr},status_code=200)

@router.get("/me")
def get_me(request : Request , user = Depends(protect)):
  return JSONResponse(
    status_code=200,
    content={"user":AuthenticatedUser.from_orm(request.state.user).model_dump()},
  )

@router.post("/update_username")
async def update_username(data : UpdateUsername , db :Session = Depends(get_db),user = Depends(protect) , authHelpers : AuthHelper = Depends(AuthHelper)):

  if not authHelpers.verify_password(data.current_password , user.password):
    raise HTTPException(status_code=400, detail="Current password is incorrect")
  
  existing_user = db.query(User).filter(
    and_(User.username == data.new_username, User.id != user.id)
    ).first()
  
  if existing_user:
    raise HTTPException(
      status_code=400,
      detail="Username already taken!"
    )
  
  # if not update the username
  # udate user's usernmae
  user.username = data.new_username
  db.add(user)
  db.commit()
  db.refresh(user)
  return JSONResponse(status_code=200,content={})

@router.post("/update_password")
async def update_password(data : UpdatePassword , db : Session = Depends(get_db), user = Depends(protect) , authHelpers : AuthHelper = Depends(AuthHelper)):

  if not authHelpers.verify_password(data.current_password , user.password):
    raise HTTPException(status_code=400, detail="Current password is incorrect")
  
  # udate user's usernmae
  user.password = authHelpers.hash_password(data.new_password)
  db.add(user)
  db.commit()
  db.refresh(user)
  return JSONResponse(status_code=200,content={})