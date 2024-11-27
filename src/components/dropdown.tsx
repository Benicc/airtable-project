import React, { useState } from 'react';

type DropdownProps = {
  options: { label: string; onClick: () => void }[]; // Each option has a label and a function
};

const Dropdown: React.FC<DropdownProps> = ({ options }) => {
  // State to manage dropdown visibility
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Toggle the dropdown
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={toggleDropdown}
        className="border bg-blue-100 w-[10px] text-center text-xs font-normal"
      >
        +
      </button>

      {isOpen && (
        <div className="absolute mt-2 w-48 bg-white border rounded-md shadow-lg">
          <ul>
            {options.map((option, index) => (
              <li
                key={index}
                onClick={() => {
                  option.onClick(); // Call the onClick function passed with the option
                  setIsOpen(false); // Close the dropdown after selection
                }}
                className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
              >
                {option.label} {/* Render the label of the option */}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
