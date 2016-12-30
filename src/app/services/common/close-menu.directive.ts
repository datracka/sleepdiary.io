import {ElementRef, Renderer, OnInit, Directive, HostListener} from "@angular/core";

@Directive({selector: '[closeDrawerOnClick]'})
export class CloseMenuDirective {

    constructor(private el: ElementRef, private renderer: Renderer) {
    }

    /**
     * TODO: quick fix for closing mdl drawer when click in
     * option menu but access DOM imperatively not Angular oriented!
     */
    @HostListener('click') onClick() {
        if (this.el) {
            this.renderer.setElementClass(this.el.nativeElement, 'is-visible', false);
            let obfuscator = document.querySelector('.mdl-layout__obfuscator');
            this.renderer.setElementClass(obfuscator, 'is-visible', false);
        }
    }
}