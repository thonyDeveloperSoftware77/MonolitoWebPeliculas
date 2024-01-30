"use client"
import { BreadcrumbItem, Breadcrumbs, Button, Card, CardBody, CardHeader, Input, Select, SelectItem } from '@nextui-org/react'
import Image from 'next/image'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { EyeSlashFilledIcon } from './EyeSlashFilledIcon'
import { EyeFilledIcon } from './EyeFilledIcon'
import { useEffect, useState } from 'react'
import { useUser } from './userContext'
import { doc, setDoc } from 'firebase/firestore'
import { db, auth } from '../../context/firebase'
import { createUserWithEmailAndPassword, getIdToken, signInWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'next/navigation';
import { registrarUsuario } from "../../controllers/userController"

export default function Home() {
  const router = useRouter(); // Inicializa el router

  auth.onAuthStateChanged((user) => {
    if (user) {
      if (typeof window !== 'undefined') {
        document.cookie = "user=" + JSON.stringify(user) + ";domain=.localhost;path=/";
      }
      router.push('/inicio');
    }
  });


  const [currentPage, setCurrentPage] = useState("inicio");


  const notifyVerifySucces = () => toast("Usuario verificado con éxito");
  const notifyVerifyError = () => toast.error("Usuario no encontrado");
  const notifyUserAlreadyExist = () => toast.error("El usuario ya existe");
  const notifyUserCreated = () => toast("Usuario creado con éxito");

  const country = [
    {
      label: "Ecuador",
      value: "EC",
    },
    {
      label: "Colombia",
      value: "CO",
    },
    {
      label: "Perú",
      value: "PE",
    }, {
      label: "Argentina",
      value: "AR",
    }, {
      label: "Chile",
      value: "CL",
    }, {
      label: "Bolivia",
      value: "BO",
    }, {
      label: "Paraguay",
      value: "PY",
    }, {
      label: "Uruguay",
      value: "UY",
    }, {
      label: "Venezuela",
      value: "VE",
    }, {
      label: "Panamá",
      value: "PA",
    }, {
      label: "Costa Rica",
      value: "CR",
    }, {
      label: "México",
      value: "MX",
    }, {
      label: "Brasil",
      value: "BR",
    }

  ]

  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  //OpcionesDelMenu


  const { usuario, setUsuario } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nombre, setNombre] = useState("");
  const [pais, setPais] = useState("");

  const verificarUsuario = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      if (user) {
        notifyVerifySucces();
        // Guardar user en una cookie accesible a través de diferentes puertos
        if (typeof window !== 'undefined') {
          document.cookie = "user=" + JSON.stringify(user) + ";domain=.localhost;path=/";
        }
        router.push('/inicio');
      }
    } catch (error) {
      console.log(error);
      notifyVerifyError();
    }
  }


  const registrarUsuarioPage = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (user) {
        if (typeof window !== 'undefined') {
          document.cookie = "user=" + JSON.stringify(user) + ";domain=.localhost;path=/";
        }
        const uid = user.uid;
        const registro = await registrarUsuario(uid, email, nombre, pais)
        console.log(registro);
        notifyUserCreated();
      }
    } catch (error) {
      notifyUserAlreadyExist();
    }
  }



  return (
    <div className='background preview2'  >

      <main className="flex min-h-screen flex-col items-center justify-between p-24 ">
        <ToastContainer />

        <div className="mainContainerTitle flex flex-col items-center justify-center">
          <h1 >Películas</h1>

          <h2 className="text-2xl font-bold text-center text-default-900">Iniciar Sesión</h2>

        </div>
        <Breadcrumbs
          size="sm"
          onAction={(key) => setCurrentPage(key)}
          classNames={{
            list: "gap-2",
          }}
          itemClasses={{
            item: [
              "px-2 py-0.5 border-small border-default-400 rounded-small",
              "data-[current=true]:border-foreground data-[current=true]:bg-foreground data-[current=true]:text-background transition-colors",
              "data-[disabled=true]:border-default-400 data-[disabled=true]:bg-default-100",
            ],
            separator: "hidden",
          }}
        >
          <BreadcrumbItem key="inicio" isCurrent={currentPage === "inicio"}>
            Iniciar Sesión
          </BreadcrumbItem>
          <BreadcrumbItem key="registro" isCurrent={currentPage === "registro"}>
            Registrarse
          </BreadcrumbItem>

        </Breadcrumbs>

        <div className={currentPage === "inicio" ? "Show" : "hidden"}>
          <Card style={{ width: "350px", marginTop: "10%" }} className="max-w-[440px]">
            <CardHeader className="justify-between">
              <div className="flex gap-5">
                <div className="flex flex-col gap-1 items-start justify-center">
                  <h4 className="text-small font-semibold leading-none text-default-600">Sign In</h4>
                </div>
              </div>
            </CardHeader>
            <CardBody className="px-3 py-0 text-small text-default-400">
              <Input value={email} onValueChange={setEmail} isRequired type="email" variant="bordered" label="Email" placeholder="Enter your email" />
              <br />
              <Input
                value={password} onValueChange={setPassword} isRequired
                label="Password"
                variant="bordered"
                placeholder="Enter your password"
                endContent={
                  <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                    {isVisible ? (
                      <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    ) : (
                      <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    )}
                  </button>
                }
                type={isVisible ? "text" : "password"}
                className="max-w-xs"
              />
              <br /><br />

              <Button onClick={verificarUsuario} color="secondary">
                Iniciar Sesión
              </Button>
              <br /><br />
            </CardBody>
          </Card>
        </div>
        <div className={currentPage === "registro" ? "Show" : "hidden"}>
          <Card style={{ width: "350px", marginTop: "10%" }} className="max-w-[440px]">
            <CardHeader className="justify-between">
              <div className="flex gap-5">
                <div className="flex flex-col gap-1 items-start justify-center">
                  <h4 className="text-small font-semibold leading-none text-default-600">Sign Up</h4>
                </div>
              </div>
            </CardHeader>
            <CardBody className="px-3 py-0 text-small text-default-400">
              <Input required value={nombre} onValueChange={setNombre} isRequired type="text" variant="bordered" label="Name" placeholder="Enter your name" />
              <br />
              <Select
                isRequired
                label="Seleccione su país"
                placeholder="Select your country"
                className="max-w-xs"
                onChange={(e) => setPais(e.target.value)}
              >
                {country.map((countryItem) => (
                  <SelectItem key={countryItem.value} value={countryItem.value}>
                    {countryItem.label}
                  </SelectItem>
                ))}
              </Select>
              <br />
              <Input required value={email} onValueChange={setEmail} isRequired type="email" variant="bordered" label="Email" placeholder="Enter your email" />
              <br />
              <Input
                value={password} onValueChange={setPassword} isRequired
                label="Password"
                variant="bordered"
                placeholder="Enter your password"
                endContent={
                  <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                    {isVisible ? (
                      <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    ) : (
                      <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    )}
                  </button>
                }
                type={isVisible ? "text" : "password"}
                className="max-w-xs"
              />

              <br /><br />

              <Button onClick={registrarUsuarioPage} color="secondary">
                Registrarse
              </Button>
              <br /><br />
            </CardBody>
          </Card>
        </div>


      </main>
    </div>

  )
}
