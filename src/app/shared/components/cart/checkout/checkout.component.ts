import {Component, OnInit} from '@angular/core';
import {CartService} from '../../../services/cart/cart.service';
import {CheckoutService} from '../../../services/cart/checkout.service';
import {Subscription} from 'rxjs/Subscription';
import {Observable} from 'rxjs/Observable';
import {Cart} from '../../../models/cart';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';

@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
    checkoutPhone: string;
    paymentPhone: string;
    checkoutEmail: string;
    checkoutName: string;
    checkoutLocation: string;
    checkoutBuilding: string;
    checkoutFloor: string;
    isProcessing = false;
    isGettingEstimate = false;
    sendyDelivery = false;
    checkoutCard: {
        cardNumber: string,
        cardCvc: string,
        cardExpMonth: string,
        cardExpYear: string
    };
    items: any;
    total: number;
    shippingCost = 0;
    subTotal: number;
    itemCount: number;
    cart: Observable<Cart>;
    paymentMethod = '0';
    locations = [];
    deliveryLocation = null;
    samePhoneNumber: boolean = true;
    // https://maps.googleapis.com/maps/api/place/autocomplete/json?input=Nairobi&types=geocode&language=
    // en&key=AIzaSyDV5zxg6Oj-mdq_vAM4m9CvcjRMu6e3Q4M
    private cartSubscription: Subscription;

    constructor(private cartService: CartService, private checkoutService: CheckoutService, private sanitizer: DomSanitizer) {
    }

    ngOnInit() {
        this.cart = this.cartService.get();
        this.cartSubscription = this.cart.subscribe((cart) => {
            this.items = cart.items;
            this.subTotal = this.cartService.cartTotal(cart);
            this.total = this.cartService.cartTotal(cart) + this.shippingCost;
            this.itemCount = cart.items.map((item) => item.quantity).reduce((p, n) => p + n, 0);
        });
    }
    useSamePhone () {
        if(this.samePhoneNumber) {
            this.paymentPhone = this.checkoutPhone;
        }
    }
    checkout() {
        // if (this.checkoutPhone.length === 0 || this.checkoutPhone.length < 10 || this.checkoutPhone.length > 12) {
        // alert('Enter a valid phone number');
        // return;
        // }
        if (!this.validate()) {
            return;
        }
        this.isProcessing = true;
        this.checkoutService.checkout(this.checkoutPhone, this.paymentPhone, this.checkoutName, this.checkoutEmail, this.checkoutLocation,
            this.checkoutBuilding, this.checkoutFloor, this.subTotal, this.shippingCost, this.total, this.items, this.deliveryLocation)
            .subscribe(data => {
                // TODO
                alert('Your order has been received.Kindly enter pin on your phone to pay');
                this.isProcessing = false;
                this.cartService.clear();
            }, error => {
                // TODO
                this.isProcessing = false;
                alert('An error occurred.');
            });
    }

    autocompleListFormatter(data: any) {
        const html = `<span style='color:black'>${data.name} ${data.id} </span>`;
        return this.sanitizer.bypassSecurityTrustHtml(html);
    }

    validate(): boolean {
        if (this.deliveryLocation === null) {
            alert('Fill in all the details to checkout');
            return false;
        }
        if (this.checkoutPhone.length === 0 || this.checkoutName.length === 0 || this.checkoutEmail.length === 0) {
            alert('Fill in all the details to checkout');
            return false;
        }
        return true;
    }

    getAddress(event: any) {
        const lat = event.geometry.location.lat();
        const lng = event.geometry.location.lng();
        this.deliveryLocation = {lat: lat, lng: lng};
    }

    getShippingEstimate() {
        if (this.validate()) {
            this.isGettingEstimate = true;
            this.checkoutService.shippingEstimate(this.deliveryLocation.lat, this.deliveryLocation.lng,
                this.checkoutLocation, this.checkoutName, this.checkoutEmail, this.checkoutPhone)
                .subscribe(response => {
                    this.isGettingEstimate = false;
                    if (response.status) {
                        this.shippingCost = response.data.amount;
                    } else {
                        this.shippingCost = 0;
                    }
                }, error => {
                    this.isGettingEstimate = false;
                    this.shippingCost = 0;
                    console.log(error);
                });
        }
    }
}
