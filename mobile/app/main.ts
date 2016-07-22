// this import should be first in order to load some required settings (like globals and reflect-metadata)

//nativescript
import {nativeScriptBootstrap} from "nativescript-angular/application";
import {NS_ROUTER_DIRECTIVES, nsProvideRouter} from 'nativescript-angular/router';

// angular
import {provide, enableProdMode} from '@angular/core';

import {AppComponent} from "./app.component";

nativeScriptBootstrap(AppComponent);