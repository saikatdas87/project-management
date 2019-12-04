import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ProductAddComponent} from './product-add.component';
import {FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgbActiveModal, NgbModalModule, NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {RoutingModule} from "../../routing/routing.module";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {ProductListComponent} from "../product-list/product-list.component";
import {ProductTableComponent} from "../product-table/product-table.component";
import {ProductService} from "../../services/product.service";
import {of} from "rxjs";
import {Product} from "../../models/product";

describe('ProductAddComponent', () => {
  let component: ProductAddComponent;
  let fixture: ComponentFixture<ProductAddComponent>;
  let service: ProductService;
  let product: Product;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProductAddComponent,
        ProductListComponent,
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
    fixture = TestBed.createComponent(ProductAddComponent);
    service = TestBed.get(ProductService);

  });

  it('should create', () => {
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should contain title ', () => {
    component = fixture.componentInstance;
    fixture.detectChanges();
    const expected = 'PRODUCT ADD';
    const title = fixture.nativeElement.querySelectorAll('.uit-product-management-add-title')[0];
    expect(title.textContent).toBe(expected);
  });

  it('Add data and submit', async () => {
    component = fixture.componentInstance;
    fixture.detectChanges();
    const serviceSaveSpy = spyOn(service, 'addProduct').and.returnValue(of(1));
    component.productForm = new FormGroup({
      id: new FormControl(0),
      name: new FormControl('LG SJ8S'),
      category: new FormControl('Soundbar'),
      code: new FormControl('lg-sj8s'),
      price: new FormControl(199),
      details: new FormArray([])
    });

    await fixture.detectChanges();

    const saveButton = fixture.nativeElement.querySelectorAll('#uit-product-management-add-save')[0];
    saveButton.click();
    await fixture.detectChanges();

    expect(serviceSaveSpy).toHaveBeenCalled();
  });

  it('Test edit mode and check if Details are fetched', async () => {
    const detailSpy = spyOn(service, 'getDetailsOfProduct').and.returnValue(of([]));
    product = {id: 2, name: "OnePlus 5T", category: "Mobile", code: "5t", price: 599};
    component = fixture.componentInstance;
    component.productToEdit = product;
    await fixture.detectChanges();

    expect(detailSpy).toHaveBeenCalledWith(2);
  });

  it('Test edit mode save emits event', async () => {
    spyOn(service, 'getDetailsOfProduct').and.returnValue(of([]));
    product = {id: 2, name: "OnePlus 5T", category: "Mobile", code: "5t", price: 599};
    component = fixture.componentInstance;
    component.productToEdit = product;
    const editSpy = spyOn(component.editProduct, 'emit');
    await fixture.detectChanges();

    const saveButton = fixture.nativeElement.querySelectorAll('#uit-product-management-add-save')[0];
    saveButton.click();
    await fixture.detectChanges();
    const expected = {id: 2, name: "OnePlus 5T", category: "Mobile", code: "5t", price: 599, details: []};
    expect(editSpy).toHaveBeenCalledWith(expected);

  })

});
