const app = Vue.createApp({
    data(){
        return {
            mensaje: "TEST"
        }
    },
    methods:{
        eventoRebido(data){
            console.log("evento", data)
        }
    }
})

app.component( "titulo", {
    props: ["text"],    //son inmutables y no se pueden modificar dentro de nuestro componente
    data(){
        return {
            //titulo: "Soy un titulo"
        }
    },
    methods:{
        nuevoEmit(){
            this.$emit("evento", { mensaje: "Esto me lo envio el emit" })
        }
    },
    template: `
    <div>
        <h1>{{text}}</h1>
        <button v-on:click="nuevoEmit">evento</button>
    </div>
    `
} ) //registrando en la instancia principal de vue! -> para poder usarlo

app.mount("#app")