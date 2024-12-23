from fastapi.responses import JSONResponse

class GlobalHelper():

  def return_error_json_response(self,err):
    return JSONResponse(
      status_code=err["status_code"] ,
      content={"detail" : err["detail"]}
    )