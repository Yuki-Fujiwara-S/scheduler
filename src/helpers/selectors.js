


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