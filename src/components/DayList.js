import React from "react";

import DayListItem from "./DayListItem";



export default function DayList(props) {
  const daysArray = props.days;
  const daysListItem = daysArray.map(item => {
    return <DayListItem 
    key={item.id}
    name={item.name} 
    spots={item.spots} 
    selected={item.name === props.value}
    setDay={() => props.onChange(props.name)}  
  />
  })


  return (
    <ul>{daysListItem}</ul>
  );
}