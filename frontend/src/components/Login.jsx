import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"

export default function Login(){
    const [password , setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [inCorrect, setCorrect] =useState("")
    const [errors, setErrors] = useState({})

    const navigate = useNavigate()
    const location = useLocation()
    const {message} = location.state || {}

    const validate = () => {
        let tempErrors = {};
        if (!email) tempErrors.email = "Email is required.";
        if (!password) tempErrors.password = "Password is required.";
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
      };

    const handleSubmit = async() => {
       if(validate()){
        let result = await fetch(`https://project-app-mern.onrender.com/login`, {
            method : "Post",
            body : JSON.stringify({email:email, password:password}),
            headers : {
                'Content-Type' : 'application/json'
            }
        })
        result = await result.json()
        console.log(result)
        if (!result.name) {
            setCorrect("Please input Valid details")
        } else {
            localStorage.setItem("user", JSON.stringify(result));
            navigate("/", {state: {message: 'You have successfully Logged In. Welcome Back :)'}});
        }
       }
    }
    return <>
    {message && (<p className="text-green-600 font-semibold">{message}</p>)}
<div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md my-20">
            <h3 className="text-2xl font-bold mb-6">Login</h3>

            <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                </label>
                <input
                    type="text"
                    id="email"
                    value={email}
                    onChange={(e)=> setEmail(e.target.value)}
                    className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
                    placeholder="Enter email"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                </label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e)=> setPassword(e.target.value)}
                    className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
                    placeholder="Enter Password"
                />
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>

            <button
                onClick={handleSubmit}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
                Login
            </button>
            {inCorrect && (<p className="text-red-500 mt-2 text-semibold">{inCorrect}</p>)}
        </div>
    </>
}