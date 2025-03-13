import { Fornecedor } from "../../fornecedor/model/fornecedor.model";
import { Produto } from "../../produto/model/produto.model";

export interface NotafiscalRequest {
  numero: string;
  datahora: Date;
  valortotalnota: number;
  enderecoid: number;
  fornecedorid: number;
  itens: ItensRequest[]
}
export interface Notafiscal {
  id: number;
  numero: string;
  datahora: Date;
  valortotal: number;
  endereco: Endereco;
  fornecedor: Fornecedor;
  itens: Itens;
}

export interface Endereco {
  id: number;
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  numero: string;
}

export interface ItensRequest {
  valorunitario: number;
  quantidade: number;
  valortotal: number;
  produto: Produto;
}


export interface Itens {
  id: number;
  valorunitario: number;
  quantidade: number;
  valortotal: number;
  produto: Produto;
}
