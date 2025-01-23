import React from "react";
export default function Field({ label, children, htmlFor, error }) {
  const id = htmlFor || getChildId(children);
  return (
    <div className="pb-5 form-contol">
      {label && (
        <label htmlFor={id} className="auth-label">
          {label}
        </label>
      )}
      {children}
      {!!error && (
        <div className="text-red-600" role="alert">
          {error.message}
        </div>
      )}
    </div>
  );
}

const getChildId = (children) => {
    const child = React.Children.only(children);
    if("id" in child?.props){
        return child.props.id;
    }
};
