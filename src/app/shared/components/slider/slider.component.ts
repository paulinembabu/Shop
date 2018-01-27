import {Component, OnInit, ViewChild} from '@angular/core';
import {ProductService} from '../../services/products/product.service';
import {OwlCarousel} from 'ngx-owl-carousel';

@Component({
    selector: 'app-slider',
    templateUrl: './slider.component.html',
    styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {
    banners: any;
    images: Array<any> = [];
    @ViewChild('owlElement') owlElement: OwlCarousel;

    constructor(private productsService: ProductService) {
    }

    ngOnInit() {
        this.getBanners();
    }

    fun() {
        // duration 200ms
    }

    getBanners() {
        // TODO
        this.productsService.getBanners()
            .subscribe(data => {
                    // TODO
                    this.banners = data.data;
                    for (const banner of this.banners) {
                        this.images.push({
                            image: banner.image_url,
                            title: 'Test',
                            subtitle: 'hdhdhdhhdhdhhd'
                        });
                    }
                    this.owlElement.next([200]);
                },
                error => {
                    // TODO
                });
    }

}
