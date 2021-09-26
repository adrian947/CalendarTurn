import { types } from "./../types/types";

const initialState = {
  event: [],
  active: null,
};

export const EventReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_EVENT__CUSTOM:      
    case types.ADD_EVENT:      
      return {
        ...state,
        event: [...state.event, action.payload],
      };
     
    case types.UPDATE_EVENT:     
      return {
        ...state,
        event: state.event.map((event) =>
          event.id === action.payload.id ? action.payload : event
        ),
      };

    case types.ACTIVE_EVENT:
      return {
        ...state,
        active: action.payload,
      };
    case types.ACTIVE_CLEAN:
      return {
        ...state,
        active: null,
      };
    case types.ADD_EVENTS__CUSTOMXDAYS:      
      return {
        ...state,
        event:[...state.event, ...action.payload.map(event=>event)] 
      };

    default:
      return state;
  }
};
