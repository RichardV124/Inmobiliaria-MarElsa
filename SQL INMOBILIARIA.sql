-- Generado por Oracle SQL Developer Data Modeler 4.1.5.907
--   en:        2018-09-19 22:49:47 COT
--   sitio:      Oracle Database 11g
--   tipo:      Oracle Database 11g




CREATE TABLE ACCESO
  (
    id     INTEGER NOT NULL AUTO_INCREMENT,
    nombre VARCHAR (40) NOT NULL ,
    url    VARCHAR (40) NOT NULL,
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
    nombre      VARCHAR (80) NOT NULL ,
    inmueble_id INTEGER NOT NULL ,
    archivo     VARCHAR (40),
	PRIMARY KEY ( id )
  ) ;


CREATE TABLE ARRIENDO
  (
    id              INTEGER NOT NULL AUTO_INCREMENT,
    descripcion     VARCHAR (30) ,
    inmueble_id     INTEGER NOT NULL ,
    cliente_cedula  INTEGER NOT NULL ,
    empleado_cedula INTEGER NOT NULL,
	PRIMARY KEY ( id )
  ) ;


CREATE TABLE CONTRATO
  (
    id              INTEGER NOT NULL AUTO_INCREMENT,
    descripcion     VARCHAR (9000) ,
    firma           CHAR (1) NOT NULL ,
    cliente_cedula  INTEGER NOT NULL ,
    inmueble_id     INTEGER NOT NULL ,
    empleado_cedula INTEGER NOT NULL,
	PRIMARY KEY ( id )
  ) ;


CREATE TABLE DEPARTAMENTO
  (
    id     INTEGER NOT NULL AUTO_INCREMENT,
    nombre VARCHAR (40) NOT NULL,
	PRIMARY KEY ( id )
  ) ;


CREATE TABLE EMPLEADO
  (
    tipo_id        INTEGER NOT NULL ,
    persona_cedula INTEGER NOT NULL
  ) ;
ALTER TABLE EMPLEADO ADD CONSTRAINT EMPLEADO_PK PRIMARY KEY ( persona_cedula ) ;
ALTER TABLE EMPLEADO ADD CONSTRAINT EMPLEADO__UN UNIQUE ( persona_cedula ) ;


CREATE TABLE ESTUDIO
  (
    id                 INTEGER NOT NULL AUTO_INCREMENT,
    descripcion        VARCHAR (40) NOT NULL ,
    institucion        VARCHAR (50) NOT NULL ,
    persona_cedula     INTEGER NOT NULL ,
    nombre_certificado VARCHAR (50) ,
    telefono           VARCHAR (50) NOT NULL ,
    direccion          VARCHAR (50) NOT NULL,
	PRIMARY KEY ( id )
  ) ;


CREATE TABLE EXPERIENCIA
  (
    id                 INTEGER NOT NULL AUTO_INCREMENT,
    fecha_inicio       DATE NOT NULL ,
    fecha_fin          DATE NOT NULL ,
    cargo              VARCHAR (90) NOT NULL ,
    nom_empresa        VARCHAR (90) NOT NULL ,
    persona_cedula     INTEGER NOT NULL ,
    nombre_certificado VARCHAR (50) ,
    telefono           VARCHAR (50) ,
    direccion          VARCHAR (50),
	PRIMARY KEY ( id )
  ) ;


CREATE TABLE FACTURA
  (
    id              INTEGER NOT NULL AUTO_INCREMENT,
    fecha           DATE NOT NULL ,
    descripcion     VARCHAR (9000) NOT NULL ,
    cliente_cedula  INTEGER NOT NULL ,
    empleado_cedula INTEGER NOT NULL,
	PRIMARY KEY ( id )
  ) ;


