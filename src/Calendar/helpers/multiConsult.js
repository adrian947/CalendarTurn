import { DateCustom, dateCustomXdays } from "./aDate";
import shortid from "shortid";

export const multiConsult = (active) => {
  const datedayc = DateCustom(active);
  const id = shortid.generate();

  const obj = {
    title: active[0].title,
    obs: active[0].obs,
    id: id,
    start: datedayc.startnew,
    end: datedayc.endnew,
  };

  return obj;
};

export const multiCustomXdays = (active, numero) => {
  const dates = dateCustomXdays(active, numero);

  const obj = dates.events.map((date) => ({
    start: date.start,
    end: date.end,
    id: shortid.generate(),
    title: active[0].title,
    obs: active[0].obs,
  }));

  return obj;
};
