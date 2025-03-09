import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produto, ProdutoRequest } from '../model/produto.model';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  private readonly API_URL = environment.API_URL;

  constructor(private http: HttpClient) {}

  listarTodosProdutos(): Observable<Produto[]> {
    return this.http.get<Produto[]>(`${this.API_URL}/produto`);
  }

  criarProduto(produtoRequest: ProdutoRequest): Observable<Produto> {
    return this.http.post<Produto>(`${this.API_URL}/produto`, produtoRequest, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    });
  }

  atualizarProduto(id: number, produtoRequest: ProdutoRequest): Observable<Produto> {
    return this.http.put<Produto>(`${this.API_URL}/produto/${id}`, produtoRequest, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    });
  }

  deletarProduto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/produto/${id}`);
  }
}
