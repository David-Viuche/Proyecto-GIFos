let btnElegirTema = document.getElementById('btn-elegir-tema');
let btnElegirTema2 = document.getElementById('btn-elegir-tema2');
let opLight = document.getElementById('op-light');
let opDark = document.getElementById('op-dark');
let buscarContainer = document.getElementById('buscar-container');
let cajaOpcionesTema = document.getElementById('opciones-tema');
let linkCss = document.getElementById('estilos');
let logo = document.getElementById('logo');
let btnBuscar = document.getElementById('btn-buscar');
let cajaSugeridos = document.getElementById('caja-sugeridos');
let textoBusqueda = document.getElementById('texto-buscar');


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
});

opDark.addEventListener('click', () => {
    linkCss.href = "css/theme-dark.css";
    logo.src = "img/gifOF_logo_dark.png";
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
    btnBuscar.style.backgroundColor = '#F7C9F3';
});

textoBusqueda.addEventListener('input', () => {
    cajaSugeridos.style.display = 'flex';
    let texto = textoBusqueda.value;
    if (texto)
        peticionSugerencias(texto);

});

textoBusqueda.addEventListener('focusout', cerrarCajaSugeridos);

btnBuscar.addEventListener('click', () => {
    let texto = textoBusqueda.value;
    if (texto) {
        peticionBusqueda(texto);
    }
});

function cerrarCajaSugeridos() {
    btnBuscar.style.backgroundColor = '#e6e6e6';
    cajaSugeridos.style.display = 'none';
}

function peticionSugerencias(texto) {
    let giphy = 'http://api.giphy.com/v1/gifs/search/tags';
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
                        peticionBusqueda(sug.innerText);
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
    let giphy = 'http://api.giphy.com/v1/gifs/search';
    let key = 'p8v3HTqAOrj6dkDFYpjtOOyhSsJRLp6j';
    // console.log(giphy + "?api_key=" + key + "&q=" + url + "&limit=" + 10);
    fetch(giphy + "?api_key=" + key + "&q=" + url)
        .then((data) => {
            return data.json()
        })
        .then((json) => {
            document.getElementById('container-sugerencia-giph').innerHTML = "";
            json.data.map((el) => {
                let url = el.images.original.url;
                let img = document.createElement('img');
                img.src = url;
                document.getElementById('container-sugerencia-giph').appendChild(img);
            });
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
                titulo.innerText = json.data.title;
                let imgcerrar = document.createElement('img');
                imgcerrar.src = "img/close.svg";
                imgcerrar.alt = "boton-cerrar";
                imgcerrar.id = `cerrar${id}`;
                let imgGiph = document.createElement('img');
                imgGiph.classList.add('giph');
                imgGiph.src = json.data.images.downsized_large.url;
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
                let containerSugerencias = document.getElementById('container-sugerencia-giph');
                containerSugerencias.appendChild(cajaT);
            }
        })
        .catch((err) => {
            console.log(err);
        })
}


for (let i = 0; i < 4; i++) {
    peticionGiphSugerencia(i);
}

