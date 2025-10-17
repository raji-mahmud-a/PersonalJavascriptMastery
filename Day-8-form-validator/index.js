const validate = (() => {
  const username = (input, maxLength=12) => {
      return /^[a-zA-Z0-9_-]{3,16}$/.test(input)
  }
  const email = (input) => {
      return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(input)
  }
  const password = (input) => {
      let count = 0
      if (/.{8,}/.test(input)) {
        count++
      }
      if (/\W/.test(input)) {
        count++
      }
      if (/[0-9]/.test(input)) {
        count++
      }
      if (/[A-Z]/.test(input)) {
        count++
      }
      if (/[a-z]/.test(input)) {
        count++
      }
      
      if (count <= 2) {
        return "weak"
      } else if (count <= 4){
        return "medium"
      } else if (count = 5) {
        return "strong"
      }
  }
  
  
  
  return {username, email, password}
})()