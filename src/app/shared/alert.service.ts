import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";

type TypeMessage = 'success' | 'error' | 'warning';

@Injectable({
    providedIn: 'root'
})
export class AlertService {


    constructor(
        private toastr: ToastrService
    ) { }

    resolve(type: TypeMessage, message: string, title: string = '') {
        this.toastr[type](message, title);
    }

}