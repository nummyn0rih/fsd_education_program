document.addEventListener('click', (event) => {
    const list = event.target.classList;
    const target = event.target;

    if (list.contains('dropdown')) {
        target.classList.toggle('dropdown_active');

        const next = target.nextElementSibling;
        if (next.classList.contains('quantity')) {
            console.log('true')
            next.classList.toggle('quantity_disabled');
        }

        event.preventDefault();
    }

});
