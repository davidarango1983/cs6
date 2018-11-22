import { Injectable } from '@angular/core';

@Injectable({
providedIn : 'root'
})
export class Url {

 staticRoutes = {
 'apiEndPoint': 'http://localhost:8080/csAdmin',
 'menu': '/assets/menu/menu.json'
 };

 toBackend = {
    'resume' : this.staticRoutes.apiEndPoint + '/resume',
    'conversions' : this.staticRoutes.apiEndPoint + '/conversions',
    'masterIds' : this.staticRoutes.apiEndPoint + '/master/cs',
    'masterUsers' : this.staticRoutes.apiEndPoint + '/master/user',
    'masterExtension' : this.staticRoutes.apiEndPoint + '/master/extension'

 };


}
