import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import { Task } from 'src/app/model/Task';
import {DataHandlerService} from "../../service/data-handler.service";
import {Category} from "../../model/Category";
import {Priority} from "../../model/Priority";
import {Observable} from "rxjs";
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'app-edit-task-dialog',
  templateUrl: './edit-task-dialog.component.html',
  styleUrls: ['./edit-task-dialog.component.css']
})
export class EditTaskDialogComponent implements OnInit {
  private categories: Category[];
  private priority: Priority[];

  private dialogTitle: string;
  private task: Task;

  private tmpTitle: string;
  private tmpCategory: Category;
  private tmpPriority: Priority;
  private tmpDate: Date;

  constructor(
      private dialogRef: MatDialogRef<EditTaskDialogComponent>,
      @Inject(MAT_DIALOG_DATA)
      private data: [Task, string],
      private dataHandler: DataHandlerService,
      private dialog: MatDialog,

  ) { }



  ngOnInit() {
    this.task = this.data[0];
    this.dialogTitle = this.data[1];

    this.tmpTitle = this.task.title;
    this.tmpCategory = this.task.category;
    this.tmpPriority = this.task.priority;
    this.tmpDate = this.task.date;

    this.dataHandler.getAllCategories().subscribe(items => this.categories = items);
    this.dataHandler.getAllPriority().subscribe(items => this.priority = items);

  }

  private onConfirm(): void {
    this.task.title = this.tmpTitle;
    this.task.category = this.tmpCategory;
    this.task.priority = this.tmpPriority;
    this.task.date = this.tmpDate;

    this.dialogRef.close(this.task);
  }

  private onCancel(): void {
    this.dialogRef.close(null);
  }

  private delete() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '500px',
      data: {
        dialogTitle: 'Подтвердите действие',
        message: `Вы действительно хотите удалить "${this.task.title}"?`,
      },
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe( result => {
      if(result){
        this.dialogRef.close('delete');
      }
    });
  }

  private complete(){
    this.dialogRef.close('complete');
  }
  private activate(){
    this.dialogRef.close('activate');
  }

}
