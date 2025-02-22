import React, {useState, useEffect} from "react";
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from "yup";
import {useNavigate} from "react-router-dom";
import FormActionButtons from "../Buttons/FormActionButtons";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";

const CategoryForm = ({initialValues, onSubmit, isEditMode, isLoading}) => {
  const navigate = useNavigate();
  const [hasChanges, setHasChanges] = useState(false);

  console.log("initialValues is here---------", initialValues)

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .max(8, "Size cannot be longer than 8 characters")
      .required("Size is required"),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, {setErrors}) => onSubmit(values, {setErrors})}
      enableReinitialize={false}
    >
      {({values, handleChange}) => {
        useEffect(() => {
                  // Check if the form values have changed from initial values
                  const isChanged =
                    values.name !== initialValues.name
                  setHasChanges(isChanged);
                }, [values, initialValues]);
        return (
          <Form className="space-y-4">
            {/* Name Input */}
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                type="text"
                name="name"
                id="name"
                value={values.name}
                onChange={handleChange}
                placeholder="Enter name"
              />
              <ErrorMessage
                name="name"
                component="p"
                className="text-red-500 text-xs"
              />
            </div>

            {/* Buttons */}
            <FormActionButtons
              isLoading={isLoading}
              isEditMode={isEditMode}
              hasChanges={hasChanges}
              onCancel={() => navigate(-1)}
            />
          </Form>
        );
      }}
    </Formik>
  );
};

export default CategoryForm;
