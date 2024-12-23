type DatasetData = {
  columns: string[] // Array of strings representing column names
  data: number[][] // Array of arrays, where each inner array contains numbers (int[]).
}

const Table = ({ data: { columns, data } }: DatasetData) => {
  return (
    <div className="">
      {/* <div className="overflow-auto mx-auto   w-[80dvw] h-[80dvh]"> */}
      <div className="overflow-auto mx-auto h-[34rem] shadow-lg">
        <table className="sm:rounded-lg w-full text-sm text-left rtl:text-right text-gray-500 h-full">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr>
              {columns.map((col) => (
                <th scope="col" key={col} className="px-6 py-3">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* {data.slice(0, 100).map((row, j) => ( */}
            {data.map((row, j) => (
              <tr className="odd:bg-white  even:bg-gray-50  border-b ">
                {row.map((val, i) => (
                  <td
                    key={i}
                    className={`px-6 py-4 ${
                      i == row.length - 1 &&
                      "font-medium text-gray-900 whitespace-nowrap "
                    }`}
                  >
                    {typeof val === "number" ? val.toFixed(2) : val}
                  </td>
                ))}
              </tr>
            ))}
            {/* <tr>
            <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
            >
              Apple Watch 5
            </th>
            <td className="px-6 py-4">Red</td>
            <td className="px-6 py-4">Wearables</td>
            <td className="px-6 py-4">$999</td>
          </tr> */}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Table
