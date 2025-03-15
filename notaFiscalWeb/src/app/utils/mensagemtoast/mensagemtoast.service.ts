import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class MensagemtoastService {
  constructor(private messageService: MessageService) {}

  mensagemErro(erro: any) {
    this.messageService.add({
      severity: 'error',
      summary: 'Erro',
      detail: erro.message,
      life: 3000,
    });
  }

  mensagemCamposObrigatorios() {
    this.messageService.add({
      severity: 'warn',
      summary: 'Atenção!',
      detail: 'Preencha os campos obrigatórios!',
      life: 3000,
    });
  }

  mensagemRegistroIncluido() {
    this.messageService.add({
      severity: 'success',
      summary: 'Sucesso!',
      detail: 'Registro incluido com sucesso!',
      life: 3000,
    });
  }

  mensagemRegistroAlterado() {
    this.messageService.add({
      severity: 'success',
      summary: 'Sucesso!',
      detail: 'Registro alterado com sucesso!',
      life: 3000,
    });
  }

  mensagemProdutoJaAdicionado() {
    this.messageService.add({
      severity: 'warn',
      summary: 'Atenção',
      detail:
        'Não é possível incluir o mesmo produto duas vezes. Se necessário, altere o valor ou/e a quantidade do produto já adicionado',
      life: 3000,
    });
  }

  mensagemErroAoBuscar() {
    this.messageService.add({
      severity: 'error',
      summary: 'Erro',
      detail: 'Ocorreu um erro ao buscar os registros!',
      life: 3000,
    });
  }

  mensagemSucessoAoRemover() {
    this.messageService.add({
      severity: 'success',
      summary: 'Sucesso',
      detail: 'Registro removido com sucesso!',
      life: 3000,
    });
  }
}
