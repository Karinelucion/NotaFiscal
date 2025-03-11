import { DeleteProdutoAction } from './../../model/event/DeleteProdutoAction';
import { EditProdutoAction } from './../../model/event/EditProdutoAction';
import { Component, Input } from '@angular/core';
import { GetProdutosResponse } from '../../model/GetProdutoResponse';
import { EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { ProdutoService } from '../../service/produto.service';

@Component({
  selector: 'app-produto-list',
  templateUrl: './produto-list.component.html',
  styleUrls: []
})

export class ProdutoListComponent{
  @Input() public produtos: Array<GetProdutosResponse> = []
  @Output() public produtoEvent = new EventEmitter<EditProdutoAction>();
  @Output() public deleteProdutoEvent = new EventEmitter<DeleteProdutoAction>()

  public produtoSelecionado!: GetProdutosResponse;
  controlePesquisa = new FormControl('');


  constructor(
    public router: Router,
    private produtoService: ProdutoService
    ){

      this.controlePesquisa.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(value => this.produtoService.buscarProdutosFiltro(value || ''))
      )
      .subscribe(produtos => this.produtos = produtos);
  }

  handleDeleteProdutoEvent(produto_id: string, produto_descricao: string): void{
    if(produto_id !== '' && produto_descricao !== ''){
      this.deleteProdutoEvent.emit({produto_id, produto_descricao})
    }
  }

  editarProduto(id: string) {
    this.router.navigate(['/produto/editar', id]);
  }
}
