const util = (n) =>{
  if (n<10) {
  return `0${n}`
  } else {
    return n
  }
}



setInterval(()=>{
  const timeFormat = document.getElementById('timeFormat').checked
  const date = new Date
  let hours, minutes, seconds, milliSecs, ampm
  hours = util(date.getHours()),
    minutes = util(date.getMinutes()),
    seconds = util(date.getSeconds()),
    milliSecs = util(Math.floor(date.getMilliseconds() / 10)),
    ampm = hours >= 12 ? 'pm' : 'am';
  if (!timeFormat) {
    hours = util(hours % 12);
    hours = hours ? hours : 12;
  }
  
  
  
  
  const container = document.getElementById('Container')

  container.innerHTML = `
      <h1 class="text-blue-300 font-bold font-3xl">
        ${hours}:${minutes}:${seconds}:${milliSecs}<sub>${ampm}</sub>
      </h1>
  `
},100)