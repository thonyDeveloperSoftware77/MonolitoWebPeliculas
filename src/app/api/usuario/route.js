import { registrarUsuario } from "../../../../context/dbSql";



export async function registrarUsuarioApi(id, email, nombre, pais) {
    const user =  await registrarUsuario(id, email, nombre, pais);
    res.status(200).json(user); 
}