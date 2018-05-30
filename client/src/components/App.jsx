import React from "react";
import Form from "./Form";

const title = "Basic React Set Up";

function Title(props) {
  return <div>{title}</div>;
}

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Title />
        <Form />
      </div>
    );
  }
}
