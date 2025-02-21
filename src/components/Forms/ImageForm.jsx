import React, {useState, useEffect} from "react";
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from "yup";
import {useNavigate} from "react-router-dom";
import FormActionButtons from "../Buttons/FormActionButtons";

const ImageForm = ({initialValues, onSubmit, onDelete, isEditMode}) => {
  const navigate = useNavigate();
  const [preview, setPreview] = useState(initialValues.image || "");
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    if (typeof initialValues.image === "string") {
      setPreview(initialValues.image); // Set existing image URL for edit mode
    }
  }, [initialValues.image]);

  const validationSchema = Yup.object().shape({
    image: Yup.mixed().required("Image is required"),
    is_main: Yup.boolean(),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({setFieldValue, values}) => {
        useEffect(() => {
          // Check if the form values have changed from initial values
          const isChanged =
            values.image !== initialValues.image ||
            values.is_main !== initialValues.is_main;

          setHasChanges(isChanged);
        }, [values, initialValues]);

        return (
          <Form className="space-y-4">
            {/* Image Upload Field */}
            <div>
              <label className="block font-medium">Upload Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(event) => {
                  const file = event.currentTarget.files[0];
                  setFieldValue("image", file);
                  if (file) {
                    setPreview(URL.createObjectURL(file)); // Set preview for new uploaded file
                  }
                }}
                className="border rounded p-2 w-full"
              />
              <ErrorMessage
                name="image"
                component="p"
                className="text-red-500 text-xs"
              />
            </div>

            {/* Preview Uploaded Image */}
            {preview && (
              <div className="relative">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-40 h-40 object-cover mt-2"
                />
              </div>
            )}

            {/* Main Image Checkbox */}
            <div className="flex items-center">
              <Field type="checkbox" name="is_main" className="mr-2" />
              <label>Set as Main Image</label>
            </div>

            {/* Buttons */}
            <FormActionButtons
              isEditMode={isEditMode} 
              hasChanges={hasChanges}
              onSave={onSubmit}
              onCancel={() => navigate(-1)} 
              onDelete={onDelete}
            />
          </Form>
        );
      }}
    </Formik>
  );
};

export default ImageForm;
