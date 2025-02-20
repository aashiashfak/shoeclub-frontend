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

const Badge = ({children, className, disabled, ...props}) => {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium 
        ${
          disabled
            ? "bg-gray-300 text-gray-500 cursor-not-allowed opacity-50"
            : "bg-gray-100 text-gray-800"
        } 
        ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};

const ProductCard = ({product}) => {
  const {name, price, images, sizes, design_type} = product;

  const isBase = design_type === "basic";

  return (
    <div
      className={`group relative overflow-hidden rounded-lg shadow-md transition-all hover:shadow-lg
        ${isBase ? "bg-white text-gray-700" : "bg-gray-200 "}`} 
    >
      <div className="relative h-48 w-full">
        <img
          src={images[0]?.image || "https://via.placeholder.com/300"}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <h3 className="mb-1 text-lg font-semibold ">{name}</h3>
        <div className="mb-2 text-xl font-bold text-gray-900">
          ₹{price.toLocaleString()}
        </div>

        <div className="mb-4 min-h-[28px]">
          <div className="flex flex-wrap gap-2">
            {sizes?.map((size) => (
              <Badge key={size.size} disabled={size.quantity < 1}>
                {size.size}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Button className={`flex items-center gap-2 ${isBase ? "bg-orange-500" : "bg-blue-800"} `} >
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
