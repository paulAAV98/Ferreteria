import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ocultarTarjeta'
})
export class OcultarTarjetaPipe implements PipeTransform {

  transform(numero: string): string {
    return numero.replace(/\b(?:\d{4}[ -]?){3}(?=\d{4}\b)/gm, '**** **** **** ');
  }

}
