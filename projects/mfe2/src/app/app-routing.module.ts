import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrudComponent } from './crud/crud.component';

const routes: Routes = [
  {path:"", redirectTo: "crud-mfe", pathMatch: "full"},
  {path:"crud-mfe", component: CrudComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
