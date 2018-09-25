import { TestBed, inject } from '@angular/core/testing';

import { InmuebleService } from './inmueble.service';
import { Municipio } from '../../modelo/municipio';
import { Departamento } from '../../modelo/departamento';
import { Inmueble } from '../../modelo/inmueble';
import { TipoInmueble } from '../../modelo/tipo_inmueble';
import { Persona } from '../../modelo/persona';
import { Rol } from '../../modelo/rol';

describe('InmuebleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InmuebleService]
    });
  });

  it('should be created', inject([InmuebleService], (service: InmuebleService) => {
    expect(service).toBeTruthy();
  }));

  describe('Inmueble con todos los datos',()=>{

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [InmuebleService]
      });
    });

    it('deberia registrar un inmbuele', inject([InmuebleService], (service: InmuebleService) => {

    var dep = new Departamento();
    dep.nombre ="Quindio";
    dep.id = 1;

    var mun = new Municipio();
    mun.nombre = "Armenia";
    mun.id = 1;
    mun.departamento_id = dep;

    var tipo = new TipoInmueble();
    tipo.id = 1;
    tipo.descripcion = "sda";

    var rol = new Rol();
    rol.id = 1;
    rol.nombre = "empleado";
    rol.descripcion = "empleado";
    
    var per = new Persona();
    per.nombre = "David";
    per.apellido = "Roman";
    per.fecha_nacimiento = new Date(1998,08,21);
    per.cedula = "123";
    per.direccion= "por ahi";
    per.telefono = 23423423;
    per.correo = "david";
    per.rol_id = rol;
    per.municipio_id = mun;
    per.genero = 0;

    var inm = new Inmueble();
    inm.id = 1;
    inm.direccion = "puerto";
    inm.area = 200;
    inm.tipo_inmueble_id = tipo;
    inm.valor = 200000;
    inm.promocion = 20;
    inm.num_habitaciones = 2;
    inm.num_banios = 3;
    inm.pisos = 3;
    inm.seguridad = true;
    inm.zonas_verdes = true;
    inm.garaje = 2;
    inm.salon_comunal = true;
    inm.conjunto_cerrado = true;
    inm.cocina_integral = true;
    inm.gas = true;
    inm.alarma = true;
    inm.zona_para_ninios = true;
    inm.terraza = true;
    inm.gimnasio = true;
    inm.piscina = true;
    inm.balcon = true;
    inm.num_closets = 4;
    inm.municipio_id = mun;
    inm.num_cocinas = 2;
    inm.zona = 2;
    inm.alcantarillado = true;
    inm.sauna = true; 
    inm.energia = true;
    inm.zonabbq = true;
  
    }));

  })
});
