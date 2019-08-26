const getDate = () => {
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1; //Tick up 1 since January is 0
    const year = date.getFullYear();
  
    //Add "0" if less than 10 to force a two-digit string
  
    if (day < 10) {
        day = "0" + day;
    }
  
    if (month < 10) {
        month = "0" + month;
    } 
  
    return year + "-" + month + "-" + day;
  };

export default getDate;