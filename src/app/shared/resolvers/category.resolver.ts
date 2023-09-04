// import { ResolveFn } from '@angular/router';

// export const categoryResolver: ResolveFn<boolean> = (route, state) => {
//   return true;
// };

import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class categoryResolver implements Resolve<any> {
  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return of(route.paramMap.get('id'));
  }
}
