import React, { useState } from "react";
import { api } from '~/utils/api';

interface PopupProps {
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ onClose }) => {
  const [baseName, setBaseName] = useState('');

  // Use the mutation to create a new base
  const createBaseMutation = api.base.createBase.useMutation({
    onSuccess: newBase => {
      console.log(newBase);
    },
  });



  const handleCreateBase = () => {

    createBaseMutation.mutate({
      data: [{}],
      baseName,
    });
  }



  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
      <div className="flex flex-col justify-between h-[300px] bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl"> Create New Base</h1>

        <input 
          type="text" 
          className="border border-gray-300 rounded-md p-2 w-full" 
          placeholder="Enter base name"
          value={baseName}
          onChange={(e) => setBaseName(e.target.value)}
        />


        <div className="flex justify-between items-center w-[550px]">
            <button onClick={onClose} className="border p-2 text-xl">Cancel</button>
            <button onClick={handleCreateBase} className="border p-2 text-xl">Create</button>
        </div>
      </div>
    </div>
  );
};

export default Popup;