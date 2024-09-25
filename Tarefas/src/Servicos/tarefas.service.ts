import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment';

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
}
