import toast from "react-hot-toast"
export const getToken = (): string => localStorage.getItem("access_token") || ""

export const setToken = (token: string): void =>
  localStorage.setItem("access_token", token)

export const removeToken = (): void => localStorage.removeItem("access_token")

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const onError = (error: any) => {
  const detail = error?.response?.data?.detail || "Something went wrong!"
  toast.error(detail)
}

export const downloadCSV = (dataset, dataset_name) => {
  // Convert dataset to CSV format
  const columns = dataset.columns
  const data = dataset.data

  // Create CSV string
  let csvContent = columns.join(",") + "\n" // Add column headers
  data.forEach((row) => {
    csvContent += row.join(",") + "\n" // Add row values
  })

  // Create a Blob from the CSV string
  const blob = new Blob([csvContent], { type: "text/csv" })

  // Create a download link
  const link = document.createElement("a")
  link.href = URL.createObjectURL(blob)
  link.download = `${dataset_name}.csv` // Set the file name

  // Trigger download by clicking the link
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
