import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import Popup from "~/components/createBaseUI";


export default function Home() {
  const session = useSession()
  const user = session.data?.user

  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };


  return (
    <div className="flex min-h-screen justify-center items-center">
      <div className="flex flex-col space-y-4 justify-center items-center">
        <h1 className="text-3xl">Air Table Clone</h1>

        {user != null && (
          <button onClick={togglePopup} className="border p-4 text-xl">
              Create Base
          </button>

        )}

        {user != null && (
          <Link href="/base">
            <button className="border p-2 text-xl">Test Base</button>
          </Link>
        )}

        {showPopup && (
          <Popup onClose={togglePopup}/>
        )}
        
        {user == null ? (
          <button onClick={() => void signIn()}className="border p-2 text-xl">Login</button>
          ):(
              <button onClick={() => void signOut()} className="border p-2 text-xl">Log Out</button>
          )
        }
        
      </div>

    </div>
  );
}
