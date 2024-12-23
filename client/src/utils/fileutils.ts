import * as XLSX from "xlsx"

/**
 * Reads the first line of a file and extracts column names.
 * @param {File} file - The file to process.
 * @returns {Promise<string[]>} A promise resolving to an array of column names.
 */
export const getColumnsFromFile = (file) => {
  return new Promise((resolve, reject) => {
    const fileExtension = file.name.split(".").pop().toLowerCase()

    const handleCsvOrTsv = (delimiter) => {
      const reader = new FileReader()
      reader.onload = (event) => {
        const content = event.target.result
        const firstLine = content.split("\n")[0] // Get the first line
        const columnNames = firstLine.split(delimiter).map((col) => col.trim())
        resolve(columnNames)
      }
      reader.onerror = () =>
        reject(new Error("Failed to read the CSV/TSV file"))
      reader.readAsText(file)
    }

    const handleExcel = () => {
      const reader = new FileReader()
      reader.onload = (event) => {
        try {
          const workbook = XLSX.read(event.target.result, { type: "binary" })
          const firstSheetName = workbook.SheetNames[0]
          const worksheet = workbook.Sheets[firstSheetName]
          const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 })
          const columnNames = jsonData[0] || [] // First row contains column names
          resolve(columnNames)
        } catch (error) {
          reject(new Error("Failed to read the Excel file"))
        }
      }
      reader.onerror = () => reject(new Error("Failed to read the Excel file"))
      reader.readAsBinaryString(file)
    }

    const handleJson = () => {
      const reader = new FileReader()
      reader.onload = (event) => {
        try {
          const jsonData = JSON.parse(event.target.result)
          if (Array.isArray(jsonData)) {
            const columnNames = Object.keys(jsonData[0] || {})
            resolve(columnNames)
          } else {
            reject(
              new Error(
                "JSON format not recognized. Expected an array of objects."
              )
            )
          }
        } catch (error) {
          reject(new Error("Failed to parse the JSON file"))
        }
      }
      reader.onerror = () => reject(new Error("Failed to read the JSON file"))
      reader.readAsText(file)
    }

    // Determine file type and process
    switch (fileExtension) {
      case "csv":
        handleCsvOrTsv(",")
        break
      case "tsv":
        handleCsvOrTsv("\t")
        break
      case "xls":
      case "xlsx":
        handleExcel()
        break
      case "json":
        handleJson()
        break
      default:
        reject(
          new Error(
            "Unsupported file format. Please upload csv, tsv, xls, xlsx, or json."
          )
        )
    }
  })
}
