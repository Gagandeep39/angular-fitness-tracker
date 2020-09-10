import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  loadStateChanged = new Subject<boolean>();

  constructor() { }
}
