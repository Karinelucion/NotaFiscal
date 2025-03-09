import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api/menuitem';

@Component({
  selector: 'app-menubar-navigation',
  templateUrl: './menubar-navigation.component.component.html',
  styleUrls: ['./menubar-navigation.component.component.css'],
})
export class MenubarNavigationComponent {
  items: MenuItem[];

  constructor() {
    this.items = [
      {
        label: 'Nota fiscal',
        icon: 'pi pi-home',
        routerLink: ''
      },
      {
        label: 'Histórico',
        icon: 'pi pi-home',
        routerLink: 'notafiscal'
      },
      {
        label: 'Produto',
        icon: 'pi pi-home',
        routerLink: 'produto'
      },
      {
        label: 'Fornecedor',
        icon: 'pi pi-home',
        routerLink: 'fornecedor'
      },
    ];
  }
}
