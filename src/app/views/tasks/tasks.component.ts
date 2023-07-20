import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Task} from 'src/app/model/Task';
import {DataHandlerService} from "../../service/data-handler.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import {EditTaskDialogComponent} from "../../dialog/edit-task-dialog/edit-task-dialog.component";
import {ConfirmDialogComponent} from "../../dialog/confirm-dialog/confirm-dialog.component";
import {Category} from "../../model/Category";

@Component({
    selector: 'app-tasks',
    templateUrl: './tasks.component.html',
    styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

    private displayedColumns: string[] = ['color', 'id', 'title', 'date', 'priority', 'category',  'select','operations',];
    private dataSource: MatTableDataSource<Task>;

    @ViewChild(MatPaginator, {static: false}) private paginator: MatPaginator;
    @ViewChild(MatSort, {static: false}) private sort: MatSort;

    private tasks: Task[];


    @Input('tasks')
    private set setTasks(tasks: Task[]) {
        this.tasks = tasks;
        this.fillTable();
    }
    @Output()
    selectCategory = new EventEmitter<Category>();

    @Output()
    updateTask = new EventEmitter<Task>();

    @Output()
    deleteTask = new EventEmitter<Task>();

    constructor(
        private dataHandler: DataHandlerService,
        private dialog: MatDialog,) {
    }

    ngOnInit() {

        this.dataSource = new MatTableDataSource();
        this.fillTable();
    }

    private getPriorityColor(task: Task): string {

        if (task.completed) {
            return '#f8f9fa';
        }

        if (task.priority && task.priority.color) {
            return task.priority.color;
        }
        return '#fff';
    }

    private fillTable(): void {

        if (!this.dataSource) {
            return;
        }

        this.dataSource.data = this.tasks;

        this.addTableObject();

        this.dataSource.sortingDataAccessor = (task, colName) => {
            switch (colName) {
                case 'priority': {
                    return task.priority ? task.priority.id : null;
                }
                case 'category': {
                    return task.category ? task.category.title : null;
                }
                case 'date': {
                    return task.date ? task.date.toDateString() : null;
                }
                case 'title': {
                    return task.title;
                }
            }
        };
    }

    private addTableObject(): void {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    }

    private openEditTaskDialog(task: Task): void {
        const dialogRef = this.dialog.open(EditTaskDialogComponent, {
            data: [task, 'Редактирование задачи'],
            autoFocus: false
        })

        dialogRef.afterClosed().subscribe(result => {
            if(result === 'complete'){
                task.completed = true;
                this.updateTask.emit(task);
                return;
            }
            if(result === 'activate'){
                task.completed = false;
                this.updateTask.emit(task);
                return;
            }
            if (result === 'delete') {
                this.deleteTask.emit(task);
                return;
            }

            if (result as Task) {
                this.updateTask.emit(task);
                return;
            }
        });

    }
    private openDeleteDialog(task: Task) {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            maxWidth: '500px',
            data: {
                dialogTitle: 'Подтвердите действие',
                message: `Вы действительно хотите удалить "${task.title}"?`,
            },
            autoFocus: false,
        });
        dialogRef.afterClosed().subscribe(result => {
            this.deleteTask.emit(task);
        })
    }

    private onToggleStatus(task: Task){
        task.completed = !task.completed;
        this.updateTask.emit(task);
    }
    private onSelectCategory(category: Category){
        this.selectCategory.emit(category);
    }

}
