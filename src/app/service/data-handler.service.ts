import {Injectable} from '@angular/core';
import {Category} from "../model/Category";
import {TestData} from "../data/TestData";
import { Task } from '../model/Task';
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {TaskDAOArray} from "../data/dao/impl/TaskDAOArray";
import {CategoryDAOArray} from "../data/dao/impl/CategoryDAOArray";
import {Priority} from "../model/Priority";
import {PriorityDAOArray} from "../data/dao/impl/PriorityDAOArray";


@Injectable({
    providedIn: 'root'
})
export class DataHandlerService {

    private taskDaoArray = new TaskDAOArray();
    private categoryDaoArray = new CategoryDAOArray();
    private priorityDAOArray = new PriorityDAOArray();


    constructor() {
    }

    getAllTask(): Observable<Task[]>{
        return this.taskDaoArray.getAll();

    }
    getAllCategories(): Observable<Category[]>{
        return this.categoryDaoArray.getAll();
    }
    getAllPriority(): Observable<Priority[]>{
        return this.priorityDAOArray.getAll();
    }
    searchTasks(category: Category, searchText: string, status: boolean, priority: Priority) : Observable<Task[]>{
        return this.taskDaoArray.search(category,searchText,status,priority);

    }
    updateTask(task: Task):Observable<Task>{
        return this.taskDaoArray.update(task);
    }
    deleteTask(id: number): Observable<Task>{
        return this.taskDaoArray.delete(id);
    }
    updateCategory(category: Category){
        return this.categoryDaoArray.update(category);
    }
    deleteCategory(id: number){
        return this.categoryDaoArray.delete(id);
    }




}
