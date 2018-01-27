import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../../../models/product';
import {CartService} from '../../../services/cart/cart.service';

@Component({
    selector: 'app-cart-item',
    templateUrl: './cart-item.component.html',
    styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {
    @Input()
    item: any

    constructor(private cartService: CartService) {
    }

    ngOnInit() {
    }

    removeItem(item: any) {
        this.cartService.removeItem(item);
    }

    removeItemQuantity(item: any) {
        this.cartService.removeItemQuantity(item);
    }

    addItemQuantity(item: any) {
        this.cartService.addItemQuantity(item);
    }

    updateCart(productOptionId: any) {
        this.cartService.updateItem(this.item);
    }

    outOfStock(productOption: any) {
        return productOption.quantity <= 0;
    }
}
