import React from "react";
import {X, Trash} from "lucide-react";
import {Button} from "../ui/button";

const DeleteModal = ({isOpen, onClose, onConfirm, name, isLoading}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 transition-opacity duration-300"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-2xl shadow-lg w-[90%] max-w-md relative flex flex-col items-center transition-transform scale-100 opacity-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-2 text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>

        {/* Trash Icon */}
        <div className="p-4 bg-red-100 rounded-full">
          <Trash size={32} className="text-red-500" />
        </div>

        {/* Delete Message */}
        <h2 className="text-lg font-semibold mt-4 text-center">
          Are you sure you want to delete{" "}
          <span className="font-bold text-red-600">{name || "this item"}?</span>
        </h2>

        <p className="text-gray-500 text-sm mt-2 flex items-center gap-1">
          ⚠️ This action <b>cannot</b> be undone.
        </p>

        {/* Buttons */}
        <div className="mt-5 flex gap-3">
          <Button variant="destructive" disabled={isLoading} onClick={onConfirm}>
            {isLoading ? "Deleting..." : "Yes, Delete"}
          </Button>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
