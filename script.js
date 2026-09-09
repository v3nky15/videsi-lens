// Read the choices included in the page's address.
const params = new URLSearchParams(window.location.search);

function categoryUrl(id) {
  return `./category.html?category=${encodeURIComponent(id)}`;
}

function albumUrl(categoryId, albumId) {
  return `./album.html?category=${encodeURIComponent(categoryId)}&album=${encodeURIComponent(albumId)}`;
}

// HOME PAGE: browse categories using the photo book.
const bookLink = document.querySelector("#book-link");

if (bookLink) {
  let currentIndex = 0;

  function updateBook() {
    const category = categories[currentIndex];

    const cover = document.querySelector("#book-cover");
    cover.src = category.cover;
    cover.alt = `View ${category.name} photographs`;

    bookLink.href = categoryUrl(category.id);

    document.querySelector("#book-category").textContent =
      category.name;

    document.querySelector("#book-count").textContent =
      `${String(currentIndex + 1).padStart(2, "0")} / ${
        String(categories.length).padStart(2, "0")
      }`;
  }

  document.querySelector("#next-category").addEventListener(
    "click",
    () => {
      currentIndex = (currentIndex + 1) % categories.length;
      updateBook();
    }
  );

  document.querySelector("#previous-category").addEventListener(
    "click",
    () => {
      currentIndex =
        (currentIndex - 1 + categories.length) % categories.length;

      updateBook();
    }
  );

  updateBook();
}

// Find the category requested by the current address.
// CATEGORY PAGE: display this category's photographs.
const categoryPage = document.querySelector("#category-page");

if (categoryPage) {
  const selectedCategory = categories.find(
    (category) => category.id === params.get("category")
  );

  const title = document.querySelector("#category-title");
  const summary = document.querySelector("#category-summary");
  const grid = document.querySelector("#photo-grid");

  if (!selectedCategory) {
    title.textContent = "Collection not found";
    summary.textContent =
      "Return to the photo book and choose a category.";
  } else {
    document.title = `${selectedCategory.name} — Videsi Lens`;
    title.textContent = selectedCategory.name;

    if (selectedCategory.photos.length === 0) {
      summary.textContent = "Photographs coming soon.";
    }

    selectedCategory.photos.forEach((path, index) => {
      const image = document.createElement("img");

      image.src = path;
      image.alt =
        `${selectedCategory.name} — photograph ${index + 1}`;
      image.loading = "lazy";

      
      const button = document.createElement("button");

button.type = "button";
button.className = "photo-button";
button.setAttribute(
  "aria-label",
  `Enlarge photograph ${index + 1}`
);

button.append(image);
grid.append(button);

button.addEventListener("click", () => {
  const viewer = document.querySelector("#photo-viewer");
  const viewerImage = document.querySelector("#viewer-image");

  viewerImage.src = path;
  viewerImage.alt = image.alt;

  viewer.showModal();
});
    });
  }
}

const viewer = document.querySelector("#photo-viewer");
const closeViewer = document.querySelector("#close-viewer");

if (viewer && closeViewer) {
  closeViewer.addEventListener("click", () => {
    viewer.close();
  });
}