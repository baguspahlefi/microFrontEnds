import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    pathMatch: "full"
  },
  {
    path: "chart-list",
    loadChildren: () => import('mfe/ChartModule').then(m => m.ChartModule),
  },
  {
    path: "crud",
    loadChildren: () => import('mfe2/CrudModule').then(m => m.CrudModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
