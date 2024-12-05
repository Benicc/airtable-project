import React, { useEffect, useRef, useState } from 'react';

type DropdownProps = {
  options: { label: string; onClick: (name: string) => void }[]; // Each option has a label and a function
  baseName: string;
};

const RenameDropdown: React.FC<DropdownProps> = ({ options, baseName}) => {
  // State to manage dropdown visibility
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [newLabel, setNewLabel] = useState<string>("");


  // Toggle the dropdown
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    setNewLabel("");
  };

  // Ref to keep track of the dropdown container
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
    <div className="relative inline-block text-left">
      <button
        onClick={toggleDropdown}
    >
        <div className="flex font-bold">
            {baseName === "" ? "Untitled" : baseName}
            <svg viewBox="0 0 24 26" xmlns="http://www.w3.org/2000/svg" fill="#FFFFFF" width="30" height = "30"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path fill="none" d="M0 0h24v24H0z"></path> 
                <path d="M12 15l-4.243-4.243 1.415-1.414L12 12.172l2.828-2.829 1.415 1.414z"></path> </g> </g></svg>
        </div>
      </button>

      {isOpen && (
        <div className=" flex flex-col items-center absolute mt-2 w-48 bg-white border rounded-md shadow-lg">
          
          <input
            className="text-center border border-black w-40 h-8 text-black text-xs"
            placeholder="rename"
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
                className="px-4 py-2 hover:bg-gray-200 cursor-pointer text-left text-black text-xs"
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

export default RenameDropdown;
