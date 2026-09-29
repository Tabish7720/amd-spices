const searchInput = document.getElementById("searchInput");
const productCards = [...document.querySelectorAll(".product-card")];
const filterButtons = [...document.querySelectorAll(".filter-btn")];
const noResults = document.getElementById("noResults");
const cartCount = document.getElementById("cartCount");
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

let cart = 0;
let currentFilter = "all";

function updateProducts() {
    const query = searchInput.value.trim().toLowerCase();
    let visible = 0;

    productCards.forEach(card => {
        const name = card.dataset.name.toLowerCase();
        const category = card.dataset.category;

        const matchesSearch = name.includes(query);
        const matchesFilter = currentFilter === "all" || category === currentFilter;

        if (matchesSearch && matchesFilter) {
            card.style.display = "";
            visible++;
        } else {
            card.style.display = "none";
        }
    });

    noResults.style.display = visible ? "none" : "block";
}

searchInput.addEventListener("input", updateProducts);

filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        filterButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        currentFilter = button.dataset.filter;
        updateProducts();
    });
});

document.querySelectorAll(".add-cart").forEach(button => {
    button.addEventListener("click", () => {
        cart++;
        cartCount.textContent = cart;

        const oldText = button.textContent;
        button.textContent = "Added ✓";

        setTimeout(() => {
            button.textContent = oldText;
        }, 900);
    });
});

/* Mobile menu */
menuToggle.addEventListener("click", () => {
    mainNav.classList.toggle("open");
});

document.querySelectorAll(".main-nav a").forEach(link => {
    link.addEventListener("click", () => {
        mainNav.classList.remove("open");
    });
});

/* Product modal */
const modal = document.getElementById("productModal");
const modalTitle = document.getElementById("modalTitle");
const modalText = document.getElementById("modalText");
const modalClose = document.getElementById("modalClose");
const modalAdd = document.getElementById("modalAdd");

const descriptions = {
    "Red Chilli Powder": "A bold chilli product presented in AMD's premium maroon packaging. Suitable for adding colour and chilli character to everyday dishes.",
    "Turmeric Powder": "A traditional turmeric product with a warm golden presentation, designed for everyday Indian cooking.",
    "Special Chilli": "A versatile chilli product with AMD's signature premium packaging and a flavour-focused presentation.",
    "Coriander Powder": "A fragrant coriander product presented in AMD's green collection, suited to curries, gravies and everyday recipes.",
    "Premium Gold Tea": "A premium tea blend presented as a rich and aromatic choice for a comforting cup of tea.",
    "Premium Silver Tea": "A refined tea blend from the AMD collection, presented for everyday tea moments."
};

let selectedProduct = "";

document.querySelectorAll(".details-btn").forEach(button => {
    button.addEventListener("click", () => {
        selectedProduct = button.dataset.product;
        modalTitle.textContent = selectedProduct;
        modalText.textContent = descriptions[selectedProduct] || "AMD product information.";
        modal.classList.add("show");
        modal.setAttribute("aria-hidden", "false");
    });
});

function closeModal() {
    modal.classList.remove("show");
    modal.setAttribute("aria-hidden", "true");
}

modalClose.addEventListener("click", closeModal);

modal.addEventListener("click", (event) => {
    if (event.target === modal) closeModal();
});

modalAdd.addEventListener("click", () => {
    cart++;
    cartCount.textContent = cart;
    closeModal();
});

/* Contact form demo */
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();

    formMessage.textContent =
        `Thank you, ${name || "there"}! Your enquiry has been prepared.`;

    contactForm.reset();
});

/* Footer year */
document.getElementById("year").textContent = new Date().getFullYear();

/* Simple reveal animation */
const revealItems = document.querySelectorAll(
    ".product-card, .quality-card, .section-image, .section-content, .showcase > div, .showcase img"
);

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

revealItems.forEach(item => {
    item.style.opacity = "0";
    item.style.transform = "translateY(18px)";
    item.style.transition = "opacity .6s ease, transform .6s ease";
    observer.observe(item);
});

/* Add the reveal class through inline-safe styles */
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".revealed").forEach(item => {
        item.style.opacity = "1";
        item.style.transform = "translateY(0)";
    });
});

const style = document.createElement("style");
style.textContent = `
    .revealed {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);
