import {Component, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {AboutDialogComponent} from "../../dialog/about/about-dialog.component";

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.css']
})

export class FooterComponent implements OnInit {
    git = 'https://github.com/toleubekbogenbai';
    tg = 'https://t.me/ToleubekBS';

    constructor() {
    }

    ngOnInit() {
    }


}
