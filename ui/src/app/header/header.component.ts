import {Component, ViewChild} from '@angular/core';
import {NgbModal, NgbTypeahead} from "@ng-bootstrap/ng-bootstrap";
import {Observable} from "rxjs";
import {debounceTime, distinctUntilChanged, switchMap} from "rxjs/operators";
import {ProductService} from "../services/product.service";
import {ProductListComponent} from "../product/product-list/product-list.component";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less',]
})
export class HeaderComponent {

  @ViewChild('instance', {static: true}) instance: NgbTypeahead | undefined;
  companyName: string = 'XYZ Oy';
  productName: string = 'Product Editor';

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      switchMap(term =>
        term.length < 2 ? [] : this.service.getProductNames(term))
    );

  constructor(private service: ProductService, private modalService: NgbModal) {
  }

  select(name: any) {
    const modalRef = this.modalService.open(ProductListComponent, {size: 'lg', backdrop: 'static'});
    modalRef.componentInstance.productName = name.item;
  }

}
