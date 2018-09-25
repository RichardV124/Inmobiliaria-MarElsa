import { TipoPersonal } from './../../modelo/tipo_personal';
import { TestBed } from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { EmpleadoService } from './empleado.service';

describe('EmpleadoService', () => {

  let service: EmpleadoService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
imports: [HttpClientTestingModule],
providers: [EmpleadoService],
  });

  service = TestBed.get(EmpleadoService);
  httpMock = TestBed.get(HttpTestingController); 
});

afterEach(() => {
httpMock.verify();

});

it('Recupera clientes de la BD via GET', () => {

  const dummyPosts: TipoPersonal[] = [
    { id: 1, descripcion: 'Hello World'},
    { id: 2, descripcion: 'Hello World2'}
  ];

service.listarTipoPersonal().subscribe(posts => {
  console.log(posts);
  expect(posts.length).toBe(3);
 expect(posts).toEqual(dummyPosts);
});

const request = httpMock.expectOne(`${service.domain}/tipopersonal/listar`);
console.log(request.request.urlWithParams);
console.log(request.request.method);
expect(request.request.method).toBe('GET');

request.flush(dummyPosts);

  });
});
