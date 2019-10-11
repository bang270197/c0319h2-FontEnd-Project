import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import {RouterModule, Routes} from '@angular/router';
import {ViewComponent} from './view/view.component';
const routes: Routes = [
  { path: 'list', component: ListComponent},
  {path: 'edit/id', component: EditComponent},
  {path: 'view/id', component: ViewComponent},
  {path: 'add', component: AddComponent}
]


@NgModule({
  declarations: [ListComponent, AddComponent, EditComponent, ViewComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class CompanyModule { }
