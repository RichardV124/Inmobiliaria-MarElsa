import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login/login.service';
import { Persona } from 'src/app/modelo/persona';
import { Login } from 'src/app/modelo/login';
import { Rol } from 'src/app/modelo/rol';
import { RespuestaDTO } from 'src/app/modelo/respuestaDTO';
import { Municipio } from 'src/app/modelo/municipio';
import { Departamento } from 'src/app/modelo/departamento';
import { ClienteService } from 'src/app/services/cliente/cliente.service';
import { MunicipioService } from 'src/app/services/municipio/municipio.service';
import { AccesoRolService } from 'src/app/services/acceso-rol/acceso-rol.service';
import { Inmueble } from 'src/app/modelo/inmueble';
import { InmuebleService } from 'src/app/services/inmueble/inmueble.service';
import { TipoInmueble } from 'src/app/modelo/tipo_inmueble';
import { VentasService } from 'src/app/services/ventas/ventas.service';
import { Venta } from 'src/app/modelo/venta';
import { Visita } from 'src/app/modelo/visita';
import { Empleado } from 'src/app/modelo/empleado';
import { VentaDTO } from 'src/app/modelo/dto/VentaDTO';
import { ArriendosService } from 'src/app/services/arriendos/arriendos.service';
import { EmpleadoService } from 'src/app/services/empleado/empleado.service';
import { Contrato } from 'src/app/modelo/contrato';

@Component({
  selector: 'app-registro-venta',
  templateUrl: './registro-venta.component.html',
  styleUrls: ['./registro-venta.component.css']
})
export class RegistroVentaComponent implements OnInit {

  img;
  ventaRegistrada = false;
  ventaEliminada = false;
  ventaBuscada = false;
  ventaEditada = false;
  listadoRealizado = false;
  camposLimpiados = false;
  labelFile;
  selectedPersona: Persona = new Persona();
  selectedInmueble: Inmueble = new Inmueble();
  selectedLogin: Login = new Login();
  rol: Rol = new Rol();
  respuesta: RespuestaDTO = new RespuestaDTO();
  respuesta2: RespuestaDTO = new RespuestaDTO();
  respuestaV: RespuestaDTO = new RespuestaDTO();
  respVenta: RespuestaDTO = new RespuestaDTO();
  respCliente: RespuestaDTO = new RespuestaDTO();
  respEmpleado: RespuestaDTO = new RespuestaDTO();
  respInmueble: RespuestaDTO = new RespuestaDTO();
  respVentaEditar: RespuestaDTO = new RespuestaDTO();
  respContrato: RespuestaDTO = new RespuestaDTO();
  listaMunicipios: Municipio[];
  listaDepartamentos: Departamento[];
  listaClientes: Persona[];
  selectedMunicipio: Municipio = new Municipio();
  selectedDepartamento: Departamento = new Departamento();
  publicarEnArriendo: boolean;
  publicarEnVenta: boolean;
  selectedFile: File[] = null;
  selectedTipoInmueble: TipoInmueble = new TipoInmueble();
  propietario: Persona = new Persona();
  selectedVenta: Venta = new Venta();
  selectedVentaEdit: Venta = new Venta();
  ventasTabla: VentaDTO = new VentaDTO();
  ventas: VentaDTO = new VentaDTO();
  visita: Visita = new Visita();
  usuario: Login = new Login();
  empleado: Empleado = new Empleado();
  selectedVentas: Venta = new Venta();
  selectedContrato: Contrato = new Contrato();
  contratoEditar: Contrato = new Contrato();
  selectedCont: Contrato = new Contrato();
  contratos: Contrato = new Contrato();
  show = 0;
  showInm = 0;
  showMost = 0;
  showEditarCliente = 0;
  showEditarEmpleado = 0;
  showEditarInmueble = 0;
  showEditarVenta = 0;
  showContrato = 0;
  showMostcontrato = 0;


