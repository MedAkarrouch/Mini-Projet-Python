import { BrowserRouter, Route, Routes } from "react-router-dom"
import AppLayout from "./ui/AppLayout"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import Landing from "./pages/Landing"
import Datasets from "./pages/Datasets"
import DataSet from "./pages/DataSet"
import Account from "./pages/Account"
import Documentation from "./pages/Documentation"
import DatasetView from "./features/Datasets/DatasetView"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route element={<AppLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/documentation" element={<Documentation />} />
          <Route path="/account" element={<Account />} />
          <Route path="/datasets" element={<Datasets />} />
          <Route path="/datasets/:datasetId" element={<DataSet />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
