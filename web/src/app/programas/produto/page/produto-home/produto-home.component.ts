import { DeleteProdutoAction } from './../../model/event/DeleteProdutoAction';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ProdutoService } from '../../service/produto.service';
import { Router } from '@angular/router';
import { GetProdutosResponse } from '../../model/GetProdutoResponse';
import { MensagemtoastService } from 'src/app/utils/mensagemtoast/mensagemtoast.service';

@Component({
  selector: 'app-produto-home',
  templateUrl: './produto-home.component.html',
  styleUrls: [],
})
export class ProdutoHomeComponent implements OnDestroy, OnInit {
  private readonly destroy$: Subject<void> = new Subject();
  public produtosDatas: Array<GetProdutosResponse> = [];

  constructor(
    private produtoService: ProdutoService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private mensagemService: MensagemtoastService
  ) {}

  ngOnInit(): void {
    this.getAllProdutos();
  }

  getAllProdutos() {
    this.produtoService
      .listarTodosProdutos()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          if (response.length > 0) {
            this.produtosDatas = response;
          }
        },
        error: (err) => {
          console.log(err);
          this.mensagemService.mensagemErroAoBuscar()
          this.router.navigate(['/']);
        },
      });
  }

  handleDeleteProdutoAction(event: DeleteProdutoAction): void {
    if (event) {
      this.confirmationService.confirm({
        message: `Confirma a exclusão do produto: ${event?.produto_descricao}?`,
        header: 'Confirmação de exclusão',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Sim',
        rejectLabel: 'Nao',
        accept: () => this.deleteProduto(event?.produto_id),
      });
    }
  }

  deleteProduto(produto_id: string): void {
    if (produto_id) {
      this.produtoService
        .deletarProduto(Number(produto_id))
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            this.getAllProdutos();
            this.mensagemService.mensagemSucessoAoRemover()
          },
          error: (err) => {
            console.log(err);
            this.getAllProdutos();
            this.mensagemService.mensagemErro(err)
          },
        });
        this.getAllProdutos();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
