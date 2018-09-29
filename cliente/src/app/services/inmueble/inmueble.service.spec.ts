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
import { async } from 'rxjs/internal/scheduler/async';


let service: InmuebleService;
    let dep: Departamento;
    let mun: Municipio;
    let tipo: TipoInmueble;
    let rol: Rol;
    let per: Persona;
    let inm: Inmueble;
    let log: Login;


fdescribe('InmuebleService', () => {
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InmuebleService],
      imports: [HttpClientModule]
    });

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
    });

 
    it('busqueda del inmueble por la matricula',async () => {
      const servicio: InmuebleService = TestBed.get(InmuebleService);
      servicio.buscarInmueble("1234").subscribe(rta =>{
        expect(rta.matricula).toEqual("1234");
        
        }); 
  });

});
