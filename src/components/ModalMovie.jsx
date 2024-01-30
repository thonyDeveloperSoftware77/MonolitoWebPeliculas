import React, { useEffect, useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Spinner, Chip } from "@nextui-org/react";
import Image from "next/image";
import { getVideoId } from "../../controllers/peliculasController";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../../context/firebase";
import { registrarFav, registrarWatch } from "../../controllers/userController";

export default function ModalComponent({ isOpen, onClose, pelicula, generos, usuario, uid, setUpdate }, props) {
    const [loading, setLoading] = useState(true);
    const [key, setKey] = useState("");
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);



    const handleWatch = async (id) => {

        try{
            const favorito = await registrarWatch(id, uid);
            console.log(favorito);
        }catch(error){
            console.log(error);
        }
        setUpdate(prevState => !prevState);

    };



    const calificar = async (rate, id) => {
        setRating(rate)
        if (rate > 3) {
            try{
                const favorito = await registrarFav(id, uid);
                console.log(favorito);
            }catch(error){
                console.log(error);
            }
        }
        setUpdate(prevState => !prevState);

    }


    useEffect(() => {
        setRating(0)
        if (pelicula.id) {
            getVideoId(pelicula.id).then((response) => {
                setKey(response);
            });
        }

    }, [pelicula])

    return (
        <Modal size="3xl"
            backdrop="opaque"
            isOpen={isOpen}
            onOpenChange={onClose}
            motionProps={{
                variants: {
                    enter: {
                        y: 0,
                        opacity: 1,
                        transition: {
                            duration: 0.3,
                            ease: "easeOut",
                        },
                    },
                    exit: {
                        y: -20,
                        opacity: 0,
                        transition: {
                            duration: 0.2,
                            ease: "easeIn",
                        },
                    },
                }
            }}
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">{pelicula.title}</ModalHeader>
                        <ModalBody>
                            <p>
                                {pelicula.overview}
                            </p>
                            <div className="flex">
                                {pelicula.genre_ids.map((genre) => (
                                    <div style={{ marginRight: "5px" }} key={genre}>
                                        <Chip style={{ marginRight: "7px" }} color="default" key={genre} className="text-default-500">
                                            {generos.filter(genero => genero.id === genre)[0]?.name}
                                        </Chip>
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-between">
                                <div className='star-rating'>
                                    {[...Array(5)].map((star, i) => {
                                        const ratingValue = i + 1;
                                        return (
                                            <label key={i}>
                                                <input
                                                    type="radio"
                                                    name="rating"
                                                    value={ratingValue}
                                                    onClick={() => calificar(ratingValue, pelicula.id)}
                                                />
                                                <i
                                                    className="star"
                                                    style={{ color: ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9" }}
                                                    onMouseEnter={() => setHover(ratingValue)}
                                                    onMouseLeave={() => setHover(0)}
                                                >
                                                    ★
                                                </i>
                                            </label>
                                        );
                                    })}
                                </div>
                                <div>
                                    <Button onPress={() => handleWatch(pelicula.id)} color="primary" variant="ghost">
                                        Watch Later
                                    </Button>
                                </div>

                            </div>

                            <iframe width="730" height="415" src={`https://www.youtube.com/embed/${key}?autoplay=1&mute=1`} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen ></iframe>


                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-l from-black via-transparent"></div>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="light" onPress={onClose}>
                                Close
                            </Button>
                            <Button color="primary" onPress={onClose}>
                                Action
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}
