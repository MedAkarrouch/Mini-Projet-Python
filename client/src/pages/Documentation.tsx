import {
  HiOutlineCubeTransparent,
  HiOutlineBars3BottomLeft
} from "react-icons/hi2"
const Documentation = () => {
  return (
    <div className=" px-6 py-12 mb-24">
      {/* Page Header */}
      <h1 className="font-bold text-2xl mb-8 text-gray-800 flex gap-x-2 items-center">
        <HiOutlineCubeTransparent strokeWidth={2.75} />
        <span>Documentation</span>
      </h1>
      <div className="pl-12 space-y-16">
        {/* Part 1: Walkthrough */}
        <section>
          <h2 className="text-xl font-bold mb-8 text-gray-800 flex items-center gap-x-2">
            <HiOutlineBars3BottomLeft strokeWidth={2.75} />
            <span>Part 1: Walkthrough</span>
          </h2>
          <div className="pl-6 space-y-20">
            {/* Section: Upload Datasets */}
            <section className="mb-12">
              <h2 className="font-semibold text-xl mb-3">1. Upload Datasets</h2>
              <div className="pl-12">
                <p className="text-gray-600 mb-2">
                  You can upload datasets from your local machine, choose from
                  provided libraries, or create a custom dataset from scratch.
                </p>
                <ul className="list-disc list-inside text-gray-600 mb-4">
                  <li>
                    <span className="font-semibold">Local File:</span> Upload a
                    file directly from your device.
                  </li>
                  <li>
                    <span className="font-semibold">External Datasets:</span>{" "}
                    Choose from available libraries.
                  </li>
                  <li>
                    <span className="font-semibold">Custom Dataset:</span>{" "}
                    Create a dataset by defining rows, columns, and inputting
                    data manually.
                  </li>
                </ul>
                <img
                  src="/p2.png"
                  className="max-w-full object-cover h-[30rem] rounded-md shadow"
                />
              </div>
            </section>

            {/* Section: View and Manage Datasets */}
            <section className="mb-12">
              <h2 className="font-semibold text-xl mb-3">
                2. View and Manage Datasets
              </h2>
              <div className="pl-12">
                <p className="text-gray-600 mb-2">
                  After uploading, you can view a list of your datasets. For
                  each dataset, you can:
                </p>
                <ul className="list-disc list-inside text-gray-600 mb-4">
                  <li>
                    Click on a dataset to explore its details and perform
                    actions.
                  </li>
                  <li>Delete a dataset that you no longer need.</li>
                </ul>
                <img
                  src="/p3.png"
                  className="max-w-full object-cover h-[30rem] rounded-md shadow"
                />
              </div>
            </section>

            {/* Section: Dataset Page */}
            <section className="mb-12">
              <h2 className="font-semibold text-xl mb-3">3. Dataset Page</h2>
              <p className="text-gray-600 mb-4 pl-12">
                Once you click on a dataset, you’ll be redirected to its
                dedicated page. This page is divided into three sections:
              </p>

              {/* Subsection: Data Explorer */}
              <div className="mb-10 pl-12">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  Data Explorer
                </h3>
                <div className="pl-12">
                  <p className="text-gray-600 mb-2">
                    View both the original and preprocessed versions of your
                    dataset. You can:
                  </p>
                  <ul className="list-disc list-inside text-gray-600 mb-4">
                    <li>Download the datasets as files.</li>
                    <li>View analysis results for better insights.</li>
                  </ul>
                  <img
                    src="/p4.png"
                    className="max-w-full object-cover h-[30rem] rounded-md shadow"
                  />
                </div>
              </div>

              {/* Subsection: Modeling */}
              <div className="mb-10 pl-12">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  Modeling
                </h3>
                <div className="pl-12">
                  <p className="text-gray-600 mb-2">
                    Select a machine learning model and train it on the
                    preprocessed dataset. Once training is complete, you can:
                  </p>
                  <ul className="list-disc list-inside text-gray-600 mb-4">
                    <li>
                      Download a PDF report containing model performance
                      metrics.
                    </li>
                    <li>Fine-tune model parameters for better results.</li>
                  </ul>
                  <img
                    src="/p5.png"
                    className="max-w-full object-cover h-[30rem] rounded-md shadow"
                  />
                </div>
              </div>

              {/* Subsection: Visualization */}
              <div className="mb-10 pl-12">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  Visualization
                </h3>
                <div className="pl-12">
                  <p className="text-gray-600 mb-2">
                    Visualize your dataset's features using 2D or 3D charts.
                    Choose libraries like Matplotlib or Seaborn and:
                  </p>
                  <ul className="list-disc list-inside text-gray-600 mb-4">
                    <li>Generate visualizations for in-depth insights.</li>
                    <li>Download the charts as image files for sharing.</li>
                  </ul>
                  <img
                    src="/p6.png"
                    className="max-w-full object-cover h-[30rem] rounded-md shadow"
                  />
                </div>
              </div>
            </section>

            {/* Section: Manage Account */}
            <section className="mb-12">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">
                4. Manage Account
              </h2>
              <div className="pl-12">
                <p className="text-gray-600 mb-2">
                  Update your account information to keep your profile secure.
                  You can:
                </p>
                <ul className="list-disc list-inside text-gray-600 mb-4">
                  <li>Change your username.</li>
                  <li>Update your password.</li>
                </ul>
                <img
                  src="/p7.png"
                  className="max-w-full object-cover h-[30rem] rounded-md shadow"
                />
              </div>
            </section>
          </div>
        </section>

        {/* Part 2: Models Explanation */}
        <section>
          <h2 className="text-xl font-bold mb-8 text-gray-800 flex items-center gap-x-2">
            <HiOutlineBars3BottomLeft strokeWidth={2.75} />
            <span>Part 2: Models Explanation</span>
          </h2>

          <div className="pl-12">
            {/* Regression Models */}
            <section className="mb-12">
              <h3 className="font-semibold text-lg mb-3 text-gray-700">
                Regression Models
              </h3>
              <div className="pl-12">
                <ul className="list-disc list-inside text-gray-600 mb-4">
                  <li>
                    <strong>K-Nearest Neighbors Regressor:</strong> Predicts the
                    value of a point by averaging the values of its nearest
                    neighbors.
                  </li>
                  <li>
                    <strong>Random Forest Regressor:</strong> Uses multiple
                    decision trees to improve prediction accuracy.
                  </li>
                  <li>
                    <strong>Support Vector Regressor (SVR):</strong> Fits a line
                    or hyperplane to the data with maximum margin.
                  </li>
                  <li>
                    <strong>Linear Regression:</strong> Models the relationship
                    between a dependent variable and one or more independent
                    variables.
                  </li>
                  <li>
                    <strong>Decision Tree Regressor:</strong> Splits the data
                    into smaller subsets to make predictions.
                  </li>
                  <li>
                    <strong>Mlp Regressor:</strong> A neural network-based model
                    for regression tasks.
                  </li>
                </ul>
              </div>
            </section>

            {/* Classification Models */}
            <section className="mb-12">
              <h3 className="font-semibold text-lg mb-3 text-gray-700">
                Classification Models
              </h3>
              <div className="pl-12">
                <ul className="list-disc list-inside text-gray-600 mb-4">
                  <li>
                    <strong>K-Nearest Neighbors Classifier:</strong> Classifies
                    data points based on their nearest neighbors.
                  </li>
                  <li>
                    <strong>Random Forest Classifier:</strong> Combines multiple
                    decision trees to enhance classification performance.
                  </li>
                  <li>
                    <strong>Support Vector Classifier (SVC):</strong> Finds a
                    hyperplane that best separates different classes in the
                    data.
                  </li>
                  <li>
                    <strong>Logistic Regression:</strong> Models the probability
                    of a binary outcome using a logistic function.
                  </li>
                  <li>
                    <strong>Gaussian Naive Bayes:</strong> Assumes features
                    follow a Gaussian distribution and applies Bayes' theorem.
                  </li>
                  <li>
                    <strong>Bernoulli Naive Bayes:</strong> Ideal for
                    binary/Boolean feature data.
                  </li>
                  <li>
                    <strong>Multinomial Naive Bayes:</strong> Suitable for text
                    data classification.
                  </li>
                  <li>
                    <strong>Decision Tree Classifier:</strong> Uses a tree-like
                    structure to make decisions.
                  </li>
                  <li>
                    <strong>Mlp Classifier:</strong> A neural network model for
                    classification tasks.
                  </li>
                </ul>
              </div>
            </section>

            {/* Clustering Models */}
            <section className="mb-12">
              <h3 className="font-semibold text-lg mb-3 text-gray-700">
                Clustering Models
              </h3>
              <div className="pl-12">
                <ul className="list-disc list-inside text-gray-600 mb-4">
                  <li>
                    <strong>K-Means:</strong> Partitions the data into clusters
                    based on feature similarity and minimizes variance within
                    clusters.
                  </li>
                </ul>
              </div>
            </section>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Documentation

// const Documentation = () => {
//   return (
//     <div className=" px-6 py-12 mb-24">
//       {/* Page Header */}
//       <h1 className="font-bold text-2xl mb-8 text-gray-800">Documentation</h1>
//       <div className="space-y-20">
//         {/* Section: Upload Datasets */}
//         <section className="">
//           <h2 className="font-semibold text-xl mb-3">1. Upload Datasets</h2>
//           <div className="pl-12">
//             <p className="text-gray-600 mb-2">
//               You can upload datasets from your local machine, choose from
//               provided libraries, or create a custom dataset from scratch.
//             </p>
//             <ul className="list-disc list-inside text-gray-600 mb-4">
//               <li>
//                 <span className="font-semibold">Local File:</span> Upload a file
//                 directly from your device.
//               </li>
//               <li>
//                 <span className="font-semibold">External Datasets:</span> Choose
//                 from available libraries.
//               </li>
//               <li>
//                 <span className="font-semibold">Custom Dataset:</span> Create a
//                 dataset by defining rows, columns, and inputting data manually.
//               </li>
//             </ul>
//             <img
//               src="/p2.png"
//               className="max-w-full object-cover h-[30rem] rounded-md shadow"
//             />
//           </div>
//         </section>
//         {/* Section 2: View and Manage Datasets */}
//         <section className="mb-12">
//           <h2 className="font-semibold text-xl mb-3">
//             2. View and Manage Datasets
//           </h2>
//           <div className="pl-12">
//             <p className="text-gray-600 mb-2">
//               After uploading, you can view a list of your datasets. For each
//               dataset, you can:
//             </p>
//             <ul className="list-disc list-inside text-gray-600 mb-4">
//               <li>
//                 Click on a dataset to explore its details and perform actions.
//               </li>
//               <li>Delete a dataset that you no longer need.</li>
//             </ul>
//             <img
//               src="/p3.png"
//               className="max-w-full object-cover h-[30rem] rounded-md shadow"
//             />
//           </div>
//         </section>
//         {/* New */}
//         <section className="mb-12">
//           <h2 className="font-semibold text-xl mb-3">3. Dataset Page</h2>
//           <p className="text-gray-600 mb-4 pl-12">
//             Once you click on a dataset, you’ll be redirected to its dedicated
//             page. This page is divided into three sections:
//           </p>

//           {/* Subsection: Data Explorer */}
//           <div className="mb-10 pl-12">
//             <h3 className="text-lg font-semibold text-gray-700 mb-2">
//               Data Explorer
//             </h3>
//             <div className="pl-12">
//               <p className="text-gray-600 mb-2">
//                 View both the original and preprocessed versions of your
//                 dataset. You can:
//               </p>
//               <ul className="list-disc list-inside text-gray-600 mb-4">
//                 <li>Download the datasets as files.</li>
//                 <li>View analysis results for better insights.</li>
//               </ul>
//               <img
//                 src="/p4.png"
//                 className="max-w-full object-cover h-[30rem] rounded-md shadow"
//               />
//             </div>
//           </div>

//           {/* Subsection: Modeling */}
//           <div className="mb-10 pl-12">
//             <h3 className="text-lg font-semibold text-gray-700 mb-2">
//               Modeling
//             </h3>
//             <div className="pl-12">
//               <p className="text-gray-600 mb-2">
//                 Select a machine learning model and train it on the preprocessed
//                 dataset. Once training is complete, you can:
//               </p>
//               <ul className="list-disc list-inside text-gray-600 mb-4">
//                 <li>
//                   Download a PDF report containing model performance metrics.
//                 </li>
//                 <li>Fine-tune model parameters for better results.</li>
//               </ul>
//               <img
//                 src="/p5.png"
//                 className="max-w-full object-cover h-[30rem] rounded-md shadow"
//               />
//             </div>
//           </div>

//           {/* Subsection: Visualization */}
//           <div className="mb-10 pl-12">
//             <h3 className="text-lg font-semibold text-gray-700 mb-2">
//               Visualization
//             </h3>
//             <div className="pl-12">
//               <p className="text-gray-600 mb-2">
//                 Visualize your dataset's features using 2D or 3D charts. Choose
//                 libraries like Matplotlib or Seaborn and:
//               </p>
//               <ul className="list-disc list-inside text-gray-600 mb-4">
//                 <li>Generate visualizations for in-depth insights.</li>
//                 <li>Download the charts as image files for sharing.</li>
//               </ul>
//               <img
//                 src="/p6.png"
//                 className="max-w-full object-cover h-[30rem] rounded-md shadow"
//               />
//             </div>
//           </div>
//         </section>
//         {/* New END */}

//         {/* Section: Manage Account */}
//         <section className="mb-12">
//           <h2 className="text-xl font-semibold text-gray-700 mb-4">
//             4. Manage Account
//           </h2>
//           <div className="pl-12">
//             <p className="text-gray-600 mb-2">
//               Update your account information to keep your profile secure. You
//               can:
//             </p>
//             <ul className="list-disc list-inside text-gray-600 mb-4">
//               <li>Change your username.</li>
//               <li>Update your password.</li>
//             </ul>
//             <img
//               src="/p7.png"
//               className="max-w-full object-cover h-[30rem] rounded-md shadow"
//             />
//           </div>
//         </section>
//       </div>
//     </div>
//   )
// }

// export default Documentation
