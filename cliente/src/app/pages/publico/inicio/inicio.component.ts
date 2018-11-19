import { LoginService } from 'src/app/services/login/login.service';
import { Login } from './../../../modelo/login';
import { Router } from '@angular/router';
import { Component, OnInit, Injectable } from '@angular/core';
import { MunicipioService } from 'src/app/services/municipio/municipio.service';
import { Departamento } from 'src/app/modelo/departamento';
import { Municipio } from 'src/app/modelo/municipio';
import { InmuebleService } from 'src/app/services/inmueble/inmueble.service';
import { TipoInmueble } from 'src/app/modelo/tipo_inmueble';
import { Inmueble } from 'src/app/modelo/inmueble';
import { GenericoService } from 'src/app/services/generico/generico.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})

@Injectable()
export class InicioComponent implements OnInit {

  arriendo: any;
  venta: any;
  latitudDefecto = 4.540130;
  longitudDefecto = -75.665193;
  latitud = 0;
  longitud = 0;
  latitudSuperior = 0;
  latitudInferior = 0;
  longitudSuperior = 0;
  longitudInferior = 0;
  marcadorAgregado = false;
  inmuebleSeleccionado: Inmueble;
  inmuebleMatricula: string;
  user: Login = new Login();

  /**
   * Listado de inmuebles
   */
  inmuebles: Array<Inmueble> = [];

  copiaInmuebles: Array<Inmueble> = [];
  nuevaLista: Array<Inmueble> = [];

  // listados de los combobox
  listaTiposInmueble: TipoInmueble[];
  listaDepartamentos: Departamento[];
  listaMunicipios: Municipio[];
  // fin combox
  selectedDepartamento: Departamento = new Departamento();
  inmueble: Inmueble = new Inmueble(); // el inmueble con los datos para filtrar
  constructor(private genericoService: GenericoService,
    private municipioService: MunicipioService,
    private inmuebleServie: InmuebleService,
    private servicios: LoginService,
    private router: Router) {
    this.listarDepartamentos();
    this.listarMunicipios();
    this.listarTiposInmueble();
    this.inmueble.activo = 1;
  }
  ngOnInit() {
    // validamos si hay parametros para filtrar
    const objeto = this.genericoService.getUrlParameter('objeto');
    if (objeto !== undefined && objeto !== '' && objeto != null && objeto !== '{}') {
      // Cargamos el resultado de inmuebles teniendo en cuenta los parametros en el objeto
      this.listarByParametros(objeto);
    } else {
      // Como no hay parametros de busqueda, cargamos todos los inmuebles
      // listamos los inmuebles
      this.listarInmuebles();
    }
    this.user = this.servicios.getUsuario();
  }

  /**
   * Agrega un marcador al mapa
   * @param event marcador agregado
   */
  onChoseLocation(event) {
    if (this.marcadorAgregado) {
      this.ocultarMarcador();
    }
    this.latitud = event.coords.lat;
    this.longitud = event.coords.lng;
    this.marcadorAgregado = true;
    this.obtenerRango();
    this.listarInmueblesEnRago();
  }

  /**
   * Elimina el filtro el rango y oculta el marcador
   */
  ocultarMarcador() {
    this.marcadorAgregado = false;
    this.inmuebles = [];
    this.inmuebles = this.copiaInmuebles;
    this.copiaInmuebles = [];
  }

  /**
   * Obtiene el rango en el cual se listaran los inmuebles
   */
  obtenerRango() {
    this.latitudSuperior = this.latitud + 0.006176;
    this.latitudInferior = this.latitud - 0.006176;
    this.longitudSuperior = this.longitud + 0.006176;
    this.longitudInferior = this.longitud - 0.006176;
  }

  /**
   * Lista los inmuebles que se encuentran en el rengo seleccionado
   */
  listarInmueblesEnRago() {
    this.copiaInmuebles = this.inmuebles;
    this.nuevaLista = [];
    for (const i of this.inmuebles) {
      if (i.latitud >= this.latitudInferior && i.latitud <= this.latitudSuperior
        && i.longitud >= this.longitudInferior && i.longitud <= this.longitudSuperior) {
          this.nuevaLista.push(i);
        }
    }
    this.inmuebles = [];
    this.inmuebles = this.nuevaLista;
  }

 /**
   * Obtiene la lista de departamentos
   */
  listarDepartamentos() {
    this.municipioService.listarDepartamentos().
    subscribe(departamento => {
      this.listaDepartamentos = departamento;
    });
  }

   /**
   * MEtodo que lista los municipios de la base de datos por el dpto seleccionado
   */
 listarMunicipios() {
   this.municipioService.listarMunicipios(this.selectedDepartamento.id).
   subscribe(municipio => {
     this.listaMunicipios = municipio;
   });
 }

 /**
   * Obtiene la lista de tipos de inmuebles
   */
  listarTiposInmueble() {
    console.log(TipoInmueble);
    this.inmuebleServie.listarTiposInmueble()
    .subscribe(tipoInmueble => {
      this.listaTiposInmueble = tipoInmueble;

    });
  }

  /**
   * Carga la lista de inmuebles disponibles (estado 1 = publicado)
   */
  listarInmuebles() {
    this.genericoService.listar('inmueble', {'activo': 1}).subscribe(r => {
      if (r != null) {
        this.inmuebles = r;
        console.log(this.inmuebles);
        // Agregamos los datos (objetos) adicionales a cada inmueble
        this.agregarObjetos(this.inmuebles);
      }
    });
  }

    /**
   * Carga la lista de inmuebles disponibles (estado 1 = publicado)
   */
  listarByParametros(objeto) {
    // convertimos el texto a objeto json
    const json = JSON.parse(objeto);

    // Obtenemos la lista de inmuebles
    this.genericoService.listar('inmueble', json).subscribe(r => {
      if (r != null) {
        this.inmuebles = r;
        // Agregamos los datos (objetos) adicionales a cada inmueble
        this.agregarObjetos(this.inmuebles);
      }
    });
  }
  /**
   * Agrega objetos a los inmuebles
   * @param lista
   */
  agregarObjetos(lista) {
    for (const i of lista) {

    this.inmuebleServie.buscarInmuMunicipio(i.matricula).
    subscribe(municipio => {
        i.municipio_id = municipio;

        this.inmuebleServie.buscarTipoInmuebleId(i.tipo_inmueble_id)
        .subscribe(tipoInmueble => {
          i.tipo_inmueble_id = tipoInmueble;
        });
    });

    }
  }
  /**
   * Busca de acuerdo a los parametros seleccionados por el usuario
   */
  filtrar() {
    // Convertimos el objeto inmueble a json
    const json = JSON.stringify(this.inmueble);
    // Redireccionamos al index con los parametros a buscar
    location.href = '/?objeto=' + json;
  }

  eliminarFiltro() {
      this.router.navigate(['/']);
      window.location.reload();
}
  verMas(inmueble: Inmueble) {

    if ( this.user === null) {
      confirm('Debe iniciar sesion');
  } else {
    this.inmuebleMatricula = inmueble.matricula;
    this.inmuebleSeleccionado = inmueble;
    this.router.navigate(['gestion-visitas-cliente']);
    localStorage.setItem('matricula', this.inmuebleMatricula);
    localStorage.setItem('inmueble', JSON.stringify(this.inmuebleSeleccionado));
  }
  }
}
