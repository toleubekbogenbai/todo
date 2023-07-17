import {Injectable} from '@angular/core';
import {Category} from "../model/Category";
import {TestData} from "../data/TestData";
import { Task } from '../model/Task';
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {TaskDAOArray} from "../data/dao/impl/TaskDAOArray";
import {CategoryDAOArray} from "../data/dao/impl/CategoryDAOArray";
import {Priority} from "../model/Priority";


@Injectable({
    providedIn: 'root'
})
export class DataHandlerService {

    private taskDaoArray = new TaskDAOArray();
    private categoryDaoArray = new CategoryDAOArray();


    constructor() {
    }

    getAllTask(): Observable<Task[]>{
        return this.taskDaoArray.getAll();

    }
    getAllCategories(): Observable<Category[]>{
        return this.categoryDaoArray.getAll();
    }
    searchTasks(category: Category, searchText: string, status: boolean, priority: Priority) : Observable<Task[]>{
        return this.taskDaoArray.search(category,searchText,status,priority);

    }




}
