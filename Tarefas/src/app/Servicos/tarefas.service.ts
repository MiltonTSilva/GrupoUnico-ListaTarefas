import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TarefasService {

  constructor() { }

  private http = inject(HttpClient);
  private URLbase = environment.apiURL +'/Tarefa';

  public ObterTarefas()
  {
    return this.http.get<any>(this.URLbase)
  }
}
