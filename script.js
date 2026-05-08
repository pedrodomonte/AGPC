document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.accordion-btn[aria-expanded]');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const panel = btn.nextElementSibling;
      if (!panel || !panel.classList.contains('accordion-panel')) return;

      const isOpen = btn.getAttribute('aria-expanded') === 'true';

      // Fecha outros do mesmo nível
      const parentList = btn.closest('ul');
      if (parentList) {
        parentList.querySelectorAll(':scope > li > .accordion-btn[aria-expanded="true"]').forEach(openBtn => {
          if (openBtn !== btn) {
            openBtn.setAttribute('aria-expanded', 'false');
            const openPanel = openBtn.nextElementSibling;
            if (openPanel) openPanel.classList.remove('open');

            // Fecha aninhados dentro do que foi fechado
            openPanel?.querySelectorAll('.accordion-btn[aria-expanded="true"]').forEach(nested => {
              nested.setAttribute('aria-expanded', 'false');
              const np = nested.nextElementSibling;
              if (np) np.classList.remove('open');
            });
          }
        });
      }

      // Abre ou fecha o atual
      btn.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
      panel.classList.toggle('open', !isOpen);
    });
  });
});

function animarContador(elemento, destino, duracao) {
  let inicio = 0;
  const incremento = destino / (duracao / 16);

  const timer = setInterval(() => {
    inicio += incremento;

    if (inicio >= destino) {
      inicio = destino;
      clearInterval(timer);
    }

    elemento.textContent = elemento.dataset.prefix + Math.floor(inicio) + elemento.dataset.suffix;
  }, 16);
}

document.querySelectorAll('.stat-num').forEach(el => {
  animarContador(el, parseInt(el.dataset.valor), 1000);
});