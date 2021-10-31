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

///SECCIONES

app.get('/secciones', (req, res) => {
    connection.query(querymanager.getSecciones(), (error, response) => {
        if (error) throw error;
        res.json(response)
    })
})
app.get('/secciones-docentes', (req, res) => {
    connection.query(querymanager.docenteseccion(), (error, response) => {
        if (error) throw error;
        res.json(response)
    })
})
app.get('/secciones-cursos', (req, res) => {
    connection.query(querymanager.cursoseccion(), (error, response) => {
        if (error) throw error;
        res.json(response)
    })
})

app.post('/seccion', (req, res) => {
    connection.query(querymanager.addSeccion(req.body.nombre, req.body.docente, req.body.curso, req.body.horario), (error, response) => {
        if (error) throw error;
        res.json(response)
    })
})

app.get('/seccion/delete/:id', (req, res) => {
    connection.query(querymanager.deleteSeccion(req.params.id), (error, response) => {
        if (error) throw error;
        res.json({})
    })
})

app.patch('/seccion', (req, res) => {
    connection.query(querymanager.updateSeccion(req.body.id, req.body.nombre, req.body.docente, req.body.curso, req.body.horario), (error, response) => {
        if (error) throw error;
        res.json({})
    });
})



//docente 

app.get('/docente', (req, res) => {
    connection.query(querymanager.getDocentes(), (error, response) => {
        if (error) throw error;
        res.json(response)
    })
})

app.post('/crear-docente', (req, res) => {
    connection.query(querymanager.addDocente(req.body.nombre, req.body.apellido), (error, response) => {
        if (error) throw error;
        res.json(response)
    })
})

app.get('/docente/delete/:id', (req, res) => {
    connection.query(querymanager.deleteDocente(req.params.id), (error, response) => {
        if (error) throw error;
        res.json({})
    })
})

app.patch('/docente', (req, res) => {
    connection.query(querymanager.editDocente(req.body.id, req.body.nombre, req.body.apellido), (error, response) => {
        if (error) throw error;
        res.json({})
    });
})


//////STUDENT

app.get('/solicitud-espera/:id', (req, res) => {
    connection.query(querymanager.getSolicitudesEspera(req.params.id), (error, response) => {
        if (error) throw error;
        res.json(response)
    })
})

app.get('/solicitud-seccion-curso', (req, res) => {
    connection.query(querymanager.getSeccionCurso(), (error, response) => {
        if (error) throw error;
        res.json(response)
    })
})

app.post('/solicitud', (req, res) => {
    connection.query(querymanager.addSolicitud(req.body.idAlumno, req.body.idSeccion, req.body.semestre), (error, response) => {
        if (error) throw error;
        res.json(response)
    })
})
app.get('/capacidad/:idSeccion', (req, res) => {
    connection.query(querymanager.comprobarCapacidad(req.params.idSeccion), (error, response) => {
        if (error) throw error;
        res.json(response)
    })
})

app.get('/norepeat/:idAlumno/:idSeccion', (req, res) => {
    connection.query(querymanager.comprobarMatriculaRepetida(req.params.idAlumno, req.params.idSeccion), (error, response) => {
        if (error) throw error;
        res.json(response)
    })
})

app.get('/matriculas-espera/:idAlumno', (req, res) => {
    connection.query(querymanager.getAllMatriculas(req.params.idAlumno), (error, response) => {
        if (error) throw error;
        res.json(response)
    })
})

app.delete('/matricula/delete/:id', (req, res) => {
    connection.query(querymanager.eliminarMatricula(req.params.id), (error, response) => {
        if (error) throw error;
        res.json(response)
    })
})

app.get('/matriculas-historial/:idAlumno', (req, res) => {
    connection.query(querymanager.matriculaHistorial(req.params.idAlumno), (error, response) => {
        if (error) throw error;
        res.json(response)
    })
})






app.listen(PORT, () => console.log('Server running in port ' + PORT))