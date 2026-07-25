import { useEffect, useState } from "react";
import api from "../service/Api";
import Sidebar from "../component/Sidebar";
import Header from "../component/Header";
import "./Goals.css";

function Goals(){

    const [goals,setGoals] = useState([]);

    const fetchGoals = async()=>{
        try{
            const res = await api.get("/goals");
            setGoals(res.data);
        }
        catch(error){
            console.log(error);
        }
    };


    useEffect(()=>{
        fetchGoals();
    },[]);



    const handleDelete = async(id)=>{

        try{
            await api.delete(`/goals/${id}`);

            alert("Goal deleted");

            fetchGoals();

        }
        catch(error){
            console.log(error);
        }

    };


    const handleStatusChange = async(goal)=>{

        const newStatus =
        goal.status === "completed"
        ? "pending"
        : "completed";


        try{

            await api.put(`/goals/${goal.goal_id}`,{

                title:goal.title,
                description:goal.description,
                category:goal.category,
                deadline:goal.deadline,
                progress:goal.progress,
                status:newStatus

            });


            fetchGoals();

        }
        catch(error){
            console.log(error);
        }

    };



    return(
        <>

        <Header/>

        <Sidebar/>

        <main className="goals-page">


            <h1>My Goals</h1>


            <div className="goal-container">


            {
            goals.length === 0 ?

            <p>No goals found.</p>


            :

            goals.map(goal=>(


            <div className="goal-card" key={goal.goal_id}>


                <h2>{goal.title}</h2>


                <p>{goal.description}</p>


                <p>
                    <b>Category:</b> {goal.category}
                </p>


                <p>
                    <b>Status:</b> {goal.status}
                </p>


                <p>
                    <b>Progress:</b> {goal.progress}%
                </p>


                <div className="progress-bar">

                    <div 
                    className="progress-fill"
                    style={{
                        width:`${goal.progress}%`
                    }}
                    >
                    </div>

                </div>



                <div className="actions">


                <button className="delete-btn"
                onClick={()=>handleDelete(goal.goal_id)}
                >
                    Delete
                </button>



                <button 
                className="complete-btn"
                onClick={()=>handleStatusChange(goal)}
                >

                {
                goal.status==="completed"
                ?
                "Mark as Incomplete"
                :
                "Complete"
                }

                </button>


                </div>


            </div>


            ))

            }


            </div>


        </main>

        </>
    )

}


export default Goals;