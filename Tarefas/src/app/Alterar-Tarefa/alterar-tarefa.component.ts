import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { TarefasService } from '../../Servicos/tarefas.service';

@Component({
    selector: 'app-alterar-tarefa',
    standalone: true,
    templateUrl: './alterar-tarefa.component.html',
    styleUrls: ['./alterar-tarefa.component.css'],
    imports: [FormsModule, CommonModule]
})
export class AlterarTarefaComponent  implements OnInit {
  tarefasServico = inject(TarefasService);
  @Input() tarefa: any = {
    id: 0,
    titulo: '',
    descricao: '',
    dataTarefa: '',
    status: 0
  };

  titulo: string = '';
  descricao: string = '';
  dataTarefa: Date | null = null;
  status: number = 0;
  errorMessage: string = '';
  dataTarefaInput: string = '';
 
  @Output() tarefaAlterada = new EventEmitter<void>();
 
  ngOnInit() {   
    const id = this.tarefa.id; 
    this.carregarTarefa(id);
  }
   

  carregarTarefa(id: number) {

    this.tarefasServico.obterTarefaPorId(id)
      .pipe(tap(response => {})).subscribe({next:  (data) => {
        this.tarefa = data;
        this.titulo = data.titulo;         
        this.descricao = data.descricao;
        this.dataTarefa = data.dataTarefa;
        this.status = data.status;
      },
      error: (error) => {        
        if (error.error && Array.isArray(error.error) && error.error.length > 0) {
          this.errorMessage = error.error.message; 
        } else {
          this.errorMessage = 'Ocorreu um erro ao alterar a tarefa. Tente novamente.'; 
        }
      }
    });   
  }

  AlterarTarefa(id: number)
  {
      this.tarefa.id = id;
      this.tarefa.titulo = this.titulo;
      this.tarefa.descricao = this.descricao;
      this.tarefa.dataTarefa = this.dataTarefa;
      this.tarefa.status = Number(this.status);

        this.tarefasServico.alterarTarefa(this.tarefa).pipe(
            tap(response => {
                this.limparCampos();
                this.errorMessage = '';
                this.tarefaAlterada.emit();
            })).subscribe({
            next: (response) => {

            },
            error: (error) => {
              if (error.error && Array.isArray(error.error) && error.error.length > 0) {
                this.errorMessage = error.error.message; 
              } else {
                this.errorMessage = 'Ocorreu um erro ao alterar a tarefa. Tente novamente.'; 
              }
            }
          });
    }
      
    limparCampos() {
        this.titulo = '';
        this.descricao = '';
        this.dataTarefa = null;
        this.status = 0;
      }
}