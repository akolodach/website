// Дані для розгорнутого опису кожного проєкту
const projectsData = [
  {
    title: "Сонячний ліс",
    category: "Фотографія",
    image: "images/IMGP0049.JPG",
    description: "Завдання: зафіксувати гру ранкового сонячного проміння крізь крони дерев, зберігши природні відтінки зеленого та м'який контраст без перенасичення.",
    tools: ["Adobe Lightroom", "Natural Light", "Кольорокорекція"],
    link: "https://behance.net"
  },
  {
    title: "Кам'яні сходи",
    category: "Ілюстрація",
    image: "images/image_2026-03-23_23-29-48.png",
    description: "Завдання: створити ілюстрацію затишного кам'яного підйому в теплих охристих та коричневих тонах, передавши текстуру каменю та м'яку атмосферу казкового саду.",
    tools: ["Procreate", "Digital Painting", "Текстурні пензлі"],
    link: "https://behance.net"
  },
  {
    title: "Портрет у парку",
    category: "Фотографія",
    image: "images/IMGP0059.JPG",
    description: "Завдання: передати характер та живу увагу моделі на природному фоні з м'яким розмиттям заднього плану (боке) та акцентом на погляд.",
    tools: ["Об'єктив 50mm", "Adobe Lightroom", "Портретна зйомка"],
    link: "https://instagram.com"
  },
  {
    title: "Дизайн персонажа",
    category: "Ілюстрація",
    image: "images/hamstercute.png",
    description: "Завдання: розробити доброзичливого персонажа-звірятка для дитячої ілюстрації з виразною мімікою, плавним лайн-артом і теплою палітрою.",
    tools: ["Adobe Photoshop", "Character Design", "Лайн-арт"],
    link: "https://behance.net"
  }
];

document.addEventListener("DOMContentLoaded", () => {
  // 1. Фільтрація проєктів (Усі / Ілюстрація / Фотографія)
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filterValue = btn.dataset.filter;

      projectCards.forEach((card) => {
        const category = card.dataset.category;
        if (filterValue === "all" || category === filterValue) {
          card.classList.remove("is-hidden");
        } else {
          card.classList.add("is-hidden");
        }
      });
    });
  });

  // 2. Модальне вікно проєкту
  const projectModal = document.getElementById("project-modal");
  const modalImg = document.getElementById("modal-project-img");
  const modalCategory = document.getElementById("modal-project-category");
  const modalTitle = document.getElementById("modal-project-title");
  const modalDesc = document.getElementById("modal-project-desc");
  const modalTools = document.getElementById("modal-project-tools");
  const modalLink = document.getElementById("modal-project-link");

  function openProjectModal(index) {
    const item = projectsData[index];
    if (!item) return;

    modalImg.src = item.image;
    modalImg.alt = item.title;
    modalCategory.textContent = item.category;
    modalTitle.textContent = item.title;
    modalDesc.textContent = item.description;
    modalLink.href = item.link;

    modalTools.innerHTML = item.tools.map((tool) => `<span>${tool}</span>`).join("");
    openModal(projectModal);
  }

  projectCards.forEach((card) => {
    const id = Number(card.dataset.projectId);
    card.addEventListener("click", () => openProjectModal(id));
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openProjectModal(id);
      }
    });
  });

  // 3. Модальні вікна навігації (Contacts, About me)
  const navModalTriggers = document.querySelectorAll("[data-modal-target]");
  navModalTriggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const targetModal = document.getElementById(trigger.dataset.modalTarget);
      if (targetModal) openModal(targetModal);
    });
  });

  // Загальні функції відкриття/закриття модалок
  function openModal(modal) {
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    const closeBtn = modal.querySelector(".modal-close");
    if (closeBtn) closeBtn.focus();
  }

  function closeModal(modal) {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
  }

  document.querySelectorAll(".modal-backdrop").forEach((backdrop) => {
    backdrop.addEventListener("click", (e) => {
      if (e.target === backdrop) closeModal(backdrop);
    });
    const closeBtn = backdrop.querySelector(".modal-close");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => closeModal(backdrop));
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      document.querySelectorAll(".modal-backdrop.is-open").forEach(closeModal);
    }
  });

  // 4. Копіювання email в буфер обміну
  document.querySelectorAll(".copy-email-btn").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const email = btn.dataset.email;
      const statusEl = btn.parentElement.nextElementSibling?.classList.contains("copy-status")
        ? btn.parentElement.nextElementSibling
        : btn.nextElementSibling;

      try {
        await navigator.clipboard.writeText(email);
        if (statusEl) {
          statusEl.textContent = "Email скопійовано!";
          setTimeout(() => (statusEl.textContent = ""), 2500);
        }
      } catch {
        if (statusEl) statusEl.textContent = email;
      }
    });
  });
});