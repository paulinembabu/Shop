import {Injectable} from '@angular/core';
import {BaseService} from '../base/base.service';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class ProductService extends BaseService {

    getAll(): Observable<any> {
        return this.get('products');
    }

    getRecommendations(): Observable<any> {
        return this.get('products/recommendations');
    }

    getBestselling(): Observable<any> {
        return this.get('products/bestselling');
    }

    getTopProducts(): Observable<any> {
        return this.get('products/top');
    }

    getBanners(): Observable<any> {
        return this.get('banners/active');
    }

    search(query: any): Observable<any>  {
        return this.post('search', {search: query});
    }
}
