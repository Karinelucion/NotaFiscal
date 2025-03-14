
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class EnderecoUtilService {

  constructor(
  ) { }

  tiraFormatacaoCep(cep: any): string {
    return cep.replace(".", "").replace("-", "");
  }
}
