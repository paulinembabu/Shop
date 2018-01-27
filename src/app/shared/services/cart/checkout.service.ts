import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {BaseService} from '../base/base.service';
import {Cart} from '../../models/cart';
import {Checkout} from '../../models/checkout';
import {ShippingEstimate} from '../../models/shipping-estimate';

@Injectable()
export class CheckoutService extends BaseService {
    checkout(checkoutPhone: string, paymentPhone: string, checkoutName: string, checkoutEmail: string, checkoutLocation: string,
             checkoutBuilding: string, checkoutFloor, subTotal: number, shippingCost: number,
             total: number, items: any, deliveryLocation: any): Observable<any> {
        /**
         * {"items":
         *  [{"id":3,"name":"Another Product",
         *  "image_url":"http://test.nouveta.tech/girlstuff/api/public/product-images/Z4EVeGD18gdL6MFangkf.jpg",
         *  "price":"5000.00","quantity":1,"options":[]}],"checkout_method":0,"payment_method":0,"profile":null,"
         *  card":null,"checkout_phone":"0728048896","payment_phone":"0728048896","is_checking_out":true,
         *  "is_order_processing":false,"card_params":""}
         */
        const checkout = new Checkout();
        checkout.items = items;
        checkout.checkout_phone = checkoutPhone;
        checkout.payment_phone = paymentPhone;
        checkout.name = checkoutName;
        checkout.email = checkoutEmail;
        checkout.location = checkoutLocation;
        checkout.building = checkoutBuilding;
        checkout.floor = checkoutFloor;
        checkout.shipping_cost = shippingCost;
        checkout.sub_total = subTotal;
        checkout.total = total;
        checkout.payment_method = 0;
        checkout.delivery_lat = deliveryLocation.lat;
        checkout.delivery_long = deliveryLocation.lng;
        return this.post('checkout', checkout);
    }

    searchLocation(location: string): Observable<any> {
        return this.get('https://maps.googleapis.com/maps/api/place/autocomplete/json?input=' + location +
            '&types=geocode&language=en&key=AIzaSyDV5zxg6Oj-mdq_vAM4m9CvcjRMu6e3Q4M');
    }

    shippingEstimate(lat: any, long: any, location: string, name: string, email: string, phone: string): Observable<any> {
        const url = 'delivery/quote';
        const estimate = new ShippingEstimate();
        estimate.lat = lat;
        estimate.long = long;
        estimate.location = location;
        estimate.email = email;
        estimate.phone = phone;
        estimate.name = name;
        return this.post(url, estimate);
    }

}
