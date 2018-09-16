-- Generado por Oracle SQL Developer Data Modeler 4.1.5.907
--   en:        2018-09-16 00:19:11 COT
--   sitio:      Oracle Database 11g
--   tipo:      Oracle Database 11g




CREATE TABLE ACCESO
  (
    id     INTEGER NOT NULL ,
    nombre VARCHAR (50) NOT NULL ,
    url    VARCHAR (50) NOT NULL
  ) ;
ALTER TABLE ACCESO ADD CONSTRAINT ACCESO_PK PRIMARY KEY ( id ) ;


CREATE TABLE ACCESO_ROL
  (
    rol_id    INTEGER NOT NULL ,
    acceso_id INTEGER NOT NULL
  ) ;
ALTER TABLE ACCESO_ROL ADD CONSTRAINT ACCESO_ROL_PK PRIMARY KEY ( rol_id, acceso_id ) ;


CREATE TABLE ARRIENDO
  (
    id          INTEGER NOT NULL ,
    descripcion VARCHAR (30) ,
    inmueble_id INTEGER NOT NULL ,
    personal_id INTEGER NOT NULL ,
    cliente_id  INTEGER NOT NULL
  ) ;
ALTER TABLE ARRIENDO ADD CONSTRAINT ARRIENDO_PK PRIMARY KEY ( id ) ;


CREATE TABLE CLIENTE
  (
    cedula           INTEGER NOT NULL ,
    nombre           VARCHAR (30) NOT NULL ,
    apellido         VARCHAR (30) NOT NULL ,
    fecha_nacimiento DATE ,
    direccion        VARCHAR (30) NOT NULL ,
    telefono         INTEGER NOT NULL ,
    correo           INTEGER ,
    login_username   VARCHAR (30) NOT NULL ,
    rol_id           INTEGER NOT NULL
  ) ;
ALTER TABLE CLIENTE ADD CONSTRAINT CLIENTE_PK PRIMARY KEY ( cedula ) ;
ALTER TABLE CLIENTE ADD CONSTRAINT CLIENTE__UN UNIQUE ( login_username ) ;


CREATE TABLE CONTRATO
  (
    id          INTEGER NOT NULL ,
    descripcion VARCHAR (30) ,
    firma       CHAR (1) NOT NULL ,
    personal_id INTEGER NOT NULL ,
    cliente_id  INTEGER NOT NULL ,
    inmueble_id INTEGER NOT NULL
  ) ;
ALTER TABLE CONTRATO ADD CONSTRAINT CONTRATO_PK PRIMARY KEY ( id ) ;


CREATE TABLE FACTURA
  (
    id          INTEGER NOT NULL ,
    fecha       DATE NOT NULL ,
    descripcion VARCHAR (30) NOT NULL ,
    cliente_id  INTEGER NOT NULL ,
    personal_id INTEGER NOT NULL
  ) ;
ALTER TABLE FACTURA ADD CONSTRAINT FACTURA_PK PRIMARY KEY ( id ) ;


CREATE TABLE FOTO
  (
    id          INTEGER NOT NULL ,
    url         VARCHAR (80) NOT NULL ,
    inmueble_id INTEGER NOT NULL
  ) ;
ALTER TABLE FOTO ADD CONSTRAINT FOTO_PK PRIMARY KEY ( id ) ;


CREATE TABLE INMUEBLE
  (
    id               INTEGER NOT NULL ,
    direccion        VARCHAR (30) NOT NULL ,
    area             INTEGER NOT NULL ,
    tipo_inmueble_id INTEGER NOT NULL ,
    valor            DOUBLE NOT NULL ,
    promocion        DOUBLE ,
    num_habitaciones INTEGER NOT NULL ,
    num_banios       INTEGER NOT NULL ,
    pisos            INTEGER NOT NULL
  ) ;
ALTER TABLE INMUEBLE ADD CONSTRAINT INMUEBLE_PK PRIMARY KEY ( id ) ;


CREATE TABLE LOGIN
  (
    username    VARCHAR (30) NOT NULL ,
    contrasenia VARCHAR (30) NOT NULL
  ) ;
ALTER TABLE LOGIN ADD CONSTRAINT LOGIN_PK PRIMARY KEY ( username ) ;


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
    rol_id           INTEGER NOT NULL
  ) ;
ALTER TABLE PERSONAL ADD CONSTRAINT PERSONAL_PK PRIMARY KEY ( cedula ) ;
ALTER TABLE PERSONAL ADD CONSTRAINT PERSONAL__UN UNIQUE ( login_username ) ;


CREATE TABLE ROL
  (
    id          INTEGER NOT NULL ,
    nombre      VARCHAR (50) NOT NULL ,
    descripcion VARCHAR (50) NOT NULL
  ) ;
ALTER TABLE ROL ADD CONSTRAINT ROL_PK PRIMARY KEY ( id ) ;


CREATE TABLE TIPO_INMUEBLE
  (
    id     INTEGER NOT NULL ,
    nombre VARCHAR (30) NOT NULL
  ) ;
ALTER TABLE TIPO_INMUEBLE ADD CONSTRAINT TIPO_PK PRIMARY KEY ( id ) ;


CREATE TABLE TIPO_PERSONAL
  (
    id          INTEGER NOT NULL ,
    descripcion VARCHAR (30) NOT NULL
  ) ;
