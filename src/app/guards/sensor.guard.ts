import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {FreedrumService} from '../services/freedrum.service';

@Injectable({
  providedIn: 'root'
})
export class SensorGuard implements CanActivate {
  constructor(private router: Router, private freedrum: FreedrumService) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    /*
    if (this.freedrum.activeSensors > 0) {
      return true;
    } else {
      this.router.navigate(['']);
    }
     */
    return true;
  }

}
