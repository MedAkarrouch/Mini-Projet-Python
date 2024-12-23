import API from "../api"

export const uploadFile = async () => {
  //
  const response = await API.post("/upload-csv", {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  })

  console.log(response.data) // Handle server response here
}
