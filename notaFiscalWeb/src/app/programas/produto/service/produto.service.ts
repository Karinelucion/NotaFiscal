import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produto, ProdutoRequest } from '../model/produto.model';
import { environment } from 'src/environments/environment.prod';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ErrorHandlerService } from 'src/app/error/error-handler.service';
@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  private readonly API_URL = environment.API_URL;

  constructor(private http: HttpClient, private errorHandlerService: ErrorHandlerService) {}

  listaProdutoPorId(id: number): Observable<Produto> {
    return this.http.get<Produto>(`${this.API_URL}/produto/${id}`).pipe(
      catchError(this.errorHandlerService.handleError)
    );
  }

  listarTodosProdutos(): Observable<Produto[]> {
    return this.http.get<Produto[]>(`${this.API_URL}/produto`).pipe(
      catchError(this.errorHandlerService.handleError)
    );
  }

  criarProduto(produtoRequest: ProdutoRequest): Observable<Produto> {
    return this.http.post<Produto>(`${this.API_URL}/produto`, produtoRequest, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    }).pipe(
      catchError(this.errorHandlerService.handleError)
    );
  }

  atualizarProduto(id: number, produtoRequest: ProdutoRequest): Observable<Produto> {
    return this.http.put<Produto>(`${this.API_URL}/produto/${id}`, produtoRequest, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    }).pipe(
      catchError(this.errorHandlerService.handleError)
    );
  }

  deletarProduto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/produto/${id}`).pipe(
      catchError(this.errorHandlerService.handleError)
    );
  }

  buscarProdutosFiltro(descricao: string): Observable<Produto[]> {
    return this.http.get<Produto[]>(`${this.API_URL}/produto/pesquisar?descricao=${descricao}`).pipe(
      catchError(this.errorHandlerService.handleError)
    );
  }

  buscarProdutoAtivo(): Observable<Produto[]> {
    return this.http.get<Produto[]>(`${this.API_URL}/produto/ativo`).pipe(
      catchError(this.errorHandlerService.handleError)
    );
  }

}
