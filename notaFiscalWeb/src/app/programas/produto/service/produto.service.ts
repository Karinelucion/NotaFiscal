import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produto, ProdutoRequest } from '../model/produto.model';
import { environment } from 'src/environments/environment.prod';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  private readonly API_URL = environment.API_URL;

  constructor(private http: HttpClient) {}

  listaProdutoPorId(id: number): Observable<Produto> {
    return this.http.get<Produto>(`${this.API_URL}/produto/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  listarTodosProdutos(): Observable<Produto[]> {
    return this.http.get<Produto[]>(`${this.API_URL}/produto`).pipe(
      catchError(this.handleError)
    );
  }

  criarProduto(produtoRequest: ProdutoRequest): Observable<Produto> {
    return this.http.post<Produto>(`${this.API_URL}/produto`, produtoRequest, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    }).pipe(
      catchError(this.handleError)
    );
  }

  atualizarProduto(id: number, produtoRequest: ProdutoRequest): Observable<Produto> {
    return this.http.put<Produto>(`${this.API_URL}/produto/${id}`, produtoRequest, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    }).pipe(
      catchError(this.handleError)
    );
  }

  deletarProduto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/produto/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  buscarProdutosFiltro(descricao: string): Observable<Produto[]> {
    return this.http.get<Produto[]>(`${this.API_URL}/produto/pesquisar?descricao=${descricao}`).pipe(
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
