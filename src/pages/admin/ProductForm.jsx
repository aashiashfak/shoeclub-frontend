import {useState, useEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {useFormik} from "formik";
import * as Yup from "yup";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {Button} from "@/components/ui/button";
import {Plus, Trash} from "lucide-react";
import {useQuery} from "@tanstack/react-query";
import {CategoryServices} from "@/services/categoryServices";
import {ProductServices} from "@/services/productServices";
import useToastNotification from "@/hooks/SonnerToast";
import PageHeader from "@/components/PageHeader/PageHeader";

const MAX_IMAGES = 5;
const MAX_SIZES = 5;

const ProductForm = () => {
  const location = useLocation();
  const product = location.state?.product || null;
  const isEditMode = Boolean(product);
  const showToast = useToastNotification();
  const navigate = useNavigate();

  const [isChanged, setIsChanged] = useState(false);

  const {data: categories, isLoading} = useQuery({
    queryKey: ["Categories"],
    queryFn: async () => await CategoryServices.getCategories(),
    refetchOnWindowFocus: false,
  });

  console.log(product);

  const formik = useFormik({
    initialValues: {
      name: product?.name || "",
      design_type: product?.design_type || "basic",
      description: product?.description || "",
      price: product?.price || "",
      category: product?.category || "Sneakers",
      images: product?.images || [{image: "", is_main: false}],
      sizes: product?.sizes || [{size: "", quantity: ""}],
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      design_type: Yup.string().required("Design type is required"),
      description: Yup.string().required("Description is required"),
      price: Yup.number().required("Price is required"),
      category: Yup.string().required("Category is required"),
      images: Yup.array()
        .of(
          Yup.object().shape({
            image: Yup.string().required("Image  is required"),
          })
        )
        .min(1, "At least one image is required"),
      sizes: Yup.array()
        .of(
          Yup.object().shape({
            size: Yup.string().required("Size is required"),
            quantity: Yup.number().required("Quantity is required"),
          })
        )
        .min(1, "At least one size is required"),
    }),
    onSubmit: async (values) => {
      try {
        let formData = new FormData();
        if (!isEditMode) {
          formData.append("name", values.name);
          formData.append("category", values.category);
          formData.append("description", values.description);
          formData.append("price", values.price);
          formData.append("design_type", values.design_type);

          // Append sizes
          values.sizes.forEach((size, index) => {
            formData.append(`sizes[${index}][size]`, size.size);
            formData.append(`sizes[${index}][quantity]`, size.quantity);
          });

          // Append images
          values.images.forEach((image, index) => {
            if (image.image instanceof File) {
              formData.append(`images[${index}][image]`, image.image); // Append the File object
            }
            formData.append(
              `images[${index}][is_main]`,
              index === 0 ? true : false
            );
          });

          let response;
          response = await ProductServices.createProducts(formData);
          showToast("Product created successfully", "success");
          console.log(response);
          navigate("/admin/products");
        } else {
          console.log("edit started");
          Object.keys(values).forEach((key) => {
            if (key !== "sizes" && key !== "images") {
              if (
                JSON.stringify(values[key]) !==
                JSON.stringify(formik.initialValues[key])
              ) {
                formData.append(key, values[key]);
              }
            }
          });
          let response = await ProductServices.updateProduct(
            product.id,
            formData
          );
          showToast("Product updated successfully", "success");
          console.log(response);
          navigate("/admin/products");
        }
      } catch (error) {
        console.error(error);
        showToast("Operation failed", "error");
      }
    },
  });

  useEffect(() => {
    setIsChanged(
      JSON.stringify(formik.values) !== JSON.stringify(formik.initialValues)
    );
  }, [formik.values]);

  const addImage = () => {
    if (formik.values.images.length < MAX_IMAGES) {
      formik.setFieldValue("images", [
        ...formik.values.images,
        {image_url: "", is_main: false},
      ]);
    }
  };

  const removeImage = (index) => {
    const updatedImages = formik.values.images.filter((_, i) => i !== index);
    formik.setFieldValue("images", updatedImages);
  };

  const addSize = () => {
    if (formik.values.sizes.length < MAX_SIZES) {
      formik.setFieldValue("sizes", [
        ...formik.values.sizes,
        {size: "", quantity: ""},
      ]);
    }
  };

  const removeSize = (index) => {
    const updatedSizes = formik.values.sizes.filter((_, i) => i !== index);
    formik.setFieldValue("sizes", updatedSizes);
  };

  const handleImageUpload = (event, index) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const updatedImages = [...formik.values.images];
        updatedImages[index] = {
          image: file,
          preview: e.target.result,
          is_main: false,
        };
        formik.setFieldValue("images", updatedImages);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-xl mx-auto shadow-lg my-5 p-3 rounded-lg">
      <PageHeader title={"Product"} />
      <form onSubmit={formik.handleSubmit} className="space-y-2  my-10 p-2">
        {/* name */}

        <Input
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          placeholder="Product Name"
        />
        {formik.errors.name && formik.touched.name && (
          <div className="text-red-500 text-xs ">{formik.errors.name}</div>
        )}

        {/* design type */}

        <Select
          name="design_type"
          value={formik.values.design_type}
          onValueChange={(value) => formik.setFieldValue("design_type", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Design Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="basic">Basic</SelectItem>
            <SelectItem value="basic-1">Basic-1</SelectItem>
          </SelectContent>
        </Select>
        {formik.errors.design_type && formik.touched.design_type && (
          <div className="text-red-500 text-xs">
            {formik.errors.design_type}
          </div>
        )}

        {/* descritpion */}

        <Textarea
          name="description"
          value={formik.values.description}
          onChange={formik.handleChange}
          placeholder="Description"
        />
        {formik.errors.description && formik.touched.description && (
          <div className="text-red-500 text-xs">
            {formik.errors.description}
          </div>
        )}

        {/* price */}

        <Input
          type="number"
          name="price"
          value={formik.values.price}
          onChange={formik.handleChange}
          placeholder="Price"
        />
        {formik.errors.price && formik.touched.price && (
          <div className="text-red-500 text-xs">{formik.errors.price}</div>
        )}

        {/* category */}

        <Select
          name="category"
          value={formik.values.category}
          onValueChange={(value) => formik.setFieldValue("category", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>
          <SelectContent>
            {categories?.map((category) => (
              <SelectItem key={category.id} value={category.name}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {formik.errors.category && formik.touched.category && (
          <div className="text-red-500 text-xs">{formik.errors.category}</div>
        )}

        {/* --------------- is edit mode ---------------- */}

        {!isEditMode && (
          <>
            {/* Image */}

            <div className="space-y-2">
              <h3 className="font-medium">Images</h3>
              {formik.values.images.map((image, index) => (
                <>
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, index)}
                      className="border rounded p-1 w-1/3 lg:w-auto"
                    />
                    {formik.errors.images?.[index]?.image && (
                      <div className="text-red-500 text-xs">
                        {formik.errors.images[index].image}
                      </div>
                    )}
                    <Button
                      type="button"
                      onClick={() => removeImage(index)}
                      variant="destructive"
                      size="icon"
                    >
                      <Trash size={16} />
                    </Button>
                  </div>
                  {image.preview && (
                    <img
                      src={image.preview}
                      alt={`Preview ${index}`}
                      className="w-16 h-16 object-cover rounded"
                    />
                  )}
                </>
              ))}
              {formik.errors.images &&
                typeof formik.errors.images === "string" && (
                  <div className="text-red-500 text-xs">
                    {formik.errors.images}
                  </div>
                )}
              {formik.values.images.length < MAX_IMAGES && (
                <Button type="button" onClick={addImage} variant="outline">
                  <Plus size={16} /> Add Image
                </Button>
              )}
            </div>

            {/* sizes */}

            <div className="space-y-2">
              <h3 className="font-medium">Sizes</h3>
              {formik.values.sizes.map((size, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div>
                    <Input
                      name={`sizes[${index}].size`}
                      value={size.size}
                      onChange={formik.handleChange}
                      placeholder="Size"
                      className="w-2/3 lg:w-auto"
                    />
                    {formik.errors.sizes?.[index]?.size && (
                      <div className="text-red-500 text-xs">
                        {formik.errors.sizes[index].size}
                      </div>
                    )}
                  </div>
                  <div>
                    <Input
                      type="number"
                      name={`sizes[${index}].quantity`}
                      value={size.quantity}
                      onChange={formik.handleChange}
                      placeholder="Quantity"
                      className="w-2/3 lg:w-auto "
                    />
                    {formik.errors.sizes?.[index]?.quantity && (
                      <div className="text-red-500 text-xs">
                        {formik.errors.sizes[index].quantity}
                      </div>
                    )}
                  </div>
                  <div></div>
                  <Button
                    type="button"
                    onClick={() => removeSize(index)}
                    variant="destructive"
                    size="icon"
                  >
                    <Trash size={16} />
                  </Button>
                </div>
              ))}
              {formik.errors.sizes &&
                typeof formik.errors.sizes === "string" && (
                  <div className="text-red-500 text-xs">
                    {formik.errors.sizes}
                  </div>
                )}
              {formik.values.sizes.length < MAX_SIZES && (
                <Button type="button" onClick={addSize} variant="outline">
                  <Plus size={16} /> Add Size
                </Button>
              )}
            </div>
          </>
        )}

        <Button type="submit" disabled={isEditMode && !isChanged}>
          {isEditMode ? "Update Product" : "Create Product"}
        </Button>
      </form>
    </div>
  );
};

export default ProductForm;
