import {Component, OnDestroy, OnInit} from '@angular/core';
import {CategoryService} from '../../services/categories/category.service';
import {Subscription} from 'rxjs/Subscription';
import {Observable} from 'rxjs/Observable';
import {Cart} from '../../models/cart';
import {CartService} from '../../services/cart/cart.service';
import {Router} from '@angular/router';


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
    menus;
    items: any;
    total: number;
    itemCount: number;
    cart: Observable<Cart>;
    private cartSubscription: Subscription;

    searchQuery: any;
    searchCategoryId: any;

    constructor(private categoriesService: CategoryService, private cartService: CartService, private router: Router) {
    }

    ngOnInit() {
        this.categoriesService.getMenuCategories().subscribe(
            data => {
                // TODO
                this.menus = data.data;
            },
            error => {
                console.log(error);
            }
        );
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

    public formatMenuLink(name: String): String {
        // TODO:
        const link = name.split(' ');
        return link.join('-');
    }

    public search(event: any): void {
        event.preventDefault();
        if (this.searchQuery.length > 0) {
            this.router.navigate(['/search', {query: this.searchQuery}]);
        }
    }

    public ngOnDestroy(): void {
        if (this.cartSubscription) {
            this.cartSubscription.unsubscribe();
        }
    }

    removeItem(item: any) {
        this.cartService.removeItem(item);
    }

}
