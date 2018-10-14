import { TestBed, inject } from '@angular/core/testing';

import { InmuebleService } from './inmueble.service';
import { Municipio } from '../../modelo/municipio';
import { Departamento } from '../../modelo/departamento';
import { Inmueble } from '../../modelo/inmueble';
import { TipoInmueble } from '../../modelo/tipo_inmueble';
import { Persona } from '../../modelo/persona';
import { Rol } from '../../modelo/rol';
import { Login } from '../../modelo/login';
import { HttpClientModule } from '@angular/common/http';
import { RespuestaDTO } from '../../modelo/respuestaDTO';
import { Archivo } from '../../modelo/archivo';

    let arch: Archivo;
    let dep: Departamento;
    let mun: Municipio;
    let tipo: TipoInmueble;
    let rol: Rol;
    let per: Persona;
    let inm: Inmueble;
    let log: Login;
    let respuesta: RespuestaDTO;
    let listaInmuebles: Inmueble[];

describe('InmuebleService', () => {
  
    arch = new Archivo();
    dep = new Departamento();
    mun = new Municipio();
    tipo = new TipoInmueble();
    rol = new Rol();
    per = new Persona();
    inm = new Inmueble();
    log = new Login();
    respuesta = new RespuestaDTO();

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InmuebleService],
      imports: [HttpClientModule],
    });
  });


    fit('deberia registrar un inmueble con todos los datos', () => {

      dep.nombre ="Quindio";
      dep.id = 1;
  
      
      mun.nombre = "Armenia";
      mun.id = 1;
      mun.departamento_id = dep;
  
     
      tipo.id = 1;
      tipo.descripcion = "sda";
  
      
      rol.id = 3;
      rol.nombre = "empleado";
      rol.descripcion = "empleado";
      
      
      per.nombre = "gart";
      per.apellido = "Roman";
      per.fecha_nacimiento = new Date("1998,08,21");
      per.cedula = "111";
      per.direccion= "por ahi";
      per.telefono = 23423423;
      per.correo = "david";
      per.rol_id = rol;
      per.municipio_id = mun;
      per.genero = 0;
  
      log.username = "gart";
      log.contrasenia= "1234";
      log.persona_cedula = per;

      inm.id = 20;
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
      inm.persona_cedula = log;
      inm.zona = 2;
      inm.alcantarillado = true;
      inm.sauna = true; 
      inm.energia = true;
      inm.zonabbq = true;
      inm.cliente_cedula = per;
      inm.matricula = "100";
      inm.precio_negociable = true;
      
  
      const servicio: InmuebleService = TestBed.get(InmuebleService);
      servicio.registrarInmueble(inm).subscribe(rta =>{
        respuesta = JSON.parse(JSON.stringify(rta));
        console.log(this.respuesta.msj + ' SAVE');

      });
      servicio.buscarInmueble(inm.matricula).subscribe(rta =>{
        expect(rta.matricula).toEqual("100");
      });
        
    });


    it('deberia registrar un inmueble solo con los datos obligatorios', () => {
      dep.nombre ="Quindio";
      dep.id = 1;

      mun.nombre = "Armenia";
      mun.id = 1;
      mun.departamento_id = dep;
  
      rol.id = 1;
      rol.nombre = "empleado";
      rol.descripcion = "empleado";
      
      per.nombre = "David";
      per.apellido = "Roman";
      per.fecha_nacimiento = new Date("1998,08,21");
      per.cedula = "123";
      per.direccion= "por ahi";
      per.telefono = 23423423;
      per.correo = "david";
      per.rol_id = rol;
      per.municipio_id = mun;
      per.genero = 0;
  
      tipo.id = 1;
      tipo.descripcion = "sda";

      log.username = "gart";
      log.contrasenia= "1234";
      log.persona_cedula = per;

      inm.id = 21;
      inm.direccion = "puerto";
      inm.area = 200;
      inm.tipo_inmueble_id = tipo;
      inm.valor = 200000;
      inm.municipio_id = mun;
      inm.persona_cedula = log;
      inm.cliente_cedula = per;
      inm.matricula = "101";

      const servicio: InmuebleService = TestBed.get(InmuebleService);
      servicio.registrarInmueble(inm).subscribe(rta =>{
        respuesta = JSON.parse(JSON.stringify(rta));
        console.log(this.respuesta.msj + ' SAVE');

      });
      servicio.buscarInmueble(inm.matricula).subscribe(rta =>{
        expect(rta.matricula).toEqual("101");
      });
    });

    it('busqueda del inmueble por la matricula', () => {
      const servicio: InmuebleService = TestBed.get(InmuebleService);
      servicio.buscarInmueble("casa 12").subscribe(rta =>{
        expect(rta.matricula).toEqual("casa 12");

        });
  });

  it('testing listar Inmuebles', () => {
    const servicio: InmuebleService = TestBed.get(InmuebleService);
    servicio.listarInmuebles() .subscribe(inmueble => {
    listaInmuebles = inmueble;
    console.log("tamaañooooo listaaaa: "+listaInmuebles.length)
    expect(listaInmuebles).not.toBeNull();
    });
});

