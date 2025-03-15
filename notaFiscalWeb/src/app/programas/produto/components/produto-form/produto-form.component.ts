import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { ProdutoService } from '../../service/produto.service';
import { ProdutoEvent } from '../../model/event/enum/ProdutoEvent';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { MensagemtoastService } from 'src/app/utils/mensagemtoast/mensagemtoast.service';

@Component({
  selector: 'app-produto-form',
  templateUrl: './produto-form.component.html',
  styleUrls: []
})
export class ProdutoFormComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject();

  public situacaoValor: boolean = true;
  public addProdutoAction = ProdutoEvent.ADD_PRODUTO_ACTION;
  public editProdutoAction = ProdutoEvent.EDIT_PRODUTO_ACTION;
  public produtoAction!: { event: ProdutoEvent };
  public produtoForm = this.formBuilder.group({
    descricao: ['', Validators.required],
    preco: [''],
    situacao: [true, Validators.required]
  });

  constructor(
    private formBuilder: FormBuilder,
    private produtoService: ProdutoService,
    public router: Router,
    private route: ActivatedRoute,
    private mensagemService: MensagemtoastService

  ) {}

  ngOnInit(): void {
    const produtoId = this.route.snapshot.paramMap.get('id');

    if (produtoId) {
      this.produtoService.listaProdutoPorId(Number(produtoId))
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (produto) => {
            this.setProduto(produto.descricao, produto.preco ? String(produto.preco) : null, produto.situacao);
            this.produtoAction = { event: ProdutoEvent.EDIT_PRODUTO_ACTION };
          },
          error: (err) => {
            this.mensagemService.mensagemErro(err);
          }
        });
    } else {
      this.produtoAction = { event: ProdutoEvent.ADD_PRODUTO_ACTION };
    }
  }

  handleSubmitProdutoAction(): void {
    if (this.produtoForm?.value && this.produtoForm?.valid) {
      const produtoId = this.route.snapshot.paramMap.get('id');
      const produtoData = {
        descricao: this.produtoForm.value.descricao as string,
        preco: this.produtoForm.value.preco ? parseFloat(this.produtoForm.value.preco.toString()) : null,
        situacao: this.produtoForm.value.situacao ? 'ATIVO' : 'INATIVO',
      };

      if (produtoId) {
        this.produtoService.atualizarProduto(Number(produtoId), produtoData)
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: () => {
              this.mensagemService.mensagemRegistroAlterado();
              this.router.navigate(['/produto']);
            },
            error: (err) => {
              this.mensagemService.mensagemErro(err);
            }
          });
      } else {
        this.produtoService.criarProduto(produtoData)
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: () => {
              this.produtoForm.reset();
              this.mensagemService.mensagemRegistroIncluido();
              this.router.navigate(['/produto']);
            },
            error: (err) => {
              this.mensagemService.mensagemErro(err);
            }
          });
      }
    }
  }

  setProduto(produto_descricao: string, produto_preco: string | null, produto_situacao: string){
    this.produtoForm.setValue({
      descricao: produto_descricao,
      preco: produto_preco ? produto_preco : null,
      situacao: produto_situacao === 'ATIVO'
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
