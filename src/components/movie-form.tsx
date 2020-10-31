import React from "react";
import {
  Form,
  IFields,
  numberBetweenOneAndTen,
  positiveNumber,
  required,
} from "./common/form";
import { Field } from "./common/field";

export const MovieForm: React.FunctionComponent = () => {
  const fields: IFields = {
    title: {
      id: "title",
      label: "Title",
      validation: { rule: required },
    },
    genre: {
      id: "genre",
      label: "Genre",
      editor: "dropdown",
      options: ["", "Action", "Comedy", "Thriller"],
      validation: { rule: required },
    },
    numberInStock: {
      id: "numberInStock",
      label: "Number in Stock",
      validation: { rule: positiveNumber },
    },
    rate: {
      id: "rate",
      label: "Rate",
      validation: { rule: numberBetweenOneAndTen },
    },
  };

  return (
    <Form
      action="http://localhost:4351/api/contactus"
      fields={fields}
      submitLabel="Save"
      render={() => (
        <React.Fragment>
          <Field {...fields.title} />
          <Field {...fields.genre} />
          <Field {...fields.numberInStock} />
          <Field {...fields.rate} />
        </React.Fragment>
      )}
    />
  );
};
