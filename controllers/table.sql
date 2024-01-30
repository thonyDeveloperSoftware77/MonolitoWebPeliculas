USE PeliculaUser

/*Crea una tabla usuario con  _email, _nombre, _pais en sql Server*/
CREATE TABLE usuario(
    _id varchar(100) PRIMARY KEY NOT NULL,
    _email varchar(50) NOT NULL,
    _nombre varchar(50) NOT NULL,
    _pais varchar(50) NOT NULL
);

/*Crea la tabla favoritos que hace referencia a usuario, atributo id*/
CREATE TABLE _favoritos(
    _id int PRIMARY KEY NOT NULL,
    _id_usuario varchar(100) NOT NULL,
    FOREIGN KEY (_id_usuario) REFERENCES usuario(_id)
);

/*CREA UNA TABLA _watchlist que hace referencia al usuario*/
CREATE TABLE _watchlist(
    _id int PRIMARY KEY NOT NULL,
    _id_usuario varchar(100) NOT NULL,
    FOREIGN KEY (_id_usuario) REFERENCES usuario(_id)
);


USE PeliculaUser
GO

CREATE PROCEDURE RegistrarUsuario
    @id varchar(100),
    @email varchar(50),
    @nombre varchar(50),
    @pais varchar(50)
AS
BEGIN
    INSERT INTO usuario(_id, _email, _nombre, _pais)
    VALUES (@id, @email, @nombre, @pais)
END
GO


USE PeliculaUser
GO

/* Procedimiento para añadir un favorito */
CREATE PROCEDURE AñadirFavorito
    @id int,
    @id_usuario varchar(100)
AS
BEGIN
    INSERT INTO _favoritos(_id, _id_usuario)
    VALUES (@id, @id_usuario)
END
GO

/* Procedimiento para añadir un elemento a la lista de observación */
CREATE PROCEDURE AñadirWatchlist
    @id int,
    @id_usuario varchar(100)
AS
BEGIN
    INSERT INTO _watchlist(_id, _id_usuario)
    VALUES (@id, @id_usuario)
END
GO



USE PeliculaUser
GO

/* Procedimiento para eliminar un favorito */
CREATE PROCEDURE EliminarFavorito
    @id int,
    @id_usuario varchar(100)
AS
BEGIN
    DELETE FROM _favoritos
    WHERE _id = @id AND _id_usuario = @id_usuario
END
GO

/* Procedimiento para eliminar un elemento de la lista de observación */
CREATE PROCEDURE EliminarWatchlist
    @id int,
    @id_usuario varchar(100)
AS
BEGIN
    DELETE FROM _watchlist
    WHERE _id = @id AND _id_usuario = @id_usuario
END
GO


USE PeliculaUser
GO

CREATE PROCEDURE BuscarUsuario
    @id varchar(100)
AS
BEGIN
    -- Selecciona la información del usuario
    SELECT * FROM usuario WHERE _id = @id;

    -- Selecciona los favoritos del usuario
    SELECT * FROM _favoritos WHERE _id_usuario = @id;

    -- Selecciona la lista de observación del usuario
    SELECT * FROM _watchlist WHERE _id_usuario = @id;
END
GO
