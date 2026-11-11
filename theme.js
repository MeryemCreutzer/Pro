const storageKey = "portfolio-theme";
const themeButton = document.querySelector(".theme-toggle");

function applyTheme(theme) {
  const isDark = theme === "dark";

  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;

  if (themeButton) {
    themeButton.setAttribute("aria-pressed", String(isDark));
    themeButton.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
  }
}

applyTheme(document.documentElement.dataset.theme);

themeButton?.addEventListener("click", () => {
  const currentTheme = document.documentElement.dataset.theme === "dark" ? "dark" : "light";
  const nextTheme = currentTheme === "dark" ? "light" : "dark";

  applyTheme(nextTheme);
  try {
    localStorage.setItem(storageKey, nextTheme);
  } catch {
    // Keep the toggle working when browser storage is unavailable.
  }
});

const photoLightbox = document.querySelector(".photo-lightbox");
const photoLightboxImage = photoLightbox?.querySelector("img");
const photoLightboxTitle = photoLightbox?.querySelector("h2");
const photoLightboxCaption = photoLightbox?.querySelector("p");
const photoLightboxClose = photoLightbox?.querySelector(".photo-lightbox-close");

document.querySelectorAll(".photo-view-button").forEach((button) => {
  button.addEventListener("click", () => {
    const card = button.closest(".photo-card");
    const image = button.querySelector("img");
    const title = card?.querySelector("figcaption span")?.textContent || "";
    const caption = card?.querySelector("figcaption small")?.textContent || "";

    if (!photoLightbox || !photoLightboxImage || !photoLightboxTitle || !photoLightboxCaption || !image) {
      return;
    }

    photoLightboxImage.src = image.src;
    photoLightboxImage.alt = image.alt;
    photoLightboxTitle.textContent = title;
    photoLightboxCaption.textContent = caption;
    photoLightbox.showModal();
    photoLightboxClose?.focus();
  });
});

photoLightboxClose?.addEventListener("click", () => {
  photoLightbox?.close();
});

photoLightbox?.addEventListener("click", (event) => {
  if (event.target === photoLightbox) {
    photoLightbox.close();
  }
});

const backToTopButton = document.querySelector(".back-to-top");

function updateBackToTopButton() {
  backToTopButton?.classList.toggle("is-visible", window.scrollY > 480);
}

backToTopButton?.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

if (backToTopButton) {
  updateBackToTopButton();
  window.addEventListener("scroll", updateBackToTopButton, { passive: true });
}
