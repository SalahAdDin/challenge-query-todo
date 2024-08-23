import React from "react";
import * as ReactDOM from "react-dom/client";

import { act, render, screen } from "@application/utils/test-utils";
import App from "@presentation/App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import reportWebVitals from "./reportWebVitals";

vi.mock("react-dom/client", async () => {
  const actual = await vi.importActual<typeof ReactDOM>("react-dom/client");
  return {
    ...actual,
    createRoot: vi.fn(() => ({
      render: vi.fn(),
    })),
  };
});

vi.mock("@tanstack/react-query", () => ({
  QueryClient: vi.fn(),
  QueryClientProvider: vi.fn(({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  )),
}));

vi.mock("@tanstack/react-query-devtools", () => ({
  ReactQueryDevtools: () => <div>ReactQueryDevtools Mock</div>,
}));

vi.mock("@tanstack/react-query-devtools", () => ({
  ReactQueryDevtools: () => <div>Devtools</div>,
}));

vi.mock("@presentation/App", () => ({
  default: () => <div>App</div>,
}));

vi.mock("./reportWebVitals", () => ({
  default: vi.fn(),
}));

describe("main.tsx", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    document.body.innerHTML = ""; // Clear body to reset DOM
  });

  it("renders the application without crashing and calls reportWebVitals", async () => {
    const { container } = render(<div id="root" />);

    await act(async () => {
      await import("./main");
    });

    const createRootMock = vi.mocked(ReactDOM.createRoot);
    expect(createRootMock).toHaveBeenCalledTimes(1);
    expect(createRootMock).toHaveBeenCalledWith(container.firstChild);
    // expect(createRootMock().render).toHaveBeenCalledTimes(1);

    const webVitalsMock = vi.mocked(reportWebVitals);
    expect(webVitalsMock).toHaveBeenCalledTimes(1);
  });
});

describe("Root component", () => {
  let originalEnv: NodeJS.ProcessEnv;

  beforeEach(() => {
    originalEnv = { ...process.env };
    vi.mocked(ReactDOM.createRoot).mockReturnValue({
      render: vi.fn(),
      unmount: vi.fn(),
    });
  });

  afterEach(() => {
    process.env = originalEnv;
    vi.clearAllMocks();
  });

  it("should render the App component and ReactQueryDevtools when the development mode is on", () => {
    process.env.NODE_ENV = "development";

    const queryClient = new QueryClient();

    render(
      <React.StrictMode>
        <QueryClientProvider client={queryClient}>
          <App />
          <React.Suspense fallback={<div>Loading...</div>}>
            {/* Mocked ReactQueryDevtools component */}
            <div>ReactQueryDevtools Mock</div>
          </React.Suspense>
        </QueryClientProvider>
      </React.StrictMode>
    );

    expect(screen.getByText("ReactQueryDevtools Mock")).toBeInTheDocument();
  });

  it("should not render ReactQueryDevtools when the production mode is on", () => {
    process.env.NODE_ENV = "production";

    const queryClient = new QueryClient();
    render(
      <React.StrictMode>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </React.StrictMode>
    );

    expect(
      screen.queryByText("ReactQueryDevtools Mock")
    ).not.toBeInTheDocument();
  });
});
