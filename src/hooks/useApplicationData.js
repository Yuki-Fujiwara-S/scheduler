import { useState, useEffect } from "react";
import axios from "axios";


export default function useVisualMode(initial) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  
  const setDay = day => setState(prev => ({ ...prev, day }));
  
  useEffect(() => {
    const urlDays = "http://localhost:8001/api/days";
    const urlAppointments = "http://localhost:8001/api/appointments";
    const urlInterviewers = "http://localhost:8001/api/interviewers";
    Promise.all([
      Promise.resolve(axios.get(urlDays)),
      Promise.resolve(axios.get(urlAppointments)),
      Promise.resolve(axios.get(urlInterviewers))
    ]).then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    })
  }, []);
  
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
  
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
  
    return axios.put(`/api/appointments/${id}`, {
      interview
    })
      .then(() => {
        setState({
          ...state,
          appointments
        });
      })
  }
  
  function deleteInterview(id) {
    const appointmentNull = {
      ...state.appointments[id],
      interview: null
    };
  
    const appointments = {
      ...state.appointments,
      [id]: appointmentNull
    };
    
    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        setState({...state, appointments});
      })
  }
  
  return { state, setDay, bookInterview, deleteInterview }
}



