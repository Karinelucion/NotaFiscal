import { ConfirmationService, MessageService } from 'primeng/api';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { NotafiscalService } from '../../../service/notafiscal.service';
import { GetNotafiscalResponse } from '../../../model/GetNotafiscalResponse';
import { DeleteNotafiscalAction } from '../../../model/event/DeleteNotafiscalAction';
import { MensagemtoastService } from 'src/app/utils/mensagemtoast/mensagemtoast.service';

@Component({
  selector: 'app-historico-home',
  templateUrl: './historico-home.component.html',
  styleUrls: [],
})
export class HistoricoHomeComponent implements OnDestroy, OnInit {
  private readonly destroy$: Subject<void> = new Subject();
  public notasfiscaisDatas: Array<GetNotafiscalResponse> = [];

  constructor(
    private notafiscalService: NotafiscalService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private mensagemService: MensagemtoastService
  ) {
    
  }

  ngOnInit(): void {
    this.getAllNotasfiscais();


  }

  getAllNotasfiscais() {
    this.notafiscalService
      .listarTodasNotasFiscais()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          if (response.length > 0) {
            this.notasfiscaisDatas = response;
          }
        },
        error: (err) => {
          console.log(err);
          this.mensagemService.mensagemErroAoBuscar()
          this.router.navigate(['/']);
        },
      });
  }

  handleDeleteNotafiscalAction(event: DeleteNotafiscalAction): void {
    if (event) {
      this.confirmationService.confirm({
        message: `Confirma a exclusao do historico: ${event?.notafiscal_numero}`,
        header: 'Confirmacao de exclusao',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Sim',
        rejectLabel: 'Nao',
        accept: () => this.deleteNotafiscal(event?.notafiscal_id),
      });
    }
  }

  deleteNotafiscal(notafiscal_id: string): void {
    if (notafiscal_id) {
      this.notafiscalService
        .deletarNotafiscal(Number(notafiscal_id))
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            this.getAllNotasfiscais();
            this.mensagemService.mensagemSucessoAoRemover()

          },
          error: (err) => {
            console.log(err);
            this.getAllNotasfiscais();
            this.mensagemService.mensagemErro(err)
          },
        });
        this.getAllNotasfiscais();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
