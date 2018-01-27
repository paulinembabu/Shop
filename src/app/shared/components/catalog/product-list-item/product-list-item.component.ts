import {Component, Input, OnInit} from '@angular/core';
import {CartService} from '../../../services/cart/cart.service';

@Component({
    selector: 'app-product-list-item',
    templateUrl: './product-list-item.component.html',
    styleUrls: ['./product-list-item.component.css']
})
export class ProductListItemComponent implements OnInit {
    @Input()
    product: any;

    constructor(private cartService: CartService) {
    }

    ngOnInit() {
    }

    addToCart(product: any): void {
        // TODO;
        this.cartService.addItem(product, 1);
        // TODO: Navigate
    }

    outOfStock() {
        return this.product.quantity <= 0 && this.product.options.length == 0;
    }
}
