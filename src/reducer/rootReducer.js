import { combineReducers } from "redux";
import { EventReducer } from './EventReducer';

export const rootReducer = combineReducers({
    events: EventReducer
  });