export default Lazy;

import "./Lazy.css";

function Lazy() {
  return (
    <div>
      <h1 className="title">This page is lazy loaded</h1>
      <p>Mod ID: {MOD_ID}</p>
    </div>
  );
}
