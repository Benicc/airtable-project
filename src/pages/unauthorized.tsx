import Link from "next/link";

export default function Unauthorized() {
    return (
        <div className="flex flex-col w-full h-screen justify-center items-center">
            <h1 className="pb-10">Unauthorized Access</h1>
            <Link href={"/"}>
                <button className="border border-2">Go to login page</button>
            </Link>
        </div>
    );
}