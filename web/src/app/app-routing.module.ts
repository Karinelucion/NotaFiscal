import { NotafiscalModule } from './programas/notafiscal/notafiscal.module';
import { Notafiscal } from './programas/notafiscal/model/notafiscal.model';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/notafiscal/inicio',
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
  { path: 'notafiscal', loadChildren: () => import('./programas/notafiscal/notafiscal.module').then(
    (m) => m.NotafiscalModule
  )},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
