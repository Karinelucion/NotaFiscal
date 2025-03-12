import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Notafiscal, NotafiscalRequest } from '../model/notafiscal.model';
@Injectable({
  providedIn: 'root'
})
export class NotafiscalService {
  private readonly API_URL = environment.API_URL;

  constructor(private http: HttpClient) {}

  listaNotafiscalServicePorId(id: number): Observable<Notafiscal> {
    return this.http.get<Notafiscal>(`${this.API_URL}/notafiscal/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  listarTodasNotasFiscais(): Observable<Notafiscal[]> {
    return this.http.get<Notafiscal[]>(`${this.API_URL}/notafiscal`).pipe(
      catchError(this.handleError)
    );
  }

  criarNotafiscal(notafiscalRequest: NotafiscalRequest): Observable<Notafiscal> {
    return this.http.post<Notafiscal>(`${this.API_URL}/notafiscal`, notafiscalRequest, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    }).pipe(
      catchError(this.handleError)
    );
  }

  atualizarNotafiscalo(id: number, notafiscalRequest: NotafiscalRequest): Observable<Notafiscal> {
    return this.http.put<Notafiscal>(`${this.API_URL}/notafiscal/${id}`, notafiscalRequest, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    }).pipe(
      catchError(this.handleError)
    );
  }

  deletarNotafiscal(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/notafiscal/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  buscarNotasFiscaisFiltro(numero: string): Observable<Notafiscal[]> {
    return this.http.get<Notafiscal[]>(`${this.API_URL}/notafiscal/pesquisar?numero=${numero}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Ocorreu um erro desconhecido.';

    if (error.error && Array.isArray(error.error.erros) && error.error.erros.length > 0) {
      errorMessage = error.error.erros[0].mensagem || 'Erro desconhecido.';
    }
    return throwError(() => new Error(errorMessage));
  }
}
