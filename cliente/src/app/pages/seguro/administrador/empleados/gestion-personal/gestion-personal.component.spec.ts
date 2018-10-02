import { BuscarByNombrePipe } from './../../../../../filtros/buscar-by-nombre.pipe';
import { FormsModule } from '@angular/forms';
import { EmpleadoService } from './../../../../../services/empleado/empleado.service';
import { EmpleadoDTO } from './../../../../../modelo/dto/empleadoDTO';
import { GestionPersonalComponent } from './gestion-personal.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import {
  BaseRequestOptions,
  Response,
  ResponseOptions,
  Http,
  HttpModule
} from '@angular/http';


describe('GestionPersonalComponent', () => {
  // inmueble a ver
  let empleado = new EmpleadoDTO();
  /**
   * Se ejecuta antes de cada it
   */
  beforeEach(() => {
    TestBed.configureTestingModule({
      // el servicio a usar
      providers: [ EmpleadoService],
      // Importamos el http para poder consumir los servicios
      imports: [ HttpClientModule, FormsModule ],
      // Se declara el componente, para poder ver el reporte en el coverage
      declarations: [ GestionPersonalComponent ]
    });
  });

  /**
   * Buscar el empleado cuando este ya existe
   */
  it('Buscar empleados', () => {
    // Usamos TestBed para poder usar el servicio http
    const servicio: EmpleadoService = TestBed.get(EmpleadoService);
    // Usamos el servicio para buscar el empleado
    servicio.buscarEmpleado('4444').subscribe(rta => {
      // Guardamos el retorno del servicio en la variable empleado, creada previamente
      empleado = rta;
      console.log(empleado);
      // Validamos si la respuesta si concuerda con la esparada
      expect(empleado.nombre).toEqual('Richard');
    });
  });
});