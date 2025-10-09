const loginTab = document.getElementById('loginTab')
let listOfTasks = JSON.parse(localStorage.getItem('tasks')) ?? []
const loginForm = document.getElementById('loginForm')
const loginEmailEl = document.getElementById('loginEmail')
const loginPasswordEl = document.getElementById('loginPasswvalue')

const newTodoInputEl = document.getElementById('newTodoInput')
const newTodoInputBtn = document.getElementById('newTodoInputBtn')
const AuthContainer = document.getElementById('AuthContainer')
const PageContainer = document.getElementById('PageContainer')

const renderListOfTodos = (taskArr) => {
  document.getElementById('mainTodoList').innerHTML = ''
  taskArr.forEach((value, index) =>{
    document.getElementById('mainTodoList').innerHTML += `
          <li id='task${index}' class="flex flex-row mb-3 space-x-3">
        <span class="w-full p-[10px] text-[1.2rem] text-gray-600" onclick='finishTask(${index})'>
        ${index+1}. ${value}
        </span>
        <button id="deleteTaskBtn" class="hover:outline-2 focus:outline-2 focus:outline hover:outline  outline-red-600 py-[1px] px-[10px] text-center bg-red-600 font-bold text-[40px] text-white rounded-sm hover:bg-red-50 hover:text-red-600" onclick="deleteTask(${index})">
        ×
      </button>
      </li>`
  })
}

const deleteTask = (idx) =>  {
  listOfTasks.splice(idx, 1)
  renderListOfTodos(listOfTasks)
  localStorage.setItem('tasks', JSON.stringify(listOfTasks))
}
const finishTask = (idx) =>  {
  document.getElementById(`task${idx}`).classList.add('line-through')
}


loginTab.addEventListener("click", () => {
  loginTab.className = "w-full text-center text-blue-600 font-bold text-xl border-blue-500 border-b-2 p-2"
  loginForm.classList.remove('hidden')
})


localStorage.setItem('AuthCredentials', JSON.stringify({
  'userName': 'mahmud',
  'password': 'rest'
}))

loginForm.addEventListener('submit', (e)=> {
  e.preventDefault()
  const loginEmail = loginForm.elements[0].value
  const loginPassword = loginForm.elements[1].value
  const LoginformData = {
    'userName': loginEmail,
    'password': loginPassword
  }
  
  const returnDetails = localStorage.getItem('AuthCredentials')
  
  if (returnDetails === JSON.stringify(LoginformData)) {
    document.querySelector('#authMessage').textContent = 'Succesful: redirecting in a bit'
    document.querySelector('#authMessage').className = 'outline outline-green-500 bg-green-100 p-4 text-center text-green-500 rounded-xl mt-4'
    renderListOfTodos(listOfTasks)
    
    setTimeout(() => {
      AuthContainer.classList.add('hidden')
PageContainer.classList.remove('hidden')
    }, 2000)
  } else {
    document.querySelector('#authMessage').textContent = 'Failed to Authenticate, try again'
    document.querySelector('#authMessage').className = 'outline outline-red-500 bg-red-100 p-4 text-center text-red-500 rounded-xl mt-4'
  }
})


newTodoInputBtn.addEventListener('click', (e)=> {
  e.preventDefault()
  listOfTasks.push(newTodoInputEl.value)
  localStorage.setItem('tasks', JSON.stringify(listOfTasks))
  AuthContainer.classList.add('hidden')
  PageContainer.classList.remove('hidden')
  renderListOfTodos(listOfTasks)
  newTodoInputEl.value = ''
})

