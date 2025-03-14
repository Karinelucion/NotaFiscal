import { EnderecoUtilService } from './../../../../../utils/endereco/enderecoutil.service';
import { Fornecedor } from './../../../../fornecedor/model/fornecedor.model';
import { FornecedorService } from './../../../../fornecedor/service/fornecedor.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { NotafiscalEvent } from '../../../model/event/enum/NotafiscalEvent';
import { NotafiscalService } from '../../../service/notafiscal.service';
import {
  Itens,
  ItensRequest,
  NotafiscalRequest,
} from '../../../model/notafiscal.model';
import { Produto } from 'src/app/programas/produto/model/produto.model';
import { ProdutoService } from 'src/app/programas/produto/service/produto.service';
import { EnderecoService } from 'src/app/programas/endereco/endereco.service';
import { DateService } from 'src/app/utils/date/date.service';
import { DatePipe } from '@angular/common';

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
    valortotalnota: [{ value: 0, disabled: true }],
    cep: [null, Validators.required],
    logradouro: [null, Validators.required],
    complemento: [null],
    bairro: [null],
    localidade: [null, Validators.required],
    uf: [null, Validators.required],
    numeroendereco: [null],
    fornecedor: [null],
  });
  public itensNotaFiscalForm = this.formBuilder.group({
    produto: [null, Validators.required],
    valortotal: [{ value: 0, disabled: true }, Validators.required],
    valorunitario: [null, Validators.required],
    quantidade: [1, Validators.required],
  });
  public fornecedores: Fornecedor[] = [];
  public produtos: Produto[] = [];
  public fornecedorSelecionado: any;
  public produtoSelecionado: any;
  public itens: ItensRequest[] = [];
  public itemEditado: {
    produto: Produto;
    valorunitario: string;
    quantidade: string;
    valortotal: string;
  } | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private notafiscalService: NotafiscalService,
    public router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private fornecedorService: FornecedorService,
    private produtoService: ProdutoService,
    private enderecoService: EnderecoService,
    private dateService: DateService,
    private enderecoUtilService: EnderecoUtilService
  ) {}

  ngOnInit(): void {
    const notafiscalId = this.route.snapshot.paramMap.get('id');

    if (notafiscalId) {
      this.notafiscalService
        .listaNotafiscalPorId(Number(notafiscalId))
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (notafiscal) => {
            this.setNotafiscal(
              notafiscal.numero,
              notafiscal.datahora,
              notafiscal.valortotalnota
                ? String(notafiscal.valortotalnota)
                : null,
              notafiscal.endereco.cep,
              notafiscal.endereco.logradouro,
              notafiscal.endereco.complemento,
              notafiscal.endereco.bairro,
              notafiscal.endereco.localidade,
              notafiscal.endereco.uf,
              notafiscal.endereco.numero,
              notafiscal.fornecedor,
              Array.isArray(notafiscal.itens)
                ? notafiscal.itens
                : [notafiscal.itens]
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
    if (this.notafiscalForm.valid) {
      const notafiscalId = this.route.snapshot.paramMap.get('id');

      const notafiscalData: NotafiscalRequest = {
        numero: this.notafiscalForm.value.numero,
        datahora: this.dateService.getDataHoraSemFuso(
          this.notafiscalForm,
          'datahora'
        ),
        valortotalnota: this.notafiscalForm.value.valortotalnota,
        endereco: {
          cep: this.enderecoUtilService.tiraFormatacaoCep(
            this.notafiscalForm.value.cep
          ),
          logradouro: this.notafiscalForm.value.logradouro,
          complemento: this.notafiscalForm.value.complemento,
          bairro: this.notafiscalForm.value.bairro,
          localidade: this.notafiscalForm.value.localidade,
          uf: this.notafiscalForm.value.uf,
          numero: this.notafiscalForm.value.numeroendereco,
        },
        fornecedorid: this.fornecedorSelecionado
          ? this.fornecedorSelecionado.id
          : this.notafiscalForm.value.fornecedor.id,
        itens: this.itens.map((item) => ({
          valorunitario: Number(item.valorunitario),
          quantidade: Number(item.quantidade),
          valortotal: Number(item.valortotal),
          produto: item.produto as Produto,
        })),
      };

      if (notafiscalId) {
        this.notafiscalService
          .atualizarNotafiscal(Number(notafiscalId), notafiscalData)
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: () => {
              this.messageService.add({
                severity: 'success',
                summary: 'Sucesso!',
                detail: 'Nota fiscal editada com sucesso!',
                life: 3000,
              });
              this.router.navigate(['/notafiscal/historico']);
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
              this.messageService.add({
                severity: 'success',
                summary: 'Sucesso!',
                detail: 'Nota fiscal criada com sucesso!',
                life: 3000,
              });
              this.notafiscalForm.reset();
              this.itens = [];
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
    notafiscal_valortotalnota: string | null,
    notafiscal_cep: string,
    notafiscal_logradouro: string,
    notafiscal_complemento: string,
    notafiscal_bairro: string,
    notafiscal_localidade: string,
    notafiscal_uf: string,
    notafiscal_numeroendereco: string,
    notafiscal_fornecedor: Fornecedor,
    notafiscal_itens: Itens[]
  ): void {
    this.carregaFornecedores();
    this.notafiscalForm.setValue({
      numero: notafiscal_numero,
      datahora: notafiscal_datahora ? new Date(notafiscal_datahora) : null,
      valortotalnota: notafiscal_valortotalnota || 0,
      cep: notafiscal_cep,
      logradouro: notafiscal_logradouro,
      complemento: notafiscal_complemento || null,
      bairro: notafiscal_bairro || null,
      localidade: notafiscal_localidade,
      uf: notafiscal_uf,
      numeroendereco: notafiscal_numeroendereco || null,
      fornecedor: notafiscal_fornecedor || null,
    });
    this.itens = notafiscal_itens;
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

  carregaProdutos(): void {
    this.produtoService
      .buscarProdutoAtivo()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (produtos) => {
          this.produtos = produtos;
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
      fornecedor: this.fornecedorSelecionado,
    });
  }

  adicionarItem(): void {
    if (
      !this.validaSeItemJaAdicionado(
        this.itensNotaFiscalForm.value.produto as Produto
      )
    ) {
      if (this.itensNotaFiscalForm.valid) {
        const produto = this.itensNotaFiscalForm.value.produto;
        const valorunitario = this.itensNotaFiscalForm.value.valorunitario;
        const quantidade = this.itensNotaFiscalForm.value.quantidade;
        const valortotal = this.itensNotaFiscalForm.value.valortotal;

        this.itens.push({
          produto: produto,
          valorunitario: valorunitario,
          quantidade: quantidade,
          valortotal: valortotal,
        });

        this.calculaValorTotalNota();

        this.itensNotaFiscalForm.reset({ quantidade: 1 });
      } else {
        this.messageService.add({
          severity: 'warn',
          summary: 'Atenção!',
          detail: 'Preencha os campos obrigatórios!',
          life: 3000,
        });
      }
    }
  }

  excluirItem(item: {
    produto: Produto;
    valortotal: number;
    valorunitario: number;
    quantidade: number;
  }) {
    const index = this.itens.indexOf(item);
    if (index >= 0) {
      const itemRemovido = this.itens.splice(index, 1)[0];
      this.calculaValorTotalNota(itemRemovido.valortotal);
    }
  }

  editarItem(item: {
    produto: Produto;
    valortotal: string;
    valorunitario: string;
    quantidade: string;
  }) {
    this.itensNotaFiscalForm.setValue({
      produto: item.produto,
      valorunitario: item.valorunitario,
      quantidade: item.quantidade,
      valortotal: item.valortotal,
    });

    this.itemEditado = item;
  }

  salvarEdicao() {
    if (this.itemEditado) {
      const index = this.itens.findIndex(
        (existingItem) =>
          existingItem.produto.id === this.itemEditado?.produto.id
      );

      if (index >= 0) {
        this.itens[index] = {
          produto: this.itensNotaFiscalForm.value.produto,
          valorunitario: this.itensNotaFiscalForm.value.valorunitario,
          quantidade: this.itensNotaFiscalForm.value.quantidade,
          valortotal: this.itensNotaFiscalForm.value.valortotal,
        };

        this.calculaValorTotalNota();

        this.itensNotaFiscalForm.reset({ quantidade: 1 });
        this.itemEditado = null;
      }
    }
  }

  calculaValorTotalNota(valortotalItemRemovido?: number): void {
    let total = 0;

    if (valortotalItemRemovido) {
      total = this.notafiscalForm.value.valortotalnota - valortotalItemRemovido;
    } else {
      this.itens.forEach((item) => {
        total += item.valortotal;
      });
    }

    this.notafiscalForm.patchValue({
      valortotalnota: total,
    });
  }

  onProdutoChange(): void {
    const produtoSelecionado = this.itensNotaFiscalForm.value.produto;

    if (produtoSelecionado) {
      if (produtoSelecionado.preco) {
        this.itensNotaFiscalForm.patchValue({
          valorunitario: produtoSelecionado.preco,
        });
      } else {
        this.itensNotaFiscalForm.patchValue({
          valorunitario: null,
        });
      }
    }
    this.calcularValorTotal();
  }

  calcularValorTotal(): void {
    const valorUnitario = this.itensNotaFiscalForm.value.valorunitario;
    const quantidade = this.itensNotaFiscalForm.value.quantidade;

    if (valorUnitario == null || quantidade == null) {
      this.itensNotaFiscalForm.patchValue({
        valortotal: 0,
      });
    }

    if (valorUnitario && quantidade) {
      const valorTotal = valorUnitario * quantidade;
      this.itensNotaFiscalForm.patchValue({
        valortotal: valorTotal,
      });
    }
  }

  buscaEnderecoPorCep() {
    this.enderecoService
      .buscaPorCep(
        this.enderecoUtilService.tiraFormatacaoCep(
          this.notafiscalForm.value.cep
        )
      )
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (endereco) => {
          this.notafiscalForm.patchValue({
            uf: endereco.uf,
            localidade: endereco.localidade,
            logradouro: endereco.logradouro,
          });
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

  validaSeItemJaAdicionado(produto: Produto): boolean {
    const itemJaAdicionado = this.itens.some(
      (item) => item.produto.id === produto.id
    );
    if (itemJaAdicionado) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Atenção',
        detail:
          'Não é possível incluir o mesmo produto duas vezes. Se necessário, altere o valor ou/e a quantidade do produto já adicionado',
        life: 3000,
      });
    }
    return itemJaAdicionado;
  }

  limparFormItens() {
    this.itensNotaFiscalForm.reset({ quantidade: 1 });
    this.itemEditado = null;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
