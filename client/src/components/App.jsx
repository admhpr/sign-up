import React from "react";
import Form from "./Form";

const title = "A Simple sign up form";

function Title(props) {
  return <h3 class="title">{title}</h3>;
}

export default class App extends React.Component {
  render() {
    return (
      <section class="container">
        <Title />
        <Form />
      </section>
    );
  }
}
