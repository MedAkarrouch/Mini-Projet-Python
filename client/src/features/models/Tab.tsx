import { useEffect, useState } from "react"
import { useDataset } from "../Datasets/hooks/useDataset"
import { useEvaluateModel } from "./useEvaluateModel"

const mls = {
  regression: [
    "K-Nearest Neighbors Regressor",
    "Random Forest Regressor",
    "Support Vector Regressor (SVR)",
    "Linear Regression",
    "Decision Tree Regressor",
    "Mlp Regressor"
  ],
  classification: [
    "K-Nearest Neighbors Classifier",
    "Random Forest Classifier",
    "Support Vector Classifier (SVC)",
    "Logistic Regression",
    "Gaussian Naive Bayes",
    "Bernoulli Naive Bayes",
    "Multinomial Naive Bayes",
    "Decision Tree Classifier",
    "Mlp Classifier"
  ],
  clustering: ["Kmeans"]
}

// New mlModelParameters Object
const mlModelParameters = {
  "K-Nearest Neighbors Regressor": [
    {
      name: "n_neighbors",
      type: "number",
      default: 5,
      description: "Number of neighbors to use."
    }
  ],
  "K-Nearest Neighbors Classifier": [
    {
      name: "n_neighbors",
      type: "number",
      default: 5,
      description: "Number of neighbors to use."
    }
  ],
  "Random Forest Regressor": [
    {
      name: "n_estimators",
      type: "number",
      default: 100,
      description: "The number of trees in the forest."
    },
    {
      name: "max_depth",
      type: "number",
      default: null,
      description: "The maximum depth of the tree."
    },
    {
      name: "min_samples_split",
      type: "number",
      default: 2,
      description:
        "The minimum number of samples required to split an internal node."
    },
    {
      name: "min_samples_leaf",
      type: "number",
      default: 1,
      description:
        "The minimum number of samples required to be at a leaf node."
    },
    {
      name: "bootstrap",
      type: "boolean",
      default: true,
      description: "Whether bootstrap samples are used when building trees."
    }
  ],
  "Random Forest Classifier": [
    {
      name: "n_estimators",
      type: "number",
      default: 100,
      description: "The number of trees in the forest."
    },
    {
      name: "criterion",
      type: "select",
      options: ["gini", "entropy", "log_loss"],
      default: "gini",
      description: "The function to measure the quality of a split."
    },
    {
      name: "max_depth",
      type: "number",
      default: null,
      description: "The maximum depth of the tree."
    },
    {
      name: "min_samples_split",
      type: "number",
      default: 2,
      description:
        "The minimum number of samples required to split an internal node."
    },
    {
      name: "min_samples_leaf",
      type: "number",
      default: 1,
      description:
        "The minimum number of samples required to be at a leaf node."
    },
    {
      name: "bootstrap",
      type: "boolean",
      default: true,
      description: "Whether bootstrap samples are used when building trees."
    }
  ],
  "Support Vector Regressor (SVR)": [
    {
      name: "C",
      type: "number",
      default: 1.0,
      description:
        "Regularization parameter. The strength of the regularization is inversely proportional to C."
    },
    {
      name: "kernel",
      type: "select",
      options: ["linear", "poly", "rbf", "sigmoid"],
      default: "rbf",
      description: "Specifies the kernel type to be used in the algorithm."
    },
    {
      name: "degree",
      type: "number",
      default: 3,
      description:
        "Degree of the polynomial kernel function ('poly'). Ignored by other kernels."
    },
    {
      name: "gamma",
      type: "select",
      options: ["scale", "auto"],
      default: "scale",
      description: "Kernel coefficient for 'rbf', 'poly', and 'sigmoid'."
    },
    {
      name: "tol",
      type: "number",
      default: 1e-3,
      description: "Tolerance for stopping criterion."
    },
    {
      name: "epsilon",
      type: "number",
      default: 0.1,
      description:
        "Epsilon in the epsilon-SVR model. Specifies the margin within which no penalty is given for predictions."
    },
    {
      name: "max_iter",
      type: "number",
      default: -1,
      description: "Hard limit on iterations within solver, or -1 for no limit."
    }
  ],
  "Support Vector Classifier (SVC)": [
    {
      name: "C",
      type: "number",
      default: 1.0,
      description:
        "Regularization parameter. The strength of the regularization is inversely proportional to C."
    },
    {
      name: "kernel",
      type: "select",
      options: ["linear", "poly", "rbf", "sigmoid", "precomputed"],
      default: "rbf",
      description: "Specifies the kernel type to be used in the algorithm."
    },
    {
      name: "degree",
      type: "number",
      default: 3,
      description:
        "Degree of the polynomial kernel function ('poly'). Ignored by other kernels."
    },
    {
      name: "gamma",
      type: "select",
      options: ["scale", "auto"],
      default: "scale",
      description: "Kernel coefficient for 'rbf', 'poly', and 'sigmoid'."
    },
    {
      name: "coef0",
      type: "number",
      default: 0.0,
      description: "Independent term in kernel function ('poly' and 'sigmoid')."
    },
    {
      name: "tol",
      type: "number",
      default: 1e-3,
      description: "Tolerance for stopping criterion."
    },
    {
      name: "max_iter",
      type: "number",
      default: -1,
      description: "Hard limit on iterations within solver, or -1 for no limit."
    },
    {
      name: "decision_function_shape",
      type: "select",
      options: ["ovo", "ovr"],
      default: "ovr",
      description:
        "Determines the shape of the decision function. 'ovr' is one-vs-rest and 'ovo' is one-vs-one."
    }
  ],
  "Linear Regression": [
    {
      name: "fit_intercept",
      type: "boolean",
      default: true,
      description: "Whether to calculate the intercept for the model."
    }
  ],
  "Logistic Regression": [
    {
      name: "tol",
      type: "number",
      default: 1e-4,
      description: "Tolerance for stopping criteria."
    },
    {
      name: "C",
      type: "number",
      default: 1.0,
      description:
        "Inverse of regularization strength; smaller values specify stronger regularization."
    },
    {
      name: "solver",
      type: "select",
      options: ["newton-cg", "lbfgs", "liblinear", "sag", "saga"],
      default: "lbfgs",
      description: "Algorithm to use in the optimization problem."
    },
    {
      name: "max_iter",
      type: "number",
      default: 100,
      description:
        "Maximum number of iterations taken for the solvers to converge."
    },
    {
      name: "multi_class",
      type: "select",
      options: ["auto", "ovr", "multinomial"],
      default: "auto",
      description:
        "If the option chosen is 'ovr', then a binary problem is fit for each label. 'multinomial' fits a multinomial model."
    }
  ],
  "Gaussian Naive Bayes": [
    {
      name: "var_smoothing",
      type: "number",
      default: 1e-9,
      description:
        "Portion of the largest variance of all features added to variances for calculation stability."
    }
  ],
  "Bernoulli Naive Bayes": [
    {
      name: "alpha",
      type: "number",
      default: 1.0,
      description:
        "Additive (Laplace/Lidstone) smoothing parameter (0 for no smoothing)."
    },
    {
      name: "binarize",
      type: "number",
      default: 0.0,
      description:
        "Threshold for binarizing (mapping to booleans) of sample features. If None, input is presumed to already consist of binary values."
    },
    {
      name: "fit_prior",
      type: "boolean",
      default: true,
      description:
        "Whether to learn class prior probabilities or not. If False, a uniform prior will be used."
    }
  ],
  "Multinomial Naive Bayes": [
    {
      name: "alpha",
      type: "number",
      default: 1.0,
      description:
        "Additive (Laplace/Lidstone) smoothing parameter (0 for no smoothing)."
    },
    {
      name: "fit_prior",
      type: "boolean",
      default: true,
      description:
        "Whether to learn class prior probabilities or not. If False, a uniform prior will be used."
    }
  ],
  "Decision Tree Classifier": [
    {
      name: "criterion",
      type: "select",
      options: ["gini", "entropy", "log_loss"],
      default: "gini",
      description: "The function to measure the quality of a split."
    },
    {
      name: "splitter",
      type: "select",
      options: ["best", "random"],
      default: "best",
      description: "The strategy used to choose the split at each node."
    },
    {
      name: "max_depth",
      type: "number",
      default: null,
      description: "The maximum depth of the tree."
    },
    {
      name: "min_samples_split",
      type: "number",
      default: 2,
      description:
        "The minimum number of samples required to split an internal node."
    },
    {
      name: "min_samples_leaf",
      type: "number",
      default: 1,
      description:
        "The minimum number of samples required to be at a leaf node."
    },
    {
      name: "max_features",
      type: "select",
      options: ["sqrt", "log2"],
      default: "sqrt",
      description:
        "The number of features to consider when looking for the best split."
    },
    {
      name: "max_leaf_nodes",
      type: "number",
      default: null,
      description: "Grow a tree with a maximum number of leaf nodes."
    },
    {
      name: "min_impurity_decrease",
      type: "number",
      default: 0.0,
      description:
        "A node will split if this split induces a decrease of the impurity greater than or equal to this value."
    },
    {
      name: "ccp_alpha",
      type: "number",
      default: 0.0,
      description:
        "Complexity parameter used for Minimal Cost-Complexity Pruning."
    }
  ],
  "Decision Tree Regressor": [
    {
      name: "criterion",
      type: "select",
      options: ["squared_error", "friedman_mse", "absolute_error", "poisson"],
      default: "squared_error",
      description: "The function to measure the quality of a split."
    },
    {
      name: "splitter",
      type: "select",
      options: ["best", "random"],
      default: "best",
      description: "The strategy used to choose the split at each node."
    },
    {
      name: "max_depth",
      type: "number",
      default: null,
      description: "The maximum depth of the tree."
    },
    {
      name: "min_samples_split",
      type: "number",
      default: 2,
      description:
        "The minimum number of samples required to split an internal node."
    },
    {
      name: "min_samples_leaf",
      type: "number",
      default: 1,
      description:
        "The minimum number of samples required to be at a leaf node."
    },
    {
      name: "min_weight_fraction_leaf",
      type: "number",
      default: 0.0,
      description:
        "The minimum weighted fraction of the sum total of weights required to be at a leaf node."
    },
    {
      name: "max_features",
      type: "select",
      options: ["sqrt", "log2"],
      default: "sqrt",
      description:
        "The number of features to consider when looking for the best split."
    },
    {
      name: "max_leaf_nodes",
      type: "number",
      default: null,
      description: "Grow a tree with a maximum number of leaf nodes."
    },
    {
      name: "min_impurity_decrease",
      type: "number",
      default: 0.0,
      description:
        "A node will split if this split induces a decrease of the impurity greater than or equal to this value."
    },
    {
      name: "ccp_alpha",
      type: "number",
      default: 0.0,
      description:
        "Complexity parameter used for Minimal Cost-Complexity Pruning."
    }
  ],
  "Mlp Classifier": [
    {
      name: "activation",
      type: "select",
      options: ["identity", "logistic", "tanh", "relu"],
      default: "relu",
      description: "Activation function for the hidden layer."
    },
    {
      name: "solver",
      type: "select",
      options: ["lbfgs", "sgd", "adam"],
      default: "adam",
      description: "The solver for weight optimization."
    },
    {
      name: "alpha",
      type: "number",
      default: 0.0001,
      description: "L2 penalty (regularization term) parameter."
    },
    {
      name: "learning_rate",
      type: "select",
      options: ["constant", "invscaling", "adaptive"],
      default: "constant",
      description: "Learning rate schedule for weight updates."
    },
    {
      name: "max_iter",
      type: "number",
      default: 200,
      description: "Maximum number of iterations."
    },
    {
      name: "shuffle",
      type: "boolean",
      default: true,
      description: "Whether to shuffle samples in each iteration."
    },
    {
      name: "tol",
      type: "number",
      default: 1e-4,
      description: "Tolerance for the optimization."
    },
    {
      name: "epsilon",
      type: "number",
      default: 1e-8,
      description: "Value for numerical stability in Adam optimizer."
    }
  ],
  "Mlp Regressor": [
    {
      name: "activation",
      type: "select",
      options: ["identity", "logistic", "tanh", "relu"],
      default: "relu",
      description: "Activation function for the hidden layer."
    },
    {
      name: "solver",
      type: "select",
      options: ["lbfgs", "sgd", "adam"],
      default: "adam",
      description: "The solver for weight optimization."
    },
    {
      name: "alpha",
      type: "number",
      default: 0.0001,
      description: "L2 penalty (regularization term) parameter."
    },
    {
      name: "learning_rate",
      type: "select",
      options: ["constant", "invscaling", "adaptive"],
      default: "constant",
      description: "Learning rate schedule for weight updates."
    },
    {
      name: "max_iter",
      type: "number",
      default: 200,
      description: "Maximum number of iterations."
    },
    {
      name: "shuffle",
      type: "boolean",
      default: true,
      description: "Whether to shuffle samples in each iteration."
    },
    {
      name: "tol",
      type: "number",
      default: 1e-4,
      description: "Tolerance for the optimization."
    },
    {
      name: "epsilon",
      type: "number",
      default: 1e-8,
      description: "Value for numerical stability in Adam optimizer."
    }
  ],
  Kmeans: [
    {
      name: "n_clusters",
      type: "number",
      default: 8,
      description:
        "The number of clusters to form as well as the number of centroids to generate."
    },
    {
      name: "init",
      type: "select",
      options: ["k-means++", "random"],
      default: "k-means++",
      description: "Method for initialization of the centroids."
    },
    {
      name: "max_iter",
      type: "number",
      default: 300,
      description: "Maximum number of iterations of the k-means algorithm."
    },
    {
      name: "tol",
      type: "number",
      default: 1e-4,
      description:
        "Relative tolerance with regards to inertia to declare convergence."
    },
    {
      name: "algorithm",
      type: "select",
      options: ["lloyd", "elkan"],
      default: "lloyd",
      description: "K-means algorithm to use."
    }
  ]
}

