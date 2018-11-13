import { Contrato } from './../../../../modelo/contrato';
import { VentaDTO } from './../../../../modelo/dto/VentaDTO';
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

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('registrar venta', () => {

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
    component.registrarVenta();

    expect(component.verVentaRegistrada).toBeTruthy();

  });

  it('registrar venta sin validar campos', () => {

    component.selectedVenta = new Venta();

    const inmueble = new Inmueble();
    inmueble.id = 20;
    const cliente = new Persona();
    cliente.cedula = 1234;
    const personaE = new Persona();
    personaE.cedula = 123;
    const empleado = new Empleado();
    empleado.persona_cedula = personaE;

    component.empleado = empleado;
    component.selectedPersona = cliente;
    component.selectedInmueble = inmueble;

    component.selectedVenta.visita_id = new Visita();

    component.selectedVenta.activo = true;
    component.registrarVenta();

    expect(component.verVentaRegistrada()).toBeFalsy();

  });

  it ('buscar venta', () => {

    component.buscarVenta(5);

    expect(component.verBusqueda).toBeTruthy();

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

  it ('validar campos falso', () => {

    const inmueble = new Inmueble();

    const cliente = new Persona();
    cliente.cedula = 123;

    component.selectedInmueble = inmueble;
    component.selectedPersona = cliente;

    const res = component.validarCampos();

    expect(res).toBeFalsy();

  });

  it ('eliminar venta', () => {

    const id = 5;

    component.eliminar(id);

    expect(component.verEliminacion).toBeTruthy();

  });

  it ('editar venta', () => {

    const ventaDTO = new VentaDTO();
    ventaDTO.cliente_cedula = '123';
    ventaDTO.matricula = 'casa 12';
    ventaDTO.visita_id = 1;
    ventaDTO.inmueble_id = 12;

    const personaE = new Persona();
    personaE.cedula = 123;

    const empleado = new Empleado();
    empleado.persona_cedula = personaE;

    component.ventasTabla = ventaDTO;
    component.empleado = empleado;

    component.editarVenta();

    expect(component.verVentaEditada).toBeTruthy();

  });

  it ('editar venta sin cliente', () => {

    const ventaDTO = new VentaDTO();
    ventaDTO.matricula = 'casa 12';
    ventaDTO.visita_id = 1;
    ventaDTO.inmueble_id = 12;

    const personaE = new Persona();
    personaE.cedula = 123;

    const empleado = new Empleado();
    empleado.persona_cedula = personaE;

    component.ventasTabla = ventaDTO;
    component.empleado = empleado;

    component.editarVenta();

    expect(component.verVentaEditada()).toBeFalsy();

  });

  it ('editar venta sin matricula', () => {

    const ventaDTO = new VentaDTO();
    ventaDTO.cliente_cedula = '123';
    ventaDTO.visita_id = 1;
    ventaDTO.inmueble_id = 12;

    const personaE = new Persona();
    personaE.cedula = 123;

    const empleado = new Empleado();
    empleado.persona_cedula = personaE;

    component.ventasTabla = ventaDTO;
    component.empleado = empleado;

    component.editarVenta();

    expect(component.verVentaEditada()).toBeFalsy();

  });

  it ('ver', () => {

    const ventaDTO = new VentaDTO();
    ventaDTO.cliente_cedula = '123';
    ventaDTO.matricula = 'casa 12';

    component.verVenta(ventaDTO);

    expect(component.ventaVista).toBeTruthy();

  });

  it ('buscar cliente', () => {

    const cliente = new Persona();
    cliente.cedula = '123';

    component.selectedPersona = cliente;

    component.buscar();

    expect(component.verBusqueda).toBeTruthy();

  });

  it ('buscar cliente ver', () => {

    component.buscarClienteVer('123');

    expect(component.verBusqueda).toBeTruthy();

  });

  it ('buscar cliente que no existe', () => {

    const cliente = new Persona();
    cliente.cedula = '000';

    component.selectedPersona = cliente;

    component.buscar();

    expect(component.verBusqueda()).toBeFalsy();

  });

  it ('buscar cliente sin cedula', () => {

    const cliente = new Persona();

    component.selectedPersona = cliente;

    component.buscar();

    expect(component.verBusqueda()).toBeFalsy();

  });

  it('buscar inmueble', () => {

    const inmueble = new Inmueble();
    inmueble.matricula = 'casa 12';

    component.selectedInmueble = inmueble;

    component.buscarInmueble();

    expect(component.verBusqueda).toBeTruthy();

  });

  it('buscar inmueble', () => {

    component.buscarInmuebleVer('casa12');

    expect(component.verBusqueda).toBeTruthy();

  });

  it('buscar inmueble sin matricula', () => {

    const inmueble = new Inmueble();

    component.selectedInmueble = inmueble;

    component.buscarInmueble();

    expect(component.verBusqueda()).toBeFalsy();

  });

  it ('cerrar mensaje', () => {

    component.cerrarMsj();

    expect(component.show).toEqual(0);

  });

  it ('cerrar mensaje inmueble', () => {

    component.cerrarMsjInmueble();

    expect(component.showInm).toEqual(0);

  });

  it ('cerrar mensaje ver', () => {

    component.cerrarMsjVer();

    expect(component.showMost).toEqual(0);

  });

  it ('cerrar mensaje editar cliente', () => {

    component.cerrarMsjEditCliente();

    expect(component.showEditarCliente).toEqual(0);

  });

  it ('cerrar mensaje editar empleado', () => {

    component.cerrarMsjEditEempleado();

    expect(component.showEditarEmpleado).toEqual(0);

  });

  it ('cerrar mensaje editar imueble', () => {

    component.cerrarMsjEditIinmueble();

    expect(component.showEditarInmueble).toEqual(0);

  });

  it ('cerrar mensaje edicion venta', () => {

    component.cerrarMsjEdicionVenta();

    expect(component.showEditarVenta).toEqual(0);

  });

  it ('cerrar mensaje contrato', () => {

    component.cerrarMsjContrato();

    expect(component.showContrato).toEqual(0);

  });

  it ('cerrar mensaje contrato datos', () => {

    component.cerrarMsjContratodatos();

    expect(component.showMostcontrato).toEqual(0);

  });

  /**it('ObtenerDatosCombosBusqueda', () => {

    const inmueble: Inmueble = {tipo_inmueble_id: 1, id_depto: 1, municipio_id: 1, cliente_cedula: 2000};
    component.selectedInmueble = inmueble;
    component.obtenerDatosCombosBusqueda();
    expect(component.selectedTipoInmueble.id).toEqual(1);

  }); */

  it('ObtenerPublicacionInmueble en Arriendo', () => {

    component.selectedInmueble.publicacion = 1;
    component.obtenerPublicacionInmueble();
    expect(component.publicarEnArriendo).toBeTruthy();

  });

  it('ObtenerPublicacionInmueble en ventas', () => {

    component.selectedInmueble.publicacion = 2;
    component.obtenerPublicacionInmueble();
    expect(component.publicarEnVenta).toBeTruthy();

  });

  it('ObtenerPublicacionInmueble en Arriendo y ventas', () => {

    component.selectedInmueble.publicacion = 3;
    component.obtenerPublicacionInmueble();
    expect(component.publicarEnArriendo && component.publicarEnVenta).toBeTruthy();

  });

  it('ObtenerDatosJSON', () => {

    const inmueble = new Inmueble();
    inmueble.id = 1;
    inmueble.observaciones = 'buen inmueble';
    inmueble.matricula = 'casa 12';

    const cadena = component.obtenerDatosJSON('matricula', inmueble);
    expect(cadena).toEqual('casa 12');

  });

  it ('validar campos contrato', () => {

    const contrato = new Contrato();
    contrato.descripcion = 'nuevo';
    contrato.precio = 200000;

    component.selectedContrato = contrato;

    const res = component.validarCamposContrato();

    expect(res).toBeTruthy();

  });

  it ('validar campos contrato falso', () => {

    const contrato = new Contrato();
    contrato.precio = undefined;

    component.selectedContrato = contrato;

    const res = component.validarCamposContrato();

    expect(res).toBeFalsy();

  });

  it ('limpiar campos inmueble', () => {

    component.limpiarCamposInmueble();

    expect(component.publicarEnVenta).toBeFalsy();

  });

  it ('combos por defecto', () => {

    component.combosPorDefecto();

    expect(component.selectedTipoInmueble.id).toEqual(0);

  });

  it ('listar departamentos', () => {

    component.listarDepartamentos();

    expect(component.listadoRealizado).toBeTruthy();

  });

  it ('listar municipios', () => {

    component.listarMunicipios();

    expect(component.listadoRealizado).toBeTruthy();

  });

  it ('listar departamentos', () => {

    component.listarClientes();

    expect(component.listadoRealizado).toBeTruthy();

  });

  it ('limpiar campos', () => {

    component.limpiarcampos();

    expect(component.camposLimpiados).toBeTruthy();

  });

  it ('validar campos edicion', () => {

    const venta = new VentaDTO();
    venta.cliente_cedula = '123';
    venta.empleado_cedula = '1234';
    venta.matricula = 'casa 12';

    component.ventasTabla = venta;

    const res = component.validarCamposEdicion();

    expect(res).toBeTruthy();

  });

  it ('validar campos edicion false', () => {

    const venta = new VentaDTO();
    venta.cliente_cedula = '123';
    venta.empleado_cedula = '1234';

    component.ventasTabla = venta;

    const res = component.validarCamposEdicion();

    expect(res).toBeFalsy();

  });

  it ('llenar tabla', () => {

    component.llenarTabla();
    expect(component.tablaLLena).toBeTruthy();

  });

  it ('llenar tabla', () => {

    component.llenarTablaContrato();
    expect(component.tablaLLena).toBeTruthy();

  });

  it ('ver Contrato', () => {

    const contrato = new Contrato();
    contrato.precio = 2000000;
    contrato.id = 1;
    contrato.descripcion = 'nuevo';
    contrato.fecha = new Date();

    component.verContrato(contrato);

    expect(component.mostrarEditar).toBeTruthy();

  });

  it ('eliminar Contrato', () => {

    const contrato = new Contrato();
    contrato.precio = 2000000;
    contrato.id = 1;
    contrato.descripcion = 'nuevo';
    contrato.fecha = new Date();

    component.eliminarContrato(contrato);

    expect(component.verEliminacion).toBeTruthy();

  });

});
