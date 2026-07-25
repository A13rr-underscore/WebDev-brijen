import { useEffect, useState } from "react";
import api from "../service/Api";
import Sidebar from "../component/Sidebar";
import Header from "../component/Header";
import { useNavigate } from "react-router-dom";
import "./MyGoals.css";


function MyGoals(){

  const navigate = useNavigate();

  const [goals,setGoals] = useState([]);

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


  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");

  };


  return(
    <>

    <Header />

    <div className="container">

      <Sidebar handleLogout={handleLogout}/>


      <main className="my-goals">


        <h1>My Goals</h1>


        {goals.length === 0 ? (

          <p>No goals found.</p>

        ) : (

          goals.map((goal)=>(

            <div 
              className="goal-card"
              key={goal.goal_id}
            >

              <h2>{goal.title}</h2>

              <p>{goal.description}</p>

              <p>
                <b>Category:</b> {goal.category}
              </p>


              <p>
                <b>Deadline:</b> {goal.deadline}
              </p>


              <p>
                <b>Progress:</b> {goal.progress}%
              </p>


              <p>
                <b>Status:</b> {goal.status}
              </p>


              <div className="progress-bar">

                <div
                  className="progress-fill"
                  style={{
                    width:`${goal.progress}%`
                  }}
                >
                  {goal.progress}%
                </div>

              </div>


            </div>

          ))

        )}


      </main>

    </div>

    </>
  );

}


export default MyGoals;