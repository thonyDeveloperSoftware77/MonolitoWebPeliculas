import React, { useEffect, useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Spinner, Chip } from "@nextui-org/react";
import Image from "next/image";
import { getVideoId } from "../../controllers/peliculasController";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../../context/firebase";
import { MdDelete } from "react-icons/md";
import { eliminarFav } from "../../controllers/userController";


export default function ModalComponent({ isOpen, onClose, pelicula, generos, usuario, uid, setUpdate }) {
    const [loading, setLoading] = useState(true);
    const [key, setKey] = useState("");
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);


    const handleWatch = async (id) => {
        const docRef = doc(db, "_usuario", uid);

        await updateDoc(docRef, {
            _watchlist: arrayUnion(id),
        });
    };



    const handleDelete = async (id) => {
        try {
            const favorito = await eliminarFav(id, uid);
            setUpdate(prevState => !prevState);
            console.log(favorito);
        } catch (error) {
            console.log(error);
            setUpdate(prevState => !prevState);

        }
        setUpdate(prevState => !prevState);
        setUpdate(prevState => !prevState);
        onClose();

    }


    const handleRating = (rate) => {
        setRating(rate);
    };
    useEffect(() => {
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
                        <ModalHeader className="flex flex-col gap-1">{pelicula.title}   </ModalHeader>
                        <ModalBody>
                            <p>
                                {pelicula.overview}
                            </p>
                            <div style={{ width: "100%" }} className="flex ">
                                {pelicula.genres.map((genre) => (
                                    <div style={{ marginRight: "5px" }} key={genre}>
                                        <Chip style={{ marginRight: "7px" }} color="default" key={genre} className="text-default-500">
                                            {genre.name}
                                        </Chip>
                                    </div>
                                ))}

                            </div>
                            <MdDelete onClick={() => handleDelete(pelicula.id)} size={40} />
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
