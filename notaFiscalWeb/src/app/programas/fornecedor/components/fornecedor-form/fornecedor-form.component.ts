import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { FornecedorService } from '../../service/fornecedor.service';
import { FornecedorEvent } from '../../model/event/enum/FornecedorEvent';
import { DatePipe } from '@angular/common';

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
    email:[''],
    telefone: [''],
    cnpj: [''],
    databaixa: [''],
    situacao: [true, Validators.required]
  });

  constructor(
    private formBuilder: FormBuilder,
    private fornecedorService: FornecedorService,
    public router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private datePipe: DatePipe
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

      // Obter a data do formulário, que pode ser uma string ou um objeto Date
      let databaixaString = this.fornecedorForm.value.databaixa;

      // Verificar se 'databaixa' é uma string ou um objeto Date
      if (databaixaString instanceof Date) {
        // Se for um objeto Date, converta para o formato 'yyyy-MM-dd'
        const year = databaixaString.getFullYear();
        const month = String(databaixaString.getMonth() + 1).padStart(2, '0');
        const day = String(databaixaString.getDate()).padStart(2, '0');
        databaixaString = `${year}-${month}-${day}`;  // Exemplo: '2025-03-14'
      } else if (typeof databaixaString === 'string') {
        // Se for uma string no formato 'dd/MM/yyyy', converta para 'yyyy-MM-dd'
        const [day, month, year] = databaixaString.split('/'); // 'dd/MM/yyyy'
        databaixaString = `${year}-${month}-${day}`;  // 'yyyy-MM-dd'
      }

      const fornecedorData = {
        razaosocial: this.fornecedorForm.value.razaosocial as string,
        email: this.fornecedorForm.value.email as string,
        telefone: this.fornecedorForm.value.telefone as string,
        cnpj: this.fornecedorForm.value.cnpj as string,
        databaixa: databaixaString, // Enviar no formato 'yyyy-MM-dd' como string
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
    const formattedDate = this.datePipe.transform(fornecedor_databaixa, 'dd/MM/yyyy');
    this.fornecedorForm.setValue({
      razaosocial: fornecedor_razaosocial,
      email: fornecedor_email,
      telefone: fornecedor_telefone,
      cnpj: fornecedor_cnpj,
      databaixa: formattedDate, // Exibindo a data formatada
      situacao: fornecedor_situacao === 'ATIVO'
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
