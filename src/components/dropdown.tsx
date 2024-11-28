import React, { useState } from 'react';

type DropdownProps = {
  options: { label: string; onClick: (name: string) => void }[]; // Each option has a label and a function
};

const Dropdown: React.FC<DropdownProps> = ({ options }) => {
  // State to manage dropdown visibility
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [newLabel, setNewLabel] = useState<string>("");

  // Toggle the dropdown
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    setNewLabel("");
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={toggleDropdown}
        className="border bg-blue-100 w-20 text-center text-xs font-normal"
      >
        +
      </button>

      {isOpen && (
        <div className=" flex flex-col items-center absolute mt-2 w-64 bg-white border rounded-md shadow-lg">
          
          <input
            className="text-center border border-black w-40 h-8"
            placeholder="Field name (optional)"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setNewLabel(event.target.value);
            }}
          />
          <ul>
            {options.map((option, index) => (
              <li
                key={index}
                onClick={() => {
                  option.onClick(newLabel); // Call the onClick function passed with the option
                  setIsOpen(false); // Close the dropdown after selection
                }}
                className="px-4 py-2 hover:bg-gray-200 cursor-pointer text-left"
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
