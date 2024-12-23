const steps = [
  "Dropping Duplicates",
  "Handling Missing Values",
  "Encoding",
  "Removing Outliers",
  "Balancing Classes (for classification)",
  "Splitting Data",
  "Scaling",
  "Feature Selection",
  "Dimensionality Reduction"
]
const PreprocessingMenu = () => {
  return (
    <ul className="bg-slate-100 shadow-inner h-full ">
      {steps.map((step) => (
        <li key={step}>{step}</li>
      ))}
    </ul>
  )
}

export default PreprocessingMenu
