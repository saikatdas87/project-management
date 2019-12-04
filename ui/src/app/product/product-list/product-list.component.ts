import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.less']
})
export class ProductListComponent {

  @Input() productName: string = '';

  title = "PRODUCT LIST";

}
