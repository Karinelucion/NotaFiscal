import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { GetAllProdutosResponse } from './../../model/GetAllProdutosResponse';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ProdutoService } from '../../service/produto.service';
import { Router } from '@angular/router';
import { GetProdutosResponse } from '../../model/GetProdutoResponse';
import { EventAction } from '../../model/event/EventAction';
import { ProdutoFormComponent } from '../../components/produto-form/produto-form.component';

@Component({
  selector: 'app-produto-home',
  templateUrl: './produto-home.component.html',
  styleUrls: ['./produto-home.component.css']
})
export class ProdutoHomeComponent implements OnDestroy, OnInit {
  private readonly destroy$: Subject<void> = new Subject()
  public produtosDatas: Array<GetProdutosResponse> = []
  private ref!: DynamicDialogRef

  constructor(
    private produtoService: ProdutoService,
    private dialogService: DialogService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAllProdutos();
  }

  getAllProdutos() {
    this.produtoService.listarTodosProdutos()
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (response) => {
        if (response.length > 0) {
          this.produtosDatas = response;

        }
      }, error: (err) => {
        console.log(err);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao buscar produtos',
          life: 3000
        })
        this.router.navigate(['/'])
      }
    })
  }

  handleProdutoAction(event: EventAction):void{
    if (event) {
      this.ref = this.dialogService.open(ProdutoFormComponent, {
        header: event?.action,
        width: '70%',
        contentStyle: {overflow: 'auto'},
        baseZIndex: 10000,
        // maximizable: true,
        data: {
          event: event,
        }
      })

      this.ref.onClose
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => this.getAllProdutos
      })
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }


}
