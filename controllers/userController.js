import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../context/firebase";

export async function getUsuario(id) {
  try {
    const usuario = await fetch(`http://localhost:8001/api/usuario/${id}`)
    .then((res) => res.json())
    .then((data) => data);
    return usuario;
  } catch (error) {
    console.log(error);
    return null;
  }
}

//Para regstrar un usuario con post

export async function registrarUsuario(_id, _email, _nombre, _pais) {
  try {
    const usuario = await fetch(`http://localhost:8001/api/usuario`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id, _email, _nombre, _pais }),
    })
      .then((res) => res.json())
      .then((data) => data);
    return usuario;
  } catch (error) {
    console.log(error);
    return null;
  }
}


//Para insertar un favorito
export async function registrarFav(id, id_usuario ) {
  try {
    const usuario = await fetch(`http://localhost:8001/api/favorito`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, id_usuario }),
    })
      .then((res) => res.json())
      .then((data) => data);
    return usuario;
  } catch (error) {
    console.log(error);
    return null;
  }
}

//Para eliminar un favorito
export async function eliminarFav(id, id_usuario ) {
  try {
    const usuario = await fetch(`http://localhost:8001/api/favorito`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, id_usuario }),
    })
      .then((res) => res.json())
      .then((data) => data);
    return usuario;
  } catch (error) {
    console.log(error);
    return null;
  }
}

//Para insertar watchlist
export async function registrarWatch(id, id_usuario ) {
  try {
    const usuario = await fetch(`http://localhost:8001/api/watchlist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, id_usuario }),
    })
      .then((res) => res.json())
      .then((data) => data);
    return usuario;
  } catch (error) {
    console.log(error);
    return null;
  }
}

//Para eliminar watchlist

export async function eliminarWatch(id, id_usuario ) {
  try {
    const usuario = await fetch(`http://localhost:8001/api/watchlist`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, id_usuario }),
    })
      .then((res) => res.json())
      .then((data) => data);
    return usuario;
  } catch (error) {
    console.log(error);
    return null;
  }
}
