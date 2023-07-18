const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const doctorControlador = require('./controladores/doctor.controlador');


app.get('/doctores', doctorControlador.obtenerDoctores);
app.post('/doctores', doctorControlador.crearDoctor);
app.put('/doctores/:id', doctorControlador.actualizarDoctor);
app.delete('/doctores/:id', doctorControlador.eliminarDoctor);


const port = 3000;
app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});
