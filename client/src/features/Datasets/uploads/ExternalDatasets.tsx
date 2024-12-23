import { useContext, useState } from "react"
import { useAddDataset } from "../hooks/useAddDataset"
import { ModalContext } from "../../../ui/ModalContext"

const datasets = {
  scikit: [
    "iris",
    "digits",
    "wine",
    "breast_cancer",
    "diabetes",
    "california_housing",
    "linnerud",
    "newsgroups",
    "covtype"
  ],
  seaborn: ["iris", "tips", "titanic", "flights", "penguins", "diamonds"]
}
const targets = {
  seaborn: {
    iris: "species",
    tips: "tip",
    titanic: "survived",
    flights: "passengers",
    penguins: "species",
    diamonds: "price"
  },
  scikit: {
    iris: "species",
    digits: "digit",
    wine: "class",
    breast_cancer: "label",
    diabetes: "progression",
    california_housing: "house_value",
    linnerud: "fitness_measures",
    newsgroups: "category",
    covtype: "cover_type"
  }
}

const datasetTasks = {
  scikit: {
    iris: "classification",
    digits: "classification",
    wine: "classification",
    breast_cancer: "classification",
    diabetes: "regression",
    california_housing: "regression",
    linnerud: "regression",
    newsgroups: "classification",
    covtype: "classification"
  },
  seaborn: {
    iris: "classification",
    tips: "regression",
    titanic: "classification",
    flights: "regression",
    penguins: "classification",
    diamonds: "regression"
  }
}

const ExternalDatasets = () => {
  const { close } = useContext(ModalContext)

  const { isAdding, addDataset } = useAddDataset()
  const [datasetTitle, setDatasetTitle] = useState("")
  const [selectedDatasetType, setSelectedDatasetType] = useState("") // For selecting dataset type (scikit_learn, seaborn)
  const [selectedDataset, setSelectedDataset] = useState("") // For selecting a specific dataset
  // target is infered
  console.log(selectedDatasetType, selectedDataset)
  // Handler for dataset type selection
  const handleDatasetTypeChange = (e) => {
    setSelectedDatasetType(e.target.value)
    setSelectedDataset("") // Reset dataset when the type changes
  }

  const onSubmit = () => {
    //
    if (!selectedDatasetType || !selectedDataset) return

    const targetName = targets[selectedDatasetType][selectedDataset]
    const formData = new FormData()
    formData.append("name", datasetTitle)
    formData.append("target_name", targetName)
    formData.append("external_library", selectedDatasetType)
    formData.append("external_library_dataset_name", selectedDataset)
    formData.append("external", true)
    formData.append("task", datasetTasks[selectedDatasetType][selectedDataset])
    // formData.append("file", nez File)
    // for (const [key, value] of formData.entries()) {
    //   console.log(`${key}:`, value)
    // }
    addDataset(formData, { onSuccess: close })
  }

  return (
    <div className="px-6 py-12 flex flex-col justify-between min-h-[inherit]">
      <div className="space-y-8">
        {/* First dropdown: Select dataset type (Scikit-learn or Seaborn) */}
        <div>
          <label
            htmlFor="first_name"
            className="block mb-4 text-sm font-medium text-gray-900"
          >
            Dataset Title
          </label>
          <input
            value={datasetTitle}
            onChange={(e) => setDatasetTitle(e.target.value)}
            type="text"
            id="first_name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3.5 "
            placeholder="Enter Dataset Title"
            required
          />
        </div>
        <div>
          <label
            htmlFor="dataset-type"
            className="block mb-4 text-sm font-medium text-gray-900 "
          >
            Select Dataset Type
          </label>
          <select
            id="dataset-type"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3.5"
            value={selectedDatasetType}
            onChange={handleDatasetTypeChange}
          >
            <option value="">Choose a dataset type</option>
            <option value="scikit">Scikit-learn</option>
            <option value="seaborn">Seaborn</option>
          </select>
        </div>

        {/* Second dropdown: Select dataset */}
        <div>
          <label
            htmlFor="dataset"
            className="block mb-4 text-sm font-medium text-gray-900"
          >
            Select a Dataset
          </label>
          <select
            id="dataset"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3.5"
            value={selectedDataset}
            onChange={(e) => setSelectedDataset(e.target.value)}
            disabled={!selectedDatasetType} // Disable until dataset type is selected
          >
            <option value="">Choose a dataset</option>
            {selectedDatasetType &&
              datasets[selectedDatasetType].map((dataset) => (
                <option key={dataset} value={dataset}>
                  {dataset}
                </option>
              ))}
          </select>
        </div>
        {/* Submit */}
      </div>
      <div className="mt-4 flex justify-end space-x-4 text-base font-semibold">
        <button
          className="text-gray-700 py-3 px-7 shadow-inner border border-gray-300 rounded-full hover:bg-gray-300 transition duration-300"
          // onClick={() => setFile(null)} //
        >
          Reset
        </button>
        <button
          disabled={!selectedDatasetType && !selectedDataset}
          className="bg-blue-600 text-white py-3 px-7 rounded-full hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition duration-300"
          onClick={onSubmit}
        >
          Create
        </button>
      </div>
    </div>
  )
}

export default ExternalDatasets
