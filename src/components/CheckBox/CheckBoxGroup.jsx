import SideBarDropdown from "../Dropdown/SidebarDropdown";
const CheckboxGroup = ({
  title,
  items,
  selectedItems,
  handleCheckboxChange,
  clearState,
}) => {
  return (
    <SideBarDropdown title={title}>
      <div>
        <div className="mt-2 flex flex-wrap">
          {items?.map((item) => (
            <div
              key={item.id}
              className="flex items-center space-x-2 py-1 mr-2"
            >
              <input
                type="checkbox"
                id={item.name}
                checked={selectedItems.includes(item.name)}
                onChange={() => handleCheckboxChange(item.name)}
                className="h-4 w-4"
              />
              <label htmlFor={item.name} className="text-sm">
                {item.name}
              </label>
            </div>
          ))}
        </div>
        <div className="flex justify-end ">
          <button
            className="opacity-50 hover:opacity-100 transition duration-100"
            onClick={clearState}
          >
            clear
          </button>
        </div>
      </div>
    </SideBarDropdown>
  );
};

export default CheckboxGroup;
