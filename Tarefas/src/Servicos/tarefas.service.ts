import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TarefasService {

  constructor() { }

  private http = inject(HttpClient);
  private URLbase = environment.apiURL + '/Tarefa';
  
  public ObterTarefas(pagina: number, titulo: string , descricao: string, dataTarefa: string, status: string )
  {
    let params = new HttpParams()
      .set('pagina', pagina.toString())
      .set('titulo', titulo)
      .set('descricao', descricao)
      .set('status', status);
    
      if (dataTarefa) {
        params = params.set('dataTarefa', dataTarefa);
      }
  
    return this.http.get<any>(this.URLbase, { params })
  }

  public adicionarTarefa(tarefa: any): Observable<any> {

    if (tarefa.status == 'Pendente') tarefa.status = 0
    if (tarefa.status == 'Concluida') tarefa.status = 1

    return this.http.post(this.URLbase, tarefa);
  }
 
  public alterarTarefa(tarefa: any): Observable<any>
  {

    if (tarefa.status === 'Pendente') {
      tarefa.status = 0; 
    } else if (tarefa.status === 'Concluída') {
      tarefa.status = 1; 
    }   

    return this.http.put(`${this.URLbase}/${tarefa.id}`, tarefa, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  public alterarStatusTarefa(id: number, status: string): Observable<any>
  {
    const statusMap: { [key: string]: string } = {
      'Pendente': '0',
      'Concluida': '1'
    };
  
    const novoStatus = statusMap[status];

    if (novoStatus === undefined) {
      throw new Error("Status inválido");
    }
    
    return this.http.patch(`${this.URLbase}/${id}`, novoStatus, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  public excluirTarefa( id: number): Observable<any> {

    return this.http.delete(`${this.URLbase}/${id}`);
  }

  public obterTarefaPorId(id: number): Observable<any> {
    return this.http.get<any>(`${this.URLbase}/${id}`);
  }

  public getTarefas(): Observable<any[]> {
    return this.http.get<any[]>(this.URLbase);
  }
}
