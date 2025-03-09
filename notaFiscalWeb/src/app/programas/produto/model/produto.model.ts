export interface ProdutoRequest {
  descricao: string;
  preco: number | null;
  situacao: string;
}

export interface Produto {
  id: number;
  situacao: string;
  descricao: string;
  preco: number;
}
