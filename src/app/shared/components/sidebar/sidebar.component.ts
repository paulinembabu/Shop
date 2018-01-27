import {Component, OnDestroy, OnInit} from '@angular/core';
import {CartService} from '../../services/cart/cart.service';
import {Subscription} from 'rxjs/Subscription';
import {Observable} from 'rxjs/Observable';
import {Cart} from '../../models/cart';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {
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
            this.itemCount = cart.items.map((item) => item.quantity).reduce((p, n) => p + n, 0);
        });
    }
    public ngOnDestroy(): void {
        if (this.cartSubscription) {
            this.cartSubscription.unsubscribe();
        }
    }

}