CREATE TABLE INMUEBLE
  (
    id               INTEGER NOT NULL AUTO_INCREMENT,
    direccion        VARCHAR (90) NOT NULL ,
    area             INTEGER NOT NULL ,
    tipo_inmueble_id INTEGER NOT NULL ,
    valor            DOUBLE NOT NULL ,
    promocion        DOUBLE ,
    num_habitaciones INTEGER ,
    num_banios       INTEGER ,
    pisos            INTEGER ,
    seguridad        CHAR (1) ,
    zonas_verdes     CHAR (1) ,
    garaje           CHAR (1) ,
    salon_comunal    CHAR (1) ,
    conjunto_cerrado CHAR (1) ,
    cocina_integral  CHAR (1) ,
    gas              CHAR (1) ,
    alarma           CHAR (1) ,
    zona_para_ninios CHAR (1) ,
    terraza          CHAR (1) ,
    gimnasio         CHAR (1) ,
    balcon           CHAR (1) ,
    num_closets      INTEGER ,
    municipio_id     INTEGER NOT NULL ,
    piscina          CHAR (1) ,
    num_cocinas      INTEGER ,
    persona_cedula   INTEGER NOT NULL ,
    zona             INTEGER,
	PRIMARY KEY ( id )
  ) ;


CREATE TABLE LOGIN
  (
    persona_cedula INTEGER NOT NULL ,
    username       VARCHAR (30) NOT NULL ,
    contrasenia    VARCHAR (30) NOT NULL
  ) ;
ALTER TABLE LOGIN ADD CONSTRAINT LOGIN_PK PRIMARY KEY ( persona_cedula ) ;
ALTER TABLE LOGIN ADD CONSTRAINT LOGIN__UN UNIQUE ( persona_cedula ) ;
ALTER TABLE LOGIN ADD CONSTRAINT LOGIN__UNv1 UNIQUE ( username ) ;


CREATE TABLE MUNICIPIO
  (
    id              INTEGER NOT NULL AUTO_INCREMENT,
    nombre          VARCHAR (40) NOT NULL ,
    departamento_id INTEGER NOT NULL,
	PRIMARY KEY ( id )
  ) ;


CREATE TABLE PERSONA
  (
    nombre           VARCHAR (30) NOT NULL ,
    apellido         VARCHAR (30) NOT NULL ,
    fecha_nacimiento DATE ,
    cedula           INTEGER NOT NULL ,
    direccion        VARCHAR (90) ,
    telefono         INTEGER NOT NULL ,
    correo           VARCHAR (50) ,
    rol_id           INTEGER NOT NULL ,
    municipio_id     INTEGER NOT NULL ,
    genero           INTEGER
  ) ;
ALTER TABLE PERSONA ADD CONSTRAINT CLIENTE_PK PRIMARY KEY ( cedula ) ;


CREATE TABLE ROL
  (
    id          INTEGER NOT NULL AUTO_INCREMENT,
    nombre      VARCHAR (40) NOT NULL ,
    descripcion VARCHAR (40) NOT NULL,
	PRIMARY KEY ( id )
  ) ;


CREATE TABLE TIPO_INMUEBLE
  (
    id          INTEGER NOT NULL AUTO_INCREMENT,
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
    empleado_cedula INTEGER NOT NULL,
	PRIMARY KEY ( id )
  ) ;
ALTER TABLE VENTA ADD CONSTRAINT VENTA__UN UNIQUE ( inmueble_id ) ;


CREATE TABLE VISITA
  (
    id              INTEGER NOT NULL AUTO_INCREMENT,
    inmueble_id     INTEGER ,
    cliente_cedula  INTEGER NOT NULL ,
    empleado_cedula INTEGER ,
    tipo_visita     VARCHAR (30) NOT NULL ,
    descripcion     VARCHAR (200) NOT NULL ,
    atendida        CHAR (1) NOT NULL ,
    fecha           TIMESTAMP,
	PRIMARY KEY ( id )
  ) ;


ALTER TABLE ACCESO_ROL ADD CONSTRAINT ACCESO_ROL_ACCESO_FK FOREIGN KEY ( acceso_id ) REFERENCES ACCESO ( id ) ;

