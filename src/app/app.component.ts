import {Component, OnInit} from '@angular/core';
import {DataHandlerService} from "./service/data-handler.service";
import {Task} from './model/Task';
import {Category} from "./model/Category";
import {Priority} from "./model/Priority";

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styles: []
})
export class AppComponent implements OnInit {
    title = 'Todo';
    tasks: Task[];
    categories: Category[];

    private selectedCategory: Category = null;


    constructor(private dataHundler: DataHandlerService) {
    }

    ngOnInit(): void {
        this.dataHundler.getAllCategories().subscribe(categories => this.categories = categories);


        this.onSelectCategory(null);

    }

    private onSelectCategory(category: Category) {
        this.selectedCategory = category;

        this.dataHundler.searchTasks(
            this.selectedCategory,
            null,
            null,
            null,
        ).subscribe(tasks => this.tasks = tasks);
    }

    private onUpdateTask(task: Task) {
        this.dataHundler.updateTask(task).subscribe(() => {

            this.dataHundler.searchTasks(
                this.selectedCategory,
                null,
                null,
                null,
            ).subscribe(tasks => this.tasks = tasks);
        })
    }

    private onDeleteTask(task: Task) {
        this.dataHundler.deleteTask(task.id).subscribe(() => {
            this.dataHundler.searchTasks(
                this.selectedCategory,
                null,
                null,
                null,
            ).subscribe(tasks => this.tasks = tasks);
        })
    }

    private onUpdateCategory(category: Category){
        this.dataHundler.updateCategory(category).subscribe( () => {
           this.onSelectCategory(this.selectedCategory)
        });
    }

    private onDeleteCategory(category: Category){
        this.dataHundler.deleteCategory(category.id).subscribe( cat => {
            this.selectedCategory = null;
            this.onSelectCategory(this.selectedCategory);
        });
    }


}