ALTER TABLE TIPO_PERSONAL ADD CONSTRAINT TIPO_PKv2 PRIMARY KEY ( id ) ;


CREATE TABLE VENTA
  (
    id          INTEGER NOT NULL ,
    descripcion VARCHAR (30) ,
    inmueble_id INTEGER NOT NULL ,
    personal_id INTEGER NOT NULL ,
    cliente_id  INTEGER NOT NULL
  ) ;
ALTER TABLE VENTA ADD CONSTRAINT VENTA_PK PRIMARY KEY ( id ) ;
ALTER TABLE VENTA ADD CONSTRAINT VENTA__UN UNIQUE ( inmueble_id ) ;


CREATE TABLE VIDEO
  (
    id          INTEGER NOT NULL ,
    url         VARCHAR (80) NOT NULL ,
    inmueble_id INTEGER NOT NULL
  ) ;
ALTER TABLE VIDEO ADD CONSTRAINT VIDEO_PK PRIMARY KEY ( id ) ;


CREATE TABLE VISITA
  (
    id             INTEGER NOT NULL ,
    personal_id    INTEGER NOT NULL ,
    inmueble_id    INTEGER NOT NULL ,
    cliente_cedula INTEGER NOT NULL
  ) ;
ALTER TABLE VISITA ADD CONSTRAINT VISITA_PK PRIMARY KEY ( id ) ;


ALTER TABLE ACCESO_ROL ADD CONSTRAINT ACCESO_ROL_ACCESO_FK FOREIGN KEY ( acceso_id ) REFERENCES ACCESO ( id ) ;

ALTER TABLE ACCESO_ROL ADD CONSTRAINT ACCESO_ROL_ROL_FK FOREIGN KEY ( rol_id ) REFERENCES ROL ( id ) ;

ALTER TABLE ARRIENDO ADD CONSTRAINT ARRIENDO_CLIENTE_FK FOREIGN KEY ( cliente_id ) REFERENCES CLIENTE ( cedula ) ;

ALTER TABLE ARRIENDO ADD CONSTRAINT ARRIENDO_INMUEBLE_FK FOREIGN KEY ( inmueble_id ) REFERENCES INMUEBLE ( id ) ;

ALTER TABLE CLIENTE ADD CONSTRAINT CLIENTE_LOGIN_FK FOREIGN KEY ( login_username ) REFERENCES LOGIN ( username ) ;

ALTER TABLE CLIENTE ADD CONSTRAINT CLIENTE_ROL_FK FOREIGN KEY ( rol_id ) REFERENCES ROL ( id ) ;

ALTER TABLE CONTRATO ADD CONSTRAINT CONTRATO_CLIENTE_FK FOREIGN KEY ( cliente_id ) REFERENCES CLIENTE ( cedula ) ;

ALTER TABLE CONTRATO ADD CONSTRAINT CONTRATO_INMUEBLE_FK FOREIGN KEY ( inmueble_id ) REFERENCES INMUEBLE ( id ) ;

ALTER TABLE FACTURA ADD CONSTRAINT FACTURA_CLIENTE_FK FOREIGN KEY ( cliente_id ) REFERENCES CLIENTE ( cedula ) ;

ALTER TABLE FOTO ADD CONSTRAINT FOTO_INMUEBLE_FK FOREIGN KEY ( inmueble_id ) REFERENCES INMUEBLE ( id ) ;

ALTER TABLE INMUEBLE ADD CONSTRAINT INMUEBLE_TIPO_INMUEBLE_FK FOREIGN KEY ( tipo_inmueble_id ) REFERENCES TIPO_INMUEBLE ( id ) ;

ALTER TABLE PERSONAL ADD CONSTRAINT PERSONAL_LOGIN_FK FOREIGN KEY ( login_username ) REFERENCES LOGIN ( username ) ;

ALTER TABLE PERSONAL ADD CONSTRAINT PERSONAL_ROL_FK FOREIGN KEY ( rol_id ) REFERENCES ROL ( id ) ;

ALTER TABLE PERSONAL ADD CONSTRAINT PERSONAL_TIPO_FK FOREIGN KEY ( tipo_id ) REFERENCES TIPO_PERSONAL ( id ) ;

ALTER TABLE VENTA ADD CONSTRAINT VENTA_CLIENTE_FK FOREIGN KEY ( cliente_id ) REFERENCES CLIENTE ( cedula ) ;

ALTER TABLE VENTA ADD CONSTRAINT VENTA_INMUEBLE_FK FOREIGN KEY ( inmueble_id ) REFERENCES INMUEBLE ( id ) ;

ALTER TABLE VIDEO ADD CONSTRAINT VIDEO_INMUEBLE_FK FOREIGN KEY ( inmueble_id ) REFERENCES INMUEBLE ( id ) ;

ALTER TABLE VISITA ADD CONSTRAINT VISITA_CLIENTE_FK FOREIGN KEY ( cliente_cedula ) REFERENCES CLIENTE ( cedula ) ;

ALTER TABLE VISITA ADD CONSTRAINT VISITA_INMUEBLE_FK FOREIGN KEY ( inmueble_id ) REFERENCES INMUEBLE ( id ) ;


-- Informe de Resumen de Oracle SQL Developer Data Modeler: 
-- 
-- CREATE TABLE                            16
-- CREATE INDEX                             0
-- ALTER TABLE                             38
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
