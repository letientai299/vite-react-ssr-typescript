import ReactDOMServer from "react-dom/server";
import type { Request, Response } from "express";
import App from "./src/App";
import Html from "./src/Html";

export function render(req: Request, res: Response, bootstrap: string) {
  const { pipe } = ReactDOMServer.renderToPipeableStream(
    <Html>
      <App />
    </Html>,
    {
      onShellReady() {
        res.statusCode = 200;
        res.setHeader("content-type", "text/html");
        pipe(res);
      },
      bootstrapModules: [bootstrap],
    }
  );
}
