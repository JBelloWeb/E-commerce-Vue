const app = Vue.createApp({
    data(){
        return{
            productos: [],
            carrito: [],
            busqueda: "",
            categoriaSeleccionada: "Todas",
            ordenamiento: "ninguno"
        }
    },
    computed: {
        categorias(){
            const categorias = this.productos.map(p => p.categoria);
            return ["Todas", ...new Set(categorias)];
        },
        productosFiltrados(){
            let result = [...this.productos];

            // Filtro por categoría
            if(this.categoriaSeleccionada !== "Todas"){
                result = result.filter(p => p.categoria === this.categoriaSeleccionada);
            }

            // Filtro por búsqueda
            if(this.busqueda.trim() !== ""){
                const query = this.busqueda.toLowerCase();
                result = result.filter(p => p.nombre.toLowerCase().includes(query));
            }

            // Ordenamiento
            if(this.ordenamiento === "precio-asc"){
                result.sort((a, b) => a.precio - b.precio);
            } else if(this.ordenamiento === "precio-desc"){
                result.sort((a, b) => b.precio - a.precio);
            } else if(this.ordenamiento === "nombre-asc"){
                result.sort((a, b) => a.nombre.localeCompare(b.nombre));
            }

            return result;
        },
        total(){
            return this.carrito.reduce((acc, item) => acc + item.precio, 0);
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
        },
        agregarAlCarrito(producto){
            this.carrito.push(producto);
        },
        quitarDelCarrito(index){
            this.carrito.splice(index, 1);
        },
        vaciarCarrito(){
            this.carrito = [];
        }
    },
    mounted() {
        this.cargarProductos();
    }
})

app.component("card", {
    props: ["name", "url", "precio"],
    template:`
        <div class="card">
            <h3>{{name}}</h3>

            <figure>
                <img :src="url" :alt="'Imágen de ' + name">
                <figcaption></figcaption>
            </figure>

            <p>{{precio}}</p>

            <button @click="$emit('agregar', { name, precio, url })">Agregar al Carrito</button>
        </div>
    `
})

app.mount('#app')
