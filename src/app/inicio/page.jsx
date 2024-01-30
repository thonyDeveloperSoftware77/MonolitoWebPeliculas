"use client"
import { useEffect, useState } from "react";
import { getPeliculas } from "../../../controllers/peliculasController"
import Home from "../../components/Home";
import Tendency from "@/components/Tendency";
import Recomendation from "@/components/Recomendation";
import Favorite from "@/components/Favorite";
import WatchList from "@/components/WatchList";
import { Accordion, AccordionItem, Button, User } from "@nextui-org/react";
import { auth } from '../../../context/firebase'
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { getUsuario } from "../../../controllers/userController";
export default function Page() {
    const [uid, setUid] = useState(null);
    const [usuario, setUsuario] = useState(null);
    
    const [update, setUpdate] = useState(false); // Estado para forzar la actualización
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // El usuario ha iniciado sesión
                setUid(user.uid);
                getUsuario(user.uid).then((response) => {
                    console.log(response);
                    setUsuario(response);
                });
            } else {
                // No hay ningún usuario conectado, redirige al inicio
                router.push('/');
            }
        });
        return unsubscribe;
    }, [update]);


    //OpcionesDelMenu
    const [opcionesMenu, setOpcionesMenu] = useState([{
        0: true,
        component: Home
    }, {
        1: false,
        component: Tendency
    }, {
        2: false,
        component: Recomendation
    }, {
        3: false,
        component: Favorite
    }, {
        4: false,
        component: WatchList
    }
    ]);

    //funciones para los cambios de estados
    const handleChangeOption = (numero) => {
        const nuevasOpcionesMenu = opcionesMenu.map((opcion, index) => {
            return {
                ...opcion,
                [index]: index === numero
            }
        })

        setOpcionesMenu(nuevasOpcionesMenu)
    }


    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            {/*sideBar */}
            {/*usuario == null ? router.push('/') : */(
                <>

                    <div className="SideBar">
                        <div className='ContentSideBar'>
                            <center>
                                {/*<Image src='/logo.png' width={70} height={70} />*/}
                            </center>
                            {/*User photo, roll and name*/}
                            <br />
                            <center>
                                <div className='userProfileContent'>
                                    <User
                                        //name={usuario._Nombre + " " + usuario._Apellido}
                                        description={usuario?._nombre}
                                        avatarProps={{
                                            src: "https://i.pravatar.cc/150?u=a04258114e29026702d"
                                        }}
                                    />
                                </div>

                            </center>
                            <br />
                            <br />
                            <Button onClick={() => handleChangeOption(0)} style={{ width: "100%", color: "white" }} variant="solid"
                                color={opcionesMenu[0][0] ? "primary" : "transparent"}
                            >
                                Explorar
                            </Button>
                            <br /><br />
                            <Button onClick={() => handleChangeOption(1)} style={{ width: "100%", color: "white" }} variant="solid"
                                color={opcionesMenu[1][1] ? "primary" : "transparent"}
                            >
                                Tendencias
                            </Button>
                            
                            <br />
                            <br />
                            <Button onClick={() => handleChangeOption(3)} style={{ width: "100%", color: "white" }} variant="solid"
                                color={opcionesMenu[3][3] ? "primary" : "transparent"}
                            >
                                Favoritas
                            </Button>

                            <br />
                            <br />
                            <Button onClick={() => handleChangeOption(4)} style={{ width: "100%", color: "white" }} variant="solid"
                                color={opcionesMenu[4][4] ? "primary" : "transparent"}
                            >
                                Watch Later
                            </Button>



                        </div>
                    </div>
                    <div className="ContentBoxAll"  >
                        {opcionesMenu.map((opcion, index) => {
                            if (opcion[index]) {
                                const Component = opcion.component;
                                return <div key={index}  ><Component setUpdate={setUpdate} uid={uid} user={usuario} id="admin" handleChangeOption={handleChangeOption} /></div>
                            }
                        })}
                    </div>
                </>
            )}
        </main>
    )
}