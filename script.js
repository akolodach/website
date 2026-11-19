
const projectsData = [
  {
    title: "Сонячний ліс",
    category: "Фотографія",
    image: "images/IMGP0049.JPG",
    description: "Завдання: зафіксувати гру ранкового сонячного проміння крізь крони дерев, зберігши природні відтінки зеленого та м'який контраст без перенасичення.",
    tools: ["Adobe Photoshop", "Кольорокорекція"],
    
  },
  {
    title: "Кам'яні сходи",
    category: "Ілюстрація",
    image: "images/forest.png",
    description: "Завдання: створити ілюстрацію затишного кам'яного підйому в теплих охристих та коричневих тонах, передавши текстуру каменю та м'яку атмосферу казкового саду.",
    tools: ["Digital Art", "Текстурні пензлі"],
    
  },
  {
    title: "Портрет у парку",
    category: "Фотографія",
    image: "images/IMGP0059.JPG",
    description: "Завдання: Зробити фото мого песика як приклад для майбутніх фотозйомок домашніх улюбленців",
    tools: ["Adobe Photoshop", "Портретна зйомка"],
    
  },
  {
    title: "Дизайн персонажа",
    category: "Ілюстрація",
    image: "images/hamstercute.png",
    description: "Завдання: Створення милого персонажа хом'ячка для дитячих книжок. ",
    tools: ["Adobe Photoshop", "Character Design"],
    
  },
  {
    title: "Подарункові листівки 2026",
    category: "Ілюстрація",
    images: [
      {
        src: "images/1f62edb6-5fd2-442c-871b-51cb4e30b736.png",
        alt: "Листівка з конем, написом 2026 і новорічним побажанням"
      },
      {
        src: "images/13121aaf-d52d-4363-928a-b9d32cf30252.png",
        alt: "Листівка з конем і новорічним побажанням англійською"
      },
      {
        src: "images/9dd8808c-30e0-45b4-b3c7-fb9eeea24f77.png",
        alt: "Листівка з конем і побажанням сестрі англійською"
      }
    ],
    description: "Серія авторських новорічних листівок до 2026 року: ілюстрації коней і теплі побажання для близьких.",
    tools: ["Традиційний малюнок", "Лайн-арт", "Авторський летеринг"],

  }
];

document.addEventListener("DOMContentLoaded", () => {
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

  const projectModal = document.getElementById("project-modal");
  const modalImages = document.getElementById("modal-project-images");
  const modalCategory = document.getElementById("modal-project-category");
  const modalTitle = document.getElementById("modal-project-title");
  const modalDesc = document.getElementById("modal-project-desc");
  const modalTools = document.getElementById("modal-project-tools");

  function openProjectModal(index) {
    const item = projectsData[index];
    if (!item) return;

    const images = item.images || [{ src: item.image, alt: item.title }];
    const imageElements = images.map(({ src, alt }) => {
      const img = document.createElement("img");
      img.src = src;
      img.alt = alt;
      return img;
    });
    modalImages.replaceChildren(...imageElements);
    modalCategory.textContent = item.category;
    modalTitle.textContent = item.title;
    modalDesc.textContent = item.description;

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

  const navModalTriggers = document.querySelectorAll("[data-modal-target]");
  navModalTriggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const targetModal = document.getElementById(trigger.dataset.modalTarget);
      if (targetModal) openModal(targetModal);
    });
  });
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