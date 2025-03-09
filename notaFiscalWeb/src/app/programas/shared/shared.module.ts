import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ToolbarModule } from 'primeng/toolbar';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DialogService } from 'primeng/dynamicdialog';
import { MenubarNavigationComponent } from './component/menubar-navigation.component/menubar-navigation.component.component';
import { MenubarModule } from 'primeng/menubar';

@NgModule({
  declarations: [
    MenubarNavigationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    //primeng
    ToolbarModule,
    CardModule,
    ButtonModule,
    MenubarModule
  ],
  exports: [MenubarNavigationComponent],
  providers: [DialogService, CurrencyPipe]
})
export class SharedModule { }
