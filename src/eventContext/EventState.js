import React, { useState } from "react";
import { EventContext } from "./EventContext";
import { types } from "./../types/types";

export const EventState = (props) => {
  const [state, setstate] = useState({});

  const pushEvent = (i) => {
    setstate(i);
  };

  const addEvent = (event) => ({
    type: types.ADD_EVENT,
    payload: event,
  });
  const activeEvent = (event) => ({
    type: types.ACTIVE_EVENT,
    payload: event,
  });
  const activeClean = () => ({
    type: types.ACTIVE_CLEAN,
    
  });

  const upDateEvent = (newEvent)=>({
    type: types.UPDATE_EVENT,
    payload: newEvent
  })

  return (
    <EventContext.Provider
      value={{
        pushEvent,
        addEvent,
        activeEvent,
        activeClean,
        upDateEvent,
        state,
      }}
    >
      {props.children}
    </EventContext.Provider>
  );
};
