import { DeleteFornecedorAction } from '../../model/event/DeleteFornecedorAction';
import { EditFornecedorAction } from '../../model/event/EditFornecedorAction';
import { Component, Input } from '@angular/core';
import { GetFornecedorResponse } from '../../model/GetFornecedorResponse';
import { EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { FornecedorService } from '../../service/fornecedor.service';
import { Situacao } from '../../model/fornecedor.model';

@Component({
  selector: 'app-fornecedor-list',
  templateUrl: './fornecedor-list.component.html',
  styleUrls: []
})

export class FornecedorListComponent{
  @Input() public fornecedores: Array<GetFornecedorResponse> = []
  @Output() public fornecedorEvent = new EventEmitter<EditFornecedorAction>();
  @Output() public deleteFornecedorEvent = new EventEmitter<DeleteFornecedorAction>()

  public fornecedorSelecionado!: GetFornecedorResponse;
  controlePesquisa = new FormControl('');
  private situacaoEnum = Situacao;

  constructor(
    public router: Router,
    private fornecedorService: FornecedorService
    ){

      this.controlePesquisa.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(value => this.fornecedorService.buscarFornecedoresFiltro(value || ''))
      )
      .subscribe(fornecedores => this.fornecedores = fornecedores);
  }

  handleDeleteFornecedorEvent(fornecedor_id: string, fornecedor_razaosocial: string): void{
    if(fornecedor_id !== '' && fornecedor_razaosocial !== ''){
      this.deleteFornecedorEvent.emit({fornecedor_id, fornecedor_razaosocial})
    }
  }

  editarFornecedor(id: string) {
    this.router.navigate(['/fornecedor/editar', id]);
  }

  getSituacaoLabel(situacao: string): string {
    return Situacao[situacao as keyof typeof Situacao] || situacao;  }
}
