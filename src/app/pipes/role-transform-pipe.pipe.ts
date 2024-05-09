import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'roleTransformPipe',
  standalone: true
})
export class RoleTransformPipePipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return '';

    // Verificamos si el valor comienza con "ROLE_" y eliminamos esta parte
    if (value.startsWith('ROLE_')) {
      return value.substring(5); // Retornamos la parte después de "ROLE_"
    }

    return value;
  }


}
