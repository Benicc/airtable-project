import { useSession } from "next-auth/react";
import Link from "next/link";
import { ProfileImage } from "./ProfileImage";
import NavbarUtils from "./navbarutils";
import Tabs from "./tab";

const Navbar = () => {
    const session = useSession()

    if (session.status !== "authenticated") return

    return (
        <div>
            <div className="py-16">
                <div className="fixed top-0 left-0 z-50 w-full">
                    <nav className="bg-[rgb(59,102,163)] text-white py-4">
                        <div className="flex justify-between items-center">
                            <div className="text-lg ml-4 font-light flex space-x-4 items-center">
                                <div className="flex justify-center item-center">
                                <Link href="/" className="font-bold">Base</Link>
                                <svg viewBox="0 0 24 26" xmlns="http://www.w3.org/2000/svg" fill="#FFFFFF" width="30" height = "30"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path fill="none" d="M0 0h24v24H0z"></path> 
                                    <path d="M12 15l-4.243-4.243 1.415-1.414L12 12.172l2.828-2.829 1.415 1.414z"></path> </g> </g></svg>
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