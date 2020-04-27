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
const btnCapturarImg = document.getElementById('btn-capturar-img');
const btnCapturar = document.getElementById('btn-capturar');
const imgCamara = document.getElementById('icon-camara');
const imgGrabando = document.getElementById('icon-grabando');
const btnDetenerImg = document.getElementById('btn-detener-img');
const btnDetener = document.getElementById('btn-detener');
const containerBtnCaptura = document.getElementById('container-botones-captura');
const containerBtnGrabacion = document.getElementById('botones-grabacion');
const imgGIFCreado = document.getElementById('gif-creado');

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

btnCerrarVentana.addEventListener('click', () => {
    window.location.reload();
});

btnCapturarImg.addEventListener('click', iniciarGrabacion);
btnCapturar.addEventListener('click', iniciarGrabacion);
btnDetenerImg.addEventListener('click', detenerGrabacion);
btnDetener.addEventListener('click', detenerGrabacion);

function iniciarGrabacion() {
    containerBtnCaptura.style.display = 'none';
    containerBtnGrabacion.style.display = 'flex';
    recorderVideo.startRecording();
    recorderGif.startRecording();
}

// function looper() {
//    console.log(recorder.state);
//     if(recorder.state === 'stopped') return; // ignore+stop
//     setTimeout(looper, 1000); // update after every 3-seconds
// }

function detenerGrabacion() {   
    recorderVideo.stopRecording(function () {
        let video2 = document.getElementById('video2');
        let blobVideo = recorderVideo.getBlob();
        let videoURL = window.URL.createObjectURL(blobVideo);
        video.style.display = 'none';
        localStream.stop();
        video2.src = videoURL;
        video2.play();
        video2.controls = true;
    });
    recorderGif.stopRecording(function () {
        let blobGif = recorderGif.getBlob();
        let gifURL = window.URL.createObjectURL(blobGif);
        imgGIFCreado.src = gifURL;
    });
}

let localStream;
let recorderVideo;
let configVideo = {
    mimeType: 'video/webm',
    bitsPerSecond: 128000
}

let recorderGif;
let confiGif = {
    type: 'gif',
    frameRate: 1,
    quality: 10,
    width: 360,
    hidden: 240
}

function getStreamAndRecord() {
    navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
            width: { max: 683 },
            height: { max: 341 }
        }
    })
        .then(function (stream) {
            localStream = stream;
            recorderVideo = RecordRTC(localStream, configVideo);
            recorderGif = RecordRTC(localStream, confiGif);
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
            imgCamara.src = 'img/camera.svg';
        } else {
            linkCss.href = "css/theme-dark.css";
            logo.src = "img/gifOF_logo_dark.png";
            localStorage.setItem('theme', 'dark');
            imgCamara.src = 'img/camera_light.svg';
        }
    }
}


window.onload = cargarDatosIniciales;