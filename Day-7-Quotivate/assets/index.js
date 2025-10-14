// ========== DATA MANAGEMENT ==========
const QuotesApp = (() => {
  const CATEGORIES = [
    "Favourites",
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

  const STORAGE_KEY = "favoriteQuotes";

  let state = {
    allQuotes: [],
    currentQuotes: [],
    currentIndex: 0,
    currentCategory: "motivation",
  };

  const DOM = {
    card: document.getElementById("card"),
    catSelect: document.getElementById("catSelect"),
  };

  // ========== FETCH & LOAD ==========
  const loadQuotes = async () => {
    try {
      const resp = await fetch("assets/quotes-unified.json");
      if (!resp.ok) throw new Error(`Failed to load JSON (${resp.status})`);
      return await resp.json();
    } catch (err) {
      throw new Error(`Error loading quotes: ${err.message}`);
    }
  };

  // ========== FAVORITES MANAGEMENT ==========
  const getFavorites = () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  };

  const saveFavorites = (favorites) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  };

  const isFavorite = (quote) => {
    return getFavorites().some((fav) => fav.body === quote.body && fav.author === quote.author);
  };

  const toggleFavorite = (quote) => {
    const favorites = getFavorites();
    const index = favorites.findIndex(
      (fav) => fav.body === quote.body && fav.author === quote.author
    );

    if (index > -1) {
      favorites.splice(index, 1);
    } else {
      favorites.push(quote);
    }

    saveFavorites(favorites);
    return !isFavorite(quote);
  };

  // ========== FILTERING ==========
  const filterByCategory = (category) => {
    if (category === "Favourites") {
      state.currentQuotes = getFavorites();
    } else {
      state.currentQuotes = state.allQuotes.filter(
        (quote) => quote.category === category
      );
    }

    state.currentIndex = 0;
    state.currentCategory = category;
  };

  // ========== RENDERING ==========
  const renderQuote = (index) => {
    if (state.currentQuotes.length === 0) {
      DOM.card.innerHTML = `<p class="text-center text-gray-500">No quotes available in this category 📭</p>`;
      return;
    }

    if (index < 0 || index >= state.currentQuotes.length) {
      const message =
        index < 0
          ? "Oops... this is the very beginning of all quotes 😑"
          : "Oops... this is the end of all quotes 😔";
      DOM.card.innerHTML = `<p class="text-center text-gray-500">${message}</p>`;
      return;
    }

    const quote = state.currentQuotes[index];
    const isFav = isFavorite(quote);

    DOM.card.innerHTML = `
      <div class="w-full max-w-xl bg-white shadow-2xl rounded-xl p-8 sm:p-10 border border-gray-100 transform hover:scale-[1.02] transition duration-500 ease-in-out">
        <div class="relative mb-6">
          <span class="absolute top-[-25px] left-[-10px] text-indigo-200 text-7xl font-serif leading-none opacity-75 select-none">"</span>
          <p class="text-gray-800 text-xl sm:text-2xl italic font-serif leading-relaxed pl-4 pr-2">
            "${quote.body}"
          </p>
        </div>

        <div class="flex items-center justify-between">
          <button id="favoriteBtn" class="text-2xl transition-transform hover:scale-125" title="Add to favorites">
            ${isFav ? `<i class="fa-solid fa-heart"></i>
` : `<i class="fa-regular fa-heart"></i>`}
          </button>
          
          <div class="flex items-center justify-end flex-1 ml-4">
            <div class="w-1/6 h-[2px] bg-indigo-500 mr-4"></div>
            <p class="text-gray-400 text-xs font-semibold tracking-wider uppercase">
              ${quote.author}
            </p>
          </div>
        </div>
      </div>
    `;

    // Favorite button listener
    const favoriteBtn = document.getElementById("favoriteBtn");
    if (favoriteBtn) {
      favoriteBtn.addEventListener("click", () => {
        toggleFavorite(quote);
        renderQuote(state.currentIndex);
      });
    }
  };

  // ========== NAVIGATION ==========
  const next = () => {
    if (state.currentIndex < state.currentQuotes.length - 1) {
      state.currentIndex++;
      renderQuote(state.currentIndex);
    }
  };

  const prev = () => {
    if (state.currentIndex > 0) {
      state.currentIndex--;
      renderQuote(state.currentIndex);
    }
  };

  // ========== UI SETUP ==========
  const initCategories = () => {
    DOM.catSelect.innerHTML = CATEGORIES.map(
      (cat) => `<option value="${cat}">${cat}</option>`
    ).join("");

    DOM.catSelect.addEventListener("change", (e) => {
      filterByCategory(e.target.value);
      renderQuote(0);
    });
  };

  // ========== DOWNLOAD ==========
  const downloadQuote = () => {
    if (state.currentQuotes.length === 0) {
      alert("No quote to download");
      return;
    }

    html2canvas(DOM.card).then((canvas) => {
      const anchor = document.createElement("a");
      anchor.download = "quote.jpg";
      anchor.href = canvas.toDataURL();
      anchor.click();
    });
  };

  // ========== INITIALIZATION ==========
  const init = async () => {
    try {
      initCategories();
      state.allQuotes = await loadQuotes();
      filterByCategory("Favourites");
      renderQuote(0);
    } catch (err) {
      DOM.card.innerHTML = `<pre class="text-red-500">Error: ${err.message}</pre>`;
    }
  };

  // ========== PUBLIC API ==========
  return {
    init,
    next,
    prev,
    downloadQuote,
    filterByCategory,
  };
})();

// ========== START APP ==========
QuotesApp.init();

// ========== GLOBAL FUNCTIONS (for HTML onclick) ==========
const nextQuote = () => QuotesApp.next();
const prevQuote = () => QuotesApp.prev();
const downloadCurrentQuote = () => QuotesApp.downloadQuote();