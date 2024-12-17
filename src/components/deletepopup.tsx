import router from 'next/router';
import React from 'react';
import { api } from '~/utils/api';

interface PopupProps {
  isVisible: boolean;
  baseId: string;
  baseName: string;
  onClose: () => void;
}

const DeletePopup: React.FC<PopupProps> = ({ isVisible, onClose, baseId, baseName}) => {
  if (!isVisible) return null;

  const { mutate: deleteBase,  isError, isSuccess,} = api.base.deleteBase.useMutation({
    onSuccess: () => {
      // Redirect to another page after deletion (e.g., the home page)
      router.push('/'); // Replace with the path you want to redirect to
    },
    onError: (err) => {
      // Handle the error, maybe show a message
      console.error('Error deleting base:', err.message);
    },
  });

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  const handleDelete = async (baseId: string) => {
    deleteBase({ baseId });
    
    await delay(2000);
    window.location.reload()
  };


  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-20 flex justify-center items-center z-50"
    >
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-xl mb-4">Are you sure you want to delete &quot;{baseName}&quot; base?</h2>
        <div className='flex justify-between'>
            <button
            className="border border-2  px-4 py-2"
            onClick={onClose}
            >
            Close
            </button>
            <button
            className="border border-2 text-red-500 px-4 py-2"
            onClick={() => {handleDelete(baseId), onClose()}}
            >
            Delete
            </button>
        </div>
      </div>
    </div>
  );
};

export default DeletePopup;