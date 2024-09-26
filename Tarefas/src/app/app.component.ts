import { Component, inject, Input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TarefasService } from '../Servicos/tarefas.service';
import { CommonModule, DatePipe } from '@angular/common';
import { StatusPipe } from '../status.pipe'
import { NovaTarefaComponent } from '../app/Nova-Tarefa/nova-tarefa.component';
import { AlterarTarefaComponent } from '../app/Alterar-Tarefa/alterar-tarefa.component';
import { tap } from 'rxjs';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,StatusPipe,NovaTarefaComponent,AlterarTarefaComponent, FormsModule,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  tarefasServico = inject(TarefasService);
  tarefas: any[] = [];
  @Input() tarefa: any = {
    id: 0,
    titulo: '',
    descricao: '',
    dataTarefa: '',
    status: ''
  };
  
  tarefaEmEdicao: any = null; 
  mostrarNovaTarefa = false;
  mostrarAlterarTarefa = false;
  errorMessage: string = '';

  id: number | null = null;
  pagina = 1;
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

 /*  selecionarTarefa(id: number) {
    this.tarefasServico.setTarefaId(id);
    // Você pode navegar para o componente de detalhes, se necessário
  } */

  onCheckboxChange(event: any,id: number) {
    if (event.target.checked) {
      this.status = 'Concluida';
    } else {
      this.status = 'Pendente';
    }

    this.tarefa.status = this.status;
      
    this.tarefasServico.alterarStatusTarefa(id,this.tarefa.status).pipe(
        tap(response => {
        })
      ).subscribe({
        next: (response) => {
          // Se precisar lidar com a resposta aqui
        },
        error: (error) => {
          
          // Verifica se a API retornou uma mensagem de erro
          if (error.error && Array.isArray(error.error) && error.error.length > 0) {
            this.errorMessage = error.error.message; // Usa a mensagem de erro retornada pela API
          } else {
            this.errorMessage = 'Ocorreu um erro ao adicionar a tarefa. Tente novamente.'; // Mensagem padrão
          }
        }
      });
      this.atualizarListaTarefas();
  }
  
  toggleNovaTarefa() {
    this.mostrarNovaTarefa = !this.mostrarNovaTarefa; 
  }

  toggleAlterarTarefa() {
    this.mostrarAlterarTarefa = !this.mostrarAlterarTarefa; 
  }

  abrirFormularioEdicao(tarefa: any) {
    this.tarefaEmEdicao = tarefa; 
  }

  removerTarefa(tarefa: any) {
    
    this.tarefasServico.excluirTarefa(tarefa.id).subscribe({
      next: (response) => {

      },
      error: (error) => {
        
        
        if (error.error && Array.isArray(error.error) && error.error.length > 0) {
          this.errorMessage = error.error.message; 
        } else {
          this.errorMessage = 'Ocorreu um erro ao adicionar a tarefa. Tente novamente.'; 
        }
      }
    });

    this.atualizarListaTarefas();
  
  }

  fecharFormularioEdicao() {
    this.tarefaEmEdicao = null; 
  }
  fecharFormulario() {
    this.mostrarAlterarTarefa = false;
    this.tarefaEmEdicao = null; 
  }

  atualizarListaTarefas() {
    this.tarefasServico.ObterTarefas(this.pagina, this.titulo, this.descricao, this.dataAtual, this.status)
        .subscribe(tarefas => {
          this.tarefas = tarefas;
        });

    
    this.fecharFormulario();
    
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
