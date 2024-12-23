from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from database import init_db
from auth.router import router as auth_router
from datasets.router import router as preprocess_router
from modelling.router import router as modelling_router
import logging
# ########
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",  
]

# Create an instance of FastAPI
app = FastAPI()
# 
# Add CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods 
    allow_headers=["*"],  # Allow all headers
)
#########################################
@app.middleware("http")
async def log_requests(request: Request, call_next):
    try:
        response = await call_next(request)
        return response
    except Exception as e:
        print(f"Error: {str(e)}")
        raise

# Routers 
app.include_router(auth_router,prefix="/auth")
app.include_router(preprocess_router,prefix="/datasets")
app.include_router(modelling_router,prefix="/modelling")

# Log dabase actions
logging.basicConfig()
logging.getLogger('sqlalchemy.engine').setLevel(logging.INFO)

# db init
@app.on_event("startup")
def startup():
    init_db()
###########



# @app.get("/")
# def read_root():
#     return {"message": "Hello, FastAPI!"}
