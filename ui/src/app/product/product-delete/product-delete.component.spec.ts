import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDeleteComponent } from './product-delete.component';
import {NgbActiveModal, NgbModalModule, NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {RoutingModule} from "../../routing/routing.module";
import {ProductListComponent} from "../product-list/product-list.component";
import {ProductAddComponent} from "../product-add/product-add.component";
import {ProductTableComponent} from "../product-table/product-table.component";
import {Product} from "../../models/product";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('ProductDeleteComponent', () => {
  let component: ProductDeleteComponent;
  let fixture: ComponentFixture<ProductDeleteComponent>;
  let product: Product;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductDeleteComponent, ProductListComponent,
        ProductAddComponent,
        ProductTableComponent ],
      imports: [ReactiveFormsModule,
        NgbModule,
        FormsModule,
        NgbModalModule,
        RoutingModule,
        HttpClientTestingModule],
      providers: [
        NgbActiveModal,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDeleteComponent);
    product = {id: 2, name: "OnePlus 5T", category: "Mobile", code: "5t", price: 599};
    component = fixture.componentInstance;
    component.product = product;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Expect warning text to contain product name', () => {
    const deleteWarning = fixture.nativeElement.querySelectorAll('#uit-product-delete-warning-title')[0];
    expect(deleteWarning.textContent).toContain('OnePlus 5T');
  });

});
