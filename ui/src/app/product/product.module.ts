import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductTableComponent} from './product-table/product-table.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { ProductAddComponent } from './product-add/product-add.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../shared/shared.module";
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductDeleteComponent } from './product-delete/product-delete.component';
import {RouterModule} from "@angular/router";


@NgModule({
  declarations: [ProductTableComponent, ProductAddComponent, ProductEditComponent, ProductDeleteComponent],
  exports: [
    ProductTableComponent,
    ProductAddComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule
  ],
  entryComponents: [ProductEditComponent, ProductDeleteComponent],
})
export class ProductModule { }
