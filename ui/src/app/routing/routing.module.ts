import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {ProductListComponent} from "../product/product-list/product-list.component";
import {ProductAddComponent} from "../product/product-add/product-add.component";

const routes: Routes = [
  {
    path: 'product-list',
    component: ProductListComponent,
  },
  {
    path: 'product-add',
    component: ProductAddComponent
  },
  {
    path: '**',
    redirectTo: 'product-list',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
})
export class RoutingModule { }
