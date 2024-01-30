import { useEffect, useState } from "react";
import { getGenero, getPeliculas } from "../../controllers/peliculasController";
import { Card, CardBody, CardHeader, Chip, useDisclosure } from "@nextui-org/react";
import Image from "next/image";
import ModalMovie from "../components/ModalMovie";

export default function Home({ user, uid, setUpdate }, props) {
    const { isOpen, onOpen, onClose } = useDisclosure();


    const [peliculas, setPeliculas] = useState([]);
    const [generos, setGeneros] = useState([]);

    const [movieSelected, setMovieSelected] = useState({});


    useEffect(() => {
        getPeliculas().then((response) => {
            setPeliculas(response.results);
        });
        getGenero().then((response) => {
            setGeneros(response.genres);
        });
    }, [])


    const openModal = (movie) => {
        setMovieSelected(movie);
        onOpen();
    }


    return (
        <main >

            <div className="flex  preview" style={{ width: "100%" }}>

                <div style={{ width: "60%", marginLeft: "50px" }}>
                    <h1 className=""> {peliculas[3]?.title}</h1>
                    <div style={{ width: "90%" }}>
                        {peliculas[3]?.genre_ids.map((genre) => (
                            <Chip style={{ marginRight: "7px" }} color="default" key={genre} className="text-default-500">
                                {generos.filter(genero => genero.id === genre)[0]?.name}
                            </Chip>
                        ))
                        }
                        <br /><br />
                        <p>
                            {peliculas[3]?.overview}
                        </p>
                    </div>
                </div>
                <div style={{ width: "50%" }} className="relative">
                    <Image
                        alt="Card background"
                        className="object-cover rounded-xl"
                        src={`https://image.tmdb.org/t/p/w500${peliculas[3]?.backdrop_path}`}
                        width={700}
                        height={400}
                    />
                    <div className="absolute inset-0 bg-gradient-to-l from-black via-transparent"></div>
                </div>
            </div>


            <div style={{ padding: "50px", display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gridTemplateRows: "repeat(5, 1fr)" }}>

                {peliculas?.map((movie) => (
                    <div style={{ margin: "4px" }} key={movie.id}>
                        <Card isPressable onPress={(e) => openModal(movie)}  >
                            <CardHeader className="pb-0 pt-2  flex-col items-start">
                                <h4 className="font-bold text-large">{movie.title}</h4>
                                <small className="text-default-500">Fecha de lanzamiento: {movie.release_date}</small>
                            </CardHeader>
                            <CardBody className="overflow-visible py-2">
                                <Image
                                    alt="Card background"
                                    className="object-cover rounded-xl"
                                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                    width={270}
                                    height={180}
                                />
                            </CardBody>
                        </Card>
                    </div>
                ))}
            </div>
            <ModalMovie setUpdate={setUpdate} uid={uid} usuario={user} isOpen={isOpen} onClose={onClose} pelicula={movieSelected} generos={generos} />

        </main>
    )
}