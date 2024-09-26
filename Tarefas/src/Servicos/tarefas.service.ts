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
  private URLbase = environment.apiURL +'/Tarefa';

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

  public getTarefas(): Observable<any[]> {
    return this.http.get<any[]>(this.URLbase);
  }
}
