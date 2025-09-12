
document.addEventListener('DOMContentLoaded', () => {
  const sidebar = document.getElementById('sidebar');
  const burger = document.getElementById('hamburger');
  const closeBtn = document.getElementById('closeSidebar');

  // Hamburger toggles open/close
  if (burger && sidebar) {
    burger.addEventListener('click', () => {
      sidebar.classList.toggle('open');
    });
  }

  // Close button (×)
  if (closeBtn && sidebar) {
    closeBtn.addEventListener('click', () => {
      sidebar.classList.remove('open');
    });
  }

  // Year in footer (optional)
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Simple page switching
  const navButtons = document.querySelectorAll('.nav-items');
  const pages = document.querySelectorAll('[data-page]');

  function openPage(pageId) {
    navButtons.forEach(b => b.classList.toggle('active', b.dataset.page === pageId));
    pages.forEach(sec => {
      const isTarget = sec.dataset.page === pageId;
      if ('hidden' in sec) sec.hidden = !isTarget;
      if (sec.classList.contains('welcome')) sec.hidden = pageId !== 'home';
    });
    // close sidebar on mobile
    sidebar.classList.remove('open');
  }

  navButtons.forEach(btn => {
    btn.addEventListener('click', () => openPage(btn.dataset.page));
  });

  // Quick action buttons inside cards (optional)
  document.querySelectorAll('.ghost-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-open');
      openPage(target);
    });
  });

  // Optional view toggle
  const viewToggle = document.getElementById('viewToggle');
  if (viewToggle) {
    viewToggle.addEventListener('click', () => {
      const grid = document.getElementById('quickActions');
      if (grid) grid.classList.toggle('dense');
    });
  }

  // Optional fake search
  const searchBtn = document.getElementById('searchBtn');
  if (searchBtn) {
    searchBtn.addEventListener('click', () => {
      const q = document.getElementById('searchInput').value.trim();
      if (!q) return;
      alert(`Search for: "${q}" (demo only)`);
    });
  }

  // Optional add document
  const addBtn = document.querySelector('.add-btn');
  if (addBtn) {
    addBtn.addEventListener('click', () => {
      const newDoc = prompt("Enter the new document name:");
      if (newDoc) {
        const li = document.createElement('li');
        li.innerHTML = `<span>📄</span> ${newDoc}`;
        document.querySelector('.doc-list').appendChild(li);
      }
    });
  }
});

