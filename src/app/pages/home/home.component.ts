import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ProductService} from '../../shared/services/products/product.service';
import {CategoryService} from '../../shared/services/categories/category.service';
import {CartService} from '../../shared/services/cart/cart.service';
import {Subscription} from 'rxjs/Subscription';
import {Observable} from 'rxjs/Observable';
import {Cart} from '../../shared/models/cart';
import {BsModalComponent} from 'ng2-bs3-modal';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {

    topProducts: any;
    topCategories: any;
    bestSelling: any;
    recommendations: any;

    items: any;
    total: number;
    itemCount = 0;
    cart: Observable<Cart>;
    private cartSubscription: Subscription;

    constructor(private productsService: ProductService, private categoriesService: CategoryService, private cartService: CartService) {
    }

    ngOnInit() {
        this.getTopCategories();
        this.getBestSelling();
        this.getTopProducts();
        this.getRecommendations();

        this.cart = this.cartService.get();
        this.cartSubscription = this.cart.subscribe((cart) => {
            this.items = cart.items;
            this.itemCount =  cart.items.map((item) => item.quantity).reduce((p, n) => p + n, 0);
        });
    }

    ngAfterViewInit(): void {
        // this.modal.open('lg');
    }

    getTopProducts() {
        this.productsService.getTopProducts()
            .subscribe(data => {
                    // TODO
                    this.topProducts = data.data;
                },
                error => {
                    // TODO
                });
    }

    getTopCategories() {
        this.categoriesService.getTopCategories()
            .subscribe(data => {
                    // TODO
                    this.topCategories = data.data;
                },
                error => {
                    // TODO
                });
    }

    getBestSelling() {
        this.productsService.getBestselling()
            .subscribe(data => {
                    // TODO
                    this.bestSelling = data.data;
                },
                error => {
                    // TODO
                });
    }

    getRecommendations() {
        this.productsService.getRecommendations()
            .subscribe(data => {
                    // TODO
                    this.recommendations = data.data;
                },
                error => {
                    // TODO
                });
    }

    ngOnDestroy(): void {
        if (this.cartSubscription) {
            this.cartSubscription.unsubscribe();
        }
    }
}
