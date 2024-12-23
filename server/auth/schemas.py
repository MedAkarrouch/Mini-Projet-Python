from pydantic import BaseModel,ConfigDict


class AuthenticatedUser(BaseModel):
  model_config = ConfigDict(from_attributes=True)
  id : int
  username : str
  full_name: str
  # class Config:
    # orm_mode = True

class LoginUser(BaseModel):
  username : str
  password : str

class RegisterUser(BaseModel):
  username : str
  full_name : str
  password : str

class UpdatePassword(BaseModel):
  current_password : str
  new_password : str

class UpdateUsername(BaseModel):
  new_username: str
  current_password : str