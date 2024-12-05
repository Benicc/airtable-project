import { ColumnDef } from "@tanstack/react-table";
import React, { useState } from "react";
import { api } from '~/utils/api';
import { v4 as uuidv4 } from 'uuid';

interface PopupProps {
  onClose: () => void;
}


  
  //column initial accessor keys
  const NameKey = String(uuidv4())
  const NotesKey = String(uuidv4())
  const AssigneeKey = String(uuidv4())
  const StatusKey = String(uuidv4())

  const initialData: Record<string, string>[] = [
    { uid: String(uuidv4()), [NameKey]: "test", [NotesKey]:"test", [AssigneeKey]:"test", [StatusKey]:"test"},
    { uid: String(uuidv4()), [NameKey]: "test", [NotesKey]:"test", [AssigneeKey]:"test", [StatusKey]:"test" },
    { uid: String(uuidv4()), [NameKey]: "test", [NotesKey]:"test", [AssigneeKey]:"test", [StatusKey]:"test" },
    { uid: String(uuidv4()), [NameKey]: "test", [NotesKey]:"test", [AssigneeKey]:"test", [StatusKey]:"test" },
    { uid: String(uuidv4()), [NameKey]: "test", [NotesKey]:"test", [AssigneeKey]:"test", [StatusKey]:"test" },
  ];
  
  
  const columnType: Record<string, string> = {
    [NameKey]:"string", 
    [NotesKey]:"string",
    [AssigneeKey]:"string",
    [StatusKey]:"string"
  }
  
  //fix for commit
  const columnData: ColumnDef<Record<string, string>>[] = [
    {
      accessorKey: 'uid',
      header: '',
    },
    {
      accessorKey: NameKey,
      header: 'test',
    },
    {
      accessorKey: NotesKey,
      header: 'test',
    },
    {
      accessorKey: AssigneeKey,
      header: 'test',
    },
    {
      accessorKey: StatusKey,
      header: 'test',
    },
  ];


const Popup: React.FC<PopupProps> = ({ onClose }) => {
  const [baseName, setBaseName] = useState('');

  // // Use the mutation to create a new base
  const createBaseMutation = api.base.createBase.useMutation({
    onSuccess: newBase => {
      console.log("success");
    },
  });

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  const handleCreateBase = async () => {

    const defaultData = {rows: initialData, cols: columnData, types: columnType};

    console.log(defaultData)

    createBaseMutation.mutate({
      baseData: defaultData,
      baseName,
    });

    onClose()
    await delay(5000);

    //window.location.reload()
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

