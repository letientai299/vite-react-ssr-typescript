import ReactDOMServer from "react-dom/server";
import type { Request, Response } from "express";
import App from "./src/App";
import Html from "./src/Html";
import { Router } from "wouter";
import staticLocationHook from "wouter/static-location";

export function render(
  req: Request,
  res: Response,
  entryClient: string,
  entryCss?: string
) {
  const url = req.originalUrl;

  const { pipe } = ReactDOMServer.renderToPipeableStream(
    <Html cssPath={entryCss}>
      <Router hook={staticLocationHook(url)}>
        <App />
      </Router>
    </Html>,
    {
      onShellReady() {
        res.statusCode = 200;
        res.setHeader("content-type", "text/html");
        pipe(res);
      },
      bootstrapModules: [entryClient],
    }
  );
}
