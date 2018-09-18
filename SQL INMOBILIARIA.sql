-- Generado por Oracle SQL Developer Data Modeler 4.1.5.907
--   en:        2018-09-18 10:05:06 COT
--   sitio:      Oracle Database 11g
--   tipo:      Oracle Database 11g




CREATE TABLE ACCESO
  (
    id     INTEGER NOT NULL AUTO_INCREMENT,
    nombre VARCHAR (40) NOT NULL ,
    url    VARCHAR (100) NOT NULL,
	PRIMARY KEY ( id )
  ) ;


CREATE TABLE ACCESO_ROL
  (
    acceso_id INTEGER NOT NULL ,
    rol_id    INTEGER NOT NULL
  ) ;


CREATE TABLE ARCHIVO
  (
    id          INTEGER NOT NULL AUTO_INCREMENT,
    url         VARCHAR (100) NOT NULL ,
    inmueble_id INTEGER NOT NULL,
	PRIMARY KEY ( id ) 
  ) ;


CREATE TABLE ARRIENDO
  (
    id              INTEGER NOT NULL AUTO_INCREMENT,
    descripcion     VARCHAR (100) ,
    inmueble_id     INTEGER NOT NULL ,
    cliente_cedula  INTEGER NOT NULL ,
    personal_cedula INTEGER NOT NULL,
	PRIMARY KEY ( id )
  ) ;


CREATE TABLE CLIENTE
  (
    nombre           VARCHAR (30) NOT NULL ,
    apellido         VARCHAR (30) NOT NULL ,
    fecha_nacimiento DATE ,
    cedula           INTEGER NOT NULL ,
    direccion        VARCHAR (30) NOT NULL ,
    telefono         INTEGER NOT NULL ,
    correo           INTEGER ,
    login_username   VARCHAR (30) NOT NULL ,
    rol_id           INTEGER NOT NULL ,
    municipio_id     INTEGER NOT NULL
  ) ;
ALTER TABLE CLIENTE ADD CONSTRAINT CLIENTE_PK PRIMARY KEY ( cedula ) ;
ALTER TABLE CLIENTE ADD CONSTRAINT CLIENTE__UN UNIQUE ( login_username ) ;


CREATE TABLE CONTRATO
  (
    id              INTEGER NOT NULL AUTO_INCREMENT,
    descripcion     VARCHAR (30) ,
    firma           CHAR (1) NOT NULL ,
    cliente_cedula  INTEGER NOT NULL ,
    inmueble_id     INTEGER NOT NULL ,
    personal_cedula INTEGER NOT NULL,
	PRIMARY KEY ( id )
  ) ;


CREATE TABLE DEPARTAMENTO
  (
    id     INTEGER NOT NULL AUTO_INCREMENT,
    nombre VARCHAR (40) NOT NULL,
	PRIMARY KEY ( id )
  ) ;


CREATE TABLE FACTURA
  (
    id              INTEGER NOT NULL AUTO_INCREMENT,
    fecha           DATE NOT NULL ,
    descripcion     VARCHAR (100) NOT NULL ,
    cliente_cedula  INTEGER NOT NULL ,
    personal_cedula INTEGER NOT NULL,
	PRIMARY KEY ( id ) 
  ) ;


CREATE TABLE INMUEBLE
  (
    id               INTEGER NOT NULL AUTO_INCREMENT,
    direccion        VARCHAR (50) NOT NULL ,
    area             INTEGER NOT NULL ,
    tipo_inmueble_id INTEGER NOT NULL ,
    valor            DOUBLE NOT NULL ,
    promocion        DOUBLE ,
    num_habitaciones INTEGER ,
    num_banios        INTEGER ,
    pisos            INTEGER ,
    seguridad        CHAR (1) ,
    zonas_verdes     CHAR (1) ,
    garaje           CHAR (1) ,
    salon_comunal    CHAR (1) ,
    conjunto_cerrado CHAR (1) ,
    cocina_integral  CHAR (1) ,
    gas              CHAR (1) ,
    alarma           CHAR (1) ,
    zona_para_ninios  CHAR (1) ,
    terraza          CHAR (1) ,
    gimnasio         CHAR (1) ,
    balcon           CHAR (1) ,
    num_closets      INTEGER ,
    municipio_id     INTEGER NOT NULL,
	PRIMARY KEY ( id )
  ) ;


CREATE TABLE LOGIN
  (
    username    VARCHAR (30) NOT NULL ,
    contrasenia VARCHAR (30) NOT NULL
  ) ;
ALTER TABLE LOGIN ADD CONSTRAINT LOGIN_PK PRIMARY KEY ( username ) ;


CREATE TABLE MUNICIPIO
  (
    id              INTEGER NOT NULL AUTO_INCREMENT,
    nombre          VARCHAR (40) NOT NULL ,
    departamento_id INTEGER NOT NULL,
	PRIMARY KEY ( id )
  ) ;


