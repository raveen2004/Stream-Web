// ---------- Sample data (all fictional) ----------
const titles = [
  { id: 1,  name: "Midnight Circuit",   type: "movie",  genre: "Action",   year: 2025, rating: "U/A 16+", c: ["#ff512f", "#dd2476"], desc: "A retired street racer is pulled back into the underground for one last race that could save his city." },
  { id: 2,  name: "The Last Lighthouse", type: "series", genre: "Thriller", year: 2024, rating: "U/A 16+", c: ["#232526", "#414345"], desc: "A keeper on a remote island discovers that the ships passing at night are not what they seem." },
  { id: 3,  name: "Laugh Factory",      type: "series", genre: "Comedy",   year: 2026, rating: "U/A 13+", c: ["#f7971e", "#ffd200"], desc: "Five struggling comedians share one tiny apartment and one big dream." },
  { id: 4,  name: "Orbit Zero",         type: "movie",  genre: "Sci-Fi",   year: 2026, rating: "U/A 13+", c: ["#0f2027", "#2c5364"], desc: "When a space station loses contact with Earth, the crew must decide who to trust." },
  { id: 5,  name: "Spice Route",        type: "series", genre: "Drama",    year: 2023, rating: "U/A 13+", c: ["#b24592", "#f15f79"], desc: "Three generations of a merchant family fight to keep their legacy alive across a changing coast." },
  { id: 6,  name: "Dark Harbor",        type: "movie",  genre: "Thriller", year: 2022, rating: "A 18+",   c: ["#141e30", "#243b55"], desc: "A detective returns to his hometown to solve a case that has haunted him for twenty years." },
  { id: 7,  name: "Pixel Pals",         type: "series", genre: "Family",   year: 2025, rating: "U",       c: ["#00c6ff", "#0072ff"], desc: "A group of game characters go on adventures when the console is switched off." },
  { id: 8,  name: "Monsoon Letters",    type: "movie",  genre: "Romance",  year: 2024, rating: "U/A 13+", c: ["#56ab2f", "#a8e063"], desc: "Two strangers fall in love through letters mistakenly delivered to the wrong address." },
  { id: 9,  name: "Iron Valley",        type: "movie",  genre: "Action",   year: 2023, rating: "U/A 16+", c: ["#870000", "#190a05"], desc: "A small-town mechanic becomes the unlikely leader of a rebellion against a mining empire." },
  { id: 10, name: "The Cooking Duel",   type: "series", genre: "Reality",  year: 2026, rating: "U",       c: ["#f12711", "#f5af19"], desc: "Home cooks battle it out in a kitchen where every ingredient is a surprise." },
  { id: 11, name: "Echoes of Time",     type: "series", genre: "Sci-Fi",   year: 2025, rating: "U/A 16+", c: ["#41295a", "#2f0743"], desc: "A physicist discovers she can hear conversations from the past, and one of them is a warning." },
  { id: 12, name: "Backbenchers",       type: "movie",  genre: "Comedy",   year: 2024, rating: "U/A 13+", c: ["#11998e", "#38ef7d"], desc: "A group of college friends try to fake their way through the final year exams." },
  { id: 13, name: "Desert Kings",       type: "movie",  genre: "Adventure",year: 2022, rating: "U/A 13+", c: ["#c79081", "#dfa579"], desc: "Two rival explorers race across the desert to find a lost city of gold." },
  { id: 14, name: "Whisper House",      type: "series", genre: "Horror",   year: 2025, rating: "A 18+",   c: ["#1d1d1d", "#6b0f1a"], desc: "A family moves into a quiet old home where the walls seem to remember everything." },
  { id: 15, name: "Wild Planet Live",   type: "series", genre: "Documentary", year: 2024, rating: "U",    c: ["#134e5e", "#71b280"], desc: "Breathtaking footage from the planet's most remote and untouched corners." },
  { id: 16, name: "City of Rain",       type: "movie",  genre: "Drama",    year: 2026, rating: "U/A 16+", c: ["#355c7d", "#c06c84"], desc: "Over one stormy night, four strangers' lives collide in a flooded city." }
];

const categories = [
  { title: "Trending Now",      pick: t => [1, 4, 2, 10, 14, 3, 11, 9] .map(id => byId(id)) },
  { title: "Action & Adventure", pick: t => t.filter(x => ["Action", "Adventure"].includes(x.genre)) },
  { title: "Thrillers & Horror", pick: t => t.filter(x => ["Thriller", "Horror"].includes(x.genre)) },
  { title: "Comedy Corner",     pick: t => t.filter(x => x.genre === "Comedy" || x.genre === "Family") },
  { title: "Drama & Romance",   pick: t => t.filter(x => ["Drama", "Romance"].includes(x.genre)) },
  { title: "Sci-Fi Picks",      pick: t => t.filter(x => x.genre === "Sci-Fi") },
  { title: "Real Life",         pick: t => t.filter(x => ["Documentary", "Reality"].includes(x.genre)) }
];

// ---------- State ----------
let currentFilter = "all";
let searchText = "";
let currentTitle = null;
let myList = loadList();
let featured = titles[0];

