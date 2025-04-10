import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environmant';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DecryptService {

  constructor(private http: HttpClient) { }
  
  getEncryptItNo(itNo:any): Observable<any>{
    // return this.http.get(`${environment.EncryDecryUrl}?itineraryno=${itNo}`);
    return this.http.get(`${environment.EncryDecryUrl}/encrpt?encyStr=${itNo}`, {
      responseType: 'text',
    });
  }

  getDecryptItNo(itNo:any): Observable<any>{
    // return this.http.get(`${environment.EncryDecryUrl}?itineraryno=${itNo}`);
    return this.http.get(`${environment.EncryDecryUrl}`);
  }
}
