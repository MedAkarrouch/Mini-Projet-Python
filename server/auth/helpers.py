from fastapi.responses import JSONResponse
from passlib.context import CryptContext
import jwt
from datetime import datetime,timedelta
from config import JWT_ALGORITHM,JWT_SECRET_KEY,JWT_EXPIRE_HOURS

class AuthHelper():

  def __init__(self):
    self.password_context = CryptContext(schemes=["bcrypt"])

  def hash_password(self,password: str) -> str:
    return self.password_context.hash(password)

  def verify_password(self,plain_password : str , hashed_password : str) -> bool:
    return self.password_context.verify(plain_password,hashed_password)

  def create_access_token(self,user_id : int):
    payload = {
      "user_id" : user_id,
      "exp": datetime.utcnow() + timedelta(hours=JWT_EXPIRE_HOURS) 
    }
    return jwt.encode(payload=payload,algorithm=JWT_ALGORITHM,key=JWT_SECRET_KEY)