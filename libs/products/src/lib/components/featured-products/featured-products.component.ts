import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Product } from '../../models/product';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'products-featured-products',
  templateUrl: './featured-products.component.html',
  styleUrls: ['./featured-products.component.scss'],
})
export class FeaturedProductsComponent implements OnInit, OnDestroy {
  featuredProducts: Product[] = [];
  endsubs$: Subject<any> = new Subject();

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this._getFeaturedProducts();
  }

  ngOnDestroy() {
    this.endsubs$.next();
    this.endsubs$.complete();
  }

  private _getFeaturedProducts() {
    this.productsService
      .getFeaturedProducts(4)
      .pipe(takeUntil(this.endsubs$))
      .subscribe((products) => {
        this.featuredProducts = products;
      });
  }
}
