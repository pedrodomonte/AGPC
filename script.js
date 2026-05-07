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