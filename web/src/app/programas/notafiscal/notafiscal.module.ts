import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { CardModule } from 'primeng/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { InputMaskModule } from 'primeng/inputmask';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { DropdownModule } from 'primeng/dropdown';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TooltipModule } from 'primeng/tooltip';
import { ConfirmationService } from 'primeng/api';
import { RouterModule } from '@angular/router';
import { NOTAFISCAL_ROUTES } from './notafiscal.rounting';
import { InicioHomeComponent } from './inicio/page/inicio-home/inicio-home.component';
import { InicioFormComponent } from './inicio/components/inicio-form/inicio-form.component';
import { HistoricoHomeComponent } from './historico/page/historico-home/historico-home.component';
import { HistoricoListComponent } from './historico/components/historico-list/historico-list.component';
import { CalendarModule } from 'primeng/calendar';
import {FieldsetModule} from 'primeng/fieldset';

@NgModule({
  declarations: [InicioHomeComponent, InicioFormComponent, HistoricoHomeComponent, HistoricoListComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(NOTAFISCAL_ROUTES),
    SharedModule,
    HttpClientModule,
    //PrimeNg
    CardModule,
    ButtonModule,
    TableModule,
    InputMaskModule,
    InputSwitchModule,
    InputTextModule,
    InputTextareaModule,
    InputNumberModule,
    DynamicDialogModule,
    DropdownModule,
    ConfirmDialogModule,
    TooltipModule,
    CheckboxModule,
    CalendarModule,
    FieldsetModule
  ],
  providers: [DialogService, ConfirmationService, DatePipe]
})
export class NotafiscalModule { }
