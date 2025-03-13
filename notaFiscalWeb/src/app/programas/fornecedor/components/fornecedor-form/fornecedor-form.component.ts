import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { FornecedorService } from '../../service/fornecedor.service';
import { FornecedorEvent } from '../../model/event/enum/FornecedorEvent';
import { DatePipe } from '@angular/common';
import { DateService } from 'src/app/utils/date/date.service';

@Component({
  selector: 'app-fornecedor-form',
  templateUrl: './fornecedor-form.component.html',
  styleUrls: []
})
export class FornecedorFormComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject();

  public situacaoValor: boolean = true;
  public addFornecedorAction = FornecedorEvent.ADD_FORNECEDOR_ACTION;
  public editFornecedorAction = FornecedorEvent.EDIT_FORNECEDOR_ACTION;
  public fornecedorAction!: { event: FornecedorEvent };
  public fornecedorForm = this.formBuilder.group({
    razaosocial: ['', Validators.required],
    email:['', Validators.required],
    telefone: [null],
    cnpj: ['', Validators.required],
    databaixa: [null],
    situacao: [true, Validators.required]
  });

  constructor(
    private formBuilder: FormBuilder,
    private fornecedorService: FornecedorService,
    public router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private datePipe: DatePipe,
    private dateService: DateService
  ) {}

  ngOnInit(): void {
    const fornecedorId = this.route.snapshot.paramMap.get('id');

    if (fornecedorId) {
      this.fornecedorService.listaFornecedorPorId(Number(fornecedorId))
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (fornecedor) => {

            this.setFornecedor(fornecedor.razaosocial, fornecedor.email, fornecedor.telefone, fornecedor.cnpj, fornecedor.databaixa, fornecedor.situacao);
            this.fornecedorAction = { event: FornecedorEvent.EDIT_FORNECEDOR_ACTION };
          },
          error: (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: err.message,
              life: 3000
            });
          }
        });
    } else {
      this.fornecedorAction = { event: FornecedorEvent.ADD_FORNECEDOR_ACTION };
    }
  }

  handleSubmitFornecedorAction(): void {
    if (this.fornecedorForm?.value && this.fornecedorForm?.valid) {
      const fornecedorId = this.route.snapshot.paramMap.get('id');


      const fornecedorData = {
        razaosocial: this.fornecedorForm.value.razaosocial as string,
        email: this.fornecedorForm.value.email as string,
        telefone: this.fornecedorForm.value.telefone as string,
        cnpj: this.fornecedorForm.value.cnpj as string,
        databaixa: this.dateService.getDataSemHora(this.fornecedorForm, "databaixa"),
        situacao: this.fornecedorForm.value.situacao ? 'ATIVO' : 'INATIVO',
      };

      if (fornecedorId) {
        this.fornecedorService.atualizarFornecedor(Number(fornecedorId), fornecedorData)
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: () => {
              this.router.navigate(['/fornecedor']);
            },
            error: (err) => {
              this.messageService.add({
                severity: 'error',
                summary: 'Erro',
                detail: err.message,
                life: 3000
              });
            }
          });
      } else {
        this.fornecedorService.criarFornecedor(fornecedorData)
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: () => {
              this.fornecedorForm.reset();
              this.router.navigate(['/fornecedor']);
            },
            error: (err) => {
              this.messageService.add({
                severity: 'error',
                summary: 'Erro',
                detail: err.message,
                life: 3000
              });
            }
          });
      }
    }
  }


  setFornecedor(
    fornecedor_razaosocial: string,
    fornecedor_email: string,
    fornecedor_telefone: string,
    fornecedor_cnpj: string,
    fornecedor_databaixa: Date,
    fornecedor_situacao: string
  ) {

    this.fornecedorForm.setValue({
      razaosocial: fornecedor_razaosocial,
      email: fornecedor_email,
      telefone: fornecedor_telefone,
      cnpj: fornecedor_cnpj,
      databaixa: fornecedor_databaixa,
      situacao: fornecedor_situacao === 'ATIVO'
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
