import { useSession } from "next-auth/react";
import Link from "next/link";
import { ProfileImage } from "./ProfileImage";
import NavbarUtils from "./navbarutils";
import Tabs from "./tab";
import RenameDropdown from "./rename";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Navbar = () => {
    const router = useRouter();
    const {baseId} = router.query;
    const baseIdString = String(baseId)
    
    const session = useSession();


    const [baseName, setBaseName] = useState("untitled"); 

    const { data: base, isLoading, error } = api.base.getBaseById.useQuery(
        { baseId: String(baseId) },
        {
            enabled: !!baseId,
        }
    );

    
    useEffect(() => {
        if (baseIdString!= "undefined" && base != undefined && !isLoading) {
            if (!isLoading && baseId != undefined &&base != undefined && base?.baseName && baseName !== base.baseName) {
                setBaseName(base?.baseName ?? "untitled");
            }
        }
    }, [base, isLoading, baseName]);
    

    const updateBaseMutation = api.base.updateBase.useMutation();

    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
    const rename = async (baseName: string) => {
        updateBaseMutation.mutate(
            { baseId: baseIdString, baseName },
            {
            onSuccess: () => {
                console.log("Base data updated successfully.");
            },
            onError: (error) => {
                console.error("Error updating base data:", error.message);
            },
            });
        await delay(2000);

        window.location.reload()
    }

    const close = () => {
        return null;
    }

    if (session.status !== "authenticated") {
        return null;
    };

    return (
        <div>
            <div className="py-[75px]">
                <div className="fixed top-0 left-0 z-50 w-full">
                    <nav className="bg-[rgb(59,102,163)] text-white py-4">
                        <div className="flex justify-between items-center">
                            <div className="text-lg ml-4 font-light flex space-x-4 items-center">
                                <Link href="/" className="mt-1">
                                    <button>
                                        <svg viewBox="0 0 16 16" fill="none" width="20" height="20" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M1 6V15H6V11C6 9.89543 6.89543 9 8 9C9.10457 9 10 9.89543 10 11V15H15V6L8 0L1 6Z" fill="#FFFFFF"></path> </g></svg>
                                    </button>
                                </Link>
                                
                                <div className="flex justify-center item-center">
                                    <RenameDropdown options={[{label:"Rename", onClick:rename}, {label:"Cancel", onClick:close}]} baseName={baseName}/>
                                </div>
                                <Link href="/base" className="hover:underline text-sm">
                                Data
                                </Link>
                                <Link href="/about" className="hover:underline text-sm">
                                Automations
                                </Link>
                                <Link href="/contact" className="hover:underline text-sm">
                                Interfaces
                                </Link>
                                <div className="flex justify-center items-center">
                                <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20 " width="20" height="20" fill="#A0A0A0"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <rect x="6.275" y="0" width="0.2" height="19"></rect> </g> </g></svg>
                                <Link href="/contact" className="hover:underline text-sm ml-2">
                                    Forms
                                </Link>
                            </div>
                            </div>
                            <div className="flex space-x-4 items-center font-light mr-4">
                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="20" height="20"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 8V12L14.5 14.5" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                                    </path> 
                                    <path d="M5.60423 5.60423L5.0739 5.0739V5.0739L5.60423 5.60423ZM4.33785 6.87061L3.58786 6.87438C3.58992 7.28564 3.92281 7.61853 4.33408 7.6206L4.33785 6.87061ZM6.87963 7.63339C7.29384 7.63547 7.63131 7.30138 7.63339 6.88717C7.63547 6.47296 7.30138 6.13549 6.88717 6.13341L6.87963 7.63339ZM5.07505 4.32129C5.07296 3.90708 4.7355 3.57298 4.32129 3.57506C3.90708 3.57715 3.57298 3.91462 3.57507 4.32882L5.07505 4.32129ZM3.75 12C3.75 11.5858 3.41421 11.25 3 11.25C2.58579 11.25 2.25 11.5858 2.25 12H3.75ZM16.8755 20.4452C17.2341 20.2378 17.3566 19.779 17.1492 19.4204C16.9418 19.0619 16.483 18.9393 16.1245 19.1468L16.8755 20.4452ZM19.1468 16.1245C18.9393 16.483 19.0619 16.9418 19.4204 17.1492C19.779 17.3566 20.2378 17.2341 20.4452 16.8755L19.1468 16.1245ZM5.14033 5.07126C4.84598 5.36269 4.84361 5.83756 5.13505 6.13191C5.42648 6.42626 5.90134 6.42862 6.19569 6.13719L5.14033 5.07126ZM18.8623 5.13786C15.0421 1.31766 8.86882 1.27898 5.0739 5.0739L6.13456 6.13456C9.33366 2.93545 14.5572 2.95404 17.8017 6.19852L18.8623 5.13786ZM5.0739 5.0739L3.80752 6.34028L4.86818 7.40094L6.13456 6.13456L5.0739 5.0739ZM4.33408 7.6206L6.87963 7.63339L6.88717 6.13341L4.34162 6.12062L4.33408 7.6206ZM5.08784 6.86684L5.07505 4.32129L3.57507 4.32882L3.58786 6.87438L5.08784 6.86684ZM12 3.75C16.5563 3.75 20.25 7.44365 20.25 12H21.75C21.75 6.61522 17.3848 2.25 12 2.25V3.75ZM12 20.25C7.44365 20.25 3.75 16.5563 3.75 12H2.25C2.25 17.3848 6.61522 21.75 12 21.75V20.25ZM16.1245 19.1468C14.9118 19.8483 13.5039 20.25 12 20.25V21.75C13.7747 21.75 15.4407 21.2752 16.8755 20.4452L16.1245 19.1468ZM20.25 12C20.25 13.5039 19.8483 14.9118 19.1468 16.1245L20.4452 16.8755C21.2752 15.4407 21.75 13.7747 21.75 12H20.25ZM6.19569 6.13719C7.68707 4.66059 9.73646 3.75 12 3.75V2.25C9.32542 2.25 6.90113 3.32791 5.14033 5.07126L6.19569 6.13719Z" fill="#FFFFFF">
                                    </path> </g>
                                </svg>
                                <div className="flex justify-center items-center space-x-1">
                                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="20" height="20"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#FFFFFF" stroke-width="1.5"></path> <path d="M10.5 8.67709C10.8665 8.26188 11.4027 8 12 8C13.1046 8 14 8.89543 14 10C14 10.9337 13.3601 11.718 12.4949 11.9383C12.2273 12.0064 12 12.2239 12 12.5V12.5V13" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M12 16H12.01" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                                    <p className="text-sm">Help</p>
                                </div>

                                <div className="flex items-center bg-white rounded-full p-1.5">
                                    <svg viewBox="-0.5 0 25 25" fill="none" width="25" height="25" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M8.96991 12.89C10.6599 12.89 12.0299 11.5558 12.0299 9.91C12.0299 8.2642 10.6599 6.93 8.96991 6.93C7.27992 6.93 5.90991 8.2642 5.90991 9.91C5.90991 11.5558 7.27992 12.89 8.96991 12.89Z" stroke="#006eff" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M12.93 13.1C14.37 14.18 15.32 15.84 15.42 17.72C15.43 17.91 15.27 18.07 15.08 18.07H2.84996C2.64996 18.07 2.48996 17.91 2.49996 17.72C2.60996 15.84 3.55997 14.18 5.00997 13.1" stroke="#006eff" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M11.03 12.11H11.02" stroke="#006eff" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M17.1299 14.56C18.2787 14.56 19.2099 13.6556 19.2099 12.54C19.2099 11.4244 18.2787 10.52 17.1299 10.52C15.9812 10.52 15.0499 11.4244 15.0499 12.54C15.0499 13.6556 15.9812 14.56 17.1299 14.56Z" stroke="#006eff" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M20.3 15.13C20.99 15.84 21.44 16.79 21.5 17.83C21.51 17.97 21.4 18.07 21.26 18.07H17.38" stroke="#006eff" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                                    <div className="ml-1 mr-1 text-[#006eff] text-xs">Share</div>
                                </div>

                                <div className="flex items-center bg-white rounded-full p-2.5">
                                    <svg viewBox="0 0 24 24" fill="none" width="15" height="15" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M9.00195 17H5.60636C4.34793 17 3.71872 17 3.58633 16.9023C3.4376 16.7925 3.40126 16.7277 3.38515 16.5436C3.37082 16.3797 3.75646 15.7486 4.52776 14.4866C5.32411 13.1835 6.00031 11.2862 6.00031 8.6C6.00031 7.11479 6.63245 5.69041 7.75766 4.6402C8.88288 3.59 10.409 3 12.0003 3C13.5916 3 15.1177 3.59 16.2429 4.6402C17.3682 5.69041 18.0003 7.11479 18.0003 8.6C18.0003 11.2862 18.6765 13.1835 19.4729 14.4866C20.2441 15.7486 20.6298 16.3797 20.6155 16.5436C20.5994 16.7277 20.563 16.7925 20.4143 16.9023C20.2819 17 19.6527 17 18.3943 17H15.0003M9.00195 17L9.00031 18C9.00031 19.6569 10.3435 21 12.0003 21C13.6572 21 15.0003 19.6569 15.0003 18V17M9.00195 17H15.0003" stroke="#006eff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                                </div>

                                <ProfileImage src={session.data.user.image}/>
                            </div>
                        </div>
                    </nav>
                    <div className="bg-[rgb(59,102,163)] h-8 flex justify-between">
                        <div className="flex bg-[rgb(53,90,145)] h-8 flex-grow rounded-tl-lg rounded-tr-lg items-center">
                            <div className="flex items-center justify-center ml-4 w-24 h-full bg-white rounded-t"><div className="text-xs font-light">Table 1</div></div>
                            <div className="ml-2">
                                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#FFFFFF" width="20" height = "24"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path fill="none" d="M0 0h24v24H0z"></path> 
                                    <path d="M12 15l-4.243-4.243 1.415-1.414L12 12.172l2.828-2.829 1.415 1.414z"></path> </g> </g></svg>
                            </div>
                            <div className="ml-1 mr-1">
                            <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20 " width="20" height="20" fill="#A0A0A0"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <rect x="6.275" y="0" width="0.2" height="19"></rect> </g> </g></svg>
                            </div>
                            <div className="text-gray-400 text-xl">+</div>
                            <div className="ml-4 text-xs text-white w-24">Add or import</div>
                        </div>
                        <div className="bg-[rgb(53,90,145)] h-8 ml-4 pl-5 pr-5 rounded-tl-lg rounded-tr-lg text-white space-x-4 flex justify-center items-center">
                            <Link href="/about" className="text-sm">
                                Extensions
                            </Link>
                            <div className="flex justify-center items-center text-sm">
                                <Link href="/about">
                                    Tools
                                </Link>
                                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#FFFFFF" width="20" height = "24"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path fill="none" d="M0 0h24v24H0z"></path> 
                                <path d="M12 15l-4.243-4.243 1.415-1.414L12 12.172l2.828-2.829 1.415 1.414z"></path> </g> </g></svg>
                            </div>
                        </div>
                    </div>
                    <NavbarUtils/>
                </div>
            </div>
        </div>
    );
};

export default Navbar;