export interface EditProdutoAction {
  action: string;
  id?: string;
  produto_descricao?: string;
  produto_preco?: string;
  produto_situacao?: string;
}
