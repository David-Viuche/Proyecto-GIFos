class ModificarDOM {
    constructor() {
        this.agregarEventListeners();
    }

    agregarEventListeners() {
        document.getElementById('btn-elegir-tema').addEventListener('click', () => {
            let caja = document.getElementById('opciones-tema');
            (caja.style.display == "flex") ? caja.style.display = "none" : caja.style.display = 'flex';
        });

        document.getElementById('btn-elegir-tema2').addEventListener('click', () => {
            let caja = document.getElementById('opciones-tema');
            (caja.style.display == "flex") ? caja.style.display = "none" : caja.style.display = 'flex';
        });

        document.getElementById('op-light').addEventListener('click', () => {
            document.getElementById('estilos').href = "css/theme-light.css";
            document.getElementById('logo').src = "img/gifOF_logo.png";
        });

        document.getElementById('op-dark').addEventListener('click', () => {
            document.getElementById('estilos').href = "css/theme-dark.css";
            document.getElementById('logo').src = "img/gifOF_logo_dark.png";
        });

        document.getElementById('buscar-container').addEventListener('mouseleave', () => {
            document.getElementById('buscar').style.backgroundColor = '#F7C9F3';
            let caja = document.getElementById('caja-sugeridos');
            caja.style.display = 'none';
            // (caja.style.display == "flex") ? caja.style.display = "none" : caja.style.display = 'flex';
        });

        document.getElementById('texto-buscar').addEventListener('input', () => {
            document.getElementById('buscar').style.backgroundColor = '#e6e6e6';
            let caja = document.getElementById('caja-sugeridos');
            caja.style.display = 'flex';
            let texto = document.getElementById('texto-buscar').value;
            if (texto)
                this.peticionSugerencias(texto);

        });

        document.getElementById('texto-buscar').addEventListener('blur', () => {
            document.getElementById('buscar').style.backgroundColor = '#e6e6e6';
            let caja = document.getElementById('caja-sugeridos');
            caja.style.display = 'none';

        });

        document.getElementById('buscar').addEventListener('click', () => {
            let texto = document.getElementById('texto-buscar').value;
            if (texto) {
                this.peticionBusqueda(texto);
            }
        });
    }

    peticionSugerencias(texto) {
        let giphy = 'http://api.giphy.com/v1/gifs/search/tags';
        let key = 'p8v3HTqAOrj6dkDFYpjtOOyhSsJRLp6j';

        fetch(giphy + "?api_key=" + key + "&q=" + `'${texto}'`)
            .then((data) => {
                return data.json()
            })
            .then((json) => {
                if (json.data.length) {
                    document.getElementById('caja-sugeridos').innerHTML = "";

                    for (let index = 0; index < json.data.length; index++) {
                        let sug = document.createElement('button');
                        sug.classList.add('btn-sugeridos');
                        sug.id = `op-sugeridos-${index+1}`;
                        sug.innerHTML = json.data[index].name;
                        document.getElementById('caja-sugeridos').appendChild(sug);

                        let sugb = document.getElementById(`op-sugeridos-${index+1}`);
                        //sugb.addEventListener('click',this.peticionBusqueda(sugb.innerText));
                        if(index==2)
                            break;
                    }
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }

    peticionBusqueda(url) {
        let giphy = 'http://api.giphy.com/v1/gifs/search';
        let key = 'p8v3HTqAOrj6dkDFYpjtOOyhSsJRLp6j';
        console.log(giphy + "?api_key=" + key + "&q=" + url+"&limit="+10);
        fetch(giphy + "?api_key=" + key + "&q=" + url)
            .then((data) => {
                return data.json()
            })
            .then((json) => {
                document.getElementById('section-giph').innerHTML = "";
                json.data.map((el) => {
                    let url = el.images.downsized_large.url;
                    let img = document.createElement('img');
                    img.src = url;
                    document.getElementById('section-giph').appendChild(img);
                });
            })
            .catch((err) => {
                console.log(err);
            })
    }
}

window.onload = () => new ModificarDOM();