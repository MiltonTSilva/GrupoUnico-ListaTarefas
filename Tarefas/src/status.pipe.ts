import { Pipe, PipeTransform } from '@angular/core';

enum Status {
    Pendente = 0,
    Concluída = 1,
}
  
@Pipe({
    name: 'status',
  standalone: true
})
export class StatusPipe implements PipeTransform {
    transform(value: number,   
    locale?: string): string {
    switch (value) {
      case Status.Pendente:
        return 'Pendente';
      case Status.Concluída:
        return 'Concluída';
      default:
        return 'Status inválido';
    }
  }
}