import { Route as NavRoute } from "./components/Nav/Nav";
import Nav from "./components/Nav/Nav";
import About from "./pages/About";
import Home from "./pages/Home/Home";
import { lazy, ReactNode, Suspense } from "react";
import { Route, Switch } from "wouter";

const Lazy = lazy(() => import("./pages/Lazy/Lazy"));

export default App;

type commonRoute = NavRoute & { element: ReactNode };

const routes: commonRoute[] = [
  {
    name: "Home",
    href: "/",
    element: <Home />,
  },

  {
    name: "About",
    href: "/about",
    element: <About />,
  },

  {
    name: "Lazy loaded",
    href: "/lazy",
    element: (
      <Suspense fallback={`Loading /lazy}`}>
        <Lazy />
      </Suspense>
    ),
  },
];

const makeRoute = (r: commonRoute) => {
  return (
    <Route key={r.href} path={r.href}>
      {r.element}
    </Route>
  );
};

function App() {
  return (
    <main className="App">
      <Nav routes={routes} />
      <Switch>{routes.map(makeRoute)}</Switch>
    </main>
  );
}
