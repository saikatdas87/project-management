import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ProductEditComponent} from './product-edit.component';
import {ProductAddComponent} from "../product-add/product-add.component";
import {Product} from "../../models/product";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgbActiveModal, NgbModalModule, NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {RoutingModule} from "../../routing/routing.module";
import {ProductListComponent} from "../product-list/product-list.component";
import {ProductTableComponent} from "../product-table/product-table.component";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('ProductEditComponent', () => {
  let component: ProductEditComponent;
  let fixture: ComponentFixture<ProductEditComponent>;
  let product: Product;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProductEditComponent,
        ProductListComponent,
        ProductAddComponent,
        ProductTableComponent],
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
    product = {id: 2, name: "OnePlus 5T", category: "Mobile", code: "5t", price: 599};
    fixture = TestBed.createComponent(ProductEditComponent);

  });

  it('should create', () => {
    component = fixture.componentInstance;
    component.product = product;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should include product add component', () => {
    component = fixture.componentInstance;
    component.product = product;
    fixture.detectChanges();
    const productAddCard = fixture.nativeElement.querySelectorAll('.uit-product-management-add-card')[0];
    expect(productAddCard).toBeDefined();
  });
});
