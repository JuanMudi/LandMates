import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  private headerState = new BehaviorSubject<any>(null);

  headerState$ = this.headerState.asObservable();

  setHeaderState(newState: any) {
    this.headerState.next(newState);
  }
}
