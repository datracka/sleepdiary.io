import { NgModule }            from '@angular/core';
import { CommonModule }        from '@angular/common';
import {Footer} from "./footer/footer";
import {Header} from "./header/header";
import {Drawer} from "./drawer/drawer";
import {MdlModule} from "angular2-mdl";

@NgModule({
    imports:      [ CommonModule, MdlModule ],
    declarations: [ Footer, Header, Drawer ],
    exports:      [ Footer, Header,
        CommonModule, Drawer, MdlModule ]
})
export class SharedModule { }