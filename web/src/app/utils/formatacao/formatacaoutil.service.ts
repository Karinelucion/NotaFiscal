
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormatacaoUtilService {

  constructor(
  ) { }

  tiraFormatacaoCep(cep: any): string {
    return cep.replace(".", "").replace("-", "");
  }

  tiraFormatacaoTelefone(telefone: any): string {
    return telefone.replace("(", "").replace(")", "").replace("-", "").replace(" ", "");
  }
}
