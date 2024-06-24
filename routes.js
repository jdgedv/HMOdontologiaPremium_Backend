/*
var soloandmin = function(req, res, next){
     var rol = req.session.rol
     if(rol == 1){
         next()
     }
     else{
         res.json({state:false, mensaje:"Esta ap solo la pueden usar los Administradores"})
     }
 }
*/



var usuariosController = require('./api/controladores/usuariosController').usuariosController;
var citasController = require('./api/controladores/citasController').citasController;
var tratamientosController = require('./api/controladores/tratamientosController').tratamientosController;
var ciudadesController = require('./api/controladores/ciudadesController').ciudadesController;
var departamentosController = require('./api/controladores/departamentosController').departamentosController;


app.get('/ciudades/list', async (req,res) => {
    ciudadesController.list(req,res);
});
app.get('/departamentos/list', async (req,res) => {
    departamentosController.list(req,res);
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

app.get('/usuarios/activar/:correo/:codigoact', async (req,res) => {
    usuariosController.activar(req,res);
});

app.post('/usuarios/state', async (req,res) => {
    res.json(req.session)
});

app.post("/usuarios/logout", async (request, response) => {
    request.session.destroy()
    response.json({state:true, mensaje:"Sesión Cerrada"})
})

app.post("/citas/save",function(req,res){
    citasController.save(req,res);
});

app.get('/citas/list', async (req,res) => {
    citasController.list(req,res);
});

app.get('/citas/listId', async (req,res) => {
    citasController.listId(req,res);
});

app.get('/citas/listUsuario', async (req,res) => {
    citasController.listUsuario(req,res);
});

app.get('/citas/listCompleto', async (req,res) => {
    citasController.listCompleto(req,res);
});

app.put('/citas/update', async (req,res) => {
    citasController.update(req,res);
});

app.delete('/citas/delete', async (req,res) => {
    citasController.delete(req,res);
});

app.post("/tratamientos/save",function(req,res){
    tratamientosController.save(req,res);
});

app.get('/tratamientos/list', async (req,res) => {
    tratamientosController.list(req,res);
});

app.get('/tratamientos/listId', async (req,res) => {
    tratamientosController.listId(req,res);
});

app.put('/tratamientos/update', async (req,res) => {
    tratamientosController.update(req,res);
});

app.delete('/tratamientos/delete', async (req,res) => {
    tratamientosController.delete(req,res);
});

