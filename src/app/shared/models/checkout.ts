export class Checkout {
    /**
     * {"items":
         *  [{"id":3,"name":"Another Product",
         *  "image_url":"http://test.nouveta.tech/girlstuff/api/public/product-images/Z4EVeGD18gdL6MFangkf.jpg",
         *  "price":"5000.00","quantity":1,"options":[]}],"checkout_method":0,"payment_method":0,"profile":null,"
         *  card":null,"checkout_phone":"0728048896","payment_phone":"0728048896","is_checking_out":true,
         *  "is_order_processing":false,"card_params":""}
     */
    public items: any;
    public checkout_method = 0;
    public payment_method = 0;
    public profile: any = null;
    public checkout_phone: string;
    public payment_phone: string;
    public card_params: string;
    public name: string;
    public email: string;
    public location: string;
    public building: string;
    public floor: string;
    public shipping_cost: number;
    public sub_total: number;
    public total: number;
    public delivery_long: any;
    public delivery_lat: any;
}
