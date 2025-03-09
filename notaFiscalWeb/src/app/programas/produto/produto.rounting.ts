import { Routes } from "@angular/router";
import { ProdutoHomeComponent } from "./page/produto-home/produto-home.component";
import { ProdutoFormComponent } from "./components/produto-form/produto-form.component";

export const PRODUTO_ROUTES: Routes = [
  {
    path: '',
    component: ProdutoHomeComponent
  },
  { path: 'novo', component: ProdutoFormComponent },

]
