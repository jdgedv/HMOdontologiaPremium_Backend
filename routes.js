var usuariosController = require('./api/controladores/usuariosController').usuariosController;
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





app.post("/usuarios/save",function(req,res){
    usuariosController.save(req,res);
});

app.get('/usuarios/list', async (req,res) => {
    usuariosController.list(req,res);
});

app.get('/usuarios/listId', async (req,res) => {
    usuariosController.listId(req,res);
});

app.put('/usuarios/update', async (req,res) => {
    usuariosController.update(req,res);
});

app.delete('/usuarios/delete', async (req,res) => {
    usuariosController.delete(req,res);
});

app.post('/usuarios/login', async (req,res) => {
    usuariosController.login(req,res);
});

app.post('/usuarios/state', async (req,res) => {
    res.json(req.session)
});

