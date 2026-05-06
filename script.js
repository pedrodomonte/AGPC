const accordionButtons = document.querySelectorAll(".accordion-btn");

accordionButtons.forEach((btn) => {
  btn.addEventListener("click", () => {

    // ignora o botão de contato (link)
    if (btn.classList.contains("contact-btn")) return;

    const panel = btn.nextElementSibling;
    if (!panel) return; // <-- proteção crítica

    const isOpen = btn.getAttribute("aria-expanded") === "true";

    // fecha todos (SÓ botões reais)
    document.querySelectorAll(".accordion-btn:not(.contact-btn)").forEach(b => {
      b.setAttribute("aria-expanded", "false");
    });

    document.querySelectorAll(".accordion-panel").forEach(p => {
      p.classList.remove("open");
    });

    // abre o clicado
    if (!isOpen) {
      btn.setAttribute("aria-expanded", "true");
      panel.classList.add("open");
    }
  });
});