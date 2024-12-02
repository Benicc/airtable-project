import Navbar from "~/components/navbar";
import NavbarUtils from "~/components/navbarutils";
import Spreadsheet from "~/components/table";

export default function Base() {
    return (
        <div>
            <Navbar />
            <Spreadsheet />
        </div>
    );
}