CREATE TABLE PERSONAL
  (
    cedula           INTEGER NOT NULL ,
    nombre           VARCHAR (30) NOT NULL ,
    apellido         VARCHAR (30) NOT NULL ,
    fecha_nacimiento DATE ,
    experiencia      VARCHAR (30) NOT NULL ,
    tipo_id          INTEGER NOT NULL ,
    formacion        VARCHAR (30) NOT NULL ,
    direccion        VARCHAR (30) NOT NULL ,
    login_username   VARCHAR (30) NOT NULL ,
    rol_id           INTEGER NOT NULL ,
    municipio_id     INTEGER NOT NULL
  ) ;
ALTER TABLE PERSONAL ADD CONSTRAINT PERSONAL_PK PRIMARY KEY ( cedula ) ;
ALTER TABLE PERSONAL ADD CONSTRAINT PERSONAL__UN UNIQUE ( login_username ) ;


CREATE TABLE ROL
  (
    id          INTEGER NOT NULL AUTO_INCREMENT,
    nombre      VARCHAR (40) NOT NULL ,
    descripcion VARCHAR (40) NOT NULL,
	PRIMARY KEY ( id )
  ) ;


CREATE TABLE TIPO_INMUEBLE
  ( id INTEGER NOT NULL AUTO_INCREMENT,
  descripcion VARCHAR (30),
  PRIMARY KEY ( id )
  ) ;


CREATE TABLE TIPO_PERSONAL
  (
    id          INTEGER NOT NULL AUTO_INCREMENT,
    descripcion VARCHAR (30),
	PRIMARY KEY ( id )
  ) ;


CREATE TABLE VENTA
  (
    id              INTEGER NOT NULL AUTO_INCREMENT,
    descripcion     VARCHAR (30) ,
    inmueble_id     INTEGER NOT NULL ,
    cliente_cedula  INTEGER NOT NULL ,
    personal_cedula INTEGER NOT NULL,
	PRIMARY KEY ( id )
  ) ;
ALTER TABLE VENTA ADD CONSTRAINT VENTA__UN UNIQUE ( inmueble_id ) ;


CREATE TABLE VISITA
  (
    id              INTEGER NOT NULL AUTO_INCREMENT,
    inmueble_id     INTEGER NOT NULL ,
    cliente_cedula  INTEGER NOT NULL ,
    personal_cedula INTEGER NOT NULL,
	PRIMARY KEY ( id )
  ) ;


ALTER TABLE ACCESO_ROL ADD CONSTRAINT ACCESO_ROL_ACCESO_FK FOREIGN KEY ( acceso_id ) REFERENCES ACCESO ( id ) ;

ALTER TABLE ACCESO_ROL ADD CONSTRAINT ACCESO_ROL_ROL_FK FOREIGN KEY ( rol_id ) REFERENCES ROL ( id ) ;

ALTER TABLE ARRIENDO ADD CONSTRAINT ARRIENDO_CLIENTE_FK FOREIGN KEY ( cliente_cedula ) REFERENCES CLIENTE ( cedula ) ;

ALTER TABLE ARRIENDO ADD CONSTRAINT ARRIENDO_INMUEBLE_FK FOREIGN KEY ( inmueble_id ) REFERENCES INMUEBLE ( id ) ;

ALTER TABLE ARRIENDO ADD CONSTRAINT ARRIENDO_PERSONAL_FK FOREIGN KEY ( personal_cedula ) REFERENCES PERSONAL ( cedula ) ;

ALTER TABLE CLIENTE ADD CONSTRAINT CLIENTE_LOGIN_FK FOREIGN KEY ( login_username ) REFERENCES LOGIN ( username ) ;

ALTER TABLE CLIENTE ADD CONSTRAINT CLIENTE_MUNICIPIO_FK FOREIGN KEY ( municipio_id ) REFERENCES MUNICIPIO ( id ) ;

ALTER TABLE CLIENTE ADD CONSTRAINT CLIENTE_ROL_FK FOREIGN KEY ( rol_id ) REFERENCES ROL ( id ) ;

ALTER TABLE CONTRATO ADD CONSTRAINT CONTRATO_CLIENTE_FK FOREIGN KEY ( cliente_cedula ) REFERENCES CLIENTE ( cedula ) ;

ALTER TABLE CONTRATO ADD CONSTRAINT CONTRATO_INMUEBLE_FK FOREIGN KEY ( inmueble_id ) REFERENCES INMUEBLE ( id ) ;

ALTER TABLE CONTRATO ADD CONSTRAINT CONTRATO_PERSONAL_FK FOREIGN KEY ( personal_cedula ) REFERENCES PERSONAL ( cedula ) ;

