import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TarefasService } from '../Servicos/tarefas.service';
import { CommonModule, DatePipe } from '@angular/common';
import { StatusPipe } from '../status.pipe'
import { NovaTarefaComponent } from '../app/Nova-Tarefa/nova-tarefa.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,StatusPipe,NovaTarefaComponent,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  tarefasServico = inject(TarefasService);
  tarefas: any[] = [];
  mostrarNovaTarefa = false;

  pagina = 0;
  titulo = "";
  descricao = "";
  dataTarefa = "" 
  status = "";
  dataAtual: string;
    
  
  constructor(private datePipe: DatePipe)
  {
    this.atualizarListaTarefas();
    this.dataAtual = this.datePipe.transform(this.dataTarefa, 'dd/MM/YYYY') || '';
  }

  toggleNovaTarefa() {
    this.mostrarNovaTarefa = !this.mostrarNovaTarefa; 
  }

  atualizarListaTarefas() {
    this.tarefasServico.ObterTarefas(this.pagina, this.titulo, this.descricao, this.dataAtual , this.status).subscribe(tarefas => {
      this.tarefas = tarefas;
    });
  }

  mudarPagina(incremento: number) {

    const novaPagina = this.pagina + incremento;

    if (novaPagina >= 0) {

      this.pagina = novaPagina;

      this.atualizarListaTarefas();
    }
  }
  formatarData(data: string): string {
    const date = new Date(data);
    const dia = String(date.getDate()).padStart(2, '0');
    const mes = String(date.getMonth() + 1).padStart(2, '0');
    const ano = date.getFullYear();
    return `${dia}/${mes}/${ano}`;
  }
}
