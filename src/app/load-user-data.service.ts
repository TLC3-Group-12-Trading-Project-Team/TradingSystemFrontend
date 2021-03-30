import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class LoadUserDataService {

  constructor() { }
  loadData(){
    return JSON.parse(localStorage.getItem('userData'));
  }
}
