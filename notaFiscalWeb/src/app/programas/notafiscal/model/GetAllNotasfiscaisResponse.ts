import { Fornecedor } from "../../fornecedor/model/fornecedor.model";
import { Endereco, Itens } from "./notafiscal.model";

export interface GetAllNotasfiscaisResponse {
  id: string;
  numero: string;
  datahora: Date;
  valortotal: number;
  endereco: Endereco;
  fornecedor: Fornecedor;
  itens: Itens;
}
