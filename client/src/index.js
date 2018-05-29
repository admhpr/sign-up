import React from "react";
import ReactDOM from "react-dom";

const title = "Basic React Set Up";

ReactDOM.render(<div>{title}</div>, document.getElementById("app"));

module.hot.accept();
