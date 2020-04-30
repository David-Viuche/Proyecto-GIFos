const btnElegirTema = document.getElementById('btn-elegir-tema');
const btnElegirTema2 = document.getElementById('btn-elegir-tema2');
const opLight = document.getElementById('op-light');
const opDark = document.getElementById('op-dark');
const buscarContainer = document.getElementById('buscar-container');
const cajaOpcionesTema = document.getElementById('opciones-tema');
const linkCss = document.getElementById('estilos');
const logo = document.getElementById('logo');
const btnBuscar = document.getElementById('btn-buscar');
const cajaSugeridos = document.getElementById('caja-sugeridos');
const textoBusqueda = document.getElementById('texto-buscar');
const iconLupa = document.getElementById('icon-lupa');
const btnCrearGif = document.getElementById('btn-crear-guifos');

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

buscarContainer.addEventListener('mouseleave', () => {
    textoBusqueda.addEventListener('focusout', cerrarCajaSugeridos);
    cajaSugeridos.style.display = 'none';
});

cajaSugeridos.addEventListener('mouseover', () => {
    textoBusqueda.removeEventListener('focusout', cerrarCajaSugeridos);
    cajaSugeridos.style.display = 'flex';
});

textoBusqueda.addEventListener('focus', () => {
    if (localStorage.getItem('theme') == 'dark') {
        btnBuscar.style.backgroundColor = '#EE3EFE';
        btnBuscar.style.color = '#fff';
        iconLupa.src = "img/lupa_light.svg";
    } else {
        btnBuscar.style.backgroundColor = '#F7C9F3';
        btnBuscar.style.color = '#000';
        iconLupa.src = "img/lupa.svg";
    }
});

textoBusqueda.addEventListener('input', () => {
    cajaSugeridos.style.display = 'flex';
    let texto = textoBusqueda.value;
    if (texto)
        peticionSugerencias(texto);

});

textoBusqueda.addEventListener('focusout', cerrarCajaSugeridos);

textoBusqueda.addEventListener('keydown', (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        let texto = textoBusqueda.value;
        if (texto)
            cargarBusqueda(texto)
    }
});

btnBuscar.addEventListener('click', () => {
    let texto = textoBusqueda.value;

    if (texto) {
        cargarBusqueda(texto);
    }
});

btnCrearGif.addEventListener('click',()=>{
    window.location = './misgifos.html';
    localStorage.setItem('capturar',true);
});

function cargarBusqueda(texto) {
    document.getElementById('titulo-resultado').innerText = texto + " (resultados)";
    let tendencias = document.getElementById('tendencias');
    tendencias.style.display = 'none';
    let busqueda = document.getElementById('busqueda');
    busqueda.style.display = 'grid';
    peticionBusqueda(texto);
    peticionSugerenciasBotones(texto);
}

function cerrarCajaSugeridos() {
    cajaSugeridos.style.display = 'none';
    if (localStorage.getItem('theme') == 'dark') {
        btnBuscar.style.backgroundColor = '#b4b4b4';
        btnBuscar.style.color = '#8f8f8f';
        iconLupa.src = "img/Combined_Shape.svg";
    } else {
        btnBuscar.style.backgroundColor = '#e6e6e6';
        btnBuscar.style.color = '#b4b4b4';
        iconLupa.src = "img/lupa_inactive.svg";
    }
}

// peticiones API

function peticionSugerencias(texto) {
    let giphy = 'https://api.giphy.com/v1/gifs/search/tags';
    let key = 'p8v3HTqAOrj6dkDFYpjtOOyhSsJRLp6j';

    fetch(giphy + "?api_key=" + key + "&q=" + `'${texto}'`)
        .then((data) => {
            return data.json()
        })
        .then((json) => {
            if (json.data.length) {
                cajaSugeridos.innerHTML = "";

                for (let index = 0; index < json.data.length; index++) {
                    let sug = document.createElement('button');
                    sug.classList.add('btn-sugeridos');
                    sug.id = `op-sugeridos-${index + 1}`;
                    sug.innerHTML = json.data[index].name;
                    sug.addEventListener('click', () => {
                        cargarBusqueda(sug.innerText);
                    });
                    cajaSugeridos.appendChild(sug);

                    if (index == 2)
                        break;
                }
            }
        })
        .catch((err) => {
            console.log(err);
        })
}

