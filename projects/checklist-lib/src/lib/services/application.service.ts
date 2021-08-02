import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment.prod';

// declare var $: any;
@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  constructor(private http: HttpClient) { }

  // save(url?, formData?, headers?) {
  //   return this.http.post(url, formData, {headers})
  //     .pipe(
  //       map((res: any) => {
  //         return res;
  //       })
  //     );
  // }

  makeServerCall(params, slug) {
    return this.http.post(environment.baseUrl + slug,  params )
      .pipe(
        map((res: any) => {
          console.log('GET RESPONSE', res);
          // if ( (res.code === 200) || (res.status == "success")) {
            // console.log('Res:', res);
            return res;
          // } else {
            // return [];
          // }
        })
      );
  }

  /**
  *
  * @param url: api url
  * @param body: data to send in body
  * @param headers: headers to pass in api call
  * function to call post api and returns a observable
  */

  post(url, body, headers?) {
    return this.http.post<any>(url, body, { headers })
      .pipe(
        map((res: any) => {
          // console.log("Response is:",res)
          if (res.code === 200) {
            return res;
          }
          return res;
        })
      );
  }

  /**
  *
  * @param url: api url
  * @param body: data to send in body
  * @param headers: headers to pass in api call
  * function to call post api and returns a observable
  */

  put(url, body, headers?) {
    return this.http.put<any>(url, body, { headers })
      .pipe(
        map((res: any) => {
          // console.log("Response is:",res)
          if (res.code === 200) {
            return res;
          }
          return res;
        })
      );
  }

  basicOathService(masterdataPass) {
      return new HttpHeaders().set('Authorization', 'Basic ' + btoa(masterdataPass));
  }


  gotoTop() {
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
  }


}
