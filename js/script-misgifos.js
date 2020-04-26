const cajaOpcionesTema = document.getElementById('opciones-tema');
const btnElegirTema = document.getElementById('btn-elegir-tema');
const btnElegirTema2 = document.getElementById('btn-elegir-tema2');
const opLight = document.getElementById('op-light');
const opDark = document.getElementById('op-dark');
const linkCss = document.getElementById('estilos');
const btnCrearGuifos = document.getElementById('btn-crear-guifos');
const nav = document.getElementById('nav');
const ventanaCrear = document.getElementById('ventana-crear');
const sectionMisgifs = document.getElementById('misgifos');
const flecha = document.getElementById('flecha');
const btnCancelar = document.getElementById('btn-cancelar');
const btnComenzar = document.getElementById('btn-comenzar');
const containerCrearGif = document.getElementById('container-crear-giph');
const containerPrecaptura = document.getElementById('container-precaptura');
const video = document.getElementById('video');
const btnCerrarVentana = document.getElementById('btn-cerrar-captura');

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

btnCrearGuifos.addEventListener('click', () => {
    sectionMisgifs.style.gridArea = '4 / 2 / 5 / 6';
    sectionMisgifs.style.marginTop = '500px';
    nav.style.display = 'none';
    flecha.style.display = 'flex';
    ventanaCrear.style.display = 'inline';
});

flecha.addEventListener('click', () => {
    window.location.reload();
});

btnCancelar.addEventListener('click', () => {
    window.location.reload();
});

btnComenzar.addEventListener('click', () => {
    containerCrearGif.style.display = 'none';
    containerPrecaptura.style.display = 'flex';
    getStreamAndRecord();
});

function getStreamAndRecord() {
    navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
            width: { max: 683 },
            height: { max: 341 }
        }
    })
    .then(function (stream) {
        video.srcObject = stream;
        video.play()
    })
}
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