import React from "react"

const Home = () => {
  return (
    <div className="bg-gray-100 min-h-screen p-6">
      {/* Header */}
      <header className="bg-white shadow mb-6 p-6 rounded-lg">
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome to DataWizard
        </h1>
        <p className="text-gray-600">
          Upload datasets, train models, and create visualizations effortlessly.
        </p>
      </header>

      {/* Main Content */}
      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Datasets Section */}
        <div className="bg-white shadow rounded-lg p-6 hover:shadow-lg transition">
          <h2 className="text-xl font-semibold text-gray-700">
            Manage Datasets
          </h2>
          <p className="text-gray-500 mb-4">
            Upload, view, and organize your datasets. Start by uploading a
            dataset to get started with modeling or visualization.
          </p>
          <button
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
            onClick={() => (window.location.href = "/datasets")}
          >
            View Datasets
          </button>
        </div>

        {/* Model Training Section */}
        <div className="bg-white shadow rounded-lg p-6 hover:shadow-lg transition">
          <h2 className="text-xl font-semibold text-gray-700">Train Models</h2>
          <p className="text-gray-500 mb-4">
            Select a dataset and a model to train. Download a PDF with the
            results of your trained model.
          </p>
          <button
            className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition"
            onClick={() => (window.location.href = "/modeling")}
          >
            Train a Model
          </button>
        </div>

        {/* Visualization Section */}
        <div className="bg-white shadow rounded-lg p-6 hover:shadow-lg transition">
          <h2 className="text-xl font-semibold text-gray-700">
            Create Visualizations
          </h2>
          <p className="text-gray-500 mb-4">
            Generate figures and visual representations of your data. Download
            the figures for your reports.
          </p>
          <button
            className="mt-4 bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600 transition"
            onClick={() => (window.location.href = "/visualization")}
          >
            Create Visualizations
          </button>
        </div>

        {/* Recent Activity Section */}
        <div className="col-span-1 md:col-span-2 lg:col-span-3 bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Recent Activity
          </h2>
          <ul className="text-gray-600">
            <li className="mb-2">
              📁 Uploaded <strong>Dataset_A.csv</strong>.
            </li>
            <li className="mb-2">
              🤖 Trained a model using <strong>Linear Regression</strong>.
            </li>
            <li className="mb-2">
              📊 Generated a visualization for <strong>Sales Trends</strong>.
            </li>
          </ul>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center mt-12 text-gray-500">
        © 2024 DataWizard. All rights reserved.
      </footer>
    </div>
  )
}

export default Home
