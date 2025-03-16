import { Routes } from "@angular/router";
import { FornecedorHomeComponent } from "./page/fornecedor-home/fornecedor-home.component";
import { FornecedorFormComponent } from "./components/fornecedor-form/fornecedor-form.component";

export const PRODUTO_ROUTES: Routes = [
  {
    path: '',
    component: FornecedorHomeComponent
  },
  { path: 'novo', component: FornecedorFormComponent },
  { path: 'editar/:id', component: FornecedorFormComponent },

]
