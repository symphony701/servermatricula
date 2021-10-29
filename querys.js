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
}