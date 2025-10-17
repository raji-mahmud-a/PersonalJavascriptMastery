const Linksss = [
    {
        ProjectName: 'Hello World',
        HomePageLink: '/Day-1-Hello-world-with-an-alert/index.html',
        GithubLink:'https://github.com/raji-mahmud-a/PersonalJavascriptMastery/tree/main/Day-1-Hello-world-with-an-alert',
        DescriptionText: 'Well..... we all wrote an hello world program once, right? This is mine!!!',
        CoverImg: '/img/img1.png'
    },
    {
        ProjectName: 'Digital Clock',
        HomePageLink:'/Day-2-Current-Date-and-Time/index.html',
        GithubLink:'https://github.com/raji-mahmud-a/PersonalJavascriptMastery/tree/main/Day-2-Current-Date-and-Time',
        DescriptionText: 'A digital clock made on JavaScript date object with a little bit of Tailwind',
        CoverImg: '/img/img2.png'
    },
        {
        ProjectName: 'Todo App',
        HomePageLink: '/Day-3-Todo-App-with-login/index.html',
        GithubLink:'https://github.com/raji-mahmud-a/PersonalJavascriptMastery/tree/main/Day-3-Todo-App-with-login',
        DescriptionText: 'My todo app with Tailwind styling and localStorage for storage...',
        CoverImg: '/img/img3.png'
    },
        {
        ProjectName: 'Scientific Calculator!!!',
        HomePageLink: '/Day-4-Calculator!!!/index.html',
        GithubLink: 'https://github.com/raji-mahmud-a/PersonalJavascriptMastery/tree/main/Day-4-Calculator!!!',
        DescriptionText: 'Scientific calculator app made with JavaScript and with maths and physics constants',
        CoverImg: '/img/img4.png'
    },
        {
        ProjectName: '24/12 hour Digital clock',
        HomePageLink: '/Day-5-Date-and-Time-with-24-and-12-hr-toggle/index.html',
        GithubLink: 'https://github.com/raji-mahmud-a/PersonalJavascriptMastery/tree/main/Day-5-Date-and-Time-with-24-and-12-hr-toggle',
        DescriptionText: 'A digital clock made on JavaScript date object with a littlebit of Tailwind and equipped with 24/12 hour format toggle',
        CoverImg: '/img/img5.png'
    },
    {
        ProjectName: 'CharacterCount',
        HomePageLink: '/Day-6-Word-and-and-character-counter-app/index.html',
        GithubLink: 'https://github.com/raji-mahmud-a/PersonalJavascriptMastery/tree/main/Day-6-Word-and-and-character-counter-app/',
        DescriptionText:'A word and character counter app made with javascript to count the amount of word or characters in your writeup',
        CoverImg: '/img/img6.png'
    },
      {
        ProjectName: 'QuotiVate',
        HomePageLink: '/Day-7-Quotivate/index.html',
        GithubLink: 'https://github.com/raji-mahmud-a/PersonalJavascriptMastery/tree/main/Day-7-Quotivate/',
        DescriptionText:'A word and character counter app made with javascript to count the amount of word or characters in your writeup',
        CoverImg: '/img/img7.png'
    },
      {
        ProjectName: 'Weather App',
        HomePageLink: '/Day-9-Weather-app/index.html',
        GithubLink: 'https://github.com/raji-mahmud-a/PersonalJavascriptMastery/tree/main/Day-9-Weather-app/',
        DescriptionText: 'A premium weather app that uses decice gps and ip address to get location and then gets weather data for that location',
        CoverImg: '/img/img8.png'
      }
]

function truncate(str, n){
  return (str.length > n) ? str.slice(0, n-1) + '&hellip;' : str;
};

const CardContainerEl = document.getElementById('CardContainer')

for (let link of Linksss) {
    
    let descTxt = truncate(link.DescriptionText, 115)
    
    CardContainerEl.innerHTML += `
         <div class="w-full hover:scale-115 bg-orange-400 overflow-hidden rounded-3xl flex items-center justify-center flex-col max-w-[450px] w-full ">
    <img src="${link.CoverImg}" alt="project...." class="w-full h-[200px]"/>
    <div class="p-4 w-full flex items-center justify-center flex-col space-y-1">
      <h1 class="underline text-stone-900 text-lg text-left w-full font-bold ">${ link.ProjectName }</h1>
      <p class="text-stone-700 ">${ descTxt }</p>
      
      <div class="pt-3 w-full flex items-center justify-center flex-row space-x-2">
        <button class="btnnn hover:scale-115 w-full bg-stone-900 text-orange-500">
          <a href="${link.GithubLink}" class=" w-full h-full p-2 font-sm flex space-x-2 items-center justify-center" target="_blank">Source Code
            <i class="fa-brands fa-github font-xl"></i>
          </a>
        </button>
        <button class="btnnn2 hover:scale-115 w-full bg-stone-900 text-orange-500">
          <a href="${link.HomePageLink}"  class=" w-full h-full p-2 font-sm flex space-x-2 items-center justify-center" target="_blank">live Site
            <i class="fa-solid fa-link font-xl"></i>
          </a>
        </button>
        
      </div>
    </div>
  </div>
    `
}