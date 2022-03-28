export function getAppointmentsForDay(state, name) {
  
  const filteredDayByName = state["days"].filter(day => day.name === name);
  // console.log("filteredDayByName: ",filteredDayByName);
  if (filteredDayByName.length === 0){
    return [];
  }

  let filteredApptById = [];
  if (filteredDayByName[0].appointments){
    filteredApptById = filteredDayByName[0].appointments;
  }
  

  // console.log("filteredApptById: ",filteredApptById);

  let filteredAppt = []
  for (const id of filteredApptById) {
    filteredAppt.push(state.appointments[id])
  }
  // console.log("filteredAppt: ",filteredAppt);
  
  return filteredAppt;
}


export function getInterview(state, interview) {
  if (interview === null) {
    return null;
  }
  const interviewerId = interview.interviewer;
  // console.log("interviewerId", interviewerId);

  interview.interviewer = state.interviewers[interviewerId];
  // console.log("interview", interview)
  return interview;
}

export function getInterviewersForDay(state, name) {
  
  const filteredDayByName = state["days"].filter(day => day.name === name);
  // console.log("filteredDayByName: ",filteredDayByName);
  if (filteredDayByName.length === 0){
    return [];
  }

  let filteredIntById = [];
  if (filteredDayByName[0].appointments){
    filteredIntById = filteredDayByName[0].interviewers;
  }
  

  // console.log("filteredApptById: ",filteredApptById);

  let filteredInt = []
  for (const id of filteredIntById) {
    filteredInt.push(state.interviewers[id])
  }
  // console.log("filteredAppt: ",filteredAppt);
  
  return filteredInt;
}