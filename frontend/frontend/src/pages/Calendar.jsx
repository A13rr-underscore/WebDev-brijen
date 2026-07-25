import { useEffect, useState } from "react";
import CalendarComponent from "react-calendar";
import "react-calendar/dist/Calendar.css";

import api from "../service/Api";
import Sidebar from "../component/Sidebar";
import Header from "../component/Header";

import "./Calendar.css";


function Calendar(){

    const [goals,setGoals] = useState([]);
    const [date,setDate] = useState(new Date());


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



    // Display goals on calendar dates

    const tileContent = ({date, view})=>{

        if(view === "month"){

            const dayGoals = goals.filter(goal=>{

                const deadline =
                new Date(goal.deadline);


                return (

                    deadline.getDate() === date.getDate()
                    &&
                    deadline.getMonth() === date.getMonth()
                    &&
                    deadline.getFullYear() === date.getFullYear()

                );

            });


            return (

                <div className="goal-events">

                {
                    dayGoals.map(goal=>(

                        <div 
                        key={goal.goal_id}
                        className="event"
                        >

                            {goal.title}

                        </div>

                    ))
                }

                </div>

            )

        }

    }



    return(

        <>


        <Header/>


        <div className="container">


            <Sidebar/>


            <main className="calendar-page">


                <h1>
                    Goal Calendar
                </h1>



                <CalendarComponent

                    value={date}

                    onChange={setDate}

                    tileContent={tileContent}

                />


            </main>


        </div>


        </>

    )

}


export default Calendar;