function byId(id) { return titles.find(t => t.id === id); }
function gradient(t) { return `linear-gradient(135deg, ${t.c[0]}, ${t.c[1]})`; }

function loadList() {
  try { return JSON.parse(localStorage.getItem("stream Web_list")) || []; }
  catch (e) { return []; }
}
function saveList() {
  try { localStorage.setItem("stream Web_list", JSON.stringify(myList)); } catch (e) {}
}

// ---------- Hero ----------
function renderHero() {
  const hero = document.getElementById("hero");
  hero.style.backgroundImage = gradient(featured);
  document.getElementById("hero-title").textContent = featured.name;
  document.getElementById("hero-meta").innerHTML =
    `98% Match <span>${featured.year} &nbsp;|&nbsp; ${featured.rating} &nbsp;|&nbsp; ${featured.genre}</span>`;
  document.getElementById("hero-desc").textContent = featured.desc;
}

// ---------- Rows ----------
function matches(t) {
  if (currentFilter === "series" && t.type !== "series") return false;
  if (currentFilter === "movie" && t.type !== "movie") return false;
  if (currentFilter === "mylist" && !myList.includes(t.id)) return false;
  if (searchText) {
    const q = searchText.toLowerCase();
    return t.name.toLowerCase().includes(q) || t.genre.toLowerCase().includes(q);
  }
  return true;
}

function renderRows() {
  const container = document.getElementById("rows");
  container.innerHTML = "";
  let any = false;

  categories.forEach(cat => {
    const items = cat.pick(titles).filter(matches);
    if (!items.length) return;
    any = true;

    const row = document.createElement("section");
    row.className = "row";
    row.innerHTML = `
      <h3>${cat.title}</h3>
      <div class="row-wrap">
        <button class="arrow left">&#8249;</button>
        <div class="row-posters"></div>
        <button class="arrow right">&#8250;</button>
      </div>`;

    const posters = row.querySelector(".row-posters");
    items.forEach(t => {
      const card = document.createElement("div");
      card.className = "card";
      card.style.background = gradient(t);
      card.innerHTML = `<div class="card-title">${t.name}</div>`;
      card.addEventListener("click", () => openModal(t));
      posters.appendChild(card);
    });

    row.querySelector(".arrow.left").addEventListener("click", () =>
      posters.scrollBy({ left: -posters.clientWidth * 0.8 }));
    row.querySelector(".arrow.right").addEventListener("click", () =>
      posters.scrollBy({ left: posters.clientWidth * 0.8 }));

    container.appendChild(row);
  });

  if (!any) {
    container.innerHTML = `<p class="empty">${
      currentFilter === "mylist" && !searchText
        ? "Your list is empty. Open any title and click “+ My List”."
        : "No titles found."
    }</p>`;
  }
}

// ---------- Modal ----------
const modal = document.getElementById("modal");

function openModal(t) {
  currentTitle = t;
  document.getElementById("modal-banner").style.backgroundImage = gradient(t);
  document.getElementById("player-msg").textContent = "";
  document.getElementById("modal-title").textContent = t.name;
  document.getElementById("modal-meta").textContent =
    `${t.year}  •  ${t.rating}  •  ${t.genre}  •  ${t.type === "series" ? "Series" : "Movie"}`;
  document.getElementById("modal-desc").textContent = t.desc;
  updateListButton();
  modal.classList.add("open");
}

function closeModal() { modal.classList.remove("open"); }

function updateListButton() {
  const btn = document.getElementById("modal-list");
  btn.textContent = myList.includes(currentTitle.id) ? "✓ In My List" : "+ My List";
}

document.getElementById("modal-close").addEventListener("click", closeModal);
modal.addEventListener("click", e => { if (e.target === modal) closeModal(); });
document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });

document.getElementById("modal-play").addEventListener("click", () => {
  document.getElementById("player-msg").textContent = `▶ Now playing “${currentTitle.name}” (demo)`;
});

document.getElementById("modal-list").addEventListener("click", () => {
  const id = currentTitle.id;
  myList = myList.includes(id) ? myList.filter(x => x !== id) : [...myList, id];
  saveList();
  updateListButton();
  renderRows();
});

// ---------- Hero buttons ----------
document.getElementById("hero-play").addEventListener("click", () => {
  openModal(featured);
  document.getElementById("player-msg").textContent = `▶ Now playing “${featured.name}” (demo)`;
});
document.getElementById("hero-info").addEventListener("click", () => openModal(featured));

// ---------- Nav ----------
document.querySelectorAll(".nav-links a").forEach(a => {
  a.addEventListener("click", e => {
    e.preventDefault();
    document.querySelectorAll(".nav-links a").forEach(x => x.classList.remove("active"));
    a.classList.add("active");
    currentFilter = a.dataset.filter;
    renderRows();
  });
});

document.getElementById("search").addEventListener("input", e => {
  searchText = e.target.value.trim();
  renderRows();
});

window.addEventListener("scroll", () => {
  document.getElementById("navbar").classList.toggle("scrolled", window.scrollY > 40);
});

// ---------- Init ----------
renderHero();
renderRows();
