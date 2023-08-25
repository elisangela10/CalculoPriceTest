import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProdutoCadastroComponent } from './produto-cadastro/produto-cadastro.component';
import { CalculoPrecosComponent } from './calculo-precos/calculo-precos.component';

const routes: Routes = [
  { path: 'produto-cadastro', component: ProdutoCadastroComponent },
  { path: 'calculo-precos', component: CalculoPrecosComponent },
  { path: '', redirectTo: '/produto-cadastro', pathMatch: 'full' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
