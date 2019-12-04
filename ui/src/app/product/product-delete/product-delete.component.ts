import {Component, Input} from '@angular/core';
import {Product} from "../../models/product";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {NavigationEnd, Router} from "@angular/router";
import {ProductService} from "../../services/product.service";

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.less']
})
export class ProductDeleteComponent {

  @Input() product: Product | undefined;
  productDeleted: boolean = false;
  failedToDelete: boolean = false;

  constructor(public modal: NgbActiveModal, private router: Router, private service: ProductService) {
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
    this.modal.dismiss('Cross click');
    return this.router.navigate(['/'])
  }

  deleteProduct(product: Product) {
    this.service.deleteProduct(product.id).subscribe((res) => {
        this.productDeleted = true;
      }, error => {
        //TODO - show error message
        this.failedToDelete = true;
      }
    );
  }

}
