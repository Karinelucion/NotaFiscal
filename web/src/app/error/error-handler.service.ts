import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor() { }

  public handleError(error: HttpErrorResponse) {
    let errorMessage = 'Ocorreu um erro desconhecido.';

    if (error.error && Array.isArray(error.error.erros) && error.error.erros.length > 0) {
      errorMessage = error.error.erros[0].mensagem || 'Erro desconhecido.';
    }
    return throwError(() => new Error(errorMessage));
  }
}
