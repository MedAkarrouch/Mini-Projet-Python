import { useState } from "react"
import DatasetsTab from "../features/Datasets/Tab"
import ModelsTab from "../features/models/Tab"
import VisualizationTab from "../features/visualization/Tab"
import {
  HiOutlineSquares2X2,
  HiOutlineCube,
  HiOutlineChartPie
} from "react-icons/hi2"

const tabs = ["Data Explorer", "Modelling", "Visualization"]
const uiTabs = [DatasetsTab, ModelsTab, VisualizationTab]
const tabIcons = [HiOutlineSquares2X2, HiOutlineCube, HiOutlineChartPie]

const Dataset = () => {
  const [activeTab, setActiveTab] = useState(0)
  const ActiveTabComponent = uiTabs[activeTab]

  return (
    <>
      <div className="border-b border-gray-200">
        <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500">
          {tabs.map((tab, i) => {
            const Icon = tabIcons[i] // Dynamically select the icon for each tab
            return (
              <li key={i} className="me-2">
                <button
                  onClick={() => setActiveTab(i)}
                  className={`inline-flex font-medium  items-center justify-center p-4 border-b-2 rounded-t-lg group ${
                    activeTab == i
                      ? "text-blue-600 border-blue-600"
                      : "hover:text-gray-600 hover:border-gray-300 text-gray-500"
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 me-2 ${
                      activeTab == i
                        ? "text-blue-600"
                        : "text-gray-400 group-hover:text-gray-500"
                    }`}
                  />
                  {tab}
                </button>
              </li>
            )
          })}
        </ul>
      </div>
      {/* Tab */}
      <ActiveTabComponent />
    </>
  )
}

export default Dataset
