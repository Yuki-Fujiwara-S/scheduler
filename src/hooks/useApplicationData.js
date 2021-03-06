import { useState, useEffect } from "react";
import axios from "axios";


export default function useApplicationData(initial) {
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

  // looks at appointments array in each day, returns free spots based on null interviews
  function getSpotsRemaining(day, appointments) {
    let spotsRemaining = 0;
    let spotsInDay = day.appointments;
    for (const spot of spotsInDay) {
      if (appointments[spot].interview === null) {
        spotsRemaining++;
      }
    }
    return spotsRemaining;
  }

  // sets state of days with update spots
  function updateDaysSpots(days, appointments) {
    const updatedDays = days.map(day => ({
      ...day,
      spots: getSpotsRemaining(day, appointments)
    }));
    return updatedDays;
  }

  
  
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
  
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    //days with update days spots
    const days = updateDaysSpots(state.days, appointments);
  
    return axios.put(`/api/appointments/${id}`, {
      interview
    })
      .then(() => { setState({ ...state, appointments, days });
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

    //days with update days spots
    const days = updateDaysSpots(state.days, appointments);
    
    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        setState({...state, appointments, days });
      })
  }
  
  return { state, setDay, bookInterview, deleteInterview }
}



