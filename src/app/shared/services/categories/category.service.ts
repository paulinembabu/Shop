import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {BaseService} from '../base/base.service';

@Injectable()
export class CategoryService extends BaseService {

    getAll(): Observable<any> {
        return this.get('categories');
    }

    getCategory(id: any): Observable<any> {
        return this.get('categories/' + id);
    }

    getMenuCategories(): Observable<any> {
        return this.get('categories/menu');
        // .map((response: Response) => response.json());
    }

    getTopCategories(): Observable<any> {
        return this.get('categories/top');
        // .map((response: Response) => response.json());
    }

}
