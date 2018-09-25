import { Pipe, PipeTransform } from '@angular/core';
import { EmpleadoDTO } from '../modelo/dto/empleadoDTO';

@Pipe({
  name: 'buscarByNombre'
})
export class BuscarByNombrePipe implements PipeTransform {

  transform(empleados: EmpleadoDTO[], campoFiltro: string) {
    if (!campoFiltro) {
    return empleados;
  }
  return empleados.filter(emp => emp.nombre.toLowerCase().includes(campoFiltro.toLowerCase()));
}

}
