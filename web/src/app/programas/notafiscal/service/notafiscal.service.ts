import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { catchError } from 'rxjs/operators';
import { Notafiscal, NotafiscalRequest } from '../model/notafiscal.model';
import { ErrorHandlerService } from 'src/app/error/error-handler.service';
@Injectable({
  providedIn: 'root'
})
export class NotafiscalService {
  private readonly API_URL = environment.API_URL;

  constructor(private http: HttpClient, private errorHandlerService: ErrorHandlerService ) {}

  listaNotafiscalPorId(id: number): Observable<Notafiscal> {
    return this.http.get<Notafiscal>(`${this.API_URL}/notafiscal/${id}`).pipe(
      catchError(this.errorHandlerService.handleError)
    );
  }

  listarTodasNotasFiscais(): Observable<Notafiscal[]> {
    return this.http.get<Notafiscal[]>(`${this.API_URL}/notafiscal`).pipe(
      catchError(this.errorHandlerService.handleError)
    );
  }

  criarNotafiscal(notafiscalRequest: NotafiscalRequest): Observable<Notafiscal> {
    return this.http.post<Notafiscal>(`${this.API_URL}/notafiscal`, notafiscalRequest, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    }).pipe(
      catchError(this.errorHandlerService.handleError)
    );
  }

  atualizarNotafiscal(id: number, notafiscalRequest: NotafiscalRequest): Observable<Notafiscal> {
    return this.http.put<Notafiscal>(`${this.API_URL}/notafiscal/${id}`, notafiscalRequest, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    }).pipe(
      catchError(this.errorHandlerService.handleError)
    );
  }

  deletarNotafiscal(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/notafiscal/${id}`).pipe(
      catchError(this.errorHandlerService.handleError)
    );
  }

  buscarNotasFiscaisFiltro(numero: string): Observable<Notafiscal[]> {
    return this.http.get<Notafiscal[]>(`${this.API_URL}/notafiscal/pesquisar?numero=${numero}`).pipe(
      catchError(this.errorHandlerService.handleError)
    );
  }
}
