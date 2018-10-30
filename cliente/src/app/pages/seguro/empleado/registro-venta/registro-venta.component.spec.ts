import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroVentaComponent } from './registro-venta.component';
import { VentasService } from 'src/app/services/ventas/ventas.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { Inmueble } from 'src/app/modelo/inmueble';
import { Persona } from 'src/app/modelo/persona';
import { Empleado } from 'src/app/modelo/empleado';
import { Venta } from 'src/app/modelo/venta';
import { Visita } from 'src/app/modelo/visita';

describe('RegistroVentaComponent', () => {
  let component: RegistroVentaComponent;
  let fixture: ComponentFixture<RegistroVentaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroVentaComponent ],
      providers: [VentasService],
      imports: [RouterTestingModule, FormsModule, HttpClientModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroVentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('deberia crear una venta', () => {

    component.selectedVenta = new Venta();

    const inmueble = new Inmueble();
    inmueble.id = 1;
    inmueble.matricula = '1234';
    const cliente = new Persona();
    cliente.cedula = 1234567;
    const personaE = new Persona();
    personaE.cedula = 1234;
    const empleado = new Empleado();
    empleado.persona_cedula = personaE;

    component.empleado = empleado;
    component.selectedPersona = cliente;
    component.selectedInmueble = inmueble;

    component.selectedVenta.visita_id = new Visita();

    component.selectedVenta.activo = true; 
    component.selectedVenta.id = 45;
    // console.log(component.selectedVenta);
    console.log(component.selectedPersona = cliente);
    component.registrarVenta();

    expect(component.buscarVenta(45)).toEqual(component.selectedVenta);

  });

  
});