  constructor(private empleadoService: EmpleadoService, private inmuebleServie: InmuebleService,private clienteService: ClienteService, private loginService: LoginService
    , private municipioService: MunicipioService, private accesoRolService: AccesoRolService,private ventaService: VentasService, private arriendoService: ArriendosService) {
    this.loginService.esAccesible('registro-venta');
    this.listarDepartamentos();
    this.listarClientes();
    this.selectedDepartamento.id = 0;
    this.selectedMunicipio.id = 0;
    this.selectedPersona.genero = 0;
    this.show = 0;
    this.labelFile = 'Ningún archivo seleccionado';
    this.llenarTabla();
    this.llenarTablaContrato();
  }

  ngOnInit() {
    this.empleado = this.loginService.getUsuario();
  }


  buscar() {
    if (this.selectedPersona.cedula == null) {
      this.show = 1;
      this.respuesta.msj = 'Debe ingresar la cedula a buscar';

    } else {
      this.clienteService.buscarPersona(this.selectedPersona.cedula)
      .subscribe(cliente => {
        if (cliente === undefined ) {
          this.respuesta.msj = 'No se encuentra ningun cliente con la cedula ';
          this.show = 1;
          console.log('NO SE ENCUENTRA');
          this.limpiarcampos();

        } else {
          this.respuesta.msj = 'Despliegue los datos del cliente';
          this.show = 2;
          this.selectedPersona = JSON.parse(JSON.stringify(cliente));
          this.selectedPersona.fecha_nacimiento = this.clienteService.formatoFecha(this.selectedPersona.fecha_nacimiento);
          this.municipioService.buscarMunicipio(cliente['municipio_id'])
          .subscribe(mun => {
              this.selectedDepartamento.id = mun['departamento_id'];
              this.listarMunicipios();
              this.selectedMunicipio = mun;

            });
          }
        });
    }
   }

   buscarInmueble() {
    this.cerrarMsj();
    if (this.selectedInmueble.matricula == null) {
      this.respuesta.msj = 'Debe ingresar la matrícula del inmueble';
      this.show = 1;
    } else {
      this.inmuebleServie.buscarInmueble(this.selectedInmueble.matricula)
      .subscribe(inmueble => {
        if (inmueble === undefined) {
          this.respuesta.msj = 'El inmueble no existe';
          this.show = 1;
          this.limpiarCamposInmueble();
        } else {
          this.respuesta2.msj = 'Despliegue los datos del inmueble';
          this.showInm = 2;
          this.selectedInmueble = inmueble;
          this.obtenerDatosCombosBusqueda();
          this.obtenerPublicacionInmueble();
        }
      });
    }
  }
  cerrarMsj() {
    this.show = 0;
  }

  cerrarMsjInmueble() {
    this.showInm = 0;
  }
  cerrarMsjVer(){
    this.showMost = 0;
  }
  cerrarMsjEditCliente(){
    this.showEditarCliente = 0;
  }
  cerrarMsjEditEempleado(){
    this.showEditarEmpleado = 0;
  }

  cerrarMsjEditIinmueble(){
    this.showEditarInmueble = 0;
  }
  cerrarMsjEdicionVenta(){
    this. showEditarVenta = 0;
  }
  cerrarMsjContrato(){
    this. showContrato = 0;
  }
cerrarMsjContratodatos(){
  this.showMostcontrato =0;
}
  

