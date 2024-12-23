import { useState } from "react"
import LoadFile from "./uploads/LoadFile"
import CustomDataset from "./uploads/CustomDataset"
import ExternalDatasets from "./uploads/ExternalDatasets"

const tabs = ["Local File", "External Datasets", "Custom Dataset"]
const uiTabs = [LoadFile, ExternalDatasets, CustomDataset]

const NewDataset = () => {
  const [activeTab, setActiveTab] = useState(0)
  const ActiveTabComponent = uiTabs[activeTab]

  return (
    <div>
      <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 ">
        {tabs.map((tab, i) => (
          <li className="me-2">
            <button
              onClick={() => setActiveTab(i)}
              className={`inline-flex items-center justify-center p-4 border-b-2 rounded-t-lg group ${
                activeTab == i
                  ? "text-blue-600  border-blue-600 "
                  : "hover:text-gray-600 hover:border-gray-300"
              } `}
            >
              {tab}
            </button>
          </li>
        ))}
      </ul>
      <div className="min-h-[50rem] w-full ">
        <ActiveTabComponent />
      </div>
    </div>
  )
}

export default NewDataset
