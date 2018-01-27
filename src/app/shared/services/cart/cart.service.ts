import {Injectable} from '@angular/core';
import {StorageService} from '../storage/storage.service';
import {Observable} from 'rxjs/Observable';
import {Cart} from '../../models/cart';
import {Observer} from 'rxjs/Observer';
import {CartItem} from '../../models/cart-item';

const CART_KEY = 'cart';

@Injectable()
export class CartService {
    private storage: Storage;
    private cartItems: any;
    private cartObservable: Observable<Cart>;
    private subscribers: Array<Observer<Cart>> = [];

    constructor(private storageService: StorageService) {
        this.storage = this.storageService.get();
        this.cartObservable = new Observable<Cart>((observer: Observer<Cart>) => {
            this.subscribers.push(observer);
            observer.next(this.retrieve());
            return () => {
                this.subscribers = this.subscribers.filter((obs) => obs !== observer);
            };
        });
    }

    public get(): Observable<Cart> {
        return this.cartObservable;
    }

    public clear(): void {
        const newCart = new Cart();
        this.save(newCart);
        this.dispatch(newCart);
    }

    public cartTotal(cart: Cart): any {
        // .map((item) => item.quantity * this.products.find((p)=> p.id === item.productId).price)
        return cart.items
            .map((item) => item.quantity * item.price)
            .reduce((previous, current) => previous + current, 0);
    }

    public addItem(product: any, quantity: number): void {
        const cart = this.retrieve();
        let item = cart.items.find((c) => c.productId === product.id);
        if (!item) {
            item = new CartItem();
            item.id = product.id;
            item.productId = product.id;
            item.name = product.name;
            item.price = product.price;
            item.quantity = 0;
            item.options = [];
            item.imageUrl = product.image_url;
            item.options = [];
            for (const option of product.options) {
                item.options.push({
                    name: option.name,
                    id: option.id,
                    product_option_id: -1, product_options: option.product_options
                }); // = product.options;
            }
            cart.items.push(item);
        }
        item.quantity += quantity;
        cart.items = cart.items.filter((cartItem) => cartItem.quantity > 0);
        this.cartTotal(cart);
        this.save(cart);
        this.dispatch(cart);
    }

    public retrieve(): Cart {
        const cart = new Cart();
        const storedCart = this.storage.getItem(CART_KEY);
        if (storedCart) {
            cart.updateFrom(JSON.parse(storedCart));
        }
        if (!cart.items) {
            cart.items = [];
        }
        return cart;
    }

    private dispatch(newCart: Cart) {
        this.subscribers.forEach((sub) => {
            try {
                sub.next(newCart);
            } catch (e) {
                // TODO
            }
        });
    }

    private save(newCart: Cart) {
        this.storage.setItem(CART_KEY, JSON.stringify(newCart));
    }

    removeItem(product: any) {
        const cart = this.retrieve();
        const item = cart.items.find((c) => c.productId === product.id);
        if (item) {
            cart.items.splice(cart.items.indexOf(item), 1);
        }
        this.cartTotal(cart)
        this.save(cart);
        this.dispatch(cart);
    }

    removeItemQuantity(product: any) {
        const cart = this.retrieve();
        const item = cart.items.find((c) => c.productId === product.id);
        if (item) {
            item.quantity--;
            if (item.quantity <= 0) {
                this.removeItem(product);
            }
        }
        this.cartTotal(cart)
        this.save(cart);
        this.dispatch(cart);
    }

    addItemQuantity(product: any) {
        const cart = this.retrieve();
        const item = cart.items.find((c) => c.productId === product.id);
        if (item) {
            item.quantity++;
        }
        this.cartTotal(cart)
        this.save(cart);
        this.dispatch(cart);
    }

    updateItem(cartItem: any) {
        const cart = this.retrieve();
        const item = cart.items.find((c) => c.id === cartItem.id);
        const index = cart.items.indexOf(item);
        if (item) {
            cart.items[index] = cartItem;
        }
        this.save(cart);
    }
}
