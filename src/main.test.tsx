import React from "react";
import * as ReactDOM from "react-dom/client";

import { act, render, screen } from "@application/utils/test-utils";

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
  ReactQueryDevtools: () => <div>Devtools</div>,
}));

vi.mock("@presentation/App", () => ({
  default: () => <div>App</div>,
}));

vi.mock("./reportWebVitals", () => ({
  default: vi.fn(),
}));

describe("main.tsx", () => {
  let originalEnv: NodeJS.ProcessEnv;

  const setup = async () => {
    render(<div id="root" />);

    await act(async () => {
      await import("./main");
    });
  };

  beforeEach(() => {
    originalEnv = { ...process.env };

    vi.clearAllMocks();

    document.body.innerHTML = "";
  });

  afterEach(() => {
    process.env = originalEnv;
    vi.clearAllMocks();
  });

  it("should render the application and devtools and calls reportWebVitals when the development mode is on", async () => {
    process.env.NODE_ENV = "development";

    await setup();

    expect(screen.getByText("App")).toBeInTheDocument();
    expect(screen.getByText("Devtools")).toBeInTheDocument();

    const webVitalsMock = vi.mocked(reportWebVitals);
    expect(webVitalsMock).toHaveBeenCalledTimes(1);
  });

  it.skip("should not render ReactQueryDevtools when the production mode is on", async () => {
    process.env.NODE_ENV = "production";

    await setup();

    expect(screen.getByText("App")).toBeInTheDocument();
    expect(screen.queryByText("Devtools")).not.toBeInTheDocument();

    const webVitalsMock = vi.mocked(reportWebVitals);
    expect(webVitalsMock).toHaveBeenCalledTimes(1);
  });
});
