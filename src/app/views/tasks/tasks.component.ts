import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import { Task } from 'src/app/model/Task';
import {DataHandlerService} from "../../service/data-handler.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  private displayedColumns:string[] = ['color', 'id', 'title', 'date', 'priority', 'category'];
  private dataSource: MatTableDataSource<Task>;

  @ViewChild(MatPaginator,{static:false}) private paginator: MatPaginator;
  @ViewChild(MatSort,{static:false}) private sort: MatSort;

  private tasks: Task[];


  @Input('tasks')
  private set setTasks(tasks: Task[]){
    this.tasks = tasks;
    this.fillTable();
  }
  @Output()
  updateTask = new EventEmitter<Task>();

  constructor(private dataHandler: DataHandlerService) { }

  ngOnInit() {

    this.dataSource = new MatTableDataSource();
    this.fillTable();
  }

  toggleTaskCompleted(task: Task){
     task.completed = !task.completed;
  }

  private getPriorityColor(task: Task) : string {

    if(task.completed){
      return '#f8f9fa';
    }

    if(task.priority && task.priority.color){
      return task.priority.color;
    }
    return '#fff';
  }

  private fillTable(){

    if (!this.dataSource){
      return;
    }

    this.dataSource.data = this.tasks;

    this.addTableObject();

    this.dataSource.sortingDataAccessor = (task,colName) => {
      switch (colName){
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

  private addTableObject(){
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  private onClickTask(task: Task){
    this.updateTask.emit(task);
  }




}
