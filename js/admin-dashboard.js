document.addEventListener("DOMContentLoaded", () => {
  // Elements
  const sidebar = document.getElementById("sidebar");
  const hamburger = document.getElementById("hamburger");
  const closeSidebar = document.getElementById("closeSidebar");

  // Hamburger toggle (open/close)
  hamburger.addEventListener("click", () => {
    sidebar.classList.toggle("open");
  });

  // Close button inside sidebar
  if (closeSidebar) {
    closeSidebar.addEventListener("click", () => {
      sidebar.classList.remove("open");
    });
  }

  // Year in footer
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Simple page switching
  const navButtons = document.querySelectorAll(".nav-item");
  const pages = document.querySelectorAll("[data-page]");

  function openPage(pageId) {
    // left nav active state
    navButtons.forEach(b =>
      b.classList.toggle("active", b.dataset.page === pageId)
    );
    // show/hide page sections
    pages.forEach(sec => {
      const isTarget = sec.dataset.page === pageId;
      sec.hidden = !isTarget;
      if (sec.classList.contains("welcome")) {
        sec.hidden = pageId !== "home";
      }
    });
    // auto-close sidebar on mobile
    sidebar.classList.remove("open");
  }

  // Hook up left-nav
  navButtons.forEach(btn => {
    btn.addEventListener("click", () => openPage(btn.dataset.page));
  });

  // Quick action buttons inside cards
  document.querySelectorAll(".ghost-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const target = btn.getAttribute("data-open");
      openPage(target);
    });
  });

  // View toggle (demo)
  const viewToggle = document.getElementById("viewToggle");
  if (viewToggle) {
    viewToggle.addEventListener("click", () => {
      const grid = document.getElementById("quickActions");
      if (grid) grid.classList.toggle("dense");
    });
  }

  // Fake search (demo)
  const searchBtn = document.getElementById("searchBtn");
  const searchInput = document.getElementById("searchInput");
  if (searchBtn && searchInput) {
    searchBtn.addEventListener("click", () => {
      const q = searchInput.value.trim();
      if (q) alert(`Search for: "${q}" (demo only)`);
    });
  }
});
