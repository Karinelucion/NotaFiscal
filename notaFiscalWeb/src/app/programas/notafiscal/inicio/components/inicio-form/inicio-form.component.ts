import { Fornecedor } from './../../../../fornecedor/model/fornecedor.model';
import { FornecedorService } from './../../../../fornecedor/service/fornecedor.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { NotafiscalEvent } from '../../../model/event/enum/NotafiscalEvent';
import { NotafiscalService } from '../../../service/notafiscal.service';
import { Itens, ItensRequest, NotafiscalRequest } from '../../../model/notafiscal.model';
import { Produto } from 'src/app/programas/produto/model/produto.model';
import { ProdutoService } from 'src/app/programas/produto/service/produto.service';
import { EnderecoService } from 'src/app/programas/endereco/endereco.service';

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
    valortotalnota: [0],
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
    valortotal: [null, Validators.required],
    valorunitario: [null, Validators.required],
    quantidade: [1, Validators.required],
  });
  public fornecedores: Fornecedor[] = [];
  public produtos: Produto[] = [];
  public fornecedorSelecionado: any;
  public produtoSelecionado: any;

  public itens: ItensRequest[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private notafiscalService: NotafiscalService,
    public router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private fornecedorService: FornecedorService,
    private produtoService: ProdutoService,
    private enderecoService: EnderecoService
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
              Array.isArray(notafiscal.itens) ? notafiscal.itens : [notafiscal.itens] 
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
        datahora: new Date(this.notafiscalForm.value.datahora), // Convertendo para Date, se necessário
        valortotalnota: this.notafiscalForm.value.valortotalnota,
        enderecoid: this.notafiscalForm.value.endereco,  // ID do endereço
        fornecedorid: this.fornecedorSelecionado ? this.fornecedorSelecionado.id : this.notafiscalForm.value.fornecedor.id,  // Verifica se o fornecedor foi selecionado
        itens: this.itens.map(item => ({
          valorunitario: Number(item.valorunitario) ,
          quantidade: Number(item.quantidade),
          valortotal: Number(item.valortotal),
          produto: item.produto as Produto,
        }))
      };

      if (notafiscalId) {
        // Editar nota fiscal
        this.notafiscalService
          .atualizarNotafiscal(Number(notafiscalId), notafiscalData)
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: () => {
              this.messageService.add({
                severity: 'success',
                summary: 'Sucesso!',
                detail: 'Nota fiscal editada com sucesso!',
                life: 3000
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
        // Criar nova nota fiscal
        this.notafiscalService
          .criarNotafiscal(notafiscalData)
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: () => {
              this.messageService.add({
                severity: 'success',
                summary: 'Sucesso!',
                detail: 'Nota fiscal criada com sucesso!',
                life: 3000
              });
              this.notafiscalForm.reset();
              this.itens = [];  // Limpar a lista de itens
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


  // handleSubmitNotafiscalAction(): void {
  //    if (this.notafiscalForm.valid){
  //     const notafiscalId = this.route.snapshot.paramMap.get('id');
  //     const notafiscalData = {
  //       numero: this.notafiscalForm.value.numero,
  //       datahora: this.notafiscalForm.value.datahora,
  //       valortotalnota: this.notafiscalForm.value.valortotal,
  //       enderecoid: this.notafiscalForm.value.endereco.id,
  //       fornecedorid: this.fornecedorSelecionado.id,
  //       itens: this.notafiscalForm.value.itens.id,
  //     };

  //     if (notafiscalId) {
  //       this.notafiscalService
  //         .atualizarNotafiscal(Number(notafiscalId), notafiscalData)
  //         .pipe(takeUntil(this.destroy$))
  //         .subscribe({
  //           next: () => {
  //             this.messageService.add({
  //               severity: 'success',
  //               summary: 'Sucesso!',
  //               detail: 'Nota fiscal editada com sucesso!',
  //               life: 3000
  //             })
  //             this.router.navigate(['/notafiscal/historico']);
  //           },
  //           error: (err) => {
  //             this.messageService.add({
  //               severity: 'error',
  //               summary: 'Erro',
  //               detail: err.message,
  //               life: 3000,
  //             });
  //           },
  //         });
  //     } else {
  //       this.notafiscalService
  //         .criarNotafiscal(notafiscalData)
  //         .pipe(takeUntil(this.destroy$))
  //         .subscribe({
  //           next: () => {
  //             this.messageService.add({
  //               severity: 'success',
  //               summary: 'Sucesso!',
  //               detail: 'Nota fiscal criada com sucesso!',
  //               life: 3000
  //             })
  //             this.notafiscalForm.reset();
  //           },
  //           error: (err) => {
  //             this.messageService.add({
  //               severity: 'error',
  //               summary: 'Erro',
  //               detail: err.message,
  //               life: 3000,
  //             });
  //           },
  //         });
  //     }
  //   }
  // }

  // setNotafiscal(
  //   notafiscal_numero: string,
  //   notafiscal_datahora: Date,
  //   notafiscal_valortotal: string | null,
  //   notafiscal_endereco: number,
  //   notafiscal_fornecedor: number,
  //   notafiscal_itens: Itens
  // ) {
  //   this.notafiscalForm.setValue({
  //     numero: notafiscal_numero,
  //     datahora: notafiscal_datahora,
  //     valortotal: notafiscal_valortotal,
  //     endereco: notafiscal_endereco,
  //     fornecedor: notafiscal_fornecedor,
  //     itens: notafiscal_itens,
  //   });
  // }

  setNotafiscal(
    notafiscal_numero: string,
    notafiscal_datahora: Date,
    notafiscal_valortotal: string | null,
    notafiscal_endereco: number,
    notafiscal_fornecedor: number,
    notafiscal_itens: Itens[]
  ): void {
    this.notafiscalForm.setValue({
      numero: notafiscal_numero,
      datahora: notafiscal_datahora,
      valortotalnota: notafiscal_valortotal,
      endereco: notafiscal_endereco,
      fornecedor: notafiscal_fornecedor,
      // Aqui, não estamos passando diretamente os itens, mas podemos carregá-los separadamente
    });

    // Aqui, vamos preencher a lista de itens
    this.itens = notafiscal_itens.map(item => ({
      produto: item.produto,
      valorunitario: item.valorunitario,
      quantidade: item.quantidade,
      valortotal: item.valortotal
    }));
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
    if (this.itensNotaFiscalForm.valid) {

      const produto = this.itensNotaFiscalForm.value.produto;
      const valorunitario = this.itensNotaFiscalForm.value.valorunitario;
      const quantidade = this.itensNotaFiscalForm.value.quantidade;
      const valortotal = this.itensNotaFiscalForm.value.valortotal;

      console.log("itens antes do push", this.itens);

      this.itens.push({
        produto: produto,
        valorunitario: valorunitario,
        quantidade: quantidade,
        valortotal: valortotal,
      });

      console.log("itens depois do push", this.itens);


      this.calculaValorTotalNota();

      this.itensNotaFiscalForm.reset({ quantidade: 1 });
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: 'Atenção!',
        detail: 'Preencha os campos obrigatórios!',
        life: 3000
      });
    }
  }

  excluirItem(item: { produto: Produto, valortotal: number, valorunitario: number, quantidade: number}) {
    const index = this.itens.indexOf(item);
    if (index >= 0) {
      const itemRemovido = this.itens.splice(index, 1)[0];
      this.calculaValorTotalNota(itemRemovido.valortotal);
    }
  }

  editarItem(item: { produto: string, valortotal: string, valorunitario: string, quantidade: string}) {
    this.itensNotaFiscalForm.setValue({
      produto: item.produto,
      valorunitario: item.valorunitario,
      quantidade: item.quantidade,
      valortotal: item.valortotal,
    });
  }

  calculaValorTotalNota(valortotalItemRemovido?: number): void {
    let total = 0;

    if (valortotalItemRemovido) {
      total = this.notafiscalForm.value.valortotalnota - valortotalItemRemovido;
    } else {
      this.itens.forEach(item => {
        total += item.valortotal;
      });
    }

    this.notafiscalForm.patchValue({
      valortotalnota: total
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

  buscaEnderecoPorCep(){
    console.log("CEP: ", this.notafiscalForm.value.cep.replace(".", "").replace("-", ""));

    this.enderecoService
    .buscaPorCep(this.notafiscalForm.value.cep.replace(".", "").replace("-", ""))
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

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
