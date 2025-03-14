import { Fornecedor } from "../../fornecedor/model/fornecedor.model";
import { Endereco, Itens } from "./notafiscal.model";

export interface GetNotafiscalResponse {
  id: number;
  numero: string;
  datahora: Date;
  valortotalnota: number;
  endereco: Endereco;
  fornecedor: Fornecedor;
  itens: Itens;
}
