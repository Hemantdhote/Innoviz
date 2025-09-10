document.addEventListener('DOMContentLoaded', () => {



  const backBtn = document.getElementById('backBtn');
  if (backBtn) {
    backBtn.addEventListener('click', () => {
      // go to previous page in browser history
      window.history.back();

      // or if you have a known previous section you want to open, you can do:
      // openPage('home'); // or whichever data-page you want
    });
  }



  /* ========== SIDEBAR / NAV HANDLERS ========== */
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
  const navButtons = document.querySelectorAll('.nav-item');
  const pages = document.querySelectorAll('[data-page]');

  function openPage(pageId) {
    navButtons.forEach(b => b.classList.toggle('active', b.dataset.page === pageId));
    pages.forEach(sec => {
      const isTarget = sec.dataset.page === pageId;
      if ('hidden' in sec) sec.hidden = !isTarget;
      if (sec.classList.contains('welcome')) sec.hidden = pageId !== 'home';
    });
    // close sidebar on mobile
    if (sidebar) sidebar.classList.remove('open');
  }

  // navButtons.forEach(btn => {
  //   btn.addEventListener('click', () => openPage(btn.dataset.page));
  // });



  // Optional view toggle
  const viewToggle = document.getElementById('viewToggle');
  if (viewToggle) {
    viewToggle.addEventListener('click', () => {
      const grid = document.getElementById('quickActions');
      if (grid) grid.classList.toggle('dense');
    });
  }

  /* ========== CHAT HANDLERS ========== */
  const chatForm = document.getElementById('chatForm');
  const messageInput = document.getElementById('messageInput');
  const chatMessages = document.getElementById('chatMessages');
  const fileInput = document.getElementById('fileInput');

  function addMessage(content, type = 'user', isImage = false) {
    const div = document.createElement('div');
    div.classList.add('message', type);

    if (isImage) {
      // image itself
      div.classList.add('image-message');
      const img = document.createElement('img');
      img.src = content;
      div.appendChild(img);

      // ✅ Only show buttons for BOT images
      if (type === 'bot') {
        const btnContainer = document.createElement('div');
        btnContainer.classList.add('image-buttons');

        const saveOutputBtn = document.createElement('button');
        saveOutputBtn.textContent = 'Save Output';
        saveOutputBtn.classList.add('save-btn');

        const savePromptBtn = document.createElement('button');
        savePromptBtn.textContent = 'Save Prompt';
        savePromptBtn.classList.add('save-btn');

        // example click handlers
        saveOutputBtn.addEventListener('click', () => {
          alert('Your Output Has Been Saved ');
          // implement actual download here
        });

        savePromptBtn.addEventListener('click', () => {
          alert("Your Prompt Has Been Saved");
          // implement actual save prompt logic here
        });

        btnContainer.appendChild(saveOutputBtn);
        btnContainer.appendChild(savePromptBtn);
        div.appendChild(btnContainer);
      }

    } else {
      // normal text
      div.textContent = content;
    }

    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  // ✅ default bot greeting on page load
  addMessage('How can I assist you today?', 'bot');
  addMessage('Generate an image which is in tranding.', 'user');
  addMessage('images/trnadingImg.avif', 'bot', true);

  if (chatForm) {
    chatForm.addEventListener('submit', e => {
      e.preventDefault();
      const text = messageInput.value.trim();
      if (text) {
        addMessage(text, 'user'); // user message
        messageInput.value = '';

        // Simulate bot response after 1s
        setTimeout(() => {
          addMessage('This will be response for your prompt', 'bot');
        }, 1000);
      }
    });
  }

  if (fileInput) {
    fileInput.addEventListener('change', () => {
      const files = fileInput.files;
      for (const file of files) {
        const reader = new FileReader();
        reader.onload = () => {
          addMessage(reader.result, 'user', true);
          // simulate bot handling image
          setTimeout(() => {
            addMessage('Nice image!', 'bot');
          }, 1000);
        };
        reader.readAsDataURL(file);
      }
    });
  }
});