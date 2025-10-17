const Toast = (() => {

const notificationContainer = document.getElementById('notification')
const createToast = (type, message, duration = 3000) => {
  let iconHtml = '';
  let colorClass = 'text-indigo-500 dark:text-indigo-400';
  let title = 'Notification';

  switch (type) {
    case 'success':
      title = 'Success!';
      colorClass = 'text-green-500 dark:text-green-400';
      iconHtml = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />`;
      break;
    case 'error':
      title = 'Error!';
      colorClass = 'text-red-500 dark:text-red-400';
      iconHtml = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />`;
      break;
    case 'warning':
      title = 'Warning!';
      colorClass = 'text-yellow-500 dark:text-yellow-400';
      iconHtml = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />`;
      break;
    default: // info/default
      title = 'Information';
      iconHtml = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />`;
  }

  // 3. Create the toast element
  const newToast = document.createElement('div');
  newToast.className = `max-w-xs w-full bg-white dark:bg-gray-800 shadow-xl rounded-xl p-4 flex items-center space-x-4 transform transition duration-500 ease-in-out opacity-0 translate-y-4`;
  newToast.setAttribute('role', 'alert');

  // 4. Inject the premium HTML structure
  newToast.innerHTML = `
    <div class="flex-shrink-0">
      <svg class="h-6 w-6 ${colorClass}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        ${iconHtml}
      </svg>
    </div>
    
    <div class="flex-1 min-w-0">
      <p class="text-sm font-semibold text-gray-900 dark:text-white truncate">
        ${title}
      </p>
      <p class="text-xs text-gray-500 dark:text-gray-400">
        ${message}
      </p>
    </div>
    
    <div class="flex-shrink-0">
      <button type="button" class="close-toast p-1 rounded-full text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-current">
        <span class="sr-only">Dismiss</span>
        <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  `;

  // 5. Function to remove the toast (with transition)
  const removeToast = () => {
    newToast.classList.remove('opacity-100', 'translate-y-0');
    newToast.classList.add('opacity-0', 'translate-y-4');
    setTimeout(() => {
      newToast.remove();
    }, 500); // Match this timeout to the transition duration (duration-500)
  };

  // 6. Add close button listener
  newToast.querySelector('.close-toast').addEventListener('click', removeToast);
  
  // 7. Append and transition it in
  notificationContainer.appendChild(newToast);
  // Force a reflow to ensure the transition happens
  void newToast.offsetHeight; 
  newToast.classList.add('opacity-100', 'translate-y-0');

  // 8. Auto-dismiss after 'duration'
  if (duration > 0) {
    setTimeout(removeToast, duration);
  }
  
  return { dismiss: removeToast, element: newToast };
};

const success = (message, duration) => {
    return createToast('success', message, duration=3000)
}
const error = (message, duration) => {
    return createToast('error', message, duration=7000)
}
const warning = (message, duration) => {
  return createToast('warning', message, duration = 5000)
}
const info = (message, duration) => {
  return createToast('def', message, duration = 5000)
}


return {
  success, error, warning, info
}

})()

export default Toast