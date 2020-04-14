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

        // document.getElementById('btn-elegir-tema').addEventListener('focusout', () => {
        //     let caja = document.getElementById('opciones-tema');
        //     (caja.style.display == "flex") ? caja.style.display = "none" : caja.style.display = 'flex';
        // });

        // document.getElementById('btn-elegir-tema2').addEventListener('focusout',()=>{
        //     let caja = document.getElementById('opciones-tema');
        //     (caja.style.display == "flex") ? caja.style.display = "none" : caja.style.display = 'flex';
        // });

        document.getElementById('op-light').addEventListener('click',()=>{
            document.getElementById('estilos').href = "css/theme-light.css";
            document.getElementById('logo').src = "img/gifOF_logo.png";
        });

        document.getElementById('op-dark').addEventListener('click',()=>{
            document.getElementById('estilos').href = "css/theme-dark.css";
            document.getElementById('logo').src = "img/gifOF_logo_dark.png";
        });

        document.getElementById('texto-buscar').addEventListener('click',()=>{
            document.getElementById('buscar').style.backgroundColor = '#F7C9F3';
            let caja = document.getElementById('caja-sugeridos');
            (caja.style.display == "flex") ? caja.style.display = "none" : caja.style.display = 'flex';
        });

        document.getElementById('texto-buscar').addEventListener('focusout',()=>{
            document.getElementById('buscar').style.backgroundColor = '#e6e6e6';
            let caja = document.getElementById('caja-sugeridos');
            (caja.style.display == "flex") ? caja.style.display = "none" : caja.style.display = 'flex';
        });

        document.getElementById('buscar').addEventListener('click',()=>{
            let texto = document.getElementById('texto-buscar').value;
            if(texto){
                document.getElementById('section-giph').innerHTML = "";
                this.peticion(texto);
            }
        });
    }

    peticion(url){
        let giphy = 'http://api.giphy.com/v1/gifs/search';
        let key = 'p8v3HTqAOrj6dkDFYpjtOOyhSsJRLp6j';
    
        fetch(giphy+"?api_key="+key+"&q="+url)
        .then((data)=>{
            return data.json()
        })
        .then((json)=>{
            json.data.map((el)=>{
                let url = el.images.downsized_large.url;
                let img = document.createElement('img');
                img.src = url;
                document.getElementById('section-giph').appendChild(img);
            });
        })
        .catch((err)=>{
            console.log(err);
        })
    }
}

window.onload = () => new ModificarDOM();