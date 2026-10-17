
// MENU PARA CELULAR
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  const aberto = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(aberto));
  menuToggle.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
  menuToggle.textContent = aberto ? "✕" : "☰";
});

navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menu");
    menuToggle.textContent = "☰";
  });
});

// ANIMAÇÕES AO ROLAR
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealElements.forEach(element => observer.observe(element));
} else {
  revealElements.forEach(element => element.classList.add("visible"));
}

// DESTAQUE DA SEÇÃO ATUAL
const sections = document.querySelectorAll("main section[id]");
const navItems = navLinks.querySelectorAll("a");

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navItems.forEach(link => {
          link.classList.toggle(
            "active",
            link.getAttribute("href") === "#" + entry.target.id
          );
        });
      }
    });
  }, { rootMargin: "-25% 0px -65% 0px" });

  sections.forEach(section => sectionObserver.observe(section));
}

// ANO AUTOMÁTICO
document.getElementById("currentYear").textContent = new Date().getFullYear();

// FORMULÁRIO: ENVIAR MENSAGEM PARA O WHATSAPP

const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", event => {
  event.preventDefault();

  if (!contactForm.reportValidity()) return;

  const data = new FormData(contactForm);

  // COLOQUE AQUI O NÚMERO REAL DO WHATSAPP DA VIGIAGAS
  // Formato: código do Brasil + DDD + número, somente números
  const numeroWhatsApp = "5588996773329";

  const texto =
    `Olá! Tenho interesse na VIGIAGAS.

Nome: ${data.get("nome").trim()}
E-mail: ${data.get("email").trim()}
Telefone: ${data.get("telefone").trim() || "Não informado"}
Interesse: ${data.get("interesse")}

Mensagem:
${data.get("mensagem").trim()}`;

  const linkWhatsApp =
    "https://wa.me/" +
    numeroWhatsApp +
    "?text=" +
    encodeURIComponent(texto);

  // Abre o WhatsApp com todos os dados preenchidos
  window.open(linkWhatsApp, "_blank");
});
