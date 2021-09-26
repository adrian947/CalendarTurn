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

  const upDateEvent = (newEvent) => ({
    type: types.UPDATE_EVENT,
    payload: newEvent,
  });

  const customEvent = (event) => ({
    type: types.ADD_EVENT__CUSTOM,
    payload: event,
  });
  const customEventXdays = (events) => ({
    type: types.ADD_EVENTS__CUSTOMXDAYS,
    payload: events,
  });

  return (
    <EventContext.Provider
      value={{
        pushEvent,
        addEvent,
        activeEvent,
        activeClean,
        upDateEvent,
        customEvent,
        customEventXdays,
        state,
      }}
    >
      {props.children}
    </EventContext.Provider>
  );
};
