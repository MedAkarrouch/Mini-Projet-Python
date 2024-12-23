from sqlalchemy import create_engine 
from sqlalchemy.ext.declarative import declarative_base 
from sqlalchemy.orm import sessionmaker 

# SQLALCHEMY_DATABASE_URL = "mssql+pyodbc://localhost/python_project?driver=ODBC+Driver+17+for+SQL+Server&trusted_connection=yes" 
SQLALCHEMY_DATABASE_URL = "mysql+mysqlconnector://root:root@localhost:3306/python_project"

engine = create_engine(SQLALCHEMY_DATABASE_URL) #create the engine
# engine = create_engine(DATABASE_URL, pool_size=10, max_overflow=20)


LocalSession = sessionmaker(autocommit=False, autoflush=False, bind=engine) #A session to interact with the database

Base = declarative_base() # Base class for your ORM models

def init_db():
  Base.metadata.create_all(bind=engine)

def get_db():
  db = LocalSession()
  try:
    yield db
  finally:
    db.close()