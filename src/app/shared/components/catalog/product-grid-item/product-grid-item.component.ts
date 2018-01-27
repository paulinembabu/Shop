import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {CartService} from '../../../services/cart/cart.service';
import {BsModalComponent} from 'ng2-bs3-modal';

@Component({
    selector: 'app-product-grid-item',
    templateUrl: './product-grid-item.component.html',
    styleUrls: ['./product-grid-item.component.css']
})
export class ProductGridItemComponent implements OnInit, AfterViewInit {
    @Input()
    product: any;

    @Input()
    resize = false;

    @ViewChild('modal')
    modal: BsModalComponent;

    constructor(private cartService: CartService) {
    }

    ngOnInit() {
        this.resize = true;
    }

    ngAfterViewInit(): void {
        // this.modal.open('lg');
    }

    addToCart(product: any): void {
        // TODO;
        this.cartService.addItem(product, 1);
        // TODO: Navigate
    }

    productView(product: any): void {
        this.modal.open('lg');
    }

    outOfStock() {
        return this.product.quantity <= 0 && this.product.options.length == 0;
    }
}