function peticionBusqueda(url) {
    let giphy = 'https://api.giphy.com/v1/gifs/search';
    let key = 'p8v3HTqAOrj6dkDFYpjtOOyhSsJRLp6j';
    let rating = '&rating=g';
    let limit = '&limit=24';
    let endPoint = giphy + "?api_key=" + key + "&q=" + url + rating + limit + "lang=es";
    fetch(endPoint)
        .then((data) => {
            return data.json()
        })
        .then((json) => {
            if (json.data.length) {
                let containerBusqueda = document.getElementById('container-busqueda-giph');
                containerBusqueda.innerHTML = "";
                json.data.map((el) => {
                    let cajaTendencia = document.createElement('div');
                    cajaTendencia.classList.add('caja-busqueda');

                    let gif = document.createElement('img');
                    gif.src = el.images.fixed_width_downsampled.url;
                    // if (el.images.fixed_width_downsampled.width > el.images.fixed_width_downsampled.height) {
                    //     gif.style.width = "550px";
                    // }
                    cajaTendencia.appendChild(gif);

                    let titulo = document.createElement('div');
                    titulo.classList.add('borde-ventana');
                    let label = document.createElement('label');
                    let textTitulo = el.title.split("by");
                    let tags = textTitulo[0].split(" ");
                    let tagsTitulo = "";
                    tags.forEach(tag => {
                        if (tag)
                            tagsTitulo += ("#" + tag + " ");
                    });
                    label.innerText = (tagsTitulo);
                    titulo.appendChild(label);
                    cajaTendencia.appendChild(titulo);

                    cajaTendencia.addEventListener('click', () => {
                        let buscar = label.innerText.split("#");
                        let terminoBusqueda = "";
                        for (let i = 0; i < buscar.length; i++) {
                            terminoBusqueda += buscar[i] + " ";
                            if (i == 3)
                                break;
                        }
                        cargarBusqueda(terminoBusqueda);
                    });

                    containerBusqueda.appendChild(cajaTendencia);
                });
                window.scrollTo(0, 720);
            } else {
                console.log("ningun resutlado de busqueda");
            }
        })
        .catch((err) => {
            console.log(err);
        })
}

function peticionGiphSugerencia(id) {

    let giphy = 'https://api.giphy.com/v1/gifs/random';
    let key = 'p8v3HTqAOrj6dkDFYpjtOOyhSsJRLp6j';
    let rating = '&rating=g';

    fetch(giphy + "?api_key=" + key + rating)
        .then((data) => {
            return data.json();
        })
        .then((json) => {
            if (json.data) {
                let cajaT = document.createElement('div');
                cajaT.classList.add('caja-tendencia');
                cajaT.id = `tendencia${id}`;
                let cajaBorde = document.createElement('div');
                cajaBorde.classList.add('borde-ventana');
                let titulo = document.createElement('label');
                let tituloFinal;
                if(json.data.title.split("by")==undefined){
                    tituloFinal = json.data.title;
                }else{
                    tituloFinal = json.data.title.split("by")[0].split(" ");
                }
                if (tituloFinal[0] == "") {
                    titulo.innerText = "#GIF";
                } else {
                    titulo.innerText = "#" + tituloFinal[0][0].toUpperCase() + tituloFinal[0].slice(1);
                }
                let imgcerrar = document.createElement('img');
                imgcerrar.src = "img/close.svg";
                imgcerrar.alt = "boton-cerrar";
                imgcerrar.id = `cerrar${id}`;
                let imgGiph = document.createElement('img');
                imgGiph.classList.add('giph');
                imgGiph.src = json.data.images.fixed_width_downsampled.url;
                let buttonVerMas = document.createElement('button');
                buttonVerMas.innerText = 'Ver más...';
                cajaBorde.appendChild(titulo);
                cajaBorde.appendChild(imgcerrar);
                cajaT.appendChild(cajaBorde);
                cajaT.appendChild(imgGiph);
                cajaT.appendChild(buttonVerMas);
                imgcerrar.addEventListener('click', () => {
                    let elemento = document.getElementById(`tendencia${id}`);
                    document.getElementById('container-sugerencia-giph').removeChild(elemento);
                    peticionGiphSugerencia(id);
                });
                buttonVerMas.addEventListener('click', () => {
                    let buscar = titulo.innerText.split("#");
                    let terminoBusqueda = "";
                    for (let i = 0; i < buscar.length; i++) {
                        terminoBusqueda += buscar[i] + " ";
                        if (i == 3)
                            break;
                    }
                    cargarBusqueda(terminoBusqueda);
                });
                let containerSugerencias = document.getElementById('container-sugerencia-giph');
                containerSugerencias.appendChild(cajaT);
            }
        })
        .catch((err) => {
            console.log(err);
        })
}

