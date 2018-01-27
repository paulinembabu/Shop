import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {CategoryService} from '../../shared/services/categories/category.service';
import 'rxjs/add/operator/switchMap';
import {Observable} from 'rxjs/Observable';
import {Cart} from '../../shared/models/cart';
import {CartService} from '../../shared/services/cart/cart.service';
import {Subscription} from 'rxjs/Subscription';
import {ProductService} from '../../shared/services/products/product.service';

@Component({
    selector: 'app-category',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
    category: any;
    products: any;
    categories: any;
    manufacturers: any;
    options: any;
    priceRange = [0, 0];
    categoryId: any;

    items: any;
    total: number;
    itemCount: number;
    cart: Observable<Cart>;
    private cartSubscription: Subscription;
    public perPage = 15;
    public pages = [];
    public activePage = 0;
    public sortBy = 1;

    constructor(private route: ActivatedRoute, private categoriesService: CategoryService,
                private productsService: ProductService, private cartService: CartService) {
    }

    ngOnInit() {
        this.route.paramMap
            .subscribe((params => {
                try {
                    const data = params.get('id').split('-');
                    this.categoryId = data[data.length - 1];
                    this.getCategory(this.categoryId);
                } catch (e) {
                    const query = params.get('query');
                    this.search(query);
                }
            }));
        this.cart = this.cartService.get();
        this.cartSubscription = this.cart.subscribe((cart) => {
            this.items = cart.items;
            this.itemCount = cart.items.map((item) => item.quantity).reduce((p, n) => p + n, 0);
        });
    }

    public formatMenuLink(name: String): String {
        // TODO:
        const link = name.split(' ');
        return link.join('-');
    }

    getCategory(id: any) {
        // TODO
        this.categoriesService.getCategory(id)
            .subscribe(data => {
                    // TODO
                    this.category = data.data;
                    this.products = this.category.products;
                    this.options = this.category.options;
                    this.manufacturers = this.category.manufacturers;
                    this.categories = this.category.categories;
                    this.priceGetRange();
                    this.paginate();
                },
                error => {
                    // TODO
                });
    }

    sort(event: any, by: number) {
        event.preventDefault();
        this.sortBy = by;
        if (this.sortBy === 1) {
            this.products = this.products.sort(function (a, b) {
                return a.price - b.price;
            });
        } else if (this.sortBy === 2) {
            this.products = this.products.sort(function (a, b) {
                return b.price - a.price;
            });
        } else {
            this.products = this.products.sort(function (a, b) {
                return b.name > a.name ? -1 : 1;
            });
        }
        this.paginate();
    }

    priceGetRange() {
        this.priceRange = [0, 0];
        for (const product of this.products) {
            if(product.price > this.priceRange[1]) {
                this.priceRange[1] = product.price;
            }
            if(product.price < this.priceRange[0]) {
                this.priceRange[0] = product.price;
            }
        }
    }

    display(event: any, perPage: number) {
        event.preventDefault();
        this.perPage = perPage;
        this.paginate();
    }

    paginate() {
        const products = this.products;
        const perPage = this.perPage;
        this.pages = this.products.map(function (e, i) {
            return i % perPage === 0 ? products.slice(i, i + perPage) : null;
        }).filter(function (e) {
            return e;
        });
    }

    show(event: any, page: number) {
        event.preventDefault();
        this.activePage = page;
    }

    private search(query: any) {
        console.log(query);
        this.productsService.search(query)
            .subscribe(data => {
                this.category = data.data;
                this.products = this.category.products;
                this.options = [];
                this.manufacturers = this.category.manufacturers;
                this.categories = this.category.categories;
                this.paginate();
                this.priceGetRange();
            }, error => {
                // TODO
            });
    }
}
