import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../../models/product";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {NavigationEnd, Router} from "@angular/router";
import {ProductService} from "../../services/product.service";

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.less']
})
export class ProductEditComponent {

  @Input() product: Product | undefined;

  productEditFailed: boolean = false;
  productEdited: boolean = false;

  constructor(public activeModal: NgbActiveModal, private router: Router, private service: ProductService) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        this.router.navigated = false;
        window.scrollTo(0, 0);
      }
    });
  }

  closeModal() {
    this.activeModal.dismiss('Cross click');
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => this.router.navigate(['/product-list']));
  }

  editProduct(product: Product) {
    this.productEdited = false;
    this.productEditFailed = false;
    this.service.updateProduct(product).subscribe((res) => {
      this.productEdited = true;
      this.productEditFailed = false;
      }, error => {
      this.productEditFailed = true;
      this.productEdited = false;
      }
    );
  }
}
