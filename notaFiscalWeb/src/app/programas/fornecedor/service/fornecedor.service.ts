import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Fornecedor, FornecedorRequest } from '../model/fornecedor.model';
import { environment } from 'src/environments/environment.prod';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ErrorHandlerService } from 'src/app/error/error-handler.service';
@Injectable({
  providedIn: 'root'
})
export class FornecedorService {
  private readonly API_URL = environment.API_URL;

  constructor(private http: HttpClient, private errorHandlerService: ErrorHandlerService) {}

  listaFornecedorPorId(id: number): Observable<Fornecedor> {
    return this.http.get<Fornecedor>(`${this.API_URL}/fornecedor/${id}`).pipe(
      catchError(this.errorHandlerService.handleError)
    );
  }

  listarTodosFornecedores(): Observable<Fornecedor[]> {
    return this.http.get<Fornecedor[]>(`${this.API_URL}/fornecedor`).pipe(
      catchError(this.errorHandlerService.handleError)
    );
  }

  criarFornecedor(fornecedorRequest: FornecedorRequest): Observable<Fornecedor> {
    return this.http.post<Fornecedor>(`${this.API_URL}/fornecedor`, fornecedorRequest, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    }).pipe(
      catchError(this.errorHandlerService.handleError)
    );
  }

  atualizarFornecedor(id: number, fornecedorRequest: FornecedorRequest): Observable<Fornecedor> {
    return this.http.put<Fornecedor>(`${this.API_URL}/fornecedor/${id}`, fornecedorRequest, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    }).pipe(
      catchError(this.errorHandlerService.handleError)
    );
  }

  deletarFornecedor(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/fornecedor/${id}`).pipe(
      catchError(this.errorHandlerService.handleError)
    );
  }

  buscarFornecedoresFiltro(descricao: string): Observable<Fornecedor[]> {
    return this.http.get<Fornecedor[]>(`${this.API_URL}/fornecedor/pesquisar?descricao=${descricao}`).pipe(
      catchError(this.errorHandlerService.handleError)
    );
  }

  buscarFornecedorAtivo(): Observable<Fornecedor[]> {
    return this.http.get<Fornecedor[]>(`${this.API_URL}/fornecedor/ativo`).pipe(
      catchError(this.errorHandlerService.handleError)
    );
  }
}
