import * as React from "react";
import { render } from "react-dom";
import { ColorContrast } from "./colorContrast";

function App() {
  return <ColorContrast />;
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
