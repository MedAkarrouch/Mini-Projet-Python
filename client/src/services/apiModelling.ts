import API from "../api"

export const evaluateModel = async (data: unknown) => {
  try {
    // Ensure the `visualizations` parameter is sent in the request body
    const res = await API.post("/modelling/", data, {
      responseType: "blob" // Important for binary data
    })

    // Create a Blob URL for the downloaded PDF
    const url = window.URL.createObjectURL(
      new Blob([res.data], { type: "application/pdf" })
    )

    // Create a temporary anchor element to trigger the download
    const a = document.createElement("a")
    a.href = url
    a.download = "visualizations.pdf" // Desired filename
    document.body.appendChild(a)
    a.click()
    // Cleanup the temporary anchor element
    document.body.removeChild(a)

    // Release the Blob URL to free up memory
    window.URL.revokeObjectURL(url)
  } catch (err) {
    console.log("Error =  ", err)
    throw new Error("")
  }
}
