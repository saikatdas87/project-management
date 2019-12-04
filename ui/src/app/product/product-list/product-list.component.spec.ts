import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ProductListComponent} from './product-list.component';
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {ProductService} from "../../services/product.service";
import {ProductTableComponent} from "../product-table/product-table.component";
import {ProductEditComponent} from "../product-edit/product-edit.component";
import {ProductDeleteComponent} from "../product-delete/product-delete.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let productService: ProductService;
  let modalService: NgbModal;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProductListComponent],
      imports: [
        CommonModule,
        ReactiveFormsModule,
        HttpClientModule
      ],
      providers: [
        HttpClient,
        ProductService,
        ProductTableComponent,
        ProductEditComponent,
        ProductDeleteComponent,
        NgbModal
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    modalService = TestBed.get(NgbModal);
    productService = TestBed.get(ProductService);
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a title', () => {
    component.title = 'Product List';
    fixture.detectChanges();
    const title = fixture.nativeElement.querySelectorAll('.uit-product-management-list-title')[0];
    expect(title.textContent).toBe(component.title);
  });

  it('should include app-product-table to display products', () => {
    expect(fixture.nativeElement.innerHTML).toContain("app-product-table");
  });

});
