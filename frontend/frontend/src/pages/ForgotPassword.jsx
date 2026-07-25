import { useState } from "react";
import api from "../service/Api";
import "./ForgotPassword.css";
import logo from "../assets/Goalden.png";

function ForgotPassword() {

    const [email,setEmail] = useState("");

    const handleSubmit = async(e)=>{

        e.preventDefault();

        try{

            const response = await api.post(
                "/users/forgot-password",
                {
                    email
                }
            );


            alert(response.data.message);


        }catch(error){

            alert(
                error.response?.data?.message ||
                "Failed to send reset link"
            );

        }

    };


    return (

        <>

        <header className="forgot-header">

            <div className="logo">

                <img src={logo} alt="Goalden"/>

                <h1>GOALDEN</h1>

            </div>

        </header>



        <div className="forgot-container">


            <div className="forgot-box">


                <h2>
                    Forgot Password
                </h2>


                <p>
                    Enter your email to receive a password reset link.
                </p>



                <form onSubmit={handleSubmit}>


                    <input

                        type="email"

                        placeholder="Enter Email"

                        value={email}

                        onChange={
                            (e)=>setEmail(e.target.value)
                        }

                        required

                    />


                    <button type="submit">

                        Send Reset Link

                    </button>


                </form>


            </div>


        </div>


        </>

    );

}


export default ForgotPassword;