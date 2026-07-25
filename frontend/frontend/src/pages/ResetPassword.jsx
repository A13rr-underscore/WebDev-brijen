import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../service/Api";
import "./ResetPassword.css";
import logo from "../assets/Goalden.png";


function ResetPassword(){

    const {token}=useParams();

    const navigate=useNavigate();


    const [password,setPassword]=useState("");

    const [confirmPassword,setConfirmPassword]=useState("");



    const handleSubmit=async(e)=>{

        e.preventDefault();


        if(password !== confirmPassword){

            alert("Passwords do not match");

            return;

        }



        try{


            const response =
            await api.post(
                `/users/reset-password/${token}`,
                {
                    password
                }
            );



            alert(response.data.message);


            navigate("/login");



        }catch(error){

            alert(
                error.response?.data?.message ||
                "Password reset failed"
            );

        }


    };




    return(

        <>


        <header className="reset-header">


            <div className="logo">


                <img src={logo} alt="Goalden"/>


                <h1>
                    GOALDEN
                </h1>


            </div>


        </header>





        <div className="reset-container">


            <div className="reset-box">


                <h2>
                    Reset Password
                </h2>



                <form onSubmit={handleSubmit}>


                    <input

                    type="password"

                    placeholder="New Password"

                    value={password}

                    onChange={
                        (e)=>setPassword(e.target.value)
                    }

                    required

                    />



                    <input

                    type="password"

                    placeholder="Confirm Password"

                    value={confirmPassword}

                    onChange={
                        (e)=>setConfirmPassword(e.target.value)
                    }

                    required

                    />



                    <button type="submit">

                        Reset Password

                    </button>


                </form>


            </div>


        </div>


        </>

    );


}


export default ResetPassword;