  obtenerDatosCombosBusqueda() {
    // Se obtienen los datos del tipo de inmueble
    const idTipo = this.obtenerDatosJSON('tipo_inmueble_id', this.selectedInmueble);
    // Se asigna los datos obtenidos al tipo inmueble
    this.selectedTipoInmueble.id = idTipo;

    // Se obtienen el id del departamento
    const idDepto = this.obtenerDatosJSON('id_depto', this.selectedInmueble);
    // Se asignan los datos obtenidos al departamento
    this.selectedDepartamento.id = idDepto;
    this.listarMunicipios();

    // Se obtienen el id del municipio
    const idMunicipio = this.obtenerDatosJSON('municipio_id', this.selectedInmueble);
    // Se asignan los datos obtenidos al municipio
    this.selectedMunicipio.id = idMunicipio;

    // Obtenemos la cédula del cliente
    const cedulaCliente = this.obtenerDatosJSON('cliente_cedula', this.selectedInmueble);
    // Se asigna la cédula al propietario
    this.propietario.cedula = cedulaCliente;

  }

  /**
   * Obtiene los datos de la publicación del inmueble
   */
  obtenerPublicacionInmueble() {
    const publicacion = this.obtenerDatosJSON('publicacion', this.selectedInmueble);
    if (publicacion === 1) {
      this.publicarEnArriendo = true;
      this.publicarEnVenta = false;
    } else if (publicacion === 2) {
      this.publicarEnVenta = true;
      this.publicarEnArriendo = false;
    } else {
      this.publicarEnVenta = true;
      this.publicarEnArriendo = true;
    }
  }

  /**
   * Obtiene los datos de la cadena json retornada en la busqueda del inmueble
   * @param atributo nombre del campo en la consulta obtenida
   */
  obtenerDatosJSON(atributo: string, inmueble: Inmueble) {
    return JSON.parse(JSON.stringify(inmueble[atributo]));
  }

  buscarVenta(id: number): Venta {
    let venta: Venta;
    this.ventaService.buscarVentaPorId(id).subscribe(res => {
      venta = res;
      console.log(venta);
      return venta;
    });
    return venta;
  }

registrarVenta(){

this.selectedVenta.cliente_cedula = this.selectedPersona;
this.selectedVenta.empleado_cedula = this.empleado.persona_cedula;
this.selectedVenta.inmueble_id = this.selectedInmueble;

// console.log(this.selectedVenta);

if(this.validarCampos()=== false){
  alert("ingrese todos los datos");
}else{

  this.ventaService.buscarPorInmbuebleyCedula(this.selectedPersona.cedula, this.selectedInmueble.id).subscribe(visitas =>{

    this.ventaService.buscarInmuebleVenta(this.selectedInmueble.id).subscribe(inmueble =>{
      this.arriendoService.buscarInmuebleArrendado(this.selectedInmueble.id).subscribe(inmArrendado =>{
        if(inmArrendado === undefined){
          if(inmueble === undefined){
            if(visitas === undefined){
              // console.log(this.selectedVenta);
              this.selectedVenta.visita_id = new Visita();
              this.ventaService.registroVenta(this.selectedVenta).subscribe(resAdd => {
              this.respuesta = JSON.parse(JSON.stringify(resAdd));
              this.show = this.respuesta.id;
              this.ventaRegistrada = true;
              this.llenarTabla();
              });
      
            }else{
              this.selectedVenta.visita_id = visitas;
              this.ventaService.registroVenta(this.selectedVenta).subscribe(res => {
              this.respuestaV = JSON.parse(JSON.stringify(res)); 
              this.cerrarMsjInmueble();
              this.show = this.respuestaV.id;
              this.ventaRegistrada = true;
              this.llenarTabla();
              });
            }
          }else{
            alert("este inmueble ya se encuentra vendido");
            this.respuesta.msj = 'este inmueble ya se encuentra vendido';
            this.show == 1;
            this.ventaRegistrada = false;
          }
        }else{
          alert("este inmueble ya se encuentra en arriendo");
            this.respuesta.msj = 'este inmueble ya se encuentra en arriendo';
            this.show == 1;
            this.ventaRegistrada = false;
        }
        
      })
    })
     
});

}

}

validarCamposContrato():boolean{
  if(this.selectedContrato.descripcion === undefined
    ||this.selectedContrato.precio === undefined){
      return false;
    }else{
      return true;
    }
}

registroContrato(){

    if(this.validarCamposContrato()){
      if(this.archivosAgregados()){
        this.crearArchivo();

        this.selectedContrato.id;
        this.selectedContrato.descripcion;
        this.selectedContrato.contrato;
        this.ventaService.listarUltimaVenta().subscribe(resVenta =>{
        this.selectedContrato.venta_id = resVenta;
        this.selectedContrato.precio;
        this.selectedContrato.fecha = new Date();
        this.selectedContrato.activo = 1;
        this.ventaService.registrarContrato(this.selectedContrato).subscribe(rspta =>{
        this.respuesta = JSON.parse(JSON.stringify(rspta));
        this.showContrato = rspta.id;
        this.llenarTablaContrato();
        
      })
        })
      } 

    }else{
      alert('ingrese los campos');
    }
       


}


/**
   * Para agregar un archivo
   * @param event archivo seleccionado
   */
  onFileSelected(event) {
    this.selectedFile = event.target.files;

    if (this.selectedFile === null) {
      this.labelFile = 'Ningún archivo seleccionado';
    } else {
    this.labelFile = '';
    for (const file of this.selectedFile) {
      this.labelFile = this.labelFile + '  ' + file.name;
    }
   }
  }

