const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const doctorControlador = require('./controladores/doctor.controlador');
const clienteControlador = require('./controladores/cliente.controlador');
const examenControlador = require('./controladores/examenes.controlador');


app.get('/doctores', doctorControlador.obtenerDoctores);
app.post('/doctores', doctorControlador.crearDoctor);
app.put('/doctores/:id', doctorControlador.actualizarDoctor);
app.delete('/doctores/:id', doctorControlador.eliminarDoctor);

app.get('/clientes', clienteControlador.obtenerClientes);
app.get('/pacientes/:id', clienteControlador.obtenerCliente);
app.post('/clientes', clienteControlador.crearCliente);
app.put('/clientes/:id', clienteControlador.actualizarCliente);
app.delete('/clientes/:id', clienteControlador.eliminarCliente);

app.get('/examenes', examenControlador.obtenerExamenes);
app.post('/examenes', examenControlador.crearExamen);
app.put('/examenes/:id', examenControlador.actualizarExamen);
app.delete('/examenes/:id', examenControlador.eliminarExamen);


const port = 3000;
app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});
