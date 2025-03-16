import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { ErrorHandlerService } from 'src/app/error/error-handler.service';
import { environment } from 'src/environments/environment.prod';
import { Endereco } from '../notafiscal/model/notafiscal.model';

@Injectable({
  providedIn: 'root'
})
export class EnderecoService {
  private readonly API_URL = environment.API_URL;

  constructor(private http: HttpClient, private errorHandlerService: ErrorHandlerService) {}

  buscaPorCep(cep: string): Observable<Endereco>{
    return this.http.get<Endereco>(`${this.API_URL}/endereco/buscaporcep/${cep}`).pipe(
      catchError(this.errorHandlerService.handleError)
    );
  }
}
