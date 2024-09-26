import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { TarefasService } from '../../Servicos/tarefas.service';

@Component({
    selector: 'app-nova-tarefa',
    standalone: true,
    templateUrl: './nova-tarefa.component.html',
    styleUrls: ['./nova-tarefa.component.css'],
    imports: [FormsModule, CommonModule]
})
export class NovaTarefaComponent {
    tarefasServico = inject(TarefasService);
    titulo: string = '';
    descricao: string = '';
    dataTarefa: Date | null = null;
    status: string = 'Pendente';
    errorMessage: string = '';

    @Output() tarefaAdicionada = new EventEmitter<void>();

    constructor(private tarefaService: TarefasService) {}
       
    AdicionarTarefa()
    {
        const novaTarefa = {
            titulo: this.titulo,
            descricao: this.descricao,
            dataTarefa: this.dataTarefa,
            status: this.status
        };
        
        this.tarefasServico.adicionarTarefa(novaTarefa).pipe(
            tap(response => {
                console.log('Tarefa adicionada com sucesso:', response);
                this.limparCampos();
                this.errorMessage = '';
                this.tarefaAdicionada.emit();
            })
          ).subscribe({
            next: (response) => {
              // Se precisar lidar com a resposta aqui
            },
            error: (error) => {
              console.error('Erro ao adicionar tarefa:', error);
              
              // Verifica se a API retornou uma mensagem de erro
              if (error.error && Array.isArray(error.error) && error.error.length > 0) {
                this.errorMessage = error.error.message; // Usa a mensagem de erro retornada pela API
              } else {
                this.errorMessage = 'Ocorreu um erro ao adicionar a tarefa. Tente novamente.'; // Mensagem padrão
              }
            }
          });
    }
    
    limparCampos() {
        this.titulo = '';
        this.descricao = '';
        this.dataTarefa = null;
        this.status = 'Pendente';
      }
}