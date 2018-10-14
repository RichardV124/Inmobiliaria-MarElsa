import { TestBed, inject } from '@angular/core/testing';

import { AccesoRolService } from './acceso-rol.service';
import { HttpClientModule } from '@angular/common/http';
import { Acceso } from '../../modelo/Acceso';
import { Rol } from '../../modelo/rol';
import { AccesoRol } from '../../modelo/acceso_rol';
import { RespuestaDTO } from '../../modelo/respuestaDTO';
/**
let respuesta: RespuestaDTO;
let accs: Acceso;
let rol: Rol;
let accesoRol: AccesoRol;


describe('AccesoRolService', () => {

  respuesta = new RespuestaDTO();
  accs = new Acceso();
  rol = new Rol();
  accesoRol = new AccesoRol();

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AccesoRolService],
      imports:[HttpClientModule]
    });
  });

  it('should be created', inject([AccesoRolService], (service: AccesoRolService) => {
    expect(service).toBeTruthy();
  }));


  it('deberia registrar un acceso', () => {

    accs.id = 1;
    accs.nombre = "empleado";
    accs.url = "registro-inmueble";

    rol.id = 1;
    rol.nombre = "empleado";
    rol.descripcion = "empleado";

    accesoRol.acceso = accs;
    accesoRol.rol = rol;

    const servicio: AccesoRolService = TestBed.get(AccesoRolService);
    servicio.asignarAcceso(accesoRol).subscribe(rta =>{
    respuesta = JSON.parse(JSON.stringify(rta));
    console.log(this.respuesta.msj + ' SAVE');
    expect(rta.id).toEqual(505);
    })
<<<<<<< HEAD

=======
        
  });
  
  
  it('deberia eliminar un acceso rol', () => {

    accs.id = 1;
    accs.nombre = "empleado";
    accs.url = "registro-inmueble";

    rol.id = 1;
    rol.nombre = "empleado";
    rol.descripcion = "empleado";

    accesoRol.acceso = accs;
    accesoRol.rol = rol;

    const servicio: AccesoRolService = TestBed.get(AccesoRolService);
    servicio.eliminarAccesoRol(accesoRol).subscribe(rta =>{
    respuesta = JSON.parse(JSON.stringify(rta));
    expect(rta.id).toEqual(505);
    })
>>>>>>> d860b6ee1e47a5d93013a1185a466e17e7ccac4c
  });
});
  */
