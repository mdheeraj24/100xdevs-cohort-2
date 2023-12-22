import dateFormat from "dateformat";

function clock() {
  setTimeout(() => {
    console.log(`Current time in HH:MM:SS format : ${dateFormat(new Date(), 'HH:MM:ss')}`);
    console.log(`Current time in HH:MM:SS AM/PM format : ${dateFormat(new Date(), 'hh:MM:ss TT')}`);
    clock();
  }, 1000);
}
clock();
