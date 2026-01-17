const grid = document.getElementById("galleryGrid");
const modal = document.getElementById("artModal");
const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const modalArtist = document.getElementById("modalArtist");
const modalDate = document.getElementById("modalDate");
const modalMedium = document.getElementById("modalMedium");
const closeModal = document.getElementById("closeModal");

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let currentPage = 1;
const PAGE_SIZE = 8;
let lastFetchedData = null;

function showSkeletons(count = PAGE_SIZE) {
  grid.innerHTML = "";
  for (let i = 0; i < count; i++) {
    const skeleton = document.createElement("div");
    skeleton.className = "art-item skeleton";
    grid.appendChild(skeleton);
  }
}

async function renderPage(page) {
  showSkeletons();

  const data = await fetchArtworksPage(page, PAGE_SIZE);
  lastFetchedData = data;
  const artworks = data?.data || [];

  grid.innerHTML = "";

  if (!artworks.length) {
    grid.innerHTML = "<p style='text-align:center;'>No artworks found.</p>";
    return;
  }

  artworks.forEach((obj) => {
    if (!obj.image_id) return;

    const item = document.createElement("div");
    item.className = "art-item";

    const img = document.createElement("img");
    img.src = buildImageUrl(obj.image_id);
    img.alt = obj.title;

    const desc = document.createElement("div");
    desc.className = "art-desc";
    desc.innerHTML = `<strong>${obj.title}</strong>`;

    item.appendChild(img);
    item.appendChild(desc);
    grid.appendChild(item);

    img.addEventListener("click", () => {
      modalImage.src = img.src;
      modalTitle.textContent = obj.title;
      modalArtist.textContent = obj.artist_display || "Unknown";
      modalDate.textContent = obj.date_display || "";
      modalMedium.textContent = "";
      modal.classList.add("active");
    });
  });

  updatePaginationButtons();
}

function updatePaginationButtons() {
  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = !lastFetchedData?.pagination?.next_url;
}

prevBtn.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    renderPage(currentPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
});

nextBtn.addEventListener("click", () => {
  if (lastFetchedData?.pagination?.next_url) {
    currentPage++;
    renderPage(currentPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
});

closeModal.addEventListener("click", () => modal.classList.remove("active"));
modal.addEventListener("click", (e) => {
  if (e.target === modal) modal.classList.remove("active");
});

renderPage(currentPage);
