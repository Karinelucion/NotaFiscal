import { Component, Input } from '@angular/core';
import { EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { GetNotafiscalResponse } from '../../../model/GetNotafiscalResponse';
import { NotafiscalService } from '../../../service/notafiscal.service';
import { DeleteNotafiscalAction } from '../../../model/event/DeleteNotafiscalAction';
import { EditNotafiscalAction } from '../../../model/event/EditNotafiscalAction';

@Component({
  selector: 'app-historico-list',
  templateUrl: './historico-list.component.html',
  styleUrls: []
})

export class HistoricoListComponent{
  @Input() public notasfiscais: Array<GetNotafiscalResponse> = []
  @Output() public notafiscalEvent = new EventEmitter<EditNotafiscalAction>();
  @Output() public deleteNotafiscalEvent = new EventEmitter<DeleteNotafiscalAction>()

  public notafiscalSelecionado!: GetNotafiscalResponse;
  controlePesquisa = new FormControl('');


  constructor(
    public router: Router,
    private notafiscalService: NotafiscalService
    ){

      this.controlePesquisa.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(value => this.notafiscalService.buscarNotasFiscaisFiltro(value || ''))
      )
      .subscribe(notasfiscais => this.notasfiscais = notasfiscais);
  }

  handleDeleteNotafiscalEvent(notafiscal_id: string, notafiscal_numero: string): void{
    if(notafiscal_id !== '' && notafiscal_numero !== ''){
      this.deleteNotafiscalEvent.emit({notafiscal_id, notafiscal_numero})
    }
  }

  editarNotafiscal(id: string) {
    this.router.navigate(['/notafiscal/inicio/editar/', id]);
  }
}
