import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Details, Product} from "../../models/product";
import {ProductService} from "../../services/product.service";
import {Router} from "@angular/router";
import {ToasterService} from "../../services/toaster.service";

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.less']
})
export class ProductAddComponent implements OnInit {
  @Input() productToEdit: Product | undefined;
  @Output() editProduct: EventEmitter<Product> = new EventEmitter();

  title: string = 'PRODUCT ADD';
  productForm: FormGroup = new FormGroup({
    id: new FormControl(0),
    name: new FormControl(''),
    category: new FormControl(''),
    code: new FormControl(''),
    price: new FormControl(0),
    details: new FormArray([])
  });
  editMode: boolean = false;

  constructor(private formBuilder: FormBuilder,
              private service: ProductService,
              private router: Router,
              private toaster: ToasterService) {
  }

  ngOnInit() {
    if (this.productToEdit) {
      this.editMode = true;
      const product = this.productToEdit;
      this.service.getDetailsOfProduct(product.id).subscribe((details: Details[]) => {
          this.productForm = this.formBuilder.group({
            id: [product.id],
            name: [product.name],
            category: [product.category],
            code: [product.code],
            price: [product.price],
            details: this.formBuilder.array([])
          });
          details.forEach(detail => this.addDetail(detail))
        },
        error => {
          //TODO - Error case handling
        })

    } else {
      this.addDetail();
    }

  }

  get details() {
    return this.productForm.get('details') as FormArray;
  }

  addDetail(details?: Details) {
    if (!details) {
      details = new Details();
    }
    const formGroup = this.formBuilder.group(details);
    this.details.push(formGroup);
  }

  removeDetail(index: number) {
    this.details.removeAt(index);
  }

  save() {
    if (this.editMode) {
      this.editProduct.emit(this.productForm.value);
    } else {
      this.service.addProduct(this.productForm.value).subscribe((response) => {
          this.toaster.show('success', 'Well done!', 'This is a success alert');
          return this.router.navigate(['/'])
        },
        (error => {
          //TODO - Error case handling
        }))
    }
  }
}