function peticionTendenciasGiph() {
    let giphy = 'https://api.giphy.com/v1/gifs/trending';
    let key = 'p8v3HTqAOrj6dkDFYpjtOOyhSsJRLp6j';
    let rating = '&rating=g';
    let limit = '&limit=24';

    fetch(giphy + "?api_key=" + key + rating + limit + "lang=es")
        .then((data) => {
            return data.json();
        })
        .then((json) => {
            json.data.map((el) => {
                let cajaTendencia = document.createElement('div');
                cajaTendencia.classList.add('caja-tendencia');
                let gif = document.createElement('img');
                gif.src = el.images.fixed_width_downsampled.url;
                // if (el.images.fixed_width_downsampled.width > el.images.fixed_width_downsampled.height) {
                //     gif.style.width = "550px";
                // }
                cajaTendencia.appendChild(gif);
                let titulo = document.createElement('div');
                titulo.classList.add('borde-ventana');
                let label = document.createElement('label');
                let textTitulo = el.title.split("by");
                let tituloFinal = textTitulo[0].split(" ");
                if (tituloFinal[0] == "" || textTitulo == "") {
                    label.innerText = "#GIF";
                } else {
                    for (let i = 0; i < tituloFinal.length; i++) {
                        if (tituloFinal[i] !== "")
                            label.innerText += " #" + tituloFinal[i];
                    }
                }
                titulo.appendChild(label);
                cajaTendencia.appendChild(titulo);

                cajaTendencia.addEventListener('click', () => {
                    let buscar = label.innerText.split("#");
                    let terminoBusqueda = "";
                    for (let i = 0; i < buscar.length; i++) {
                        terminoBusqueda += buscar[i] + " ";
                        if (i == 3)
                            break;
                    }
                    cargarBusqueda(terminoBusqueda);
                });
                let containerTendencias = document.getElementById('container-tendencias-giph');
                containerTendencias.appendChild(cajaTendencia);
            });
        })
        .catch((err) => {
            console.log(err);
        })
}

function peticionSugerenciasBotones(texto) {
    let cajaRelacionados = document.getElementById('caja-sugerencias');
    cajaRelacionados.innerHTML = "";
    if (localStorage.getItem('historial') == null) {
        let array = [texto];
        localStorage.setItem('historial', JSON.stringify(array));
    } else {
        let data = JSON.parse(localStorage.getItem('historial'));

        data.unshift(texto);

        for (let index = 1; index < data.length; index++) {
            let sug = document.createElement('button');
            sug.innerHTML = "#" + data[index];

            sug.addEventListener('click', () => {
                cargarBusqueda(data[index]);
            });
            cajaRelacionados.appendChild(sug);
            if (index == 15)
                break;
        }

        localStorage.setItem('historial', JSON.stringify(data));
    }
}


function cargarDatosIniciales() {
    for (let i = 0; i < 4; i++) {
        peticionGiphSugerencia(i);
    }

    peticionTendenciasGiph();   

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