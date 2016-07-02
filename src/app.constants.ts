import { Injectable } from '@angular/core';

/*
@deprecated 
 */
@Injectable()
export class Configuration {
    public Server: string = "http://localhost:8080";
    public ApiUrl: string = "";
    public ServerWithApiUrl = this.Server + this.ApiUrl;
}