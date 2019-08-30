const getDate = () => {

    let date = new Date(); 

    let dayNum = date.getDate();
    let month = date.getMonth() + 1; //Tick up 1 since January is 0
    const year = date.getFullYear();
    const dayOfWeek = date.getDay();

    //Add "0" if less than 10 to force a two-digit string
  
    if (dayNum < 10) {
        dayNum = "0" + dayNum;
    }
  
    if (month < 10) {
        month = "0" + month;
    } 

    return year + "-" + month + "-" + dayNum;

    // const niceDayOfWeek = daysArray[dayOfWeek];
    // const niceMonth = monthsArray[parseInt(month)];
    // return niceDayOfWeek + ", " +  niceMonth + " " + dayNum + ", " + year;

  };

  const daysArray = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
];

const monthsArray = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

export default getDate;