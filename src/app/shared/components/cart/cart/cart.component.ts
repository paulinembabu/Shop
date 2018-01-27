import {Component, OnInit, OnDestroy} from '@angular/core';
import {CartService} from '../../../services/cart/cart.service';
import {Cart} from '../../../models/cart';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {
    items: any;
    total: number;
    itemCount: number;
    cart: Observable<Cart>;
    private cartSubscription: Subscription;

    constructor(private cartService: CartService) {
    }

    ngOnInit() {
        this.cart = this.cartService.get();
        this.cartSubscription = this.cart.subscribe((cart) => {
            this.items = cart.items;
            this.total = this.cartService.cartTotal(cart);
            this.itemCount = cart.items.map((item) => item.quantity).reduce((p, n) => p + n, 0);
        });
    }

    emptyCart(): void {
        this.cartService.clear();
    }

    public ngOnDestroy(): void {
        if (this.cartSubscription) {
            this.cartSubscription.unsubscribe();
        }
    }

}
