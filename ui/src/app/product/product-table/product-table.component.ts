import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {ProductService} from "../../services/product.service";
import {Product} from "../../models/product";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ProductEditComponent} from "../product-edit/product-edit.component";
import {ProductDeleteComponent} from "../product-delete/product-delete.component";

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.less'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ProductTableComponent implements OnInit {

  @Input() productName: string = '';

  products: Product[] | undefined;
  showActionButtons = true;

  constructor(private service: ProductService, private modal: NgbModal) {
  }

  ngOnInit(): void {
    this.service.getAllProducts().subscribe(products => {
        if (this.productName && this.productName !== '') {
          this.products = products.filter(p => p.name === this.productName);
          this.showActionButtons = false;
        } else {
          this.products = products;
        }
      },
      error => {
        //TODO error handling
      })
  }

  editProduct(product: Product) {
    const modalRef = this.modal.open(ProductEditComponent, {size: "xl", backdrop: 'static'});
    modalRef.componentInstance.product = product;
  }

  deleteProduct(product: Product) {
    const modalRef = this.modal.open(ProductDeleteComponent, {size: 'lg', backdrop: 'static'});
    modalRef.componentInstance.product = product;
  }

}
