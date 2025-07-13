function toggleInfo(btn) {
    const card = btn.closest('.producto');
    const info = card.querySelector('.producto__informacion');

    if (!info) return;

    const isVisible = info.classList.contains('producto__informacion--visible');
    info.classList.toggle('producto__informacion--visible');
    btn.textContent = isVisible ? 'Ver más' : 'Ver menos';
  }