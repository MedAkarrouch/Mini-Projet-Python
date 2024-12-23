import React, { createElement, useRef, useState } from "react"
import { useDataset } from "../Datasets/hooks/useDataset"
import API from "../../api"
import toast from "react-hot-toast"
import { HiOutlineArrowDownTray } from "react-icons/hi2"
const chart_types = {
  matplotlib: {
    "2D": [
      "Line",
      "Scatter",
      "Histogram 2D",
      "Histogram 1D",
      // "Pie",
      "Bar",
      "Stacked Bar",
      "Box",
      "Violin",
      // "Heatmap",
      "Area"
    ],
    "3D": [
      "Line",
      "Scatter"
      // "Surface", "Wireframe", "Bar", "Contour"
    ]
  },
  seaborn: {
    "2D": [
      "Line",
      "Scatter",
      "Bar",
      "Count",
      "Histogram",
      "Box",
      "Violin",
      "Heatmap",
      "Pair",
      "Cat",
      "Strip",
      "Swarm",
      "KDE",
      "Rug"
    ]
  }
}

const chartAxisRequirements = {
  matplotlib: {
    "2D": {
      Line: 2,
      Scatter: 2,
      "Histogram 2D": 2,
      "Histogram 1D": 1,
      Pie: 1,
      Bar: 2,
      "Stacked Bar": 2,
      Box: 1,
      Violin: 1,
      Heatmap: 2,
      Area: 2
    },
    "3D": {
      Line: 3,
      Scatter: 3,
      Surface: 3,
      Wireframe: 3,
      Bar: 3,
      Contour: 3,
      Quiver: 3
    }
  },
  seaborn: {
    "2D": {
      Line: 2,
      Scatter: 2,
      Bar: 2,
      Count: 1,
      Histogram: 1,
      Box: 1,
      Violin: 1,
      Heatmap: 2,
      Pair: 2,
      Cat: 2,
      Strip: 2,
      Swarm: 2,
      KDE: 1,
      Rug: 1
    }
  }
}

