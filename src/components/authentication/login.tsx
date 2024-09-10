import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth, firestore } from "../../config/firebase"; 
import { doc, getDoc, setDoc } from "firebase/firestore";
import { Link } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null); // Allow error to be string or null
    const navigate = useNavigate();

    // login functionality
    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            if (user.emailVerified) {
                console.log("Email is verified");

                // Retrieve data from local storage if available
                const registrationData = localStorage.getItem("registrationData");
                const { firstName = "", lastName = "", gender = "" } = registrationData
                    ? JSON.parse(registrationData)
                    : {};

                // Check if user document exists in Firestore
                const userDoc = await getDoc(doc(firestore, "users", user.uid));
                if (!userDoc.exists()) {
                    console.log("User document does not exist, creating...");
                    // Create a new document in Firestore if it doesn't exist
                    await setDoc(doc(firestore, "users", user.uid), {
                        firstName,
                        lastName,
                        gender,
                        email: user.email,
                    });

                    // Clear local storage after saving data in Firestore
                    localStorage.removeItem("registrationData");
                } else {
                    console.log("User document already exists");
                }

                // Ensure router redirect happens after all async tasks
                console.log("Redirecting to Home Page ");
                navigate("/travel");
            } else {
                setError("Please verify your email before logging in."); // Error message is now a string
            }
        } catch (error: unknown) { // Explicitly typing 'error' as 'unknown'
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("An unknown error occurred.");
            }
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen w-screen bg-gradient-to-br from-gray-900 to-red-600">
            <h2 className="font-medium text-4xl text-white mb-10 text-center">Welcome to LifeLedger!</h2>
            <div className="p-5 border border-gray-300 rounded w-full max-w-md">
                <form onSubmit={handleLogin}>
                    <div>
                        <label htmlFor="email" className="text-sm font-medium block mb-2 text-gray-300">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="text-sm font-medium block mb-2 mt-4 text-gray-300">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <button
                        type="submit"
                        className="px-4 mt-4 items-center justify-center flex w-full py-2 border-2 border-white text-white rounded-lg transition-colors duration-200 whitespace-nowrap"
                    >
                        Login
                    </button>
                </form>
                <p className="text-sm font-medium text-gray-300 space-y-6 px-4 pb-6 mt-8">
                    Don&apos;t have an account?{" "}
                    <Link to="/register" className="px-4 ml-5 py-2 border-2 border-white text-white rounded-lg transition-colors duration-200 whitespace-nowrap">
                        Register Here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
