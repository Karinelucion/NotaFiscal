import { MessageService } from 'primeng/api';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { ProdutoService } from '../../service/produto.service';
import { ProdutoEvent } from '../../model/event/enum/ProdutoEvent';
import { EditProdutoAction } from '../../model/event/EditProdutoAction';
import { Router } from '@angular/router';

@Component({
  selector: 'app-produto-form',
  templateUrl: './produto-form.component.html',
  styleUrls: []
})
export class ProdutoFormComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject()

  public situacaoValor: boolean = true;

  public addProdutoAction = ProdutoEvent.ADD_PRODUTO_ACTION
  public editProdutoAction = ProdutoEvent.EDIT_PRODUTO_ACTION

  public produtoAction!: {event: EditProdutoAction}
  public produtoForm = this.formBuilder.group({
    descricao: ['', Validators.required],
    preco: [''],
    situacao: ['', Validators.required]
  })

  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private produtoService: ProdutoService,
    public router: Router
  ) {}

  ngOnInit(): void {
  }

  handleSubmitAddProduto(): void {
    if (this.produtoForm?.value && this.produtoForm?.valid) {
      const requestCreateProduto: { descricao: string, preco: number | null, situacao: string } = {
        descricao: this.produtoForm.value.descricao as string,
        preco: this.produtoForm.value.preco ? parseFloat(this.produtoForm.value.preco.toString()) : null,
        situacao: this.produtoForm.value.situacao ? 'ATIVO' : 'INATIVO', // Conversão aqui
      };

      this.produtoService.criarProduto(requestCreateProduto)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            if (response) {
              this.produtoForm.reset();
              this.messageService.add({
                severity: 'success',
                summary: 'Sucesso',
                detail: 'Produto criado com sucesso!',
                life: 3000
              });
              this.router.navigate(['/produto']);
            }
          },
          error: (err) => {
            console.log("REQUEST", requestCreateProduto);
            console.log(err);
            this.produtoForm.reset();
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: 'Erro ao criar produto!',
              life: 3000
            });
          }
        });
    }
  }


  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }

}
