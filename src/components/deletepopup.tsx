import React from 'react';

interface PopupProps {
  isVisible: boolean;
  onClose: () => void;
  deleteBase: () => void;
}

const DeletePopup: React.FC<PopupProps> = ({ isVisible, onClose, deleteBase}) => {
  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-20 flex justify-center items-center z-50"
    >
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-xl mb-4">Are you sure you want to delete this base?</h2>
        <div className='flex justify-between'>
            <button
            className="border border-2  px-4 py-2"
            onClick={onClose}
            >
            Close
            </button>
            <button
            className="border border-2 text-red-500 px-4 py-2"
            onClick={() => {deleteBase(), onClose()}}
            >
            Delete
            </button>
        </div>
      </div>
    </div>
  );
};

export default DeletePopup;