const Tab = () => {
  const { isEvaluating, evaluateModel } = useEvaluateModel()
  const { isLoading: isLoadingDataset, dataset } = useDataset()
  const [selectedMl, setSelectedMl] = useState("")
  const [showParams, setShowParams] = useState("no")
  const [parameters, setParameters] = useState({})

  useEffect(() => {
    if (!selectedMl) return

    const params = {}
    const modelParams = mlModelParameters[selectedMl] || []
    modelParams.forEach((param) => {
      params[param.name] = param.default
    })
    params.training_size = 80
    setParameters(params)
  }, [selectedMl, showParams])

  if (isLoadingDataset) return null

  const models = mls[dataset.task]

  const handleParameterChange = (name, value) => {
    setParameters((prevParams) => ({
      ...prevParams,
      [name]: value
    }))
  }

  const onReset = () => {
    setParameters({})
    setSelectedMl("")
    setShowParams("no")
  }

  const onSubmit = async () => {
    const payload = {
      model_name: selectedMl,
      task: dataset.task,
      target_name: dataset.target_name,
      dataset: dataset.p_dataset,
      parameters: {
        ...parameters,
        training_size: parameters.training_size / 100
      }
    }
    console.log("payload = ", payload)
    evaluateModel(payload)
  }

  const renderParameterInput = (param) => {
    switch (param.type) {
      case "number":
        return (
          <input
            type="number"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            defaultValue={param.default}
            onChange={(e) => handleParameterChange(param.name, +e.target.value)}
          />
        )
      case "select":
        return (
          <select
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            defaultValue={param.default}
            onChange={(e) => handleParameterChange(param.name, e.target.value)}
          >
            {param.options.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        )
      case "boolean":
        return (
          <div className="flex items-center gap-x-6">
            <label className="flex items-center gap-x-2">
              <input
                type="radio"
                name={param.name}
                value={true}
                checked={parameters[param.name] === true}
                onChange={() => handleParameterChange(param.name, true)}
              />
              Yes
            </label>
            <label className="flex items-center gap-x-2">
              <input
                type="radio"
                name={param.name}
                value={false}
                checked={parameters[param.name] === false}
                onChange={() => handleParameterChange(param.name, false)}
              />
              No
            </label>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="grid grid-cols-[.5fr_1fr] gap-x-28 py-8 px-12 mb-24">
      <div className="space-y-10">
        <div>
          <label
            htmlFor="model-select"
            className="block mb-2 text-sm font-medium"
          >
            Select a Model
          </label>
          <select
            id="model-select"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            value={selectedMl}
            onChange={(e) => {
              setSelectedMl(e.target.value)
              setShowParams("no")
            }}
          >
            <option value="" disabled>
              Choose a machine learning model
            </option>
            {models.map((model) => (
              <option key={model} value={model}>
                {model}
              </option>
            ))}
          </select>
        </div>

        <div className="">
          <p className="block mb-2 text-sm font-medium">
            Do you want to customize the model settings?
          </p>
          <div className="flex items-center gap-x-6">
            <label className="flex items-center gap-x-2">
              <input
                type="radio"
                name="showParams"
                value="no"
                checked={showParams === "no"}
                onChange={() => setShowParams("no")}
                disabled={isEvaluating || !selectedMl}
              />
              No
            </label>
            <label className="flex items-center gap-x-2">
              <input
                type="radio"
                name="showParams"
                value="yes"
                checked={showParams === "yes"}
                onChange={() => setShowParams("yes")}
                disabled={isEvaluating || !selectedMl}
              />
              Yes
            </label>
          </div>
        </div>

        {showParams === "yes" && selectedMl && (
          <>
            <div>
              <label
                htmlFor="number-input"
                className="flex flex-col mb-4 gap-x-4 "
              >
                <span className="text-gray-900  text-md">Training Size</span>
                <span className="text-gray-500  text-xs italic ">
                  the percentage of data used to train the model.
                </span>
              </label>
              <input
                min={1}
                max={100}
                type="number"
                step={1}
                id="number-input"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                required
                value={parameters.training_size || 80}
                onChange={(e) =>
                  handleParameterChange("training_size", +e.target.value)
                }
              />
            </div>
            <div className="space-y-6">
              {mlModelParameters[selectedMl]?.map((param) => (
                <div key={param.name} className="space-y-2">
                  <label className="block text-sm font-medium">
                    {param.name}
                  </label>
                  <p className="text-xs text-gray-500">{param.description}</p>
                  {renderParameterInput(param)}
                </div>
              ))}
            </div>
          </>
        )}

        <div className="mt-4 flex justify-end space-x-4 text-base font-semibold">
          <button
            className="text-gray-700 py-3 px-7 shadow-inner border border-gray-300 rounded-full hover:bg-gray-300 transition duration-300"
            onClick={onReset} //
            disabled={isEvaluating}
          >
            Reset
          </button>
          <button
            disabled={isEvaluating || !selectedMl}
            className="bg-blue-600 text-white py-3 px-7 rounded-full hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition duration-300"
            onClick={onSubmit}
          >
            {isEvaluating && (
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
            <span>Evaluate</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Tab
