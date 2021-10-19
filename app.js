const express = require('express');
const mysql = require('mysql');
const connection = require('./connection');
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = process.env.PORT || 3050;
const app = express();

const QueryManager = require('./querys.js')
const querymanager = new QueryManager();

//connection.connect();

connection.query('SELECT 1 + 1 AS solution', function(error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results[0].solution);
});

app.use(express.json());
app.use(cors());


app.get('/', (req, res) => {
    res.send('Welcom to matricula app')
});

app.post('/register-user', (req, res) => {
    const sql = `INSERT INTO Usuario
    (CUsuario,CDNI,NNombre,NApellido,NContrasenia,NCorreo,NumTelefono,IdOcupacion) 
    VALUES ("${req.body.CAlumno}",${req.body.DNI} ,'${req.body.Nombre}','${req.body.Apellido}','${req.body.Contrasenia}','${req.body.Correo}',${req.body.Telefono},2);`
    connection.query(sql, (error, response) => {
        if (error) throw error;
        res.json({})
    });
})

app.post('/register-admin', (req, res) => {
    const sql = `INSERT INTO Usuario
    (CUsuario,CDNI,NNombre,NApellido,NContrasenia,NCorreo,NumTelefono,IdOcupacion) 
    VALUES ("${req.body.CAdmin}",${req.body.DNI} ,'${req.body.Nombre}','${req.body.Apellido}','${req.body.Contrasenia}','${req.body.Correo}',${req.body.Telefono},1);`
    connection.query(sql, (error, response) => {
        if (error) throw error;
        res.json({})
    });
})

app.post('/login', (req, res) => {

    connection.query(querymanager.validateUser(req.body.CUser, req.body.NContrasenia), (error, response) => {
        if (error) throw error;
        res.json(response)
    });

})


/////////ADMIN
//////CURSOS
app.post('/crear-curso', (req, res) => {
    connection.query(querymanager.CreateCourse(req.body.Nombre), (error, response) => {
        if (error) throw error;
        res.json({})
    })
})
app.get('/cursos', (req, res) => {
    connection.query(querymanager.getCourses(), (error, response) => {
        if (error) throw error;
        res.json(response)
    });

})
app.patch('/cursos', (req, res) => {
    connection.query(querymanager.editCourse(req.body.id, req.body.nombre), (error, response) => {
        if (error) throw error;
        res.json({})
    });
})

app.get('/cursos/delete/:id', (req, res) => {
    connection.query(querymanager.deleteCourse(req.params.id), (error, response) => {
        if (error) throw error;
        res.json({})
    })
})


//////STUDENT





app.listen(PORT, () => console.log('Server running in port ' + PORT))