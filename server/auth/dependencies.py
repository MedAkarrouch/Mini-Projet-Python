from sqlalchemy.orm import Session
from fastapi import Depends,HTTPException,status,Request
from fastapi.responses import JSONResponse
from database import get_db
from auth.schemas import AuthenticatedUser
import jwt
from config import JWT_ALGORITHM,JWT_SECRET_KEY

from models import User

def protect(request: Request, db:Session = Depends(get_db))->AuthenticatedUser:

  authorization: str = request.headers.get("Authorization")
  if not authorization:
    raise HTTPException(
      status_code = 403,
      detail  = "Authorization header missing"
    )
  
  token = authorization.split("Bearer ")[-1]

  if not token:
    raise HTTPException(
      status_code  =  403, 
      detail = "Bearer token missing"
    )

  try:
    # Decode the token
    payload = jwt.decode(token, JWT_SECRET_KEY, algorithms=[JWT_ALGORITHM],options={"verify_exp":True})
    # Extract user_id from the payload
    user_id = payload.get("user_id")

    if user_id is None:
      raise HTTPException(
        status_code = 403, 
        detail = "Invalid token: user_id missing"
      )
    # Get User
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
      raise HTTPException(
        status_code = 404, 
        detail = "User not found"
      )
    # else if there is a user
    request.state.user = user
    return user
  
  except jwt.ExpiredSignatureError:
    raise HTTPException(
      status_code = 401, 
      detail = "Token has expired"
    )

  except jwt.InvalidTokenError:
    raise HTTPException(
      status_code = 403, 
      detail = "Invalid token"
    )
