import { useEffect, useState } from "react";
import api from "../service/Api";
import Header from "../component/Header";
import Sidebar from "../component/Sidebar";
import "./Profile.css";
import { useNavigate } from "react-router-dom";


function Profile(){

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));


    const [goals,setGoals] = useState([]);


    const [username,setUsername] = useState(
        user?.username || user?.full_name || ""
    );


    const [showUsernameModal,setShowUsernameModal] = useState(false);


    const [newUsername,setNewUsername] = useState(
        user?.username || ""
    );


    const [showPasswordModal,setShowPasswordModal] = useState(false);


    const [passwordData,setPasswordData] = useState({
        currentPassword:"",
        newPassword:"",
        confirmPassword:""
    });



    const fetchGoals = async()=>{

        try{

            const res = await api.get("/goals");

            setGoals(res.data);


        }catch(error){

            console.log(error);

        }

    };



    useEffect(()=>{

        fetchGoals();

    },[]);





    // =========================
    // CHANGE USERNAME
    // =========================

    const handleChangeUsername = ()=>{

        setNewUsername(username);

        setShowUsernameModal(true);

    };




    const updateUsername = async()=>{


        if(!newUsername){

            alert("Username required");
            return;

        }


        try{


            const res = await api.put(
                "/users/change-username",
                {
                    username:newUsername
                }
            );



            alert(res.data.message);



            const updatedUser = {

                ...user,

                username:newUsername

            };



            localStorage.setItem(
                "user",
                JSON.stringify(updatedUser)
            );



            setUsername(newUsername);


            setShowUsernameModal(false);



        }catch(error){


            console.log(error.response?.data);


            alert(
                error.response?.data?.message ||
                "Failed to update username"
            );


        }


    };






    // =========================
    // CHANGE PASSWORD
    // =========================


    const handleChangePassword = async()=>{


        if(
            passwordData.newPassword !== 
            passwordData.confirmPassword
        ){

            alert("Passwords do not match");
            return;

        }



        try{


            const response = await api.put(

                "/users/change-password",

                {

                    currentPassword:
                    passwordData.currentPassword,


                    newPassword:
                    passwordData.newPassword

                }

            );



            alert(response.data.message);



            setShowPasswordModal(false);



            setPasswordData({

                currentPassword:"",
                newPassword:"",
                confirmPassword:""

            });



        }catch(error){


            console.log(error.response?.data);



            alert(

                error.response?.data?.message ||
                "Failed to change password"

            );


        }


    };






    const handleLogout=()=>{


        localStorage.removeItem("token");

        localStorage.removeItem("user");


        navigate("/login");


    };





return(

<>


<Header/>


<div className="container">


<Sidebar/>



<main className="profile-page">


<h1>
Profile Page
</h1>




<div className="profile-layout">



<div className="profile-left">



<div className="profile-photo">


<img

src="https://via.placeholder.com/250"

/>



</div>




<h2>

{username}

</h2>



<p>

{user?.email}

</p>





<h2 className="streak-title">

Current Streak

</h2>




<div className="streak-box">

0

</div>



</div>







<div className="profile-card">



<div className="info-row">


<span>
Username
</span>


<strong>
{username}
</strong>


</div>





<div className="info-row">


<span>
Email
</span>


<strong>
{user?.email}
</strong>


</div>





<div className="info-row">


<span>
Goals
</span>


<strong>
{goals.length}
</strong>


</div>



</div>



</div>








<div className="profile-buttons">



<button

className="username-btn"

onClick={handleChangeUsername}

>

Change Username

</button>






<button

className="change-btn"

onClick={()=>setShowPasswordModal(true)}

>

Change Password

</button>







<button

className="logout-btn"

onClick={handleLogout}

>

Logout

</button>



</div>









{/* CHANGE USERNAME MODAL */}


{

showUsernameModal &&


<div className="modal-overlay">


<div className="modal">


<h2>
Change Username
</h2>



<input

type="text"

value={newUsername}

onChange={(e)=>
setNewUsername(e.target.value)
}

/>



<div className="modal-buttons">


<button

onClick={updateUsername}

>

Change Username

</button>



<button

onClick={()=>setShowUsernameModal(false)}

>

Cancel

</button>



</div>


</div>


</div>


}









{/* CHANGE PASSWORD MODAL */}


{

showPasswordModal &&


<div className="modal-overlay">


<div className="modal">


<h2>
Change Password
</h2>




<input

type="password"

placeholder="Current Password"

value={passwordData.currentPassword}

onChange={(e)=>

setPasswordData({

...passwordData,

currentPassword:e.target.value

})

}

/>





<input

type="password"

placeholder="New Password"

value={passwordData.newPassword}

onChange={(e)=>

setPasswordData({

...passwordData,

newPassword:e.target.value

})

}

/>






<input

type="password"

placeholder="Confirm Password"

value={passwordData.confirmPassword}

onChange={(e)=>

setPasswordData({

...passwordData,

confirmPassword:e.target.value

})

}

/>





<div className="modal-buttons">



<button

onClick={handleChangePassword}

>

Update Password

</button>




<button

onClick={()=>setShowPasswordModal(false)}

>

Cancel

</button>



</div>



</div>


</div>


}





</main>


</div>


</>


)

}


export default Profile;