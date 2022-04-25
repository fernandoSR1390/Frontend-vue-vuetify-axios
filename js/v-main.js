
let url = 'http://localhost:8000/api/productos/';//laravel7
//let url = 'http://localhost:3000/api/productos/';//nodejs

new Vue({
  el: '#app',
  vuetify: new Vuetify(),
   data() {
    return {            
        productos: [],
        dialog: false,
        operacion: '',            
        producto:{
            id: null,
            descripcion:'',
            precio:''
        }          
    }
   },
   created(){               
        this.mostrar()
   },  
   methods:{          
        //MÉTODOS PARA EL CRUD
        mostrar:function(){
          axios.get(url)
          .then(response =>{
            this.productos = response.data;                   
          })
        },
        crear:function(){
            let parametros = {descripcion:this.producto.descripcion, precio:this.producto.precio };                
            axios.post(url, parametros)
            .then(response =>{
              this.mostrar();
            });     
            this.producto.descripcion="";
            this.producto.precio="";
        },                        
        editar:function(){
          let parametros = {descripcion:this.producto.descripcion, precio:this.producto.precio, id:this.producto.id};               
             axios.put(url+this.producto.id, parametros)                            
              .then(response => {                                
                 this.mostrar();
              })                
              .catch(error => {
                  console.log(error);            
              });
        },
        borrar:function(id){
         Swal.fire({
            title: 'Confirma eliminar el producto?',   
            confirmButtonText: `Confirmar`,                  
            showCancelButton: true,                          
          }).then((result) => {                
            if (result.isConfirmed) {      
                  //procedimiento borrar
                  axios.delete(url+id)
                  .then(response =>{           
                      this.mostrar();
                   });      
                  Swal.fire('Eliminado!', '', 'success')
            } else if (result.isDenied) {                  
            }
          });              
        },

        //Botones y formularios
        guardar:function(){
          if(this.operacion=='crear'){
            this.crear();                
          }
          if(this.operacion=='editar'){ 
            this.editar();                           
          }
          this.dialog=false;                        
        }, 
        formNuevo:function () {
          this.dialog=true;
          this.operacion='crear';
          this.producto.descripcion='';                           
          this.producto.precio='';
        },
        formEditar:function(id, descripcion, precio){
          //capturamos los datos del producto seleccionado y los mostramos en el formulario
          this.producto.id = id;
          this.producto.descripcion = descripcion;                            
          this.producto.precio = precio;                    
          this.dialog=true;                            
          this.operacion='editar';
        },
        formatPrice(value) {
          let val = (value/1).toFixed(2).replace('.', ',')
          return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        } 
   }      
});