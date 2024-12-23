from dotenv import load_dotenv
import os

load_dotenv()

JWT_ALGORITHM = os.getenv("JWT_ALGORITHM")
JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")
JWT_EXPIRE_HOURS =int(os.getenv("JWT_EXPIRE_HOURS"))