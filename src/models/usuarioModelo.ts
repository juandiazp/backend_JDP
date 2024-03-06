import pool from '../config/connection';


class UsuarioModelo {


    public async list() {
        const result = await pool.then( async (connection) => {
            return await connection.query(
                " SELECT u.email, u.password, u.role "
                + " FROM tbl_usuario u ")  });
        return result;
    }


    public async add(usuario: any) {
        // Verificar si ya existe un usuario con el mismo email
        const existingUser = await pool.then(async (connection) => {
            return await connection.query(
                "SELECT * FROM tbl_usuario WHERE email = ?", [usuario.email]
            );
        });
    
        // Si ya existe un usuario con el mismo email, manejar el error
        if (existingUser.length > 0) {
            throw new Error("Ya existe un usuario con el mismo correo electrónico");
            // return { error: "Ya existe un usuario con el mismo correo electrónico" };
        } else {
            // Si no existe un usuario con el mismo email, proceder con la inserción
            const result = await pool.then(async (connection) => {
                return await connection.query(
                    "INSERT INTO tbl_usuario SET ?", [usuario]
                );
            });
    
            return result;
        }
    }
    


    public async update(usuario: any) {
        // Verificar si el usuario existe antes de intentar la actualización
        const userExists = await pool.then(async (connection) => {
            return await connection.query(
                "SELECT * FROM tbl_usuario WHERE email = ?", [usuario.email]
            );
        });
    
        // Si el usuario no existe, manejar el error
        if (userExists.length === 0) {
            throw new Error("El usuario con el correo electrónico proporcionado no existe");
        } else {
            // Si el usuario existe, proceder con la actualización de la contraseña
            const update = "UPDATE tbl_usuario SET password='" + usuario.password +
                "' WHERE email='" + usuario.email + "'";
            console.log("Update " + update);
    
            const result = await pool.then(async (connection) => {
                return await connection.query(update);
            });
    
            return result;
        }
    }
    


    public async delete(email: string) {
        // Verificar si el usuario existe antes de intentar la eliminación
        const userExists = await pool.then(async (connection) => {
            return await connection.query(
                "SELECT * FROM tbl_usuario WHERE email = ?", [email]
            );
        });
    
        // Si el usuario no existe, manejar el error
        if (userExists.length === 0) {
            throw new Error("El usuario con el correo electrónico proporcionado no existe y no se puede eliminar");
            
        } else {
            // Si el usuario existe, proceder con la eliminación
            console.log('Eliminando');
            const result = await pool.then(async (connection) => {
                return await connection.query(
                    "DELETE FROM tbl_usuario WHERE email = ?", [email]
                );
            });
    
            return result;
        }
    }
    
}
const model = new UsuarioModelo();
export default model;