import Modal from "../../ui/Modal"
import Table from "../../ui/Table"
import { downloadCSV } from "../../utils/helpers"
import { useDataset } from "./hooks/useDataset"
import { HiOutlineArrowDownTray } from "react-icons/hi2"
import {
  HiOutlinePresentationChartBar,
  HiOutlineArrowsPointingOut,
  HiOutlineRectangleGroup,
  HiOutlineViewfinderCircle
} from "react-icons/hi2"
import Analysis from "./Analysis"

const Tab = () => {
  const { isLoading, dataset } = useDataset()
  if (isLoading) return null
  console.log(dataset)
  return (
    <Modal>
      <div className="px-12 pb-52 pt-12 space-y-20 bg-gray-50">
        <div>
          {/* model */}
          <div className="flex items-start justify-between">
            <h1 className="mb-10 ">
              <span className="font-extrabold text-3xl">Original Dataset</span>
            </h1>
            <div className="bg-white border border-gray-100 rounded-md shadow-sm flex items-center text-gray-600  font-medium">
              <Modal.Open opens="o-analysis">
                <button className="px-4 py-4 pr-6 hover:bg-gray-100 border-r border-gray-100 flex items-center gap-x-4">
                  <span className="font-medium text-gray-500">Analysis</span>
                  <HiOutlinePresentationChartBar className="w-5 h-5 text-gray-400" />
                </button>
              </Modal.Open>
              <Modal.Window name="o-analysis">
                <Analysis dataset={dataset.stats.o_dataset} />
              </Modal.Window>
              <button
                onClick={() =>
                  downloadCSV(
                    dataset.o_dataset,
                    `original_${dataset.name}_dataset`
                  )
                }
                className="px-6 py-4 pl-6 hover:bg-gray-100 flex items-center justify-between gap-x-4"
              >
                <span className="font-medium text-gray-500">Download</span>
                <HiOutlineArrowDownTray className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </div>
          <Table
            data={{
              data: dataset.o_dataset.data.slice(0, 100),
              columns: dataset.o_dataset.columns
            }}
          />
        </div>
        <div>
          <div className="flex items-start justify-between">
            <h1 className="mb-10 ">
              <span className="font-extrabold text-3xl">Cleaned Dataset</span>
            </h1>
            <div className="bg-white border border-gray-100 rounded-md shadow-sm flex items-center text-gray-600  font-medium">
              <Modal.Open opens="p-analysis">
                <button className="px-4 py-4 pr-6 hover:bg-gray-100 border-r border-gray-100 flex items-center gap-x-4">
                  <span className="font-medium text-gray-500">Analysis</span>
                  <HiOutlinePresentationChartBar className="w-5 h-5 text-gray-400" />
                </button>
              </Modal.Open>
              <Modal.Window name="p-analysis">
                <Analysis dataset={dataset.stats.p_dataset} />
              </Modal.Window>
              <button
                onClick={() =>
                  downloadCSV(
                    dataset.p_dataset,
                    `cleaned_${dataset.name}_dataset`
                  )
                }
                className="px-6 py-4 pl-6 hover:bg-gray-100 flex items-center justify-between gap-x-4"
              >
                <span className="font-medium text-gray-500">Download</span>
                <HiOutlineArrowDownTray className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </div>
          <Table
            data={{
              data: dataset.p_dataset.data.slice(0, 100),
              columns: dataset.p_dataset.columns
            }}
          />
        </div>
      </div>
    </Modal>
  )
}

export default Tab
