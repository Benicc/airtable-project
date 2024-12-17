import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import router from "next/router";
import { useState } from "react";
import Popup from "~/components/createBaseUI";
import DeletePopup from "~/components/deletepopup";
import { api } from "~/utils/api";


export default function Home() {
  const session = useSession()
  const user = session.data?.user

  const [showPopup, setShowPopup] = useState(false);
  const [isDeletePopupVisible, setDeletePopupVisible] = useState(false);
  const [selectedBaseId, setSelectedBaseId] = useState<string>("");
  const [selectedBaseName, setSelectedBaseName] = useState<string>("");
  
  const handleDeletePopupToggle = (baseId: string, baseName: string) => {
    setSelectedBaseId(baseId);
    setSelectedBaseName(baseName);
    setDeletePopupVisible(!isDeletePopupVisible);
  };

  const { data: bases, isLoading, error } = api.base.getAllBaseIds.useQuery();

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  // const { mutate: deleteBase,  isError, isSuccess,} = api.base.deleteBase.useMutation({
  //   onSuccess: () => {
  //     // Redirect to another page after deletion (e.g., the home page)
  //     router.push('/'); // Replace with the path you want to redirect to
  //   },
  //   onError: (err) => {
  //     // Handle the error, maybe show a message
  //     console.error('Error deleting base:', err.message);
  //   },
  // });

  // const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  // const handleDelete = async (baseId: string) => {
  //   deleteBase({ baseId });
    
  //   await delay(2000);
  //   //window.location.reload()
  // };


  return (
    <div className="flex min-h-screen justify-center items-center bg-gray-800">
      <div className="flex flex-col space-y-4 justify-center items-center">
        <h1 className="text-3xl text-white font-bold">Air Table Clone</h1>
        <p className="text-white">Web application replicating the main features of Airtable.</p>
        {user == null ? (
          <p className="text-white">Click the button below to login using Discord.</p> 
        ) : (
          <p className="text-white">Click the button below to create a new base.</p> 
        )}
        
        {user != null && (
          <button onClick={togglePopup} className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out">
              Create Base
          </button>

        )}

        {/* {user != null && (
          <Link href="/base">
            <button className="border p-2 text-xl">Test Base</button>
          </Link>
        )} */}

        {showPopup && (
          <Popup onClose={togglePopup}/>
        )}

        {user != null && bases!= undefined && bases?.length > 0 &&(
          <div className="mt-6 flex flex-col items-center">
            <h1 className="text-xl text-white font-bold mb-4">Your Bases</h1>
            <div className="border p-10">
            {isLoading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>Error loading bases</p>
            ) : (
              <ul className="space-y-2">
                {bases?.map((base) => (
                  <li key={base.baseId} className="w-[500px]">
                    <div className="flex justify-between w-full">
                      <Link href={`/${base.baseId}`}>
                        <button className="text-white hover:underline w-full h-full">
                          {base.baseName}
                        </button>
                      </Link>
                      <button className="ml-4 p-2 text-red-500" onClick={() => {handleDeletePopupToggle(base.baseId, base.baseName)}}>
                        Delete
                      </button>
                      <DeletePopup isVisible={isDeletePopupVisible} onClose={() => {handleDeletePopupToggle(base.baseId, base.baseName)}} baseId={selectedBaseId} baseName={selectedBaseName}/>
                      {/* <button className="ml-4 border p-2 text-red-500" onClick={() => {handleDelete(base.baseId)}}>
                          delete
                      </button> */}
                    </div>
          
                  </li>
                ))}
              </ul>
            )}
            </div>
        </div>
        )}
        
        {user == null ? (
          <button onClick={() => void signIn()}className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition ease-out duration-300">Login</button>
          ):(
              <button onClick={() => void signOut()} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition ease-out duration-300">Log Out</button>
          )
        }
        
      </div>

    </div>
  );
}
