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

  it('deberia crear una venta', () => {

    component.selectedVenta = new Venta();

    const inmueble = new Inmueble();
    inmueble.id = 4;
    inmueble.matricula = '6789';
    const cliente = new Persona();
    cliente.cedula = 1234567;
    const personaE = new Persona();
    personaE.cedula = 555;
    const empleado = new Empleado();
    empleado.persona_cedula = personaE;

    component.empleado = empleado;
    component.selectedPersona = cliente;
    component.selectedInmueble = inmueble;

    component.selectedVenta.visita_id = new Visita();

    component.selectedVenta.activo = true;
    // component.selectedVenta.id = 60;
    // console.log(component.selectedVenta);
    // console.log(component.selectedPersona = cliente);
    component.registrarVenta();

    // const venta: Venta = component.buscarVenta(60);

    // const existe = component.validarVentaexist();

    expect(component.validarVentaexist()).toBeTruthy();

  });

  it ('buscar venta', () => {

    const id = 4;

    const venta = component.buscarVenta(id);

    console.log(venta);

    expect(venta.id).toEqual(id);

  });

  it ('validar campos', () => {

    const inmueble = new Inmueble();
    inmueble.matricula = 'casa 12';

    const cliente = new Persona();
    cliente.cedula = 123;

    component.selectedInmueble = inmueble;
    component.selectedPersona = cliente;

    const res = component.validarCampos();

    expect(res).toBeTruthy();

  });


});