ALTER TABLE ACCESO_ROL ADD CONSTRAINT ACCESO_ROL_ROL_FK FOREIGN KEY ( rol_id ) REFERENCES ROL ( id ) ;

ALTER TABLE ARRIENDO ADD CONSTRAINT ARRIENDO_CLIENTE_FK FOREIGN KEY ( cliente_cedula ) REFERENCES PERSONA ( cedula ) ;

ALTER TABLE ARRIENDO ADD CONSTRAINT ARRIENDO_INMUEBLE_FK FOREIGN KEY ( inmueble_id ) REFERENCES INMUEBLE ( id ) ;

ALTER TABLE ARRIENDO ADD CONSTRAINT ARRIENDO_PERSONAL_FK FOREIGN KEY ( empleado_cedula ) REFERENCES EMPLEADO ( persona_cedula ) ;

ALTER TABLE PERSONA ADD CONSTRAINT CLIENTE_MUNICIPIO_FK FOREIGN KEY ( municipio_id ) REFERENCES MUNICIPIO ( id ) ;

ALTER TABLE PERSONA ADD CONSTRAINT CLIENTE_ROL_FK FOREIGN KEY ( rol_id ) REFERENCES ROL ( id ) ;

ALTER TABLE CONTRATO ADD CONSTRAINT CONTRATO_CLIENTE_FK FOREIGN KEY ( cliente_cedula ) REFERENCES PERSONA ( cedula ) ;

ALTER TABLE CONTRATO ADD CONSTRAINT CONTRATO_INMUEBLE_FK FOREIGN KEY ( inmueble_id ) REFERENCES INMUEBLE ( id ) ;

ALTER TABLE CONTRATO ADD CONSTRAINT CONTRATO_PERSONAL_FK FOREIGN KEY ( empleado_cedula ) REFERENCES EMPLEADO ( persona_cedula ) ;

ALTER TABLE EMPLEADO ADD CONSTRAINT EMPLEADO_PERSONA_FK FOREIGN KEY ( persona_cedula ) REFERENCES PERSONA ( cedula ) ;

ALTER TABLE EMPLEADO ADD CONSTRAINT EMPLEADO_TIPO_FK FOREIGN KEY ( tipo_id ) REFERENCES TIPO_PERSONAL ( id ) ;

ALTER TABLE ESTUDIO ADD CONSTRAINT ESTUDIO_PERSONAL_FK FOREIGN KEY ( persona_cedula ) REFERENCES EMPLEADO ( persona_cedula ) ;

ALTER TABLE EXPERIENCIA ADD CONSTRAINT EXPERIENCIA_PERSONAL_FK FOREIGN KEY ( persona_cedula ) REFERENCES EMPLEADO ( persona_cedula ) ;

ALTER TABLE FACTURA ADD CONSTRAINT FACTURA_CLIENTE_FK FOREIGN KEY ( cliente_cedula ) REFERENCES PERSONA ( cedula ) ;

ALTER TABLE FACTURA ADD CONSTRAINT FACTURA_PERSONAL_FK FOREIGN KEY ( empleado_cedula ) REFERENCES EMPLEADO ( persona_cedula ) ;

ALTER TABLE ARCHIVO ADD CONSTRAINT FOTO_INMUEBLE_FK FOREIGN KEY ( inmueble_id ) REFERENCES INMUEBLE ( id ) ;

ALTER TABLE INMUEBLE ADD CONSTRAINT INMUEBLE_LOGIN_FK FOREIGN KEY ( persona_cedula ) REFERENCES LOGIN ( persona_cedula ) ;

ALTER TABLE INMUEBLE ADD CONSTRAINT INMUEBLE_MUNICIPIO_FK FOREIGN KEY ( municipio_id ) REFERENCES MUNICIPIO ( id ) ;

ALTER TABLE INMUEBLE ADD CONSTRAINT INMUEBLE_TIPO_INMUEBLE_FK FOREIGN KEY ( tipo_inmueble_id ) REFERENCES TIPO_INMUEBLE ( id ) ;

