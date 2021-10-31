module.exports = class QueryManager {
    QueryManager() {}
    validateUser(Codigo, Password) {
        const consult = `select * from Usuario where CUsuario = '${Codigo}' and NContrasenia = '${Password}' LIMIT 1;`
        return consult
    }
    CreateCourse(Nombre) {
        return `INSERT INTO Curso (NCurso) values ('${Nombre}');`
    }
    getCourses() {
        return `select IdCurso as id, NCurso as name from Curso ;`
    }
    editCourse(id, nombre) {
        return `UPDATE Curso
        SET NCurso = '${nombre}'
        WHERE idCurso = ${id}`
    }
    deleteCourse(id) {
        return `DELETE FROM Curso WHERE IdCurso = ${id};`
    }

    getDocentes() {
        return 'select IdDocente as id, NNombreD as nombre, NApellidoD as apellido from Docente'
    }
    addDocente(nombre, apellido) {
        return `INSERT INTO Docente (NNombreD, NApellidoD) VALUES ('${nombre}','${apellido}');`
    }

    deleteDocente(id) {
        return `DELETE FROM Docente WHERE IdDocente = ${id};`
    }
    editDocente(id, nombre, apellido) {
            return `UPDATE Docente SET NNombreD = '${nombre}', NApellidoD = '${apellido}' WHERE IdDocente = ${id}`
        }
        //secciones
    getSecciones() {
        return `select IdSeccion as id, NSeccion as name, Curso.NCurso as cursoname,THorario as horario  ,  concat_ws(' ',Docente.NNombreD, Docente.NApellidoD) as docente from Seccion
        inner join Curso on Curso.IdCurso = Seccion.IdCurso
        inner join Docente on Docente.IdDocente = Seccion.IdDocente;`
    }

    docenteseccion() {
        return `Select concat_ws(' ',NNombreD,NApellidoD) as text , IdDocente as value from Docente;`
    }

    cursoseccion() {
        return `select NCurso as text , IdCurso as value from Curso;`
    }

    addSeccion(nombre, docente, curso, horario) {
        return `INSERT INTO Seccion (NSeccion,IdCurso,THorario,IdDocente) VALUES ('${nombre}',${curso},'${horario}',${docente});`
    }
    deleteSeccion(id) {
        return `DELETE FROM Seccion WHERE IdSeccion = ${id};`
    }
    updateSeccion(id, nombre, docente, curso, horario) {
        return `UPDATE Seccion SET NSeccion = '${nombre}', IdCurso = ${curso} ,IdDocente = ${docente}, THorario = '${horario}' WHERE IdSeccion = ${id}`
    }
    getSolicitudesEspera(idUsuario) {
        return `select concat_ws(' ',Usuario.NNombre,Usuario.NApellido) as nameAlumno, Seccion.NSeccion as seccion,Curso.NCurso as curso, concat_ws(' ',Docente.NNombreD,Docente.NApellidoD) as docente  ,NSemestre as semestre, EstadoMatricula.NEstado as estado
                from Matricula
                inner join Usuario on Usuario.IdUsuario = Matricula.IdAlumno
                inner join Seccion on Seccion.IdSeccion = Matricula.IdSeccion
                inner join Curso on Curso.IdCurso = Seccion.IdCurso
                inner join EstadoMatricula on EstadoMatricula.IdEstado = Matricula.IdEstado
                inner join Docente on Docente.IdDocente = Seccion.IdDocente
                where Usuario.IdUsuario = ${idUsuario} and EstadoMatricula.IdEstado = 1`
    }
    getSeccionCurso() {
        return `select concat_ws(' - ',Seccion.NSeccion,Curso.NCurso) as text , Seccion.IdSeccion as id from Seccion
                inner join Curso on Curso.IdCurso = Seccion.IdCurso;`
    }
    addSolicitud(idAlumno, idSeccion, semestre) {
        return `INSERT INTO Matricula (IdAlumno, IdSeccion, NSemestre, IdEstado) VALUES (${idAlumno}, ${idSeccion}, '${semestre}', 1);`
    }
    comprobarCapacidad(idSeccion) {
        return `SELECT COUNT(*) as cantidad
         FROM Matricula
		 WHERE IdEstado != 3 and IdSeccion = ${idSeccion}`
    }
    comprobarMatriculaRepetida(idAlumno, idSeccion) {
        return `SELECT COUNT(*) as repeticiones
         FROM Matricula
		 WHERE IdAlumno = ${idAlumno} and IdSeccion = ${idSeccion} and IdEstado !=3;`
    }
    getAllMatriculas(idAlumno) {
        return `select Matricula.IdMatricula as id, concat_ws(' ',Usuario.NNombre,Usuario.NApellido) as nameAlumno, Seccion.NSeccion as seccion,Curso.NCurso as curso, concat_ws(' ',Docente.NNombreD,Docente.NApellidoD) as docente  ,NSemestre as semestre, EstadoMatricula.NEstado as estado
                from Matricula
                inner join Usuario on Usuario.IdUsuario = Matricula.IdAlumno
                inner join Seccion on Seccion.IdSeccion = Matricula.IdSeccion
                inner join Curso on Curso.IdCurso = Seccion.IdCurso
                inner join EstadoMatricula on EstadoMatricula.IdEstado = Matricula.IdEstado
                inner join Docente on Docente.IdDocente = Seccion.IdDocente
                where Usuario.IdUsuario = ${idAlumno} and EstadoMatricula.IdEstado = 1`
    }
    eliminarMatricula(idMatricula) {
        return `DELETE FROM Matricula WHERE IdMatricula = ${idMatricula};`
    }

    matriculaHistorial(idUsuario) {
        return `select concat_ws(' ',Usuario.NNombre,Usuario.NApellido) as nameAlumno, Seccion.NSeccion as seccion,Curso.NCurso as curso, concat_ws(' ',Docente.NNombreD,Docente.NApellidoD) as docente  ,NSemestre as semestre, EstadoMatricula.NEstado as estado
                from Matricula
                inner join Usuario on Usuario.IdUsuario = Matricula.IdAlumno
                inner join Seccion on Seccion.IdSeccion = Matricula.IdSeccion
                inner join Curso on Curso.IdCurso = Seccion.IdCurso
                inner join EstadoMatricula on EstadoMatricula.IdEstado = Matricula.IdEstado
                inner join Docente on Docente.IdDocente = Seccion.IdDocente
                where Usuario.IdUsuario = ${idUsuario}`
    }
    getAllMatriculasAprovarRechazar() {
        return `select Matricula.IdMatricula as id, concat_ws(' ',Usuario.NNombre,Usuario.NApellido) as nameAlumno, Seccion.NSeccion as seccion,Curso.NCurso as curso, concat_ws(' ',Docente.NNombreD,Docente.NApellidoD) as docente  ,NSemestre as semestre, EstadoMatricula.NEstado as estado
                from Matricula
                inner join Usuario on Usuario.IdUsuario = Matricula.IdAlumno
                inner join Seccion on Seccion.IdSeccion = Matricula.IdSeccion
                inner join Curso on Curso.IdCurso = Seccion.IdCurso
                inner join EstadoMatricula on EstadoMatricula.IdEstado = Matricula.IdEstado
                inner join Docente on Docente.IdDocente = Seccion.IdDocente
                where EstadoMatricula.IdEstado = 1`
    }

    procesarMatricula(idMatricula, action) {
        return `UPDATE Matricula
        SET IdEstado = ${action}
        WHERE IdMatricula=${idMatricula};`
    }
    listaMatriculasAdmin() {
        return `select Matricula.IdMatricula as id, concat_ws(' ',Usuario.NNombre,Usuario.NApellido) as nameAlumno, Seccion.NSeccion as seccion,Curso.NCurso as curso, concat_ws(' ',Docente.NNombreD,Docente.NApellidoD) as docente  ,NSemestre as semestre, EstadoMatricula.NEstado as estado
                from Matricula
                inner join Usuario on Usuario.IdUsuario = Matricula.IdAlumno
                inner join Seccion on Seccion.IdSeccion = Matricula.IdSeccion
                inner join Curso on Curso.IdCurso = Seccion.IdCurso
                inner join EstadoMatricula on EstadoMatricula.IdEstado = Matricula.IdEstado
                inner join Docente on Docente.IdDocente = Seccion.IdDocente
                where EstadoMatricula.IdEstado != 1`
    }
}