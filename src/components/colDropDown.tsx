import React, { useState, useRef, useEffect } from 'react';

type DropdownProps = {
  options: { label: string; onClick: (rowId: string) => void }[]; // Each option has a label and a function
  text: string;
  colId: string;
};

const DropDowncol: React.FC<DropdownProps> = ({ options, text, colId}) => {
  // State to manage dropdown visibility
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Ref to keep track of the dropdown container
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Toggle the dropdown
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    // Handler to close dropdown when clicked outside
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    // Attach event listener
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []); // Empty dependency array ensures this effect runs only once when the component mounts

  return (
    <div className="flex justify-center" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="text-xs font-normal px-8 py-[4px]"
      >
        <div>{text}</div>
        
      </button>

      {isOpen && (
        <div className="absolute mt-8 w-48 bg-white border rounded-md shadow-lg z-10">
          <ul>
            {options.map((option, index) => (
              <li
                key={index}
                onClick={() => {
                  option.onClick(colId); // Call the onClick function passed with the option
                  setIsOpen(false); // Close the dropdown after selection
                }}
                className={`px-4 py-2 hover:bg-gray-200 cursor-pointer ${
                  index === options.length - 1 ? 'text-red-500' : '' // Apply red background and white text to the last option
                }`}
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

export default DropDowncol;
