import React, {useState, useEffect} from "react";
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from "yup";
import {useNavigate} from "react-router-dom";
import FormActionButtons from "../Buttons/FormActionButtons";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";

const SizeForm = ({initialValues, onSubmit, isEditMode, isLoading}) => {
  const navigate = useNavigate();
  const [hasChanges, setHasChanges] = useState(false);

  const validationSchema = Yup.object().shape({
    size: Yup.string()
      .max(8, "Size cannot be longer than 8 characters")
      .required("Size is required"),
    quantity: Yup.number()
      .min(0, "Quantity cannot be negative")
      .max(999, "Quantity cannot exceed 999")
      .required("Quantity is required"),
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
            values.size !== initialValues.size ||
            values.quantity !== initialValues.quantity;

          setHasChanges(isChanged);
        }, [values, initialValues]);

        return (
          <Form className="space-y-4">
            {/* Size Input */}
            <div>
              <Label htmlFor="size">Size</Label>
              <Input
                type="text"
                name="size"
                id="size"
                value={values.size}
                onChange={handleChange}
                placeholder="Enter size"
              />
              <ErrorMessage
                name="size"
                component="p"
                className="text-red-500 text-xs"
              />
            </div>

            {/* Quantity Input */}
            <div>
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                type="number"
                name="quantity"
                id="quantity"
                value={values.quantity}
                onChange={handleChange}
                placeholder="Enter quantity"
              />
              <ErrorMessage
                name="quantity"
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

export default SizeForm;
