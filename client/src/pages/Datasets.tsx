import { HiOutlineViewColumns, HiOutlineTrash } from "react-icons/hi2"
import { useNavigate } from "react-router-dom"
import { useDatasets } from "../features/Datasets/hooks/useDatasets"
import { useDeleteDataset } from "../features/Datasets/hooks/useDeleteDataset"
import { formatDistanceToNow } from "date-fns" // Import date-fns function

const Datasets = () => {
  const { isLoading, datasets } = useDatasets()
  const { isDeleting, deleteDataset } = useDeleteDataset()
  const navigate = useNavigate()

  if (isLoading) return null

  return (
    <div className="px-6 py-12 mb-24 ">
      {/* Header */}
      <h1 className="font-bold text-2xl mb-8 text-gray-800">
        Your Datasets{" "}
        <span className="text-blue-700 text-xl">( {datasets?.length} )</span>
      </h1>

      {/* Datasets List */}
      <ul className="space-y-6 p-4 rounded-lg">
        {datasets.map((dataset) => (
          <li
            key={dataset.id}
            className="grid grid-cols-[1fr_min-content] items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition cursor-pointer"
          >
            {/* Dataset Info */}
            <div
              onClick={() => navigate(`/datasets/${dataset.id}`)}
              className="flex items-center space-x-6"
            >
              {/* Icon */}
              <span className="bg-blue-100 p-4 rounded-full">
                <HiOutlineViewColumns className="text-xl text-blue-600" />
              </span>

              {/* Dataset Details */}
              <div className="flex flex-col gap-y-1">
                <span className="capitalize font-semibold text-base text-gray-800">
                  {dataset.name}
                </span>
                <span className="text-gray-500 text-xs font-medium">
                  Created{" "}
                  {formatDistanceToNow(new Date(dataset.created_at), {
                    addSuffix: true
                  })}
                </span>
              </div>
            </div>

            {/* Delete Button */}
            <button
              onClick={() => deleteDataset(dataset.id)}
              disabled={isDeleting}
              className={`text-red-500 hover:text-red-600 transition ${
                isDeleting ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
              }`}
            >
              <HiOutlineTrash className="text-xl" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Datasets

// import { HiOutlineViewColumns, HiOutlineTrash } from "react-icons/hi2"
// import { useNavigate } from "react-router-dom"
// import { useDatasets } from "../features/Datasets/hooks/useDatasets"
// import { useDeleteDataset } from "../features/Datasets/hooks/useDeleteDataset"

// const Datasets = () => {
//   const { isLoading, datasets } = useDatasets()
//   const { isDeleting, deleteDataset } = useDeleteDataset()
//   const navigate = useNavigate()

//   if (isLoading) return null
//   return (
//     <div className="px-6 py-12">
//       <h1 className="font-bold text-4xl mb-8">
//         Your Datasets ({datasets?.length})
//       </h1>
//       <ul className="space-y-8 p-4">
//         {datasets.map((dataset) => (
//           <li
//             key={dataset.id}
//             className="flex items-center justify-between pb-4   border-b border-gray-300 hover:cursor-pointer rounded-sm"
//           >
//             <div
//               onClick={() => navigate(`/datasets/${dataset.id}`)}
//               className="flex items-center space-x-8"
//             >
//               <span className="bg-gray-100 p-5 rounded-[50%]">
//                 <HiOutlineViewColumns className="text-3xl font-black text-gray-500" />
//               </span>
//               <div className="flex flex-col gap-y-1">
//                 <span className="font-semibold text-lg">{dataset.name}</span>
//                 <span className="text-gray-500 text-xs font-medium">
//                   created 7 days ago
//                 </span>
//               </div>
//             </div>
//             <button onClick={() => deleteDataset(dataset.id)}>
//               <HiOutlineTrash className="text-gray-400 text-3xl cursor-pointer" />
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   )
// }

// export default Datasets
