const hamburger = document.getElementById('hamburger');
const UlNav = document.getElementById('UlNav');

function navFun() {
    const UlNav = document.getElementById('UlNav');
    UlNav.classList.remove('passive');
    UlNav.classList.add('active');
    hamburger.style.display = 'none';

}

hamburger.addEventListener('click', () => navFun());