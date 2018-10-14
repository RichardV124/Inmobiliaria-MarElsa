import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarAccesoComponent } from './asignar-acceso.component';
import { AccesoRolService } from '../../../../services/acceso-rol/acceso-rol.service';
import { LoginService } from '../../../../services/login/login.service';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

fdescribe('AsignarAccesoComponent', () => {
  let component: AsignarAccesoComponent;
  let fixture: ComponentFixture<AsignarAccesoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsignarAccesoComponent ],
      providers: [AccesoRolService, LoginService],
      imports: [RouterTestingModule, FormsModule, HttpClientModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignarAccesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deberia asignar un acceso', () => {

    component.rolSeleccionado.id = 2;
    component.rolSeleccionado.nombre = 'empleado';
    component.rolSeleccionado.descripcion = 'empleado';

    component.accesoSeleccionado.id = 1;
    component.accesoSeleccionado.nombre = 'Gestion inmueble';
    component.accesoSeleccionado.url = 'registro-inmueble';

    component.accesoRol.rol = component.rolSeleccionado;
    component.accesoRol.acceso = component.accesoSeleccionado;

    component.asignar();
    expect(component.validarRegAcceso).toBeTruthy();

  });

  it('deberia eliminar un acceso', () => {

    component.rolSeleccionado.id = 2;
    component.rolSeleccionado.nombre = 'empleado';
    component.rolSeleccionado.descripcion = 'empleado';

    component.accesoSeleccionado.id = 1;
    component.accesoSeleccionado.nombre = 'Gestion inmueble';
    component.accesoSeleccionado.url = 'registro-inmueble';

    component.accesoRol.rol = component.rolSeleccionado;
    component.accesoRol.acceso = component.accesoSeleccionado;

    component.eliminar(component.accesoRol);
    expect(component.validarElminacionAcces).toBeTruthy();

  });
});
