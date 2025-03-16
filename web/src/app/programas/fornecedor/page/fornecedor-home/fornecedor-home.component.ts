import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { GetFornecedorResponse } from '../../model/GetFornecedorResponse';
import { FornecedorService } from '../../service/fornecedor.service';
import { DeleteFornecedorAction } from '../../model/event/DeleteFornecedorAction';
import { MensagemtoastService } from 'src/app/utils/mensagemtoast/mensagemtoast.service';

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
    private router: Router,
    private mensagemService: MensagemtoastService
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
          this.mensagemService.mensagemErroAoBuscar()

          this.router.navigate(['/']);
        },
      });
  }

  handleDeleteFornecedorAction(event: DeleteFornecedorAction): void {
    if (event) {
      this.confirmationService.confirm({
        message: `Confirma a exclusão do fornecedor: ${event?.fornecedor_razaosocial}?`,
        header: 'Confirmação de exclusão',
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
            this.mensagemService.mensagemErro(err)
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