const Tab = () => {
  const { dataset } = useDataset()
  const [library, setLibrary] = useState("")
  const [dimension, setDimension] = useState("")
  const [diagram, setDiagram] = useState("")
  const [xAxis, setXAxis] = useState("")
  const [yAxis, setYAxis] = useState("")
  const [zAxis, setZAxis] = useState("")
  const [imgSrc, setImgSrc] = useState(null)
  const [isVisualizing, setIsVisualizing] = useState(false)
  // Safely access columns
  const columns = dataset?.p_dataset?.columns || []
  const charts =
    library && dimension ? chart_types[library]?.[dimension] || [] : []
  const axisCount =
    library && dimension && diagram
      ? chartAxisRequirements[library][dimension][diagram]
      : 0
  //
  const handleReset = () => {
    setLibrary("")
    setDimension("")
    setDiagram("")
    setXAxis("")
    setYAxis("")
    setZAxis("")
    setImgSrc(null)
  }
  const handleLibraryChange = (e) => {
    const newVal = e.target.value
    setLibrary(newVal)
    setDimension("")
    setDiagram("")
  }
  const handleDimensionChange = (e) => {
    const newVal = e.target.value
    setDimension(newVal)
    setDiagram("")
  }
  const handleDiagramChange = (e) => {
    const newVal = e.target.value
    setDiagram(newVal)
    setXAxis("")
    setYAxis("")
    setZAxis("")
  }
  const downloadImage = (src, filename = "image.png") => {
    // Create a temporary <a> element
    const link = document.createElement("a")
    // Set the href to the image source
    link.href = src
    // Set the download attribute to specify the filename
    link.download = filename
    // Append the link to the body (required for Firefox)
    document.body.appendChild(link)
    // Programmatically click the link to trigger the download
    link.click()
    // Remove the link after triggering the download
    document.body.removeChild(link)
  }

  //
  const onSubmit = async () => {
    const data = { library, dimension, diagram }
    if (xAxis) {
      const colXIndex = dataset.p_dataset.columns.indexOf(xAxis)
      data["x_values"] = dataset.p_dataset.data.map((row) => row[colXIndex])
      data["x_label"] = xAxis
    }
    if (yAxis) {
      const colYIndex = dataset.p_dataset.columns.indexOf(yAxis)
      data["y_values"] = dataset.p_dataset.data.map((row) => row[colYIndex])
      data["y_label"] = yAxis
    }
    if (zAxis) {
      const colZIndex = dataset.p_dataset.columns.indexOf(zAxis)
      data["z_values"] = dataset.p_dataset.data.map((row) => row[colZIndex])
      data["z_label"] = zAxis
    }
    //
    //
    //

    // cost x_values = dataset.p_dataset.data
    console.log("Data = ", data)
    try {
      setIsVisualizing(true)
      const res = await API.post("/datasets/plot", data)
      console.log(res.data)
      setImgSrc(`data:image/png;base64,${res.data.image}`)
    } catch (err) {
      console.log("error = ", err)
      // toast.error(err)
    } finally {
      setIsVisualizing(false)
    }
  }
  //

  return (
    // <div className="grid grid-cols-[.5fr_1fr] gap-x-6 py-8 px-6 mb-24">
    // <div className="grid grid-cols-[.5fr_1fr] gap-x-28 py-8 px-6 grid-rows-[42rem]">
    <div className="grid grid-cols-[.5fr_1fr] gap-x-28 py-8 px-12 mb-24">
      <div className="space-y-8">
        {/* Library */}
        <div className="">
          <label
            htmlFor="countries"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Choose a library
          </label>
          <select
            id="countries"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            value={library}
            onChange={handleLibraryChange}
          >
            <option value={""} selected>
              Choose a library
            </option>
            <option value={"matplotlib"}>matplotlib</option>
            <option value={"seaborn"}>seaborn</option>
          </select>
        </div>
        {/* Dimension */}
        <div className="">
          <label
            htmlFor="countries"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Choose a Dimension
          </label>
          <select
            disabled={!library}
            id="countries"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            value={dimension}
            onChange={handleDimensionChange}
          >
            <option value={""} selected>
              Choose a dimension
            </option>
            {library &&
              Object.keys(chart_types[library]).map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
          </select>
        </div>
        {/* Charts  */}
        <div className="">
          <label
            htmlFor="countries"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Choose a Diagram
          </label>
          <select
            disabled={!library || !dimension}
            id="countries"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            value={diagram}
            onChange={handleDiagramChange}
          >
            <option value={""} selected>
              Choose a Diagram
            </option>
            {charts.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
        {/* Axes */}
        {/* X Lavel */}
        {axisCount > 0 && (
          <div className="">
            <label
              htmlFor="countries"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Select X axis
            </label>
            <select
              disabled={!diagram}
              id="countries"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              value={xAxis}
              onChange={(e) => setXAxis(e.target.value)}
            >
              <option value={""} selected>
                Choose the X axis
              </option>
              {columns.map((col) => (
                <option key={col} value={col}>
                  {col}
                </option>
              ))}
            </select>
          </div>
        )}
        {/* Choose Y axis */}
        {axisCount > 1 && (
          <div className="">
            <label
              htmlFor="countries"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Select Y axis
            </label>
            <select
              disabled={!diagram}
              id="countries"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              value={yAxis}
              onChange={(e) => setYAxis(e.target.value)}
            >
              <option value={""} selected>
                Choose the Y axis
              </option>
              {columns.map((col) => (
                <option key={col} value={col}>
                  {col}
                </option>
              ))}
            </select>
          </div>
        )}
        {/* Choose Z axis */}
        {dimension === "3D" && axisCount > 2 && (
          <div className="">
            <label
              htmlFor="countries"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Select Z axis
            </label>
            <select
              disabled={!diagram}
              id="countries"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              value={zAxis}
              onChange={(e) => setZAxis(e.target.value)}
            >
              <option value={""} selected>
                Choose the Z axis
              </option>
              {columns.map((col) => (
                <option key={col} value={col}>
                  {col}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="mt-4 flex justify-end space-x-4 text-base font-semibold">
          <button
            className="text-gray-700 py-3 px-7 shadow-inner border border-gray-300 rounded-full hover:bg-gray-300 transition duration-300"
            onClick={handleReset} //
            disabled={isVisualizing}
          >
            Reset
          </button>
          <button
            disabled={
              isVisualizing ||
              !library ||
              !dimension ||
              !diagram ||
              (dimension === "3D" && !zAxis) ||
              (dimension === "2D" && axisCount == 2 && (!xAxis || !yAxis)) ||
              (dimension === "2D" && axisCount == 1 && !xAxis)
            }
            className="bg-blue-600 text-white py-3 px-7 rounded-full hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition duration-300"
            onClick={onSubmit}
          >
            {isVisualizing && (
              <svg
                aria-hidden="true"
                role="status"
                className="inline w-4 h-4 me-3 text-white animate-spin"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="#E5E7EB"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentColor"
                />
              </svg>
            )}
            <span>Visualize</span>
          </button>
        </div>
        {/*  */}
      </div>
      {!isVisualizing && imgSrc && (
        <div
          // className="grid grid-cols-1 gap-y-4"
          // className="relative py-10 border-2 border-dotted border-gray-500 shadow-2xl rounded-lg bg-white"
          className="p-10 py-8  bg-white border border-gray-200 rounded-xl shadow-lg justify-self-end relative"
        >
          {/* <img src={imgSrc} className="max-w-3xl mx-auto object-cover block" /> */}
          <img src={imgSrc} className="max-w-3xl mx-auto object-cover block" />
          <button
            onClick={() => downloadImage(imgSrc)}
            className="absolute top-4 right-4"
          >
            <HiOutlineArrowDownTray
              strokeWidth={2.75}
              className="text-gray-500 w-6 h-6 font-extrabold text-2xl"
            />
          </button>
          {/*  */}
        </div>
      )}
    </div>
  )
}
export default Tab