  crearArchivo() {
    for (const file of this.selectedFile) {
      const ext = file.name.substr(file.name.lastIndexOf('.') + 1);
      if (ext.toLowerCase() === 'pdf') {
        this.convertirArchivoBase64(file);
      }else {
        this.show = 404;
        this.respuesta.msj = 'El archivo ' + file.name + ' tiene una extensión no permitida';
      }
    }
  }

  convertirArchivoBase64(file: File) {
    const myReader: FileReader = new FileReader();
    myReader.onloadend = (e) => {
      this.img = myReader.result;
      console.log(this.img);
      this.selectedContrato.contrato = this.img;
    };
    myReader.readAsDataURL(file);
  }
/**
   * Verifica si se seleccionó por lo menos un archivo
   */
  archivosAgregados() {
    if (this.selectedFile === undefined) {
      this.respuesta.msj = 'Debe agregar por lo menos un archivo';
      this.show = 404;
      return false;
    }
    return true;
  }

  
  limpiarCamposInmueble() {
    this.combosPorDefecto();
    this.selectedPersona = new Persona();
    this.selectedInmueble = new Inmueble();
    this.selectedInmueble.zona = 0;
    this.publicarEnArriendo = false;
    this.publicarEnVenta = false;
    this.selectedFile = [];
  }
  combosPorDefecto() {
    this.selectedDepartamento.id = 0;
    this.selectedMunicipio.id = 0;
    this.selectedInmueble.zona = 0;
    this.selectedTipoInmueble.id = 0;
  }
  listarDepartamentos() {
    this.municipioService.listarDepartamentos().
    subscribe(departamento => {
      this.listaDepartamentos = departamento;
    });
    this.listadoRealizado = true;
  }

  listarMunicipios() {
    this.municipioService.listarMunicipios(this.selectedDepartamento.id).
    subscribe(municipio => {
      this.listaMunicipios = municipio;
    });
    this.listadoRealizado = true;
  }
  listarClientes() {
    this.clienteService.listarClientes()
    .subscribe(personas => {
      this.listaClientes = personas;
      this.rolesMunicipios();
    });
    this.listadoRealizado = true;
  }

  rolesMunicipios() {
    for (const persona of this.listaClientes) {
      this.accesoRolService.buscarRolPorId(JSON.parse(JSON.stringify(persona['rol_id'])))
      .subscribe(rol => {
                persona.rol_id = JSON.parse(JSON.stringify(rol));
      });

      this.municipioService.buscarMunicipio(JSON.parse(JSON.stringify(persona['municipio_id'])))
      .subscribe(mun => {
                persona.municipio_id = JSON.parse(JSON.stringify(mun));
      });
    }
  }