it('deberia editar un inmueble', () => {


  dep.nombre ="Quindio";
  dep.id = 1;

  
  mun.nombre = "Armenia";
  mun.id = 1;
  mun.departamento_id = dep;

 
  tipo.id = 1;
  tipo.descripcion = "sda";

  
  rol.id = 2;
  rol.nombre = "empleado";
  rol.descripcion = "empleado";
  
  
  per.nombre = "David";
  per.apellido = "Roman";
  per.fecha_nacimiento = new Date("1998,08,21");
  per.cedula = "123";
  per.direccion= "por ahi";
  per.telefono = 23423423;
  per.correo = "david";
  per.rol_id = rol;
  per.municipio_id = mun;
  per.genero = 0;

  log.username = "david";
  log.contrasenia= "123";
  log.persona_cedula = per;

  inm.id = 2;
  inm.direccion = "Cartagena";
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
  inm.persona_cedula = log;
  inm.zona = 2;
  inm.alcantarillado = true;
  inm.sauna = true; 
  inm.energia = true;
  inm.zonabbq = true;
  inm.cliente_cedula = per;
  inm.matricula = "12345";
  inm.precio_negociable = true;

  const servicio: InmuebleService = TestBed.get(InmuebleService);
  servicio.editar(inm).subscribe(rta =>{
    respuesta = JSON.parse(JSON.stringify(rta));
    console.log(this.respuesta.msj + ' UPDATE');

  });
  servicio.buscarInmueble(inm.matricula).subscribe(rta =>{
    expect(rta.direccion).toEqual("cartagena");
  });

});

it('deberia registrar una imagen', () => {
  
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
  per.fecha_nacimiento = new Date("1998,08,21");
  per.cedula = "123";
  per.direccion= "por ahi";
  per.telefono = 23423423;
  per.correo = "david";
  per.rol_id = rol;
  per.municipio_id = mun;
  per.genero = 0;

  log.username = "david";
  log.contrasenia= "123";
  log.persona_cedula = per;

  inm.id = 2;
  inm.direccion = "Cartagena";
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
  inm.persona_cedula = log;
  inm.zona = 2;
  inm.alcantarillado = true;
  inm.sauna = true; 
  inm.energia = true;
  inm.zonabbq = true;
  inm.cliente_cedula = per;
  inm.matricula = "12345";
  inm.precio_negociable = true;

  arch.id = 2;
  arch.nombre = "carro";
  arch.inmueble_id = inm;
  arch.archivo = "carro.img"

  const servicio: InmuebleService = TestBed.get(InmuebleService);
  servicio.registrarArchivo(arch).subscribe(rta =>{
  respuesta = JSON.parse(JSON.stringify(rta));
  expect(respuesta.id).toEqual(505);
  });
  
});

it('deberia poner inactivo un inmueble', () => {

  
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
  per.fecha_nacimiento = new Date("1998,08,21");
  per.cedula = "123";
  per.direccion= "por ahi";
  per.telefono = 23423423;
  per.correo = "david";
  per.rol_id = rol;
  per.municipio_id = mun;
  per.genero = 0;

  log.username = "david";
  log.contrasenia= "123";
  log.persona_cedula = per;

  inm.id = 2;
  inm.direccion = "Cartagena";
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
  inm.persona_cedula = log;
  inm.zona = 2;
  inm.alcantarillado = true;
  inm.sauna = true; 
  inm.energia = true;
  inm.zonabbq = true;
  inm.cliente_cedula = per;
  inm.matricula = "12345";
  inm.precio_negociable = true;

  const servicio: InmuebleService = TestBed.get(InmuebleService);
  servicio.eliminarInmueble(inm).subscribe(rta =>{
    respuesta = JSON.parse(JSON.stringify(rta));
    console.log(this.respuesta.msj + ' UPDATE');
  });
  servicio.buscarInmueble(inm.matricula).subscribe(rta => {
    expect(rta.inactivo).toEqual(0);
  });

});

});
