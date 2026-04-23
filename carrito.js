const d = document;
const catalogo = d.getElementById('catalogo');

const app = Vue.createApp({
    data(){
        return{
            productos: []
        }
    },
    methods:{
        async cargarProductos(){
            try {
                const response = await fetch('recursos/productos.json');
                const data = await response.json();
                this.productos = data.productos;
            } catch (error) {
                console.error("Error al cargar:", error);
            }
        }
    },
    mounted() {
        this.cargarProductos();
    }
})

app.component("titulo", {
    props: ["text"],
    data(){
        return{

        }
    },
    methods:{
        nuevoEmit(){
            this.$emit("evento", { mensaje: "Esto me lo envio el emit"})
        }
    },
    template:` 
    <div>
        <h1>{{text}}</h1>
        <button v-on:click="nuevoEmit">evento</button>
    </div>
    `
})

app.component("card", {
    props: ["name"],
    data(){
        return{}
    },
    methods:{
        nuevoEmit(){
            this.$emit("evento", { mensaje: "Esto me lo envio el emit"})
        }

    },
    template:`
        <div class="card">
            <h3>{{name}}</h3>

            <figure>
                <img src="" alt="">
                <figcaption></figcaption>
            </figure>

            <button v-on:click="nuevoEmit">evento</button>

        </div>
    `
})

app.mount('#app')