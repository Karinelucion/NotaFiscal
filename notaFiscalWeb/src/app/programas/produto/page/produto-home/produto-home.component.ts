import { DeleteProdutoAction } from './../../model/event/DeleteProdutoAction';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ProdutoService } from '../../service/produto.service';
import { Router } from '@angular/router';
import { GetProdutosResponse } from '../../model/GetProdutoResponse';

@Component({
  selector: 'app-produto-home',
  templateUrl: './produto-home.component.html',
  styleUrls: [],
})
export class ProdutoHomeComponent implements OnDestroy, OnInit {
  private readonly destroy$: Subject<void> = new Subject();
  public produtosDatas: Array<GetProdutosResponse> = [];
  private ref!: DynamicDialogRef;

  constructor(
    private produtoService: ProdutoService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
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
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Erro ao buscar produtos',
            life: 3000,
          });
          this.router.navigate(['/']);
        },
      });
  }

  handleDeleteProdutoAction(event: DeleteProdutoAction): void {
    if (event) {
      this.confirmationService.confirm({
        message: `Confirma a exclusao do produto: ${event?.produto_descricao}`,
        header: 'Confirmacao de exclusao',
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
            this.messageService.add({
              severity: 'success',
              summary: 'Sucesso',
              detail: 'Produto removido com sucesso!',
              life: 3000,
            });
          },
          error: (err) => {
            console.log(err);
            this.getAllProdutos();
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: 'Erro ao deletar produtos',
              life: 3000,
            });
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
