import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage : Storage) { }
  storeJWToken(token : String) : Promise<any>{
    return this.storage.set('jwtoken', token);
  }
  getJWToken() : Promise<String>  {
    return this.storage.get('jwtoken');
  }
  clearJWToken() : Promise<any>  {
    return this.storage.remove('jwtoken');
  }
}
