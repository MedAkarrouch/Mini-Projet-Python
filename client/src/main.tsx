import ReactDOM from "react-dom/client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools/production"
import { Toaster } from "react-hot-toast"

import "./index.css"
import App from "./App.tsx"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 7200000,
      retry: 1
    }
  }
})

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <QueryClientProvider client={queryClient}>
    <Toaster
      gutter={15}
      containerStyle={{ margin: "0", zIndex: "100000" }}
      toastOptions={{
        success: {
          duration: 3000
        },
        error: {
          duration: 5000
        },
        style: {
          fontFamily: "inherit",
          fontWeight: 500,
          // fontSize: "1.4rem",
          // padding: "1.6rem 2.4rem",
          padding: "1.6rem 1.4rem",
          maxWidth: "50rem",
          color: "#6b7280",
          minWidth: "20rem"
        }
      }}
    />
    {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    <App />
  </QueryClientProvider>
  // </React.StrictMode>
)
