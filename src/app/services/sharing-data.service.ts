import { EventEmitter, Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class SharingDataService {


    //se usara para pasar al padre el usuario creado quu seria user-app
    
   private _newUserEventeEmmiter: EventEmitter<User> = new EventEmitter();

     //creamos el eventmitter para trasmitir al componente padre con output
private _idUserEventEmmiter = new EventEmitter();

private _findUSerByIDEventEmmiter = new EventEmitter();

private _selectUserEventEmmiter = new EventEmitter();

private _errorsUserFormEmmiter = new EventEmitter();

private _pageUsersEventEmmiter = new EventEmitter();

private _handlerLoginEventEmitter = new EventEmitter();


  constructor() { }

  get newUserEventeEmmiter(): EventEmitter<User>{
    return this._newUserEventeEmmiter;
  }

  get pageUsersEventEmmiter(){
    return this._pageUsersEventEmmiter;
  }

  get idUserEventEmmiter(): EventEmitter<number>{
    return this._idUserEventEmmiter;
  }

  get findUSerByIDEventEmmiter(){
    return this._findUSerByIDEventEmmiter;
  }

  get selectUserEventEmmiter(){
    return this._selectUserEventEmmiter;
  }

  get errorsUserFormEmmiter(){
    return this._errorsUserFormEmmiter;
  }

  get handlerLoginEventEmitter(){
    return this._handlerLoginEventEmitter;
  }

}
