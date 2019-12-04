import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ProductTableComponent} from './product-table.component';
import {NgbModal, NgbModalModule, NgbModalRef, NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ProductService} from "../../services/product.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {Product} from "../../models/product";
import {of} from "rxjs";
import {ProductEditComponent} from "../product-edit/product-edit.component";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";

describe('ProductTableComponent', () => {
  let component: ProductTableComponent;
  let fixture: ComponentFixture<ProductTableComponent>;
  let service: ProductService;
  let modal: NgbModal;
  let products: Product[];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProductTableComponent, ProductEditComponent],
      imports: [
        NgbModule,
        NgbModalModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    products = [{id: 1, name: "LG SJ8S", category: "Soundbar", code: "lg-sj8s", price: 199}];
    service = TestBed.get(ProductService);
    modal = TestBed.get(NgbModal);
    fixture = TestBed.createComponent(ProductTableComponent);

  });

  it('should create', () => {
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('Should call getAllProducts() of product service to fetch all products', () => {
    const productSpy = spyOn(service, 'getAllProducts').and.returnValue(of(products));
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(productSpy).toHaveBeenCalled();
  });

  it('Should display products in table', () => {
    spyOn(service, 'getAllProducts').and.returnValue(of(products));
    component = fixture.componentInstance;
    fixture.detectChanges();
    const tableRow = fixture.nativeElement.querySelectorAll('#uit-product-1')[0];
    expect(tableRow.innerHTML).toContain('LG SJ8S');
    expect(tableRow.innerHTML).toContain('Soundbar');
  });

  it('Edit, add and delete buttons should be visible and view mode close disable', () => {
    spyOn(service, 'getAllProducts').and.returnValue(of(products));
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('#uit-product-table-delete')[0]).toBeDefined();
    expect(fixture.nativeElement.querySelectorAll('#uit-product-table-add')[0]).toBeDefined();
    expect(fixture.nativeElement.querySelectorAll('#uit-product-table-edit')[0]).toBeDefined();
    expect(fixture.nativeElement.querySelectorAll('#uit-product-table-view-modal-close')[0]).toBeUndefined();
  });

  it('Test view mode', () => {
    const product1 = {id: 2, name: "OnePlus 5T", category: "Mobile", code: "5t", price: 599};
    const productList = [product1, products[0]];
    spyOn(service, 'getAllProducts').and.returnValue(of(productList));
    component = fixture.componentInstance;
    component.productName = "OnePlus 5T";
    fixture.detectChanges();
    const tableRowSoundbar = fixture.nativeElement.querySelectorAll('#uit-product-1')[0];
    const tableRowOneplus = fixture.nativeElement.querySelectorAll('#uit-product-2')[0];

    expect(tableRowOneplus).toBeDefined();
    expect(tableRowSoundbar).toBeUndefined();

    expect(fixture.nativeElement.querySelectorAll('#uit-product-table-view-modal-close')[0]).toBeDefined();
    expect(fixture.nativeElement.querySelectorAll('#uit-product-table-delete')[0]).toBeUndefined();
    expect(fixture.nativeElement.querySelectorAll('#uit-product-table-add')[0]).toBeUndefined();
    expect(fixture.nativeElement.querySelectorAll('#uit-product-table-edit')[0]).toBeUndefined();
  });
});
