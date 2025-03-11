import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
  },
  {
    path: 'produto',
    loadChildren: () => import('./programas/produto/produto.module').then(
      (m) => m.ProdutoModule
    )
  },
  {
    path: 'fornecedor',
    loadChildren: () => import('./programas/fornecedor/fornecedor.module').then(
      (m) => m.FornecedorModule
    )
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
