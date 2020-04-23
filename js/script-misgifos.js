let cajaOpcionesTema = document.getElementById('opciones-tema');
let btnElegirTema = document.getElementById('btn-elegir-tema');
let btnElegirTema2 = document.getElementById('btn-elegir-tema2');
let opLight = document.getElementById('op-light');
let opDark = document.getElementById('op-dark');
let linkCss = document.getElementById('estilos');

cajaOpcionesTema.addEventListener('mouseleave', () => {
    cajaOpcionesTema.style.display = "none";
});

btnElegirTema.addEventListener('click', () => {
    (cajaOpcionesTema.style.display == "flex") ? cajaOpcionesTema.style.display = "none" : cajaOpcionesTema.style.display = 'flex';
});

btnElegirTema2.addEventListener('click', () => {
    (cajaOpcionesTema.style.display == "flex") ? cajaOpcionesTema.style.display = "none" : cajaOpcionesTema.style.display = 'flex';
});

opLight.addEventListener('click', () => {
    linkCss.href = "css/theme-light.css";
    logo.src = "img/gifOF_logo.png";
    localStorage.setItem('theme', 'light');
    window.location.reload();
});

opDark.addEventListener('click', () => {
    linkCss.href = "css/theme-dark.css";
    logo.src = "img/gifOF_logo_dark.png";
    localStorage.setItem('theme', 'dark');
    window.location.reload();
});

logo.addEventListener('click', () => {
    window.location = 'index.html';
});



function cargarDatosIniciales() {

    if (localStorage.getItem('theme') == null) {
        localStorage.setItem('theme', 'light');
    } else {
        if (localStorage.getItem('theme') == 'light') {
            linkCss.href = "css/theme-light.css";
            logo.src = "img/gifOF_logo.png";
            localStorage.setItem('theme', 'light');
        } else {
            linkCss.href = "css/theme-dark.css";
            logo.src = "img/gifOF_logo_dark.png";
            localStorage.setItem('theme', 'dark');
        }
    }
}


window.onload = cargarDatosIniciales;