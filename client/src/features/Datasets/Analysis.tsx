import React from "react"
import { useDataset } from "./hooks/useDataset"
import { HiOutlineRectangleStack } from "react-icons/hi2"

const colorClasses = {
  blue: "bg-blue-100 text-blue-600",
  green: "bg-green-100 text-green-600",
  amber: "bg-amber-100 text-amber-600",
  pink: "bg-pink-100 text-pink-600"
}

const Stat = ({ color, icon, label, value }) => {
  const classes = colorClasses[color] || "bg-gray-100 text-gray-600"
  return (
    <div className="flex items-center gap-6 p-4 border rounded-lg border-gray-200 bg-white shadow-sm">
      <div
        className={`flex items-center justify-center w-16 h-16 rounded-full ${
          classes.split(" ")[0]
        }`}
      >
        <span
          className={`${
            classes.split(" ")[1]
          } stroke-[1.5] w-12 h-12 flex items-center justify-center`}
        >
          {icon}
        </span>
      </div>
      <div className="text-sm flex flex-col">
        <span className="text-gray-500 uppercase font-semibold">{label}</span>
        <span className="text-2xl font-medium">{value}</span>
      </div>
    </div>
  )
}

const Analysis = ({ dataset }) => {
  const {
    duplicates,
    number_of_rows,
    number_of_columns,
    description,
    null_values,
    correlation
  } = dataset

  return (
    <div className="px-6 py-4 space-y-20">
      <div>
        <h1 className="text-2xl mb-8 font-bold text-gray-950">Overview</h1>
        <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(24rem,1fr))]">
          <Stat
            color="blue"
            icon={<HiOutlineRectangleStack />}
            label="Total Rows"
            value={number_of_rows}
          />
          <Stat
            color="green"
            icon={<HiOutlineRectangleStack />}
            label="Total Columns"
            value={number_of_columns}
          />
          <Stat
            color="amber"
            icon={<HiOutlineRectangleStack />}
            label="Total Duplicates"
            value={duplicates}
          />
          <Stat
            color="pink"
            icon={<HiOutlineRectangleStack />}
            label="Total Null Values"
            value={null_values}
          />
        </div>
      </div>
      {/* Overview Section */}

      {/* Description Section */}
      <div>
        <h1 className="mb-8 font-bold text-gray-950 text-2xl">Description</h1>
        <div className="overflow-auto mx-auto shadow-lg max-h-[40rem]">
          <table className="sm:rounded-lg w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th className="px-6 py-3">Statistic</th>
                {description.columns.map((col, idx) => (
                  <th key={idx} className="px-6 py-3">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {description.index.map((rowName, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="odd:bg-white even:bg-gray-50 border-b"
                >
                  <th className="px-6 py-4 text-gray-700">{rowName}</th>
                  {description.data[rowIndex].map((value, colIndex) => (
                    <td key={colIndex} className="px-6 py-4">
                      {value.toFixed(2)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Correlation Matrix */}
      <div>
        <h1 className="mb-8 font-bold text-gray-950 text-2xl">
          Correlation Matrix
        </h1>
        <div className="overflow-auto mx-auto shadow-lg max-h-[40rem]">
          <table className="sm:rounded-lg w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th className="px-6 py-3"></th>
                {correlation.columns.map((col, idx) => (
                  <th key={idx} className="px-6 py-3">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {correlation.index.map((rowName, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="odd:bg-white even:bg-gray-50 border-b"
                >
                  <th className="px-6 py-4 text-gray-700">{rowName}</th>
                  {correlation.data[rowIndex].map((value, colIndex) => (
                    <td key={colIndex} className="px-6 py-4">
                      {value.toFixed(2)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Analysis
