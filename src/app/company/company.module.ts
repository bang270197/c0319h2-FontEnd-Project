import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ListComponent} from './list/list.component';
import {AddComponent} from './add/add.component';
import {EditComponent} from './edit/edit.component';
import {RouterModule, Routes} from '@angular/router';
import {ViewComponent} from './view/view.component';
import {AuthGuardServiceService} from '../auth/auth-guard-service.service';
import {ReactiveFormsModule} from '@angular/forms';

const routes: Routes = [
  {path: 'list', component: ListComponent, canActivate: [AuthGuardServiceService]},
  {path: 'edit/:id', component: EditComponent, canActivate: [AuthGuardServiceService]},
  {path: 'view/:id', component: ViewComponent, canActivate: [AuthGuardServiceService]},
  {path: 'add', component: AddComponent, canActivate: [AuthGuardServiceService]}
];


@NgModule({
  declarations: [ListComponent, AddComponent, EditComponent, ViewComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ]
})
export class CompanyModule {
}
