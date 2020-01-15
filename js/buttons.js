document.addEventListener('click', (event) => {
    const button = event.target.closest('button');
    if (!button) return;

    const buttonClassList = button.classList;

    if (buttonClassList.contains('dropdown')) {
        button.classList.toggle('dropdown_active');
        const next = button.nextElementSibling;
        if (next.classList.contains('quantity')) {
            next.classList.toggle('quantity_disabled');
        }
    }

    if (buttonClassList.contains('quantity__shift')) {
        if (buttonClassList.contains('decrement')) {
            const label = button.nextElementSibling;
            const value = parseInt(label.textContent, 10) - 1;
            label.textContent = value;
            if (value <= 0) button.disabled = true;
        }
        if (buttonClassList.contains('increment')) {
            const label = button.previousElementSibling;
            label.textContent = parseInt(label.textContent, 10) + 1;
            const minus = button.parentElement.firstElementChild;
            minus.disabled = false;
        }
    }

    if (buttonClassList.contains('clear')) {
        const fieldset = button.parentElement.parentElement;
        const lebels = fieldset.querySelectorAll('.quantity__count');
        const minuses = fieldset.querySelectorAll('.decrement');
        for (let i = 0; i < lebels.length; i += 1) {
            lebels[i].textContent = 0;
            minuses[i].disabled = true;
        }
    }

    // if (buttonClassList.contains('applay')) {
        
    // }

    if (buttonClassList.contains('auth__item')) {
        const modal = button.nextElementSibling;
        modal.style.display = 'block';
    }

    event.preventDefault();
});
