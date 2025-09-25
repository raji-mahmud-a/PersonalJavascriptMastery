const util = (n) =>{
  if (n<10) {
  return `0${n}`
  } else {
    return n
  }
}
setInterval(()=>{
  const date = new Date
  document.getElementById("sp1").innerText = util(date.getHours())
  document.getElementById("sp2").innerText = util (date.getMinutes())
  document.getElementById("sp3").innerText = util(date.getSeconds())
document.getElementById("sp4").innerText = util(Math.floor(date.getMilliseconds() / 10))},100)

