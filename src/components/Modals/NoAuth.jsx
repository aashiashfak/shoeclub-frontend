import { X } from "lucide-react";

const NoAuth = ({onClose}) => {
  console.log("noAuth modal ");
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 transition-opacity duration-300"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-2xl shadow-lg w-[90%] max-w-md relative flex flex-col items-center transition-transform scale-100 opacity-100"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-2 text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>
        <div>Please login to continue...</div>
      </div>
    </div>
  );
};

export default NoAuth