  limpiarcampos() {
    this.selectedPersona = new Persona();
    this.selectedLogin = new Login();
    this.selectedDepartamento.id = 0;
    this.selectedMunicipio.id = 0;
    this.selectedPersona.genero = 0;
    this.camposLimpiados = true;
  }

  validarCampos():boolean{
    if(this.selectedInmueble.matricula == null|| this.selectedPersona.cedula == null){
      return false;
    }else{
      return true;
    }
  }

  validarCamposEdicion():boolean{

    if(this.ventasTabla.cliente_cedula === null
      || this.ventasTabla.empleado_cedula === null 
      ||  this.ventasTabla.matricula === null){ 
      return false;
    }else{
      return true;
    }
  }
  llenarTabla(){
      this.ventaService.listarVentas()
      .subscribe(res => {
        this.ventas = res;
    });

  }

  llenarTablaContrato(){
    this.ventaService.listarContratos().subscribe(res =>{
      this.contratos = res;
    })
  }

  ver(venta: VentaDTO){
    this.ventasTabla = venta;
            this.ventasTabla.fecha = this.clienteService.formatoFecha(venta.fecha); 
            this.showMost = 1;
            this.respVenta.msj = 'despliegue para ver los datos';
  }

  verVentaEliminada(): boolean {
    return this.ventaEliminada;
  }

  verCcontrato(contrato: Contrato){
    this.selectedCont = contrato;
            this.showMostcontrato = 1;
            this.respVenta.msj = 'despliegue para ver los datos';
  }

  verVentaEditada() {
    return this.ventaEditada;
  }