ALTER TABLE LOGIN ADD CONSTRAINT LOGIN_PERSONA_FK FOREIGN KEY ( persona_cedula ) REFERENCES PERSONA ( cedula ) ;

ALTER TABLE MUNICIPIO ADD CONSTRAINT MUNICIPIO_DEPARTAMENTO_FK FOREIGN KEY ( departamento_id ) REFERENCES DEPARTAMENTO ( id ) ;

ALTER TABLE VENTA ADD CONSTRAINT VENTA_CLIENTE_FK FOREIGN KEY ( cliente_cedula ) REFERENCES PERSONA ( cedula ) ;

ALTER TABLE VENTA ADD CONSTRAINT VENTA_INMUEBLE_FK FOREIGN KEY ( inmueble_id ) REFERENCES INMUEBLE ( id ) ;

ALTER TABLE VENTA ADD CONSTRAINT VENTA_PERSONAL_FK FOREIGN KEY ( empleado_cedula ) REFERENCES EMPLEADO ( persona_cedula ) ;

ALTER TABLE VISITA ADD CONSTRAINT VISITA_CLIENTE_FK FOREIGN KEY ( cliente_cedula ) REFERENCES PERSONA ( cedula ) ;

ALTER TABLE VISITA ADD CONSTRAINT VISITA_INMUEBLE_FK FOREIGN KEY ( inmueble_id ) REFERENCES INMUEBLE ( id ) ;

ALTER TABLE VISITA ADD CONSTRAINT VISITA_PERSONAL_FK FOREIGN KEY ( empleado_cedula ) REFERENCES EMPLEADO ( persona_cedula ) ;

ALTER TABLE INMUEBLE
ADD COLUMN `alcantarillado` CHAR(1) NULL AFTER `zona`,
ADD COLUMN `energia` CHAR(1) NULL AFTER `alcantarillado`,
ADD COLUMN `zonabbq` CHAR(1) NULL AFTER `energia`,
ADD COLUMN `sauna` CHAR(1) NULL AFTER `zonabbq`,
ADD COLUMN `cliente_cedula` INT NOT NULL AFTER `sauna`;

ALTER TABLE INMUEBLE ADD CONSTRAINT INMUEBLE_CLIENTE_FK FOREIGN KEY ( cliente_cedula ) REFERENCES PERSONA ( cedula ) ;

ALTER TABLE INMUEBLE 
ADD COLUMN `matricula` VARCHAR(45) NOT NULL AFTER `cliente_cedula`,
ADD UNIQUE INDEX `matricula_UNIQUE` (`matricula`);

ALTER TABLE INMUEBLE 
ADD COLUMN `precio_negociable` CHAR(1) NULL AFTER `matricula`;

ALTER TABLE ARCHIVO 
DROP FOREIGN KEY `FOTO_INMUEBLE_FK`;
ALTER TABLE ARCHIVO 
ADD CONSTRAINT `FOTO_INMUEBLE_FK`
  FOREIGN KEY (`inmueble_id`)
  REFERENCES `inmobiliaria`.`inmueble` (`id`)
  ON DELETE CASCADE;

  ALTER TABLE ARCHIVO 
CHANGE COLUMN `nombre` `nombre` LONGTEXT NOT NULL ;

ALTER TABLE INMUEBLE
ADD COLUMN `activo` CHAR(1) NOT NULL AFTER `precio_negociable`;

ALTER TABLE INMUEBLE 
ADD COLUMN `observaciones` VARCHAR(800) NULL AFTER `activo`;

ALTER TABLE ARRIENDO 
ADD COLUMN `activo` CHAR(1) NULL AFTER `empleado_cedula`;

ALTER TABLE VENTA 
ADD COLUMN `activo` CHAR(1) NULL AFTER `empleado_cedula`;


-- Informe de Resumen de Oracle SQL Developer Data Modeler: 
-- 
-- CREATE TABLE                            19
-- CREATE INDEX                             0
-- ALTER TABLE                             50
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
