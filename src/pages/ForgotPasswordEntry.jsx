import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom"
import { useState } from 'react';
import { checkToken } from "../services/authService"
import { useEffect } from 'react';
import "../App.css"

function ForgotPasswordEntry(){
    const navigate = useNavigate()
    const [match, setMatch] = useState(false);
    
    // retrieving the token from the url
    const [params] = useSearchParams();
    const token = params.get('token');
    const [password1, setPassword1] = useState("")
    const [password2, setPassword2] = useState("")

    const sendConfirm = async () => {
        // checking password validity using same logic/code as signup page

        //password1: at least 8 characters
        if (password1.length < 8) {
        alert("Password must be at least 8 characters.")
        return
        }
    
        //password1:at least one uppercase letter
        if (!/[A-Z]/.test(password1)) {
        alert("Password must contain at least one uppercase letter.")
        return
        }
    
        //password1: at least one number
        if (!/[0-9]/.test(password1)) {
        alert("Password must contain at least one number.")
        return
        }
    
        //password1: at least one symbol
        if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password1)) {
        alert("Password must contain at least one symbol.")
        return
        }
        
        //password2: at least 8 characters
        if (password2 < 8) {
        alert("Password must be at least 8 characters.")
        return
        }
    
        //password2:at least one uppercase letter
        if (!/[A-Z]/.test(password2)) {
        alert("Password must contain at least one uppercase letter.")
        return
        }
    
        //password2: at least one number
        if (!/[0-9]/.test(password2)) {
        alert("Password must contain at least one number.")
        return
        }
    
        //password2: at least one symbol
        if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password2)) {
        alert("Password must contain at least one symbol.")
        return
        }

        // checking if the passwords match
        if (password1 != password2) {
            alert("Passwords must match!")
            return
        }


        navigate("/forgot-password-confirm")
    }

    useEffect(() => {
        try {
            const tokenPromise = checkToken("masonscarvie@csus.edu", token);
            tokenPromise.then((result) => {
                console.log("Result:", result);
                if (result.success == true) {
                    setMatch(true);}
                else
                {
                    setMatch(false)
                }
            });
        }
        catch{
            
        }
    }, []);

    if (match == true) {
        return(
            // returns if the token matches the one in the database
            <div className="signup-confirmation-container">
                <div className="text-align-left">
                    <h1 className="margin-10">Forgot Password</h1>
                    <p className="margin-10">
                        Enter your new password below:
                    </p>
                    <input
                        type="text"
                        className="verification-code"
                        placeholder="password"
                        value={password1}
                        onChange={(e) => setPassword1(e.target.value)}
                    />
                    <p className="margin-10">
                        Confirm your password:
                    </p>
                    <input
                        type="text"
                        className="verification-code"
                        placeholder="password"
                        value={password2}
                        onChange={(e) => setPassword2(e.target.value)}
                    />
                    <div></div>

                    <button className="confirm-code" onClick={sendConfirm}>
                    Confirm
                    </button>
                </div>
            </div>
        )
    }
    else
    {
        return(
            // returns if the token matches the one in the database
            <div className="signup-confirmation-container">
                <div className="text-align-left">
                    <h1 className="margin-10">Forgot Password</h1>
                    <p className="margin-10">
                        Error: mismatched tokens
                    </p>
                </div>
            </div>
        )
    }
}

export default ForgotPasswordEntry