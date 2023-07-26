import {Component, OnInit} from '@angular/core';
import {DeviceDetectorService} from 'ngx-device-detector';
import {MatDialog} from '@angular/material/dialog';
import {PageEvent} from '@angular/material/paginator';
import {Task} from 'src/app/model/Task';
import {Category} from "./model/Category";
import {CategorySearchValues, TaskSearchValues} from "./data/dao/search/SearchObjects";
import {TaskService} from "./data/dao/impl/TaskService";
import {CategoryService} from "./data/dao/impl/CategoryService";
import {Observable} from "rxjs";
import {Priority} from "./model/Priority";
import {PriorityService} from "./data/dao/impl/PriorityService";


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

    selectedCategory: Category = null;

    isMobile: boolean;
    isTablet: boolean;


    showSearch: boolean;


    tasks: Task[];
    categories: Category[];
    priorities: Priority[];


    menuOpened: boolean;
    menuMode: string;
    menuPosition: string;
    showBackdrop: boolean;

    readonly defaultPageSize = 5;
    readonly defaultPageNumber = 0;

    uncompletedCountForCategoryAll: number;


    totalTasksFounded: number;

    taskSearchValues = new TaskSearchValues();
    categorySearchValues = new CategorySearchValues();


    constructor(
        private taskService: TaskService,
        private categoryService: CategoryService,
        private priorityService: PriorityService,
        private dialog: MatDialog,
        private deviceService: DeviceDetectorService
    ) {


        this.isMobile = deviceService.isMobile();
        this.isTablet = deviceService.isTablet();


        this.setMenuDisplayParams();

    }


    ngOnInit(): void {

        if (!this.isMobile && !this.isTablet) {
            // this.introService.startIntroJS(true); // при первом запуске приложения - показать интро
        }

        this.fillAllCategories().subscribe(res => {
            this.categories = res;

            this.selectCategory(this.selectedCategory);


        });

        this.fillAllPriorities();


    }

    fillAllPriorities() {
        this.priorityService.findAll().subscribe(result => {
            this.priorities = result;
        });
    }

    fillAllCategories(): Observable<Category[]> {
        return this.categoryService.findAll();
    }


    selectCategory(category: Category) {

        this.taskSearchValues.pageNumber = 0;

        this.selectedCategory = category;

        this.taskSearchValues.categoryId = category ? category.id : null;

        this.searchTasks(this.taskSearchValues);

        if (this.isMobile) {
            this.menuOpened = false;
        }
    }

    addCategory(category: Category) {
        this.categoryService.add(category).subscribe(result => {
                this.searchCategory(this.categorySearchValues);
            }
        );
    }


    deleteCategory(category: Category) {
        this.categoryService.delete(category.id).subscribe(cat => {
            this.selectedCategory = null;

            this.searchCategory(this.categorySearchValues);
            this.selectCategory(this.selectedCategory);

        });
    }

    updateCategory(category: Category) {
        this.categoryService.update(category).subscribe(() => {

            this.searchCategory(this.categorySearchValues);
            this.searchTasks(this.taskSearchValues);

        });
    }


    searchCategory(categorySearchValues: CategorySearchValues) {

        this.categoryService.findCategories(categorySearchValues).subscribe(result => {
            this.categories = result;
        });

    }


    // поиск задач
    searchTasks(searchTaskValues: TaskSearchValues) {
        this.taskSearchValues = searchTaskValues;

        this.taskService.findTasks(this.taskSearchValues).subscribe(result => {

            if (result.totalPages > 0 && this.taskSearchValues.pageNumber >= result.totalPages) {
                this.taskSearchValues.pageNumber = 0;
                this.searchTasks(this.taskSearchValues);
            }

            this.totalTasksFounded = result.totalElements;
            this.tasks = result.content;
        });

    }


    // добавление задачи
    addTask(task: Task) {

        this.taskService.add(task).subscribe(result => {

            this.searchTasks(this.taskSearchValues);

        });


    }


    deleteTask(task: Task) {

        this.taskService.delete(task.id).subscribe(result => {

            this.searchTasks(this.taskSearchValues);

        });


    }


    updateTask(task: Task) {

        this.taskService.update(task).subscribe(result => {

            this.searchTasks(this.taskSearchValues);

        });


    }

    toggleMenu() {
        this.menuOpened = !this.menuOpened;
    }

    onClosedMenu() {
        this.menuOpened = false;
    }

    setMenuDisplayParams() {
        this.menuPosition = 'left';

        if (this.isMobile) {
            this.menuOpened = false;
            this.menuMode = 'over';
            this.showBackdrop = true;
        } else {
            this.menuOpened = true;
            this.menuMode = 'push';
            this.showBackdrop = false;
        }

    }

    paging(pageEvent: PageEvent) {

        if (this.taskSearchValues.pageSize !== pageEvent.pageSize) {
            this.taskSearchValues.pageNumber = 0;
        } else {
            this.taskSearchValues.pageNumber = pageEvent.pageIndex;
        }

        this.taskSearchValues.pageSize = pageEvent.pageSize;
        this.taskSearchValues.pageNumber = pageEvent.pageIndex;

        this.searchTasks(this.taskSearchValues);
    }


    toggleSearch(showSearch: boolean) {
        this.showSearch = showSearch;

    }
    settingsChanged(priorities: Priority[]){
        // this.fillAllPriorities();
        this.priorities = priorities;
        this.searchTasks(this.taskSearchValues);
    }



}


