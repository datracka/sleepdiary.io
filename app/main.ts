import "reflect-metadata";
import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {AppModule} from "./src/app.module";
require('zone.js/dist/zone');

platformBrowserDynamic().bootstrapModule(AppModule);


