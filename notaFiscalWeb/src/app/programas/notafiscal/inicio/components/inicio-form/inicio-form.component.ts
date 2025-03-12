import { Fornecedor } from './../../../../fornecedor/model/fornecedor.model';
import { FornecedorService } from './../../../../fornecedor/service/fornecedor.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { NotafiscalEvent } from '../../../model/event/enum/NotafiscalEvent';
import { NotafiscalService } from '../../../service/notafiscal.service';
import { Itens } from '../../../model/notafiscal.model';
import { Produto } from 'src/app/programas/produto/model/produto.model';

@Component({
  selector: 'app-inicio-form',
  templateUrl: './inicio-form.component.html',
  styleUrls: [],
})
export class InicioFormComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject();

  public situacaoValor: boolean = true;
  public addNotafiscalAction = NotafiscalEvent.ADD_NOTAFISCAL_ACTION;
  public editNotafiscalAction = NotafiscalEvent.EDIT_NOTAFISCAL_ACTION;
  public notafiscalAction!: { event: NotafiscalEvent };
  public notafiscalForm = this.formBuilder.group({
    numero: [null, Validators.required],
    datahora: [null],
    valortotalnota: [null],
    cep: [null, Validators.required],
    logradouro: [null, Validators.required],
    complemento: [null, Validators.required],
    bairro: [null, Validators.required],
    localidade: [null, Validators.required],
    uf: [null, Validators.required],
    numeroendereco: [null, Validators.required],
    fornecedor: [null],
    produto: [null],
    valortotal: [null],
    valorunitario: [null],
    quantidade: 1,

  });
  public fornecedores: Fornecedor[] = [];
  public produtos: Produto[] = [];
  public fornecedorSelecionado: any;

  public itens = [
    {
      produto: null,
      valorunitario: null,
      quantidade: null,
      valortotal: null,
    },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private notafiscalService: NotafiscalService,
    public router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private fornecedorService: FornecedorService
  ) {}

  ngOnInit(): void {
    const notafiscalId = this.route.snapshot.paramMap.get('id');

    if (notafiscalId) {
      this.notafiscalService
        .listaNotafiscalServicePorId(Number(notafiscalId))
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (notafiscal) => {
            this.setNotafiscal(
              notafiscal.numero,
              notafiscal.datahora,
              notafiscal.valortotal ? String(notafiscal.valortotal) : null,
              notafiscal.endereco.id,
              notafiscal.fornecedor.id,
              notafiscal.itens
            );
            this.notafiscalAction = {
              event: NotafiscalEvent.EDIT_NOTAFISCAL_ACTION,
            };
          },
          error: (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: err.message,
              life: 3000,
            });
          },
        });
    } else {
      this.notafiscalAction = { event: NotafiscalEvent.ADD_NOTAFISCAL_ACTION };
    }
  }

  handleSubmitNotafiscalAction(): void {
    if (this.notafiscalForm?.value && this.notafiscalForm?.valid) {
      const notafiscalId = this.route.snapshot.paramMap.get('id');
      const notafiscalData = {
        numero: this.notafiscalForm.value.numero,
        datahora: this.notafiscalForm.value.datahora,
        valortotal: this.notafiscalForm.value.valortotal,
        enderecoid: this.notafiscalForm.value.endereco.id,
        fornecedorid: this.fornecedorSelecionado.id,
        itens: this.notafiscalForm.value.itens.id,
      };

      if (notafiscalId) {
        this.notafiscalService
          .atualizarNotafiscalo(Number(notafiscalId), notafiscalData)
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: () => {
              this.router.navigate(['/notafiscal']);
            },
            error: (err) => {
              this.messageService.add({
                severity: 'error',
                summary: 'Erro',
                detail: err.message,
                life: 3000,
              });
            },
          });
      } else {
        this.notafiscalService
          .criarNotafiscal(notafiscalData)
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: () => {
              this.notafiscalForm.reset();
              this.router.navigate(['/notafiscal']);
            },
            error: (err) => {
              this.messageService.add({
                severity: 'error',
                summary: 'Erro',
                detail: err.message,
                life: 3000,
              });
            },
          });
      }
    }
  }

  setNotafiscal(
    notafiscal_numero: string,
    notafiscal_datahora: Date,
    notafiscal_valortotal: string | null,
    notafiscal_endereco: number,
    notafiscal_fornecedor: number,
    notafiscal_itens: Itens
  ) {
    this.notafiscalForm.setValue({
      numero: notafiscal_numero,
      datahora: notafiscal_datahora,
      valortotal: notafiscal_valortotal,
      endereco: notafiscal_endereco,
      fornecedor: notafiscal_fornecedor,
      itens: notafiscal_itens,
    });
  }

  carregaFornecedores(): void {
    this.fornecedorService
      .buscarFornecedorAtivo()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (fornecedores) => {
          this.fornecedores = fornecedores;
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: err.message,
            life: 3000,
          });
        },
      });
  }

  onFornecedorChange(): void {
    this.notafiscalForm.patchValue({
      fornecedor: this.fornecedorSelecionado
    });
  }

  adicionarItem(): void {
    this.itens.push({
      produto: null,
      valorunitario: null,
      quantidade: null,
      valortotal: null,
    });
  }

  // Método para excluir um item da tabela
  excluirItem(index: number): void {
    if (this.itens.length > 1) {
      this.itens.splice(index, 1);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
