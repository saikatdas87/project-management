import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {HeaderComponent} from './header.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {RoutingModule} from "../routing/routing.module";
import {ProductModule} from "../product/product.module";
import {ProductListComponent} from "../product/product-list/product-list.component";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {ProductService} from "../services/product.service";
import {interval, Observable, of} from "rxjs";
import {map, take} from "rxjs/operators";

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let service: ProductService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent, ProductListComponent],
      imports: [NgbModule, RoutingModule, ProductModule, HttpClientTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    service = TestBed.get(ProductService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should contain company and product name text', () => {
    const expectedCompany = 'Canter Oy';
    const expectedProductName = 'Product Editor';

    const companyName = fixture.nativeElement.querySelectorAll('.uit-product-management-company')[0];
    const productName = fixture.nativeElement.querySelectorAll('.uit-product-editor')[0];

    expect(companyName.textContent).toBe(expectedCompany);
    expect(productName.textContent).toBe(expectedProductName);
  });

  it('Should contain typeahead search box', () => {
    const searchBox = fixture.nativeElement.querySelectorAll('#uit-product-management-typeahead-product-search')[0];
    expect(searchBox).toBeDefined();
  });

  it('typeahead search kicks after typing 2 characters', fakeAsync(() => {
    const typeaheadSearchSpy = spyOn(service, 'getProductNames').and.returnValue(of(['iPhone']));
    fixture.detectChanges();
    let inputTextArray = ['ip', 'iph', 'ipho', 'iphone'];

    let textMock$: Observable<string> = interval(100).pipe(take(3), map(index => inputTextArray[index]));
    component.search(textMock$).subscribe(res => {
      expect(res).toEqual(['iPhone']);
    });

    tick(1000);
    expect(typeaheadSearchSpy).toHaveBeenCalledWith('ipho');
  }));

  it('typeahead search does not kick before typing 2 characters', fakeAsync(() => {
    const typeaheadSearchSpy = spyOn(service, 'getProductNames').and.returnValue(of(['iPhone']));
    fixture.detectChanges();
    let inputTextArray = ['i', 'ip', 'iph', 'ipho', 'iphone'];

    let textMock$: Observable<string> = interval(100).pipe(take(1), map(index => inputTextArray[index]));
    component.search(textMock$).subscribe(res => {
      expect(res).toEqual([]);
    });

    tick(1000);
    expect(typeaheadSearchSpy).not.toHaveBeenCalled();
  }));
});
