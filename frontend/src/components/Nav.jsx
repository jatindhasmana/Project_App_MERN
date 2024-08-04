import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Nav() {
    const auth = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const logout = () => {
        localStorage.clear();
        navigate("/login", {state : {message : "You have logged out successfully !!"}});
    };

    return (
        <nav className="bg-blue-500 p-4 shadow-lg">
            <div className="container mx-auto flex flex-wrap items-center justify-between">
                <div className="flex items-center flex-shrink-0 text-white mr-6">
                    <Link to="/" className="font-semibold text-2xl tracking-tight">ProjectApp</Link>
                </div>
                <div className="block lg:hidden">
                    <button onClick={toggleMenu} className="flex items-center px-3 py-2 border rounded text-white border-white hover:text-blue-200 hover:border-blue-200">
                        <svg className="fill-current h-4 w-4" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <title>Menu</title>
                            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                        </svg>
                    </button>
                </div>
                <div className={`w-full block flex-grow lg:flex lg:items-center lg:w-auto ${isOpen ? 'block' : 'hidden'}`}>
                    <div className="text-sm lg:flex-grow">
                        {auth && (
                            <>
                                <Link to="/add" className="block mt-4 lg:inline-block lg:mt-0 lg:text-lg text-white hover:text-blue-200 mr-4 transition duration-300">Create Project</Link>
                                <Link to="/profile" className="block mt-4 lg:inline-block lg:mt-0 lg:text-lg text-white hover:text-blue-200 mr-4 transition duration-300">Profile</Link>
                            </>
                        )}
                    </div>
                    <div>
                        {auth ? (
                            <button
                                onClick={logout}
                                className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-blue-500 hover:bg-white mt-4 lg:mt-0 transition duration-300"
                            >
                                Logout ({auth.name})
                            </button>
                        ) : (
                            <>
                                <Link to="/login" className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-blue-200 mr-4 transition duration-300">Log In</Link>
                                <Link to="/register" className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-blue-200 transition duration-300">Sign Up</Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
