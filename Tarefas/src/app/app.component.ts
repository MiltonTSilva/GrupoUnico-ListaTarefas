import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TarefasService } from './Servicos/tarefas.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  tarefasServico = inject(TarefasService);
  tarefas: any[] = [];

  constructor(){
	  this.tarefasServico.ObterTarefas().subscribe(dadosRetornado => { this.tarefas = dadosRetornado;});
  }
}
