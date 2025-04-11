import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { environment } from '../../environment/environmant';
import { XmlConfigService } from './xml-config.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  tenantId:any;
  constructor(private http: HttpClient,
    private xmlConfigService: XmlConfigService
  ) { }

 
  getConfigValues(){
    
  }

  getResponse(userText: any): Observable<any> {
    return this.xmlConfigService.getValueByKey('applicationname').pipe(
      catchError((err: any) => {
        console.error('Failed to fetch application name from XML:', err);
        return throwError(() => new Error('Could not load application name'));
      }),
      switchMap((tenantId: any) => {
        if (!tenantId) return throwError(() => new Error('Tenant ID is undefined'));
  
        const url = `${environment.chatUrl}/${tenantId}/?search_query=${userText}`;
        return this.http.post<any>(url, {}).pipe(
          catchError((err: any) => {
            console.error('Failed to fetch data from API:', err);
            return throwError(() => new Error('Failed to fetch chat response'));
          })
        );
      })
    );
  }
  
  
  
}
