import { TestBed, inject } from '@angular/core/testing';

import { InmuebleService } from './inmueble.service';
import { Municipio } from '../../modelo/municipio';
import { Departamento } from '../../modelo/departamento';
import { Inmueble } from '../../modelo/inmueble';
import { TipoInmueble } from '../../modelo/tipo_inmueble';
import { Persona } from '../../modelo/persona';
import { Rol } from '../../modelo/rol';
import { Login } from '../../modelo/login';
import { HttpClient, HttpClientModule } from '@angular/common/http';


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
    let service: InmuebleService;
    let dep: Departamento;
    let mun: Municipio;
    let tipo: TipoInmueble;
    let rol: Rol;
    let per: Persona;
    let inm: Inmueble;
    let log: Login;

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [InmuebleService],
        imports: [HttpClientModule],
      });
      service = TestBed.get(InmuebleService);
      dep = new Departamento();
      mun = new Municipio();
      tipo = new TipoInmueble();
      rol = new Rol();
      per = new Persona();
      inm = new Inmueble();
      log = new Login();
    });

    afterEach(()=>{
      dep = null;
      mun = null;
      tipo = null;
      rol = null;
      per =null;
      inm = null;
      log = null;
    })

    it('deberia registrar un inmbuele con todos los datos', inject([InmuebleService], (service: InmuebleService) => {
 
    dep.nombre ="Quindio";
    dep.id = 1;

    
    mun.nombre = "Armenia";
    mun.id = 1;
    mun.departamento_id = dep;

   
    tipo.id = 1;
    tipo.descripcion = "sda";

    
    rol.id = 1;
    rol.nombre = "empleado";
    rol.descripcion = "empleado";
    
    
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
    inm.cliente_cedula = per;
    inm.matricula = "123";

    service.registrarInmueble(inm)
    service.buscarInmueble(inm.matricula).subscribe(rta =>{
      expect(inm.matricula).toEqual(rta.matricula);
    });
    
    }));

    it('deberia registrar un inmbuele con solo los datos obligatorios',() => {

    dep.nombre ="Quindio";
    dep.id = 1;

    mun.nombre = "Armenia";
    mun.id = 1;
    mun.departamento_id = dep;

    tipo.id = 1;
    tipo.descripcion = "sda";

    rol.id = 1;
    rol.nombre = "empleado";
    rol.descripcion = "empleado";

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

    
    log.username = "david";
    log.contrasenia = "123";
    log.persona_cedula = per;

    inm.id = 1;
    inm.direccion = "puerto";
    inm.area = 500;
    inm.tipo_inmueble_id = tipo;
    inm.valor = 50000000;
    inm.municipio_id = mun;
    inm.persona_cedula = log;

    service.registrarInmueble(inm)
    service.buscarInmueble(inm.matricula).subscribe(rta =>{
    expect(inm.matricula).toEqual(rta.matricula);
    }); 
  
    }));

    it('si no se ingresan datos deberia retornar un mensaje indicandolo', inject([InmuebleService], (service: InmuebleService) => {


    }));
    
  })

  describe('busquedaInmueble', () => {

    it('deberia registrar un inmbuele con solo los datos obligatorios',() => {


    });
  });
});