  editarVenta()  {
    if (this.ventasTabla.cliente_cedula === undefined) {
      this.respuesta.msj = 'Para editar debe buscar previamente';
          confirm('Para editar debe buscar previamente');
  } else if (this.ventasTabla.matricula === undefined) {
      this.respuesta.msj = 'Para editar debe buscar previamente';
        confirm('Para editar debe buscar previamente');
  } else {
    this.inmuebleServie.buscarInmueble(this.ventasTabla.matricula).subscribe(inmueble => {
      this.arriendoService.buscarInmuebleId(this.ventasTabla.inmueble_id).subscribe(inmu => {
        if (inmueble === undefined) {
          this.respuesta.msj = 'El inmueble no existe';
          this.show = 1;
        } else {
          if (this.ventasTabla.matricula === inmu.matricula) {
            this.clienteService.buscarPersona(this.ventasTabla.cliente_cedula).subscribe(cliente =>{
              if (cliente === undefined) {
                this.respuesta.msj = 'El cliente ingresado no existe';
                this.show = 1;
              } else {
                  this.ventaService.buscarVisitaId(this.ventasTabla.visita_id).subscribe(visita => {
                    if (visita === undefined) {
                    this.selectedVentaEdit.id = this.ventasTabla.id;
                    this.selectedVentaEdit.inmueble_id = inmu;
                    this.selectedVentaEdit.cliente_cedula = cliente;
                    this.selectedVentaEdit.empleado_cedula = this.empleado.persona_cedula;
                    this.selectedVentaEdit.visita_id = null;
                    } else {
                      this.selectedVentaEdit.id = this.ventasTabla.id;
                      this.selectedVentaEdit.inmueble_id = inmu;
                      this.selectedVentaEdit.cliente_cedula = cliente;
                      this.selectedVentaEdit.empleado_cedula = this.empleado.persona_cedula;
                      this.selectedVentaEdit.visita_id = visita;
                    }
                      this.ventaService.editarVenta(this.selectedVentaEdit).subscribe(resVentEdit=>{
                      this.respuesta = JSON.parse(JSON.stringify(resVentEdit));
                      this.showEditarVenta = this.respuesta.id; 
                      this.llenarTabla();
                      this.ventaEditada = true;
                  });
                  });
              }
            });
          } else {
            this.inmuebleServie.buscarInmueble(this.ventasTabla.matricula).subscribe(inmueble_existe => {
              this.arriendoService.buscarInmuebleVendido(inmueble_existe.id).subscribe(inmueble_vendi => {
                console.log(inmueble_existe);
                if (inmueble_vendi === undefined) {
                  this.arriendoService.buscarInmuebleArrendado(inmueble_existe.id).subscribe(inmuarrendado => {
                    console.log(inmuarrendado);
                    if (inmuarrendado === undefined) {
                      this.clienteService.buscarPersona(this.ventasTabla.cliente_cedula).subscribe(cliente =>{
                          if (cliente === undefined) {
                            this.respuesta.msj = 'El cliente ingresado no existe';
                            this.show = 1;
                          } else {
                            this.ventaService.buscarVisitaId(this.ventasTabla.visita_id).subscribe(visita => {
                              if (visita === undefined) {
                                this.selectedVentaEdit.id = this.ventasTabla.id;
                                this.selectedVentaEdit.inmueble_id = inmu;
                                this.selectedVentaEdit.cliente_cedula = cliente;
                                this.selectedVentaEdit.empleado_cedula = this.empleado.persona_cedula;
                                this.selectedVentaEdit.visita_id = null;
                              } else {
                                this.selectedVentaEdit.id = this.ventasTabla.id;
                                this.selectedVentaEdit.inmueble_id = inmu;
                                this.selectedVentaEdit.cliente_cedula = cliente;
                                this.selectedVentaEdit.empleado_cedula = this.empleado.persona_cedula;
                                this.selectedVentaEdit.visita_id = visita;
                              }
                              this.ventaService.editarVenta(this.selectedVentaEdit).subscribe(resVentEdit=>{
                                this.respuesta = JSON.parse(JSON.stringify(resVentEdit));
                                this.showEditarVenta = this.respuesta.id; 
                                this.llenarTabla();
                                this.ventaEditada = true;
                            });
                            });
                          }
                        });
                    } else {
                      this.show = 1;
                      this.respuesta.msj = 'El inmueble se encuenrta arrendado';
                    }
                  });
                } else {
                  this.show = 1;
                  this.respuesta.msj = 'El inmueble se encuenrta vendido';
                }

              });
            });
          }
        }
      });
    });
  }
}

eliminar(id: number){

      this.ventaService.buscarVentaPorId(id).subscribe(res =>{
         this.ventaService.eliminar(res).subscribe(resEliminar=>{
          this.llenarTabla();  
          alert('se elimino correctamente');
          this.cerrarMsj();
         });
      })
}
 
eliminarContrato(contrato: Contrato){
    this.ventaService.eliminarContrato(contrato).subscribe(rst =>{
      this.llenarTablaContrato();
      this.limpiarCamposContrato();
      alert('se elimino correctamente');
    })
}

verBusqueda() {
  return this.ventaBuscada;
}

limpiarCamposContrato(){
  this.selectedCont = new Contrato();
}

editarContrato(){

if(this.selectedCont.descripcion ===undefined 
  ||this.selectedCont.precio === undefined||
  this.selectedCont.fecha ===undefined){
    alert('no hay datos para modificar')
}else{
  this.contratoEditar.id = this.selectedCont.id; 
  this.contratoEditar.descripcion = this.selectedCont.descripcion;
  this.contratoEditar.precio = this.selectedCont.precio;
  this.contratoEditar.fecha = this.selectedCont.fecha;
 
 this.ventaService.editarContrato(this.contratoEditar).subscribe(res =>{
   this.respuesta = JSON.parse(JSON.stringify(res));
   this.showEditarVenta = this.respuesta.id; 
 
 });
}

}

verVentaRegistrada(): boolean {
  return this.ventaRegistrada;
}


}
