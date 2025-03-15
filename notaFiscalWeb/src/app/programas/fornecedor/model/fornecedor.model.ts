export interface FornecedorRequest {
  razaosocial: string;
  email: string;
  telefone: string;
  cnpj: string;
  databaixa: string;
  situacao: string;
}
export interface Fornecedor {
  id: number;
  razaosocial: string;
  email: string;
  telefone: string;
  cnpj: string;
  databaixa: Date;
  situacao: string;
}

export enum Situacao {
  ATIVO = 'Ativo',
  BAIXADO = 'Baixado',
  SUSPENSO = 'Suspenso'
}
