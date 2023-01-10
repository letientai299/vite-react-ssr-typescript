import { Link, useRoute } from "wouter";
import "./Nav.css";

export default Nav;

export interface Route {
  name: string;
  href: string;
}

export interface NavProps {
  routes: Route[];
}

function Nav({ routes }: NavProps) {
  return <nav className="navbar">{routes.map(makeLink)}</nav>;
}

function makeLink(r: Route) {
  const [isActive] = useRoute(r.href);
  const cls = "navlink " + (isActive ? "active" : "");

  return (
    <Link href={r.href} key={r.href} className={cls}>
      {r.name}
    </Link>
  );
}
