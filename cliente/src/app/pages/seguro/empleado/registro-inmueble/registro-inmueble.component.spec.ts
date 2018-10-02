import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroInmuebleComponent } from './registro-inmueble.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ClienteService } from '../../../../services/cliente/cliente.service';
import { LoginService } from '../../../../services/login/login.service';
import { InmuebleService } from '../../../../services/inmueble/inmueble.service';
import { MunicipioService } from '../../../../services/municipio/municipio.service';


describe('RegistroInmuebleComponent', () => {

  let component: RegistroInmuebleComponent;
  let fixture: ComponentFixture<RegistroInmuebleComponent>;
  
 

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [ClienteService,LoginService,InmuebleService,MunicipioService],
      imports: [RouterTestingModule, FormsModule, HttpClientModule],
      declarations: [ RegistroInmuebleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroInmuebleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('validacion de campos vacios',() => {
    component.selectedMunicipio.id = 0;
    let ver = component.validarCamposVacios();
    expect(ver).toBeFalsy();
  });


  it('validacion de campos no ingresados',() => {
    component.selectedInmueble.promocion = null;
    component.selectedInmueble.garaje = null;
    component.selectedInmueble.num_closets = null;
    let ver = component.validarCamposNoIngresados(); 
    expect(ver).toBeTruthy();
  }); 

  it('primer llamado registrar',() => {
    
    component.selectedInmueble.promocion = 10;
    component.selectedInmueble.garaje = 3;
    component.selectedInmueble.num_closets = 5;
    component.selectedMunicipio.id === 0
    component.registrar();
    let ver = component.show;
    expect(ver).toEqual(1); 
  }); 

  it('test cliente no existe',() => {
    //cedula de la persona a buscar, si no existe quiere decir que sigue con el proceso
    //de registro de inmueble
    //esta cedula no existe 
    component.propietario.cedula = "12367675";
    let ver = component.clienteExiste();
    console.log("falsoooooo " +ver)
    expect(ver).toBeFalsy();
  }); 


  it('test cliente existe',() => {
    //cedula de la persona a buscar,
    component.propietario.cedula = "123";
    let ver = component.clienteExiste();
    console.log("true " +ver)
    expect(ver).toBeTruthy();
  }); 

  it('test convertir boolean',() => {
    component.selectedInmueble.cocina_integral= true;
    component.selectedInmueble.zonas_verdes = false;
    component.selectedInmueble.alarma = false;
    component.selectedInmueble.gas= false;
    component.selectedInmueble.terraza= false;
    component.selectedInmueble.sauna= false;
    component.selectedInmueble.conjunto_cerrado= false;
    component.selectedInmueble.seguridad= false;
    component.selectedInmueble.energia= false;
    component.selectedInmueble.precio_negociable= false;
    component.selectedInmueble.balcon= false;
    component.selectedInmueble.zonabbq= false;
    component.selectedInmueble.salon_comunal= false;
    component.selectedInmueble.zona_para_ninios= false;
    component.selectedInmueble.alcantarillado= false;
    component.selectedInmueble.gimnasio= false;
    component.selectedInmueble.piscina= false;
    let ver = component.convertirBoolean();
    expect(ver).toBeTruthy();
  }); 

  it('test continuar registro',() => {

   component.selectedInmueble.tipo_inmueble_id = component.selectedTipoInmueble;
   component.selectedInmueble.municipio_id = component.selectedMunicipio
   component.selectedInmueble.persona_cedula = component.usuario;

    component.continuarRegistro();

  }); 

  it('test validacion campo matricula buscar inmueble',() => {
    component.selectedInmueble.matricula == null
    component.buscar();
    let res = component.show;
    expect(res).toEqual(404);
  }); 

  it('test validacion si el inmueble no existe',() => {
    component.selectedInmueble.matricula = "123456756765";
    component.buscar();
    let res = component.show;
    expect(res).toEqual(404);
  }); 

  /*it('test validacion si el inmueble existe',() => {
    component.selectedInmueble.matricula = "12345";
    component.buscar();
    let res = component.show;
    expect(res).toEqual(505);
  });*/
  
  it('test validacion listar archivos',() => {
    component.selectedInmueble.id = 2;
    let res = component.listarArchivos();
    expect(res).toBeTruthy();

  });

  it('test validacion listar departamentos',() => {
      component.listarDepartamentos();
      var res = component.listaDepartamentos;
      expect(res).not.toBeNull();
  });


  it('test validacion listar TiposInmueble',() => {    
      component.listarTiposInmueble();
      var res = component.listaTiposInmueble;
      expect(res).not.toBeNull();
  });



  it('test validacion combos por defecto',() => { 
    component.selectedDepartamento.id = 2;
    component.selectedMunicipio.id = 1;
    component.selectedInmueble.zona = 1;
    component.selectedTipoInmueble.id = 1;
    component.combosPorDefecto();
    expect(component.selectedDepartamento.id).toEqual(0);
    expect(component.selectedMunicipio.id).toEqual(0);
    expect(component.selectedInmueble.zona).toEqual(0);
    expect(component.selectedTipoInmueble.id).toEqual(0);
  });

});
