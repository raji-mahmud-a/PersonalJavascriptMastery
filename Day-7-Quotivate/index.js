
async function loadQuotes() {
  const resp = await fetch("quotes-unified.json");

  if (!resp.ok) throw new Error(`Failed to load JSON (${resp.status})`);

  return await resp.json(); // array of quote objects
}

const catSelectEl = document.getElementById("catSelect");

let catArr = [
  "motivation",

  "famous-quotes",

  "life",

  "love",

  "work",

  "spirituality",

  "creativity",

  "wisdom",

  "nature",

  "learning",

  "courage",

  "happiness",

  "humor",

  "friendship",

  "technology",
];

catArr.forEach((val, idx) => {
  catSelectEl.innerHTML += `<option value=${val}>${val}</option>`;
});

let cachedQuotes = [];

let arrOnFly = [];

let n = 0;

function render(n) {
  if (n >= arrOnFly.length) {
    document.getElementById("card").innerHTML = `
    <p>Oops... this is the end of all quotes in category 😔</p>
    `;
    n = arrOnFly.length - 1
    
    //render(n)
  }else if (n >= 0 && n<arrOnFly.length) {
    document.getElementById("card").innerHTML = `
  <div class="w-full max-w-xl bg-white shadow-2xl rounded-xl p-8 sm:p-10 border border-gray-100 transform hover:scale-[1.02] transition duration-500 ease-in-out">

    <div class="relative mb-6">
      <span class="absolute top-[-25px] left-[-10px] text-indigo-200 text-7xl font-serif leading-none opacity-75 select-none">“</span>
      
      <p class="text-gray-800 text-xl sm:text-2xl italic font-serif leading-relaxed pl-4 pr-2">
        "${arrOnFly[n].body}"
      </p>
    </div>

    <div class="flex items-center justify-end">
      <div class="w-1/6 h-[2px] bg-indigo-500 mr-4"></div>
      
      <p class="text-gray-400 text-xs font-semibold tracking-wider uppercase">
        ${arrOnFly[n].author}
      </p>
    </div>

    </div>

      `;
  } else {
    document.getElementById("card").innerHTML = `
      <p>Oops this is the very beginning of all the quotes in this section 😑</p>
    `;
    n=0
  }
  
}

function prev() {
  if (n>=arrOnFly.length) {
      render(arrOnFly.length-1)
    } else if (n < 0) {
    n = 0;
  } else {
    n--;
    render(n);
  }
}

const filterQuotesByCategory = (cat) => {
  let qfly = [];

  for (var i = 0; i < cachedQuotes.length; i++) {
    if (cachedQuotes[i]["category"] === cat) {
      qfly.push(cachedQuotes[i]);
    }
  }

  arrOnFly = qfly;
};

catSelectEl.addEventListener("change", (e) => {
  filterQuotesByCategory(e.target.value);

  render(0);
});

function next() {
  n++;

  render(n);
}

const getallquotes = async () => {
  try {
    const loaded = await loadQuotes();

    cachedQuotes.push(...loaded);

    //let arrOnFly =[]

    filterQuotesByCategory("motivation");

    render(0);
  } catch (e) {
    document.getElementById("card").innerHTML =
      `<pre>Error loading data: ${e.message}</pre>`;
  }
};

getallquotes();

    function download() {
        html2canvas(document.getElementById("card")).then(function (canvas) {
        const anchor = document.createElement("a");
        anchor.download = "sample.jpg";
        anchor.href = canvas.toDataURL();
        anchor.target = "_blank";
        anchor.click();
       });
    }