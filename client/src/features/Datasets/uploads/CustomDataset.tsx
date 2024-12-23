import React, { useState } from "react"

const CustomDataset = () => {
  const [step, setStep] = useState(1)
  const [numRows, setNumRows] = useState(0)
  const [numCols, setNumCols] = useState(0)
  const [colNames, setColNames] = useState([])
  const [data, setData] = useState([])

  const handleNextStep = () => {
    if (step === 1) {
      setColNames(Array(numCols).fill("")) // Initialize column names
    }
    setStep((prevStep) => prevStep + 1)
  }

  const handlePrevStep = () => {
    setStep((prevStep) => prevStep - 1)
  }

  const handleColumnNamesChange = (index, value) => {
    const updatedColNames = [...colNames]
    updatedColNames[index] = value
    setColNames(updatedColNames)
  }

  const handleDataChange = (rowIndex, colIndex, value) => {
    const updatedData = [...data]
    if (!updatedData[rowIndex]) {
      updatedData[rowIndex] = Array(numCols).fill("")
    }
    updatedData[rowIndex][colIndex] = value
    setData(updatedData)
  }

  const handleSubmit = () => {
    console.log("Submitted Data:", data)
    alert("Data Submitted! Check console for details.")
  }

  return (
    <div className="h-[50rem]">
      {step === 1 && (
        <div className="px-6 py-12 flex flex-col justify-between min-h-[inherit] h-full">
          <div className="space-y-8">
            <h2 className="mb-4 text-base font-bold">
              Step 1 : Enter Rows and Columns
            </h2>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Number of Rows:
              </label>
              <input
                type="number"
                value={numRows}
                onChange={(e) => setNumRows(Number(e.target.value))}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3.5 "
                placeholder="Enter Number of Rows"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Number of Columns:
              </label>
              <input
                type="number"
                value={numCols}
                onChange={(e) => setNumCols(Number(e.target.value))}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3.5 "
                placeholder="Enter Number of Columns"
              />
            </div>
          </div>
          <div className="flex justify-end text-base font-semibold">
            <button
              onClick={handleNextStep}
              disabled={numRows <= 0 || numCols <= 0}
              className="bg-blue-600 text-white py-3 px-7 rounded-full hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition duration-300"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="px-6 py-12 flex flex-col justify-between min-h-[inherit] h-full">
          <div>
            <h2 className="mb-4 text-base font-bold">
              Step 2 : Enter Column Names
            </h2>
            {Array.from({ length: numCols }).map((_, index) => (
              <div key={index} className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Column {index + 1} Name
                </label>
                <input
                  type="text"
                  value={colNames[index] || ""}
                  onChange={(e) =>
                    handleColumnNamesChange(index, e.target.value)
                  }
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3.5 "
                />
              </div>
            ))}
          </div>
          <div className="flex justify-between space-x-4 text-base font-semibold">
            <button
              onClick={handlePrevStep}
              className="text-gray-700 py-3 px-7 shadow-inner border border-gray-300 rounded-full hover:bg-gray-300 transition duration-300"
            >
              Previous
            </button>
            <button
              onClick={handleNextStep}
              disabled={colNames.some((name) => !name)}
              className="bg-blue-600 text-white py-3 px-7 rounded-full hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition duration-300"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="px-6 py-12 flex flex-col justify-between min-h-[inherit] h-full">
          <div>
            <h2 className="mb-4 text-base font-bold">Step 3: Enter Data</h2>
            <div className="overflow-auto mx-auto max-h-[36rem] shadow-lg border border-gray-100 mb-4">
              <table className="sm:rounded-lg w-full text-sm text-left rtl:text-right text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    {colNames.map((colName, index) => (
                      <th key={index} className="px-6 py-3">
                        {colName}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: numRows }).map((_, rowIndex) => (
                    <tr
                      key={rowIndex}
                      className="odd:bg-white even:bg-gray-50 border-b"
                    >
                      {Array.from({ length: numCols }).map((_, colIndex) => (
                        <td key={colIndex} className="px-6 py-4">
                          <input
                            type="text"
                            value={data[rowIndex]?.[colIndex] || ""}
                            onChange={(e) =>
                              handleDataChange(
                                rowIndex,
                                colIndex,
                                e.target.value
                              )
                            }
                            className="border p-2 w-full min-w-[10rem] max-w-[20rem]"
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex justify-between space-x-4 text-base font-semibold">
            <button
              onClick={handlePrevStep}
              className="text-gray-700 py-3 px-7 shadow-inner border border-gray-300 rounded-full hover:bg-gray-300 transition duration-300"
            >
              Previous
            </button>
            <button
              onClick={handleSubmit}
              className="bg-blue-600 text-white py-3 px-7 rounded-full hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition duration-300"
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default CustomDataset
