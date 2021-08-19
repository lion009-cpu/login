const toggleBtn = document.querySelector('.navbar__toggle');
const menu = document.querySelector('.navbar__sub');
toggleBtn.addEventListener('click', () => {
    menu.classList.toggle('active');
});