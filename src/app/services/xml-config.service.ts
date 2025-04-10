import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class XmlConfigService {
  private configUrl = 'assets/config.xml';

  constructor(private http: HttpClient) {}

  getValueByKey(key: string): Observable<string | null> {
    return this.http.get(this.configUrl, { responseType: 'text' }).pipe(
      map((data) => {
        // console.log('Raw XML Data:', data);
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data, 'application/xml');
        const settingElements = xmlDoc.getElementsByTagName('setting');

        for (let i = 0; i < settingElements.length; i++) {
          if (settingElements[i].getAttribute('key') === key) {
            return settingElements[i].textContent;
          }
        }
        return null;
      })
    );
  }
}