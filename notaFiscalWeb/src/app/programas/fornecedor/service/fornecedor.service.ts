import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Fornecedor, FornecedorRequest } from '../model/fornecedor.model';
import { environment } from 'src/environments/environment.prod';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FornecedorService {
  private readonly API_URL = environment.API_URL;

  constructor(private http: HttpClient) {}

  listaFornecedorPorId(id: number): Observable<Fornecedor> {
    return this.http.get<Fornecedor>(`${this.API_URL}/fornecedor/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  listarTodosFornecedores(): Observable<Fornecedor[]> {
    return this.http.get<Fornecedor[]>(`${this.API_URL}/fornecedor`).pipe(
      catchError(this.handleError)
    );
  }

  criarFornecedor(fornecedorRequest: FornecedorRequest): Observable<Fornecedor> {
    return this.http.post<Fornecedor>(`${this.API_URL}/fornecedor`, fornecedorRequest, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    }).pipe(
      catchError(this.handleError)
    );
  }

  atualizarFornecedor(id: number, fornecedorRequest: FornecedorRequest): Observable<Fornecedor> {
    return this.http.put<Fornecedor>(`${this.API_URL}/fornecedor/${id}`, fornecedorRequest, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    }).pipe(
      catchError(this.handleError)
    );
  }

  deletarFornecedor(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/fornecedor/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  buscarFornecedoresFiltro(descricao: string): Observable<Fornecedor[]> {
    return this.http.get<Fornecedor[]>(`${this.API_URL}/fornecedor/pesquisar?descricao=${descricao}`).pipe(
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
