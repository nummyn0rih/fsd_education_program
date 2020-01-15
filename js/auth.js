document.addEventListener('click', (event) => {
    const modal = event.target.closest('.auth__modal');
    modal.style.display = 'none';
});
