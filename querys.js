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
}