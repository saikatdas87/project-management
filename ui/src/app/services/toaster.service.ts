import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {filter} from 'rxjs/operators';

export interface Toast {
  type: ToastType;
  title: string;
  body: string;
  delay: number;
}
export type ToastType = 'success' | 'error' | 'warning';

@Injectable({
  providedIn: 'root',
})
export class ToasterService {

  subject: BehaviorSubject<Toast>;
  toast$: Observable<Toast>;

  constructor() {
    // @ts-ignore
    this.subject = new BehaviorSubject<Toast>(null);
    this.toast$ = this.subject.asObservable()
      .pipe(filter(toast => toast !== null));
  }

  show(type: ToastType, title?: string, body?: string, delay?: number) {
    this.subject.next(<Toast>{type, title, body, delay});
  }
}
