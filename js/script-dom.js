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
    }
}

window.onload = () => new ModificarDOM();