ALTER TABLE FACTURA ADD CONSTRAINT FACTURA_CLIENTE_FK FOREIGN KEY ( cliente_cedula ) REFERENCES CLIENTE ( cedula ) ;

ALTER TABLE FACTURA ADD CONSTRAINT FACTURA_PERSONAL_FK FOREIGN KEY ( personal_cedula ) REFERENCES PERSONAL ( cedula ) ;

ALTER TABLE ARCHIVO ADD CONSTRAINT FOTO_INMUEBLE_FK FOREIGN KEY ( inmueble_id ) REFERENCES INMUEBLE ( id ) ;

ALTER TABLE INMUEBLE ADD CONSTRAINT INMUEBLE_MUNICIPIO_FK FOREIGN KEY ( municipio_id ) REFERENCES MUNICIPIO ( id ) ;

ALTER TABLE INMUEBLE ADD CONSTRAINT INMUEBLE_TIPO_INMUEBLE_FK FOREIGN KEY ( tipo_inmueble_id ) REFERENCES TIPO_INMUEBLE ( id ) ;

ALTER TABLE MUNICIPIO ADD CONSTRAINT MUNICIPIO_DEPARTAMENTO_FK FOREIGN KEY ( departamento_id ) REFERENCES DEPARTAMENTO ( id ) ;

ALTER TABLE PERSONAL ADD CONSTRAINT PERSONAL_LOGIN_FK FOREIGN KEY ( login_username ) REFERENCES LOGIN ( username ) ;

ALTER TABLE PERSONAL ADD CONSTRAINT PERSONAL_MUNICIPIO_FK FOREIGN KEY ( municipio_id ) REFERENCES MUNICIPIO ( id ) ;

ALTER TABLE PERSONAL ADD CONSTRAINT PERSONAL_ROL_FK FOREIGN KEY ( rol_id ) REFERENCES ROL ( id ) ;

ALTER TABLE PERSONAL ADD CONSTRAINT PERSONAL_TIPO_FK FOREIGN KEY ( tipo_id ) REFERENCES TIPO_PERSONAL ( id ) ;

ALTER TABLE VENTA ADD CONSTRAINT VENTA_CLIENTE_FK FOREIGN KEY ( cliente_cedula ) REFERENCES CLIENTE ( cedula ) ;

ALTER TABLE VENTA ADD CONSTRAINT VENTA_INMUEBLE_FK FOREIGN KEY ( inmueble_id ) REFERENCES INMUEBLE ( id ) ;

ALTER TABLE VENTA ADD CONSTRAINT VENTA_PERSONAL_FK FOREIGN KEY ( personal_cedula ) REFERENCES PERSONAL ( cedula ) ;

ALTER TABLE VISITA ADD CONSTRAINT VISITA_CLIENTE_FK FOREIGN KEY ( cliente_cedula ) REFERENCES CLIENTE ( cedula ) ;

ALTER TABLE VISITA ADD CONSTRAINT VISITA_INMUEBLE_FK FOREIGN KEY ( inmueble_id ) REFERENCES INMUEBLE ( id ) ;

ALTER TABLE VISITA ADD CONSTRAINT VISITA_PERSONAL_FK FOREIGN KEY ( personal_cedula ) REFERENCES PERSONAL ( cedula ) ;


-- Informe de Resumen de Oracle SQL Developer Data Modeler: 
-- 
-- CREATE TABLE                            17
-- CREATE INDEX                             0
-- ALTER TABLE                             46
-- CREATE VIEW                              0
-- ALTER VIEW                               0
-- CREATE PACKAGE                           0
-- CREATE PACKAGE BODY                      0
-- CREATE PROCEDURE                         0
-- CREATE FUNCTION                          0
-- CREATE TRIGGER                           0
-- ALTER TRIGGER                            0
-- CREATE COLLECTION TYPE                   0
-- CREATE STRUCTURED TYPE                   0
-- CREATE STRUCTURED TYPE BODY              0
-- CREATE CLUSTER                           0
-- CREATE CONTEXT                           0
-- CREATE DATABASE                          0
-- CREATE DIMENSION                         0
-- CREATE DIRECTORY                         0
-- CREATE DISK GROUP                        0
-- CREATE ROLE                              0
-- CREATE ROLLBACK SEGMENT                  0
-- CREATE SEQUENCE                          0
-- CREATE MATERIALIZED VIEW                 0
-- CREATE SYNONYM                           0
-- CREATE TABLESPACE                        0
-- CREATE USER                              0
-- 
-- DROP TABLESPACE                          0
-- DROP DATABASE                            0
-- 
-- REDACTION POLICY                         0
-- 
-- ORDS DROP SCHEMA                         0
-- ORDS ENABLE SCHEMA                       0
-- ORDS ENABLE OBJECT                       0
-- 
-- ERRORS                                   0
-- WARNINGS                                 0