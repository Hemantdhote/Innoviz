// === Sidebar toggle (mobile) ===
const sidebar = document.getElementById("sidebar");
const burger  = document.getElementById("hamburger");
burger.addEventListener("click", () => {
  sidebar.classList.toggle("open");
});

// === Year in footer ===
document.getElementById("year").textContent = new Date().getFullYear();

// === Simple page switching (works for nav + cards) ===
const navButtons = document.querySelectorAll(".nav-item");
const pages      = document.querySelectorAll("[data-page]");

function openPage(pageId) {
  // highlight active button
  navButtons.forEach(b => {
    b.classList.toggle("active", b.dataset.page === pageId);
  });

  // show/hide sections
  pages.forEach(sec => {
    if (sec.classList.contains("welcome")) {
      // only visible on “home”
      sec.hidden = pageId !== "home";
    } else {
      sec.hidden = sec.dataset.page !== pageId;
    }
  });

  // close sidebar on mobile
  sidebar.classList.remove("open");
}

// hook up clicks on nav and cards
navButtons.forEach(btn => {
  btn.addEventListener("click", () => openPage(btn.dataset.page));
});

// also allow buttons with data-open attr to jump
document.querySelectorAll("[data-open]").forEach(btn => {
  btn.addEventListener("click", () => {
    openPage(btn.getAttribute("data-open"));
  });
});

// === Optional view-toggle for cards density ===
const viewToggle = document.getElementById("viewToggle");
if (viewToggle) {
  viewToggle.addEventListener("click", () => {
    const grid = document.getElementById("quickActions");
    if (grid) grid.classList.toggle("dense");
  });
}

// === Fake search (demo) ===
const searchBtn = document.getElementById("searchBtn");
if (searchBtn) {
  searchBtn.addEventListener("click", () => {
    const q = document.getElementById("searchInput").value.trim();
    if (q) alert(`Search for: "${q}" (demo only)`);
  });
}

// === Close button inside sidebar (mobile) ===
const closeSidebar = document.getElementById("closeSidebar");
if (closeSidebar) {
  closeSidebar.addEventListener("click", () => {
    sidebar.classList.remove("open");
  });
}

// === Animate progress bars on page load ===
window.addEventListener("load", () => {
  document.querySelectorAll(".progress").forEach(bar => {
    const width = bar.style.width;
    bar.style.width = "0";
    setTimeout(() => {
      bar.style.width = width;
    }, 100);
  });
});



navButtons.forEach(btn => {
  btn.addEventListener("click", () => openPage(btn.dataset.page));
});

// also allow buttons with data-open attr to jump
document.querySelectorAll("[data-open]").forEach(btn => {
  btn.addEventListener("click", () => {
    openPage(btn.getAttribute("data-open"));
  });
});

// NEW: hook up all project cards (if not already covered by data-open)
document.querySelectorAll(".project-card").forEach(card => {
  card.addEventListener("click", () => {
    const page = card.getAttribute("data-open");
    if (page) openPage(page);
  });
});


// find elements in the project section we want to update
const projectTitleEl = document.querySelector('.project-section .project-title');
const breadcrumbSpan = document.querySelector('.project-section .spanAlpha');

document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('click', () => {
    const page = card.getAttribute('data-open');
    const projectName = card.querySelector('p').textContent.trim();

    // update text inside project section
    if (projectTitleEl) projectTitleEl.textContent = projectName;
    if (breadcrumbSpan) breadcrumbSpan.textContent = projectName;

    openPage(page);
  });
});

document.addEventListener('DOMContentLoaded', () => {
  // select all phase cards
  document.querySelectorAll('.phase-card').forEach(card => {
    card.addEventListener('click', () => {
      // open external file in same tab
      window.location.href = 'AI-assistant.html';

      // if you want a new tab:
      // window.open('AI-assistant.html', '_blank');
    });
  });
});

