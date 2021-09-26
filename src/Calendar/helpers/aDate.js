import moment from "moment";
import shortid from "shortid";

export const aDate = (formValues) => {
  const startnew = moment(formValues.start).format("YYYY-MM-DD HH:mm");
  const endnew = moment(formValues.end).format("YYYY-MM-DD HH:mm");
  const id = shortid.generate();
  return {
    ...formValues,
    startnew,
    endnew,
    id,
  };
};

export const aDateForModal = (date) => {
  const startnew = moment(date.startStr).format("YYYY-MM-DDTHH:mm");
  const endnew = moment(date.endStr).format("YYYY-MM-DDTHH:mm");
  return {
    startnew,
    endnew,
  };
};

export const DateCustom = (dateCustom) => {
  const dateCustomDayStart = moment(dateCustom[0].start).add(7, "days");
  const day = dateCustomDayStart.toString().split(" ").slice(1, 4);
  const months = moment().month(day[0]).format("MM");

  const dateCustomDayEnd = moment(dateCustom[0].end).add(7, "days");
  const dayEnd = dateCustomDayEnd.toString().split(" ").slice(1, 4);
  const monthsEnd = moment().month(dayEnd[0]).format("MM");

  const startnew = moment(dateCustom[0].start).format(
    `${day[2]}-${months}-${day[1]}THH:mm`
  );
  const endnew = moment(dateCustom[0].end).format(
    `${day[2]}-${monthsEnd}-${day[1]}THH:mm`
  );
  

  return {
    startnew,
    endnew,
  };
};

export const dateCustomXdays = (dateCustom, inputValue) => {
  const numero = inputValue.cantdays; 

  const nextDays = [];

  for (let index = 0; index < numero; index++) {
    const element = index;
    const elementsStart = moment(dateCustom[0].start).add(element + 1, "days");
    const elementsEnd = moment(dateCustom[0].end).add(element + 1, "days");
    nextDays.push({ 
      newEventStart: elementsStart._d,
      newEventEnd: elementsEnd._d
    });
  }
  
  const map = nextDays.map((dmy) =>({
   start: dmy.newEventStart.toString().split(" ").slice(1, 4),
   end: dmy.newEventEnd.toString().split(" ").slice(1, 4),
  }));



  // return console.log('mal', map)

  const eventCustom = {
    events: [],
    
  };

  for (let index = 0; index < map.length; index++) {
    const elementStart = map[index].start;
    const months = moment().month(elementStart[0]).format("MM");
    const startnew = moment(dateCustom[0].start).format(
      `${elementStart[2]}-${months}-${elementStart[1]}THH:mm`
    );
    

    const elementEnd = map[index].end;
    const monthsEnd = moment().month(elementEnd[0]).format("MM");
    const endnew = moment(dateCustom[0].end).format(
      `${elementEnd[2]}-${monthsEnd}-${elementEnd[1]}THH:mm`
    );
    eventCustom.events.push({start: startnew, end: endnew});
  }
  
  return eventCustom;
};
