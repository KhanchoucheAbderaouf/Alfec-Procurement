import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalsService {
  urlAddress: string = 'http://' + window.location.hostname
  spanValue: string;
  searchResults : any[] = [];

  constructor() { }
}
