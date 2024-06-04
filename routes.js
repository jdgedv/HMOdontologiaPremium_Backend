var productos = require('./api/controladores/productosController').productos;
var categorias = require('./api/controladores/categoriasController').categorias;

app.post("/categorias/save",function(req,res){
    categorias.saveCategoria(req,res);
});

app.get('/categorias/listar', async (req,res) => {
    categorias.getCategorias(res);
});

app.post("/productos/save",function(req,res){
    productos.saveProducto(req,res);
});

app.get('/productos/listar', async (req,res) => {
    productos.getProductos(res);
});