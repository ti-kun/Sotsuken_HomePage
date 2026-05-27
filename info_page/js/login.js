const passInput = document.getElementById('pass');

passInput.addEventListener('input', () => {
    passInput.value =
        passInput.value.replace(/[^\x20-\x7E]/g, '');
});