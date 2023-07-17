import {TaskDAO} from "../interface/TaskDAO";
import {Observable, of} from "rxjs";
import {Priority} from "../../../model/Priority";
import {Task} from "../../../model/Task";
import {Category} from "../../../model/Category";
import {TestData} from "../../TestData";

export class TaskDAOArray implements TaskDAO{
    add(T): Observable<Task> {
        return undefined;
    }

    delete(id: number): Observable<Task> {
        return undefined;
    }

    get(id: number): Observable<Task> {
        return undefined;
    }

    getAll(): Observable<Task[]> {
        return of(TestData.tasks);
    }

    getCompletedCountInCategory(category: Category): Observable<number> {
        return undefined;
    }

    getTotalCount(): Observable<number> {
        return undefined;
    }

    getTotalCountInCategory(category: Category): Observable<number> {
        return undefined;
    }

    getUncomletedCountInCategory(category: Category): Observable<number> {
        return undefined;
    }

    search(category: Category, searchText: string, status: boolean, priority: Priority): Observable<Task[]> {
        return of(this.searchTodos(category,searchText, status,priority));
    }

    private searchTodos(category: Category, searchText: string, status: boolean, priority: Priority) : Task[]{
        let allTasks = TestData.tasks;

        if(category != null){
            allTasks = allTasks.filter(todo => todo.category === category);
        }
        return allTasks;
    }

    update(T): Observable<Task> {
        return undefined;
    }

}