from sqlalchemy import Column, ForeignKey,Integer,String,Boolean,DateTime
from sqlalchemy.sql import func
from database import Base

class User(Base):
  __tablename__ = "users"
  id = Column(Integer,primary_key=True,index=True)
  username = Column(String(255),unique=True,index=True)
  full_name = Column(String(255))
  password = Column(String(255))

class Dataset(Base):
  __tablename__ = "datasets"
  id = Column(Integer,primary_key=True,index=True)
  user_id = Column(Integer,ForeignKey("users.id"),nullable=False)
  name = Column(String(255))
  target_name = Column(String(255))
  task = Column(String(255))
  external = Column(Boolean,default=False)
  external_library = Column(String(255),default=None)
  external_library_dataset_name = Column(String(255),default=None)
  created_at = Column(DateTime, server_default=func.utc_timestamp())
