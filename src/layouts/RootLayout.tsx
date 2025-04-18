import { Outlet } from "react-router-dom"
import { Navbar } from "../components/shared/Navbar";
import { Footer } from "../components/shared/Footer";

export const RootLayout = () => {

    return (  
        <div  className="h-screen flex flex-col">
            {/* Header */}
            <Navbar />

            {/* Main content */}
            <main className="container my-8 flex-1">
            <Outlet/>
            </main>

            {/* Footer */}
            <Footer/>

        </div>
    );

}
