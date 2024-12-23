import { useState } from "react"
import API from "../api"

const CsvUpload = () => {
  const [file, setFile] = useState(null)
  const [datasetTitle, setDatasetTitle] = useState("")
  const [targetName, setTargetName] = useState("")
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState("")

  // Handle CSV file change and upload
  const handleCsvChange = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    // Validate file type
    if (file.type !== "text/csv") {
      alert("Please upload a valid CSV file.")
      return
    }

    // Optionally, validate file size (e.g., max 10MB)
    const maxSizeInBytes = 10 * 1024 * 1024 // 10MB
    if (file.size > maxSizeInBytes) {
      alert("File size exceeds the 10MB limit.")
      return
    }
    // Everything went correctly
    setFile(file)
  }
  const uploadToSetver = async () => {
    // Prepare form data
    const formData = new FormData()
    formData.append("file", file)
    formData.append("name", datasetTitle)
    formData.append("target_name", targetName)

    try {
      setUploading(true)
      setMessage("Uploading...")

      const response = await API.post("/upload-csv", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })

      setMessage("File uploaded successfully!")
      console.log(response.data) // Handle server response here
    } catch (error) {
      console.error("Error uploading file:", error)
      setMessage("Error uploading file.")
    } finally {
      setUploading(false)
    }
  }
  console.log(file)
  return (
    // <div className="px-6 py-12 max-w-3xl mx-auto flex flex-col justify-between min-h-[inherit]">
    <div className="px-6 py-12 flex flex-col justify-between min-h-[inherit]">
      <div>
        <label
          htmlFor="first_name"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Dataset Title
        </label>
        <input
          value={datasetTitle}
          onChange={(e) => setDatasetTitle(e.target.value)}
          type="text"
          id="first_name"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3.5 "
          placeholder="Enter Dataset Title"
          required
        />
      </div>
      <div>
        <label
          htmlFor="first_name"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Target Name
        </label>
        <input
          value={datasetTitle}
          onChange={(e) => setDatasetTitle(e.target.value)}
          type="text"
          id="first_name"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3.5 "
          placeholder="Enter Target Name"
          required
        />
      </div>
      {/* Upload */}
      <div className="w-full h-full flex items-center justify-center">
        <label
          htmlFor="csv-upload"
          // className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-white hover:bg-gray-100 transition duration-300"
          className="flex flex-col items-center justify-center w-full  h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-white hover:bg-gray-100 transition duration-300"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            {/* You can replace this SVG with any icon you prefer */}
            <svg
              className="w-12 h-12 mb-4 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-3-3v6m5 7H4a2 2 0 01-2-2V7a2 2 0 012-2h16a2 2 0 012 2v10a2 2 0 01-2 2z"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-500">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-gray-500">File (MAX. 10MB)</p>
            {file && (
              <div className="mt-4 text-xs text-blue-600">
                <strong>{file.name}</strong>
              </div>
            )}
          </div>
          <input
            onChange={handleCsvChange}
            id="csv-upload"
            type="file"
            accept=".csv"
            className="hidden"
          />
        </label>
      </div>
      {/* Submit */}
      <div className="mt-4 flex justify-end space-x-4 text-base font-semibold">
        <button
          className="text-gray-700 py-3 px-7 shadow-inner border border-gray-300 rounded-full hover:bg-gray-300 transition duration-300"
          onClick={() => setFile(null)} //
        >
          Reset
        </button>
        <button
          disabled={!file || !datasetTitle}
          className="bg-blue-600 text-white py-3 px-7 rounded-full hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition duration-300"
          onClick={() => {}}
        >
          Create
        </button>
      </div>
    </div>
  )
}

export default CsvUpload
