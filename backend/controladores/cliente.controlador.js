const admin = require('firebase-admin');

const db = admin.firestore();

const nombreColeccion = 'clientes';

exports.obtenerClientes = async (req, res) => {
  try {
    const snapshot = await db.collection(nombreColeccion).get();
    const todos = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    res.json(todos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error' });
  }
};

exports.obtenerCliente = async (req, res) => {
  const { id } = req.params;
  try {
    const docRef = await db.collection(nombreColeccion).doc(id).get();
    if (!docRef.exists) {
      res.status(404).json({ mensaje: 'No existe el cliente' });
    } else {
      res.json({
        id: docRef.id,
        ...docRef.data()
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error' });
  }
};

exports.crearCliente = async (req, res) => {
  const objeto = req.body;
  try {
    const docRef = await db.collection(nombreColeccion).add(objeto);
    res.json({ id: docRef.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error' });
  }
};


exports.actualizarCliente = async (req, res) => {
  const { id } = req.params;
  const objeto = req.body;
  try {
    await db.collection(nombreColeccion).doc(id).update(objeto);
    res.json({ mensaje: 'Actualizado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error' });
  }
};


exports.eliminarCliente = async (req, res) => {
  const { id } = req.params;
  try {
    await db.collection(nombreColeccion).doc(id).delete();
    res.json({ mensaje: 'Eliminado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error' });
  }
};
