const defaultVideos = [
  {
    title: "Welcome to Vidzora",
    category: "education",
    description: "A quick tour of the platform.",
    type: "Demo"
  },
  {
    title: "Creative Video Ideas",
    category: "entertainment",
    description: "Ideas and inspiration for creators.",
    type: "Guide"
  },
  {
    title: "Build a Better Website",
    category: "tech",
    description: "Simple principles for a smooth web experience.",
    type: "Tech"
  },
  {
    title: "Learn Something New",
    category: "education",
    description: "A placeholder for your authorized content.",
    type: "Learn"
  },
  {
    title: "Creator Spotlight",
    category: "entertainment",
    description: "Showcase your own or licensed videos here.",
    type: "Featured"
  },
  {
    title: "Web Tips & Tricks",
    category: "tech",
    description: "Useful tips for modern websites.",
    type: "Tips"
  }
];

const grid = document.getElementById("videoGrid");
const search = document.getElementById("searchInput");
const empty = document.getElementById("emptyState");

let category = "all";

function getPosts() {
  try {
    return JSON.parse(localStorage.getItem("vidzoraPosts")) || [];
  } catch (error) {
    return [];
  }
}

function getAllVideos() {
  const posts = getPosts();

  const userVideos = posts.map(post => ({
    title: post.title,
    category: post.category,
    description: post.description,
    type: "Post",
    videoUrl: post.videoUrl
  }));

  return [...userVideos, ...defaultVideos];
}

function render() {
  const q = search ? search.value.trim().toLowerCase() : "";
  const videos = getAllVideos();

  const filtered = videos.filter(v => {
    const matchesCategory =
      category === "all" || v.category === category;

    const matchesSearch =
      !q ||
      v.title.toLowerCase().includes(q) ||
      v.description.toLowerCase().includes(q);

    return matchesCategory && matchesSearch;
  });

  if (!grid) return;

  grid.innerHTML = filtered.map((v, i) => `
    <article class="card" style="animation-delay:${i * 50}ms">
      <div class="thumb">
        <span class="tag">${v.type}</span>
        <span class="play">▶</span>
      </div>

      <div class="card-body">
        <h3>${escapeHTML(v.title)}</h3>
        <p>${escapeHTML(v.description)}</p>

        ${
          v.videoUrl
            ? `<a class="watch-link" href="${escapeAttribute(v.videoUrl)}" target="_blank" rel="noopener">
                 Watch video →
               </a>`
            : ""
        }
      </div>
    </article>
  `).join("");

  if (empty) {
    empty.hidden = filtered.length !== 0;
  }
}

function escapeHTML(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function escapeAttribute(text) {
  return String(text)
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

document.querySelectorAll(".chip").forEach(btn => {
  btn.addEventListener("click", () => {

    document
      .querySelectorAll(".chip")
      .forEach(x => x.classList.remove("active"));

    btn.classList.add("active");

    category = btn.dataset.category;

    render();
  });
});

if (search) {
  search.addEventListener("input", render);
}

const themeBtn = document.getElementById("themeBtn");

if (themeBtn) {
  themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("light");
  });
}

render();
