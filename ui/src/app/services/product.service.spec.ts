import {TestBed} from '@angular/core/testing';

import {ProductService} from './product.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {Details, Product} from "../models/product";

describe('ProductService', () => {
  let httpClient: HttpTestingController;
  let service: ProductService;

  beforeEach(() => TestBed.configureTestingModule({imports: [HttpClientTestingModule]}));
  beforeEach(() => {
    httpClient = TestBed.get(HttpTestingController);
    service = TestBed.get(ProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('addProduct', () => {

    it('Should success', () => {
      service.addProduct(new Product()).subscribe(res => {
        expect(res).toBe(1);
      }, () => {
        throw(Error('should not be reached'));
      });
      const req = httpClient.expectOne('/product');
      req.flush(1);
      expect(req.request.method).toBe('POST');
      httpClient.verify();
    });

    it('Should return error if req fails', () => {
      const errorText = 'Server error';
      const errorCode = 500;
      service.addProduct(new Product()).subscribe(() => {
        throw(Error('should not be reached'));
      }, error => {
        expect(error.status).toBe(errorCode);
        expect(error.statusText).toBe(errorText);
      });
      const req = httpClient.expectOne('/product');
      req.error(new ErrorEvent(''), {status: errorCode, statusText: errorText});
      expect(req.request.method).toBe('POST');
      httpClient.verify();
    })
  });


  describe('getAllProducts', () => {
    const res = [new Product()];
    it('Should success', () => {
      service.getAllProducts().subscribe(res => {
        expect(res).toBe(res);
      }, () => {
        throw(Error('should not be reached'));
      });
      const req = httpClient.expectOne('/products');
      req.flush(res);
      expect(req.request.method).toBe('GET');
      httpClient.verify();
    });

    it('Should return error if getAllProducts fails', () => {
      const errorText = 'Server error';
      const errorCode = 500;
      service.getAllProducts().subscribe(() => {
        throw(Error('should not be reached'));
      }, error => {
        expect(error.status).toBe(errorCode);
        expect(error.statusText).toBe(errorText);
      });
      const req = httpClient.expectOne('/products');
      req.error(new ErrorEvent(''), {status: errorCode, statusText: errorText});
      expect(req.request.method).toBe('GET');
      httpClient.verify();
    })
  });

  describe('getDetailsOfProduct', () => {
    const res = [new Details()];
    const product_id = 123;
    it('Should success', () => {
      service.getDetailsOfProduct(product_id).subscribe(res => {
        expect(res).toBe(res);
      }, () => {
        throw(Error('should not be reached'));
      });
      const req = httpClient.expectOne(`/details/${product_id}`);
      req.flush(res);
      expect(req.request.method).toBe('GET');
      httpClient.verify();
    });

    it('Should return error if req fails', () => {
      const errorText = 'Server error';
      const errorCode = 500;
      service.getDetailsOfProduct(product_id).subscribe(() => {
        throw(Error('should not be reached'));
      }, error => {
        expect(error.status).toBe(errorCode);
        expect(error.statusText).toBe(errorText);
      });
      const req = httpClient.expectOne(`/details/${product_id}`);
      req.error(new ErrorEvent(''), {status: errorCode, statusText: errorText});
      expect(req.request.method).toBe('GET');
      httpClient.verify();
    })
  });


  describe('updateProduct', () => {
    const product_id = 123;
    const product = new Product();
    product.id = product_id;
    it('Should success', () => {
      service.updateProduct(product).subscribe(res => {
        expect(res).toBe(1);
      }, () => {
        throw(Error('should not be reached'));
      });
      const req = httpClient.expectOne(`/product/${product_id}`);
      req.flush(1);
      expect(req.request.method).toBe('PUT');
      httpClient.verify();
    });

    it('Should return error if req fails', () => {
      const errorText = 'Server error';
      const errorCode = 500;
      service.updateProduct(product).subscribe(() => {
        throw(Error('should not be reached'));
      }, error => {
        expect(error.status).toBe(errorCode);
        expect(error.statusText).toBe(errorText);
      });
      const req = httpClient.expectOne(`/product/${product_id}`);
      req.error(new ErrorEvent(''), {status: errorCode, statusText: errorText});
      expect(req.request.method).toBe('PUT');
      httpClient.verify();
    })
  });

  describe('deleteProduct', () => {
    const product_id = 123;
    it('Should success', () => {
      service.deleteProduct(product_id).subscribe(res => {
        expect(res).toBe(1);
      }, () => {
        throw(Error('should not be reached'));
      });
      const req = httpClient.expectOne(`/product/${product_id}`);
      req.flush(1);
      expect(req.request.method).toBe('DELETE');
      httpClient.verify();
    });

    it('Should return error if req fails', () => {
      const errorText = 'Server error';
      const errorCode = 500;
      service.deleteProduct(product_id).subscribe(() => {
        throw(Error('should not be reached'));
      }, error => {
        expect(error.status).toBe(errorCode);
        expect(error.statusText).toBe(errorText);
      });
      const req = httpClient.expectOne(`/product/${product_id}`);
      req.error(new ErrorEvent(''), {status: errorCode, statusText: errorText});
      expect(req.request.method).toBe('DELETE');
      httpClient.verify();
    })
  });

  describe('getProductNames', () => {
    const productName = 'iPhone';
    const res = [new Product()];
    it('Should success', () => {
      service.getProductNames(productName).subscribe(res => {
        expect(res).toBe(res);
      }, () => {
        throw(Error('should not be reached'));
      });
      const req = httpClient.expectOne(`/products/byName/${productName}`);
      req.flush(res);
      expect(req.request.method).toBe('GET');
      httpClient.verify();
    });

    it('Should return error if req fails', () => {
      const errorText = 'Server error';
      const errorCode = 500;
      service.getProductNames(productName).subscribe(() => {
        throw(Error('should not be reached'));
      }, error => {
        expect(error.status).toBe(errorCode);
        expect(error.statusText).toBe(errorText);
      });
      const req = httpClient.expectOne(`/products/byName/${productName}`);
      req.error(new ErrorEvent(''), {status: errorCode, statusText: errorText});
      expect(req.request.method).toBe('GET');
      httpClient.verify();
    })
  });

});
