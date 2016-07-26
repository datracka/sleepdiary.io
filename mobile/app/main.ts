// this import should be first in order to load some required settings (like globals and reflect-metadata)

//test
/// <reference path="../../typings/globals/lodash/index.d.ts" />
import * as _ from 'lodash';

//nativescript
import {nativeScriptBootstrap} from "nativescript-angular/application";
import {NS_ROUTER_DIRECTIVES, nsProvideRouter} from 'nativescript-angular/router';

// angular
import {provide, enableProdMode} from '@angular/core';

// config
//import {CoreConfigService, WindowService, HttpService} from './src/frameworks/core/index';
//CoreConfigService.PLATFORM_TARGET = CoreConfigService.PLATFORMS.MOBILE_NATIVE;
//CoreConfigService.DEBUG.LEVEL_4 = true;
//CoreConfigService.ROUTER_DIRECTIVES = NS_ROUTER_DIRECTIVES;

import {AppComponent} from "./app.component";

let nestedArray = [1, 2, [3, 4, [5, 6], 7]];
let flattenedArray = _.flatten(nestedArray, true);

nativeScriptBootstrap(AppComponent);