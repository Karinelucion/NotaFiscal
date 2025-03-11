import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api/menuitem';

@Component({
  selector: 'app-menubar-navigation',
  templateUrl: './menubar-navigation.component.component.html',
  styleUrls: ['./menubar-navigation.component.css'],
})
export class MenubarNavigationComponent {
  items: MenuItem[];

  constructor() {
    this.items = [
      {
        label: 'Nota fiscal',
        icon: 'pi pi-file',
        routerLink: '',
        routerLinkActiveOptions: { exact: true }
      },
      {
        label: 'Histórico',
        icon: 'pi pi-history',
        routerLink: 'notafiscal',
        routerLinkActiveOptions: { exact: true }
      },
      {
        label: 'Produto',
        icon: 'pi pi-box',
        routerLink: '/produto',
        routerLinkActiveOptions: { exact: true }
      },
      {
        label: 'Fornecedor',
        icon: 'pi pi-users',
        routerLink: '/fornecedor',
        routerLinkActiveOptions: { exact: true }
      },
    ];
  }
}
