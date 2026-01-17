// declaring constants
const galleryImages = document.querySelectorAll("artImage");
const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const modalArtist = document.getElementById("modalArtist");
const modalDateDisplay = document.getElementById("modalDate");
const modalDescription = document.getElementById("modalDescription");

// fetching data from art API
fetch("https://api.artic.edu/api/v1/artworks?limit=24&fields=id,title,artist_display,date_display,image_id,description")
.then(res => res.json)
.then(result => {
  const artworks = result.data;

  galleryImages.forEach((img, index) => {
    const artwork = artworks[index];
    if (!artwork || !artwork.image_id){return;}

    const imageUrl = `https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`;
    img.src = imageUrl;

    const viewDetailsBtn = getElementsByClassName("view-details")
    viewDetailsBtm.addEventListetner(
      
    )
  }
})


