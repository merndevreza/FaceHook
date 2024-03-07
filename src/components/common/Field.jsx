import React, { useId } from "react";

const Field = ({ label, children, htmlFor, error }) => {
  const generatedId = useId();
  let id;
  try {
    id = htmlFor || getChildId(children);
  } catch (error) {
    console.error("Error in Field:", error);
    id = generatedId;
  }
  return (
    <div className="form-control">
      {label && (
        <label className="auth-label" htmlFor={id}>
          {label}
        </label>
      )}
      {children}
      {!!error && (
        <div role="alert" className="text-red-600">
          {error.message}
        </div>
      )}
    </div>
  );
};
const getChildId = (children) => {
  // ensure only one child passed to the Field component. If more than one child is passed, an error will be occurred.
  const child = React.Children.only(children);
  if ("id" in child.props) {
    return child.props.id;
  } else {
    throw new Error("Child component must have an id prop.");
  }
};
export default Field;
