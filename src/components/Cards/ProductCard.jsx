import {Heart, ShoppingCart} from "lucide-react";

const Button = ({children, className, variant = "primary", size, ...props}) => {
  const baseClasses = "font-semibold rounded-lg transition-colors";
  const variantClasses = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    outline:
      "bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-100",
  };
  const sizeClasses = {
    default: "px-4 py-2",
    icon: "p-2",
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${
        sizeClasses[size || "default"]
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const Badge = ({children, className, ...props}) => {
  return (
    <span
      className={`inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};

const ProductCard = ({product}) => {
  const {name, description, price, images, sizes, design_type} = product;
  console.log("design_type", design_type);

  return (
    <div className="group relative overflow-hidden rounded-lg bg-white shadow-md transition-all hover:shadow-lg">
      <div className="relative overflow-hidden h-48 w-full h-56 w-full">
        <img
          src={images[0]?.image_url || "https://via.placeholder.com/300"}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <h3 className="mb-1 text-lg font-semibold text-gray-900">{name}</h3>
        <div className="mb-2 text-xl font-bold text-gray-900">
          ₹{price.toLocaleString()}
        </div>
        {design_type === "sizes" && sizes ? (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {sizes.map((size) => (
                <Badge key={size.size}>{size.size}</Badge>
              ))}
            </div>
          </div>
        ) : (
          <div className="h-6"></div>
        )}
        <div className="flex items-center justify-between">
          <Button className="flex items-center gap-2">
            <ShoppingCart className="h-4 w-4" />
            Add to Cart
          </Button>
          <Button variant="outline" size="icon">
            <Heart className="h-4 w-4" />
            <span className="sr-only">Add to wishlist</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
