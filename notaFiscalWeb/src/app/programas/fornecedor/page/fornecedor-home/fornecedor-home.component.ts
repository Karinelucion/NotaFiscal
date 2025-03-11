import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { GetFornecedorResponse } from '../../model/GetFornecedorResponse';
import { FornecedorService } from '../../service/fornecedor.service';
import { DeleteFornecedorAction } from '../../model/event/DeleteFornecedorAction';

@Component({
  selector: 'app-fornecedor-home',
  templateUrl: './fornecedor-home.component.html',
  styleUrls: [],
})
export class FornecedorHomeComponent implements OnDestroy, OnInit {
  private readonly destroy$: Subject<void> = new Subject();
  public fornecedoresDatas: Array<GetFornecedorResponse> = [];
  private ref!: DynamicDialogRef;

  constructor(
    private fornecedorService: FornecedorService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllFornecedores();
  }

  getAllFornecedores() {
    this.fornecedorService
      .listarTodosFornecedores()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          if (response.length > 0) {
            this.fornecedoresDatas = response;
          }
        },
        error: (err) => {
          console.log(err);
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Erro ao buscar fornecedores',
            life: 3000,
          });
          this.router.navigate(['/']);
        },
      });
  }

  handleDeleteFornecedorAction(event: DeleteFornecedorAction): void {
    if (event) {
      this.confirmationService.confirm({
        message: `Confirma a exclusao do fornecedor: ${event?.fornecedor_razaosocial}`,
        header: 'Confirmacao de exclusao',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Sim',
        rejectLabel: 'Nao',
        accept: () => this.deleteFornecedor(event?.fornecedor_id),
      });
    }
  }

  deleteFornecedor(fornecedor_id: string): void {
    if (fornecedor_id) {
      this.fornecedorService
        .deletarFornecedor(Number(fornecedor_id))
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            this.getAllFornecedores();
            this.messageService.add({
              severity: 'success',
              summary: 'Sucesso',
              detail: 'Fornecedor removido com sucesso!',
              life: 3000,
            });
          },
          error: (err) => {
            console.log(err);
            this.getAllFornecedores();
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: 'Erro ao deletar fornecedores',
              life: 3000,
            });
          },
        });
        this.getAllFornecedores();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
