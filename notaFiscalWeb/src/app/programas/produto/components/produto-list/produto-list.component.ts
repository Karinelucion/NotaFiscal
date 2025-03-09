import { DeleteProdutoAction } from './../../model/event/DeleteProdutoAction';
import { EditProdutoAction } from './../../model/event/EditProdutoAction';
import { Component, Input } from '@angular/core';
import { GetProdutosResponse } from '../../model/GetProdutoResponse';
import { EventEmitter, Output } from '@angular/core';
import { ProdutoEvent } from '../../model/event/enum/ProdutoEvent';

@Component({
  selector: 'app-produto-list',
  templateUrl: './produto-list.component.html',
  styleUrls: []
})

export class ProdutoListComponent{
  @Input() public produtos: Array<GetProdutosResponse> = []
  @Output() public produtoEvent = new EventEmitter<DeleteProdutoAction>();
  @Output() public deleteProdutoEvent = new EventEmitter<DeleteProdutoAction>()

  public produtoSelecionado!: GetProdutosResponse;
  public addProdutoAction = ProdutoEvent.ADD_PRODUTO_ACTION;
  public editProdutoAction = ProdutoEvent.EDIT_PRODUTO_ACTION;

  // handleDeleteProdutoEvent(produto_id: string, produto_descricao: string): void{
  //   if(produto_id !== '' && produto_descricao !== ''){
  //     this.deleteProdutoEvent.emit({produto_id, produto_descricao})
  //   }
  // }

  // handleProdutoEvent(action?: string, id?: string, produtoDescricao?: string): void{
  //   if(action && action !== ''){
  //     this.produtoEvent.emit({action, id, produtoDescricao})
  //   }
  // }
}
