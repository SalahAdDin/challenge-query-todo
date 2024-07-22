import React from "react";
import ReactDOM from "react-dom/client";

// import router from "@presentation/router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./index.css";

import App from "@presentation/App";

import reportWebVitals from "./reportWebVitals";

const queryClient = new QueryClient();

const QueryDevtools =  process.env.NODE_ENV === "production"
    ? () => null
    : React.lazy(() => import("@tanstack/react-query-devtools").then((res) => ({
          default: res.ReactQueryDevtools,
        })));

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      {/* <RouterProvider router={router} />
              <RouterDevtools
                initialIsOpen={false}
                router={router}
                position="bottom-right"
              /> */}
      <QueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);

reportWebVitals();
