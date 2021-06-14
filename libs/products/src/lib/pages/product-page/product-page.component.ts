import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Product } from '../../models/product';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'products-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss'],
})
export class ProductPageComponent implements OnInit, OnDestroy {
  product: Product;
  endsubs$: Subject<any> = new Subject();
  quantity: number;

  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      if (param.productid) {
        this._getProduct(param.productid);
      }
    });
  }

  ngOnDestroy() {
    this.endsubs$.next();
    this.endsubs$.complete();
  }

  private _getProduct(id: string) {
    this.productsService
      .getProduct(id)
      .pipe(takeUntil(this.endsubs$))
      .subscribe((product) => {
        this.product = product;
      });
  }

  addProductToCart() {}
}
