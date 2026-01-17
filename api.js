const API_BASE = "https://api.artic.edu/api/v1/artworks";

async function fetchArtworksPage(page = 1, limit = 8) {
  try {
    const url = `${API_BASE}?page=${page}&limit=${limit}&fields=id,title,artist_display,date_display,image_id,thumbnail`;
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Failed to fetch artworks:", err);
    return null;
  }
}

function buildImageUrl(imageId) {
  return `https://www.artic.edu/iiif/2/${imageId}/full/843,/0/default.jpg`;
}
