import * as React from "react";
import { Form, IFields, isEmail, required } from "./common/form";
import { Field } from "./common/field";

export const Register: React.FunctionComponent = () => {
  const fields: IFields = {
    username: {
      id: "username",
      label: "Username",
      validation: { rule: isEmail },
    },
    password: {
      id: "password",
      label: "Password",
      type: "password",
      validation: { rule: required },
    },
    name: { id: "name", label: "Name", validation: { rule: required } },
  };

  return (
    <Form
      action="http://localhost:4351/api/contactus"
      fields={fields}
      submitLabel="Register"
      render={() => (
        <React.Fragment>
          <Field {...fields.username} />
          <Field {...fields.password} />
          <Field {...fields.name} />
        </React.Fragment>
      )}
    />
  );
};