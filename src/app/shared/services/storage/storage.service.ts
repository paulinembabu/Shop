import {Injectable} from '@angular/core';
import 'rxjs/add/operator/share';
import {Observable} from 'rxjs/Observable';

export abstract class StorageService {
    public abstract get(): Storage;
}
// tslint:disable-next-line:max-classes-per-file
@Injectable()
export class LocalStorageService extends StorageService {
    get(): Storage {
        return localStorage;
    }

}
