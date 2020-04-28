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
const bontonesVistaPrevia = document.getElementById('botones-vista-previa');
const tituloVentana = document.getElementById('titulo-ventana');
const btnRepetir = document.getElementById('btn-repetir-captura');
const btnSubir = document.getElementById('btn-sub');
const ventanaSubiendo = document.getElementById('subiendo-gif');
const btnCancelarSubir = document.getElementById('btn-cancelar-subir');
const ventanaExitoso = document.getElementById('gif-exitoso');

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

document.getElementById('btn-play').addEventListener('click', () => {
    let video = document.getElementById('video2');
    video.play();
});

btnRepetir.addEventListener('click', () => {
    window.location.reload();
    localStorage.setItem('capturar', true);
});

btnSubir.addEventListener('click', subirGif);

btnCancelarSubir.addEventListener('click', function () {
    controller.abort();
    console.log('subir gif abortado');
    window.location.reload();
    localStorage.setItem('capturar', true);
});

document.getElementById('btn-listo').addEventListener('click', () => {
    window.location.reload();
});


function iniciarGrabacion() {
    containerBtnCaptura.style.display = 'none';
    containerBtnGrabacion.style.display = 'flex';
    recorderVideo.startRecording();
    recorderGif.startRecording();
    tituloVentana.innerText = 'Capturando Tu Guifo';
    let labelTiempo = document.getElementById('tiempo-captura');
    let segundos = 1;
    setInterval(() => {
        labelTiempo.innerText = tiempoVideo(segundos);
        segundos = segundos + 1;
    }, 1000);
}

document.getElementById('video2').addEventListener("timeupdate", function () {
    let video2 = document.getElementById('video2');
    let labelReproduccion = document.getElementById('tiempo-reproduccion-vistaprevia');
    let hora = tiempoVideo(video2.currentTime);
    labelReproduccion.innerText = hora;
    let barra = document.getElementById('barra-progreso');
    let total = parseInt(video2.currentTime * (215) / (video2.duration));
    barra.style.width = total + "px";
});

function tiempoVideo(segundos) {
    let hora = Math.floor(segundos / 3600);
    let totalSeconds = segundos % 3600;
    let minuto = Math.floor(segundos / 60);
    let segundo = parseInt(totalSeconds % 60);
    return `${(hora <= 9 ? "0" + hora : hora)}:${(minuto <= 9 ? "0" + minuto : minuto)}:${(segundo <= 9 ? "0" + segundo : segundo)}`;
}

var form;

function detenerGrabacion() {
    recorderVideo.stopRecording(function () {
        let video2 = document.getElementById('video2');
        let blobVideo = recorderVideo.getBlob();
        let videoURL = window.URL.createObjectURL(blobVideo);
        video.style.display = 'none';
        video2.style.display = 'block';
        localStream.stop();
        video2.src = videoURL;
    });
    recorderGif.stopRecording(function () {
        form = new FormData()
        let blobGif = recorderGif.getBlob();
        form.append('file', blobGif, 'myGif.gif');
    });
    bontonesVistaPrevia.style.display = 'flex';
    containerBtnGrabacion.style.display = 'none';
    tituloVentana.innerText = 'Vista Previa';
}

let localStream;
let recorderVideo;
let configVideo = {
    mimeType: 'video/webm'
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
        .catch((err) => console.log(err));
}

var controller = new AbortController();
var signal = controller.signal;

function subirGif() {
    console.log(form.get('file'));
    console.log(recorderGif.getBlob());

    cambiarVentanaCargando();

    var requestOptions = {
        method: 'POST',
        body: form,
        signal: signal
    };

    fetch("https://upload.giphy.com/v1/gifs?api_key=p8v3HTqAOrj6dkDFYpjtOOyhSsJRLp6j", requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log("gif cargado", result);
            cambiarVentanaSubido(result.data.id);
        })
        .catch(error => console.log('error', error));
}

function cambiarVentanaCargando() {
    bontonesVistaPrevia.style.display = 'none';
    video2.style.height = '0';
    video2.style.width = '0';
    video2.style.border = '0';
    ventanaSubiendo.style.display = 'flex';
    tituloVentana.innerText = 'Subiendo Guifo';
}

function cambiarVentanaSubido(id) {
    ventanaSubiendo.style.display = 'none';
    tituloVentana.innerText = 'Guifo Subido Con Éxito';
    ventanaExitoso.style.display = 'flex';
    
    fetch(`https://api.giphy.com/v1/gifs/${id}?api_key=p8v3HTqAOrj6dkDFYpjtOOyhSsJRLp6j`)
        .then(response => response.json())
        .then(result => {
            console.log("datos de pedir por id", result);
            cargarMisGifs(result);
            document.getElementById('gifExitoso').src = result.data.images.fixed_width_downsampled.url;
        })
        .catch(error => console.log('error', error));

    // console.log(id);
    //{"data":{"id":"J4y38AOq06Kuj7UOgo"},"meta":{"msg":"OK","status":200}}
}

function cargarMisGifs(result) {

    if (localStorage.getItem('misGifs') == null) {
        let array = [result.data.images.fixed_width_downsampled.url];
        localStorage.setItem('misGifs', JSON.stringify(array));
    } else {
        let data = JSON.parse(localStorage.getItem('misGifs'));

        data.unshift(result.data.images.fixed_width_downsampled.url);

        let container = document.getElementById('container-misgifos-giph');

        for (let index = 0; index < data.length; index++) {
            let element = ` <div class="caja-misgifos">
                <img src="${data[index]}">
                <div class="borde-ventana"><label>#GIF${(index + 1)}</label></div>
            </div>`
            container.innerHTML += element;
        }

        localStorage.setItem('misGifs', JSON.stringify(data));
    }

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
    if (localStorage.getItem('capturar') == null) {
        localStorage.setItem('capturar', false);
    } else {
        if (localStorage.getItem('capturar') == 'true') {
            sectionMisgifs.style.gridArea = '4 / 2 / 5 / 6';
            sectionMisgifs.style.marginTop = '500px';
            nav.style.display = 'none';
            flecha.style.display = 'flex';
            ventanaCrear.style.display = 'inline';
            localStorage.setItem('capturar', false);
        }
    }

    if (localStorage.getItem('misGifs') != null) {

        let data = JSON.parse(localStorage.getItem('misGifs'));

        let container = document.getElementById('container-misgifos-giph');
        container.innerHTML = "";

        for (let index = 0; index < data.length; index++) {
            let element = ` <div class="caja-misgifos">
            <img src="${data[index]}">
            <div class="borde-ventana"><label>#GIF${(index + 1)}</label></div>
        </div>`
            container.innerHTML += element;
        }

        localStorage.setItem('misGifs', JSON.stringify(data));
    }
}


window.onload = cargarDatosIniciales;