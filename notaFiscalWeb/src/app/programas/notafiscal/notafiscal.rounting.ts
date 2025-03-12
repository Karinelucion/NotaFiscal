import { Routes } from "@angular/router";
import { InicioHomeComponent } from "./inicio/page/inicio-home/inicio-home.component";
import { HistoricoHomeComponent } from "./historico/page/historico-home/historico-home.component";

export const NOTAFISCAL_ROUTES: Routes = [
  {
    path: '',
    component: InicioHomeComponent
  },

  { path: 'inicio', component: InicioHomeComponent },
  { path: 'historico', component: HistoricoHomeComponent },
]
