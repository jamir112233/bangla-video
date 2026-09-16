const videos = [
  {title:"Welcome to Vidzora", category:"education", description:"A quick tour of the platform.", type:"Demo"},
  {title:"Creative Video Ideas", category:"entertainment", description:"Ideas and inspiration for creators.", type:"Guide"},
  {title:"Build a Better Website", category:"tech", description:"Simple principles for a smooth web experience.", type:"Tech"},
  {title:"Learn Something New", category:"education", description:"A placeholder for your authorized content.", type:"Learn"},
  {title:"Creator Spotlight", category:"entertainment", description:"Showcase your own or licensed videos here.", type:"Featured"},
  {title:"Web Tips & Tricks", category:"tech", description:"Useful tips for modern websites.", type:"Tips"}
];

const grid = document.getElementById("videoGrid");
const search = document.getElementById("searchInput");
const empty = document.getElementById("emptyState");
let category = "all";

function render(){
  const q = search.value.trim().toLowerCase();
  const filtered = videos.filter(v =>
    (category === "all" || v.category === category) &&
    (v.title.toLowerCase().includes(q) || v.description.toLowerCase().includes(q))
  );
  grid.innerHTML = filtered.map((v,i)=>`
    <article class="card" style="animation-delay:${i*50}ms">
      <div class="thumb">
        <span class="tag">${v.type}</span>
        <span class="play">▶</span>
      </div>
      <div class="card-body">
        <h3>${v.title}</h3>
        <p>${v.description}</p>
      </div>
    </article>
  `).join("");
  empty.hidden = filtered.length !== 0;
}

document.querySelectorAll(".chip").forEach(btn=>{
  btn.addEventListener("click",()=>{
    document.querySelectorAll(".chip").forEach(x=>x.classList.remove("active"));
    btn.classList.add("active");
    category = btn.dataset.category;
    render();
  });
});
search.addEventListener("input",render);

document.getElementById("themeBtn").addEventListener("click",()=>{
  document.body.classList.toggle("light");
});

render();
