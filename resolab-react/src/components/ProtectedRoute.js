import React from "react";
import { Route, Redirect } from "react-router-dom";

const renderComponent = (props) => {
  const { render, children, component, ...restProps } = props;

  let rendered = null;

  if (component) {
    rendered = React.createElement(component, { ...restProps }, children);
  }

  if (render) {
    rendered = render({ ...restProps, children });
  }

  if (typeof children === "function") {
    rendered = children(restProps);
  } else if (children) {
    rendered = children;
  } else if (!rendered) {
    throw new Error(
      "Error: must specify either a render prop, a render function as children, or a component prop."
    );
  }

  return rendered;
};

export const ProtectedRoute = (props) => {
  const isAuthorized =
    props.location.pathname == "/" || props.location.pathname == "/home";
  const { component, render, ...restProps } = props;

  return (
    <Route
      {...restProps}
      render={() => {
        if (isAuthorized) {
          return renderComponent(props);
        }

        return (
          <Redirect
            to={{ pathname: "/home", state: { from: restProps.location } }}
          />
        );
      }}
    />
  );
};
