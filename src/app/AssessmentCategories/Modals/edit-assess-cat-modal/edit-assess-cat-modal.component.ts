import { Component, OnInit, Input } from '@angular/core';
import { CategoryService } from 'src/app/AssessmentCategories/Services/category-service';
import { CategoriesComponent } from '../../Components/categories/categories.component';
import {Category} from "../../../Assess-Batch/Models/Category";

@Component({
  selector: 'app-edit-assess-cat-modal',
  templateUrl: './edit-assess-cat-modal.component.html',
  styleUrls: ['./edit-assess-cat-modal.component.css']
})
export class EditAssessCatModalComponent implements OnInit {

  category:Category;  //The category that will be selected for presentation and editing
  @Input() categories:any []; //The list of categories to be loaded and displayed
  errorMessage:string;
  successMessage:string;
  displayResultError:boolean;
  displayResultSuccess:boolean;
  temp:string;
  tempOwner:any;

  constructor(private categoryService:CategoryService, private catComponent:CategoriesComponent) {

  }

  ngOnInit() {
    this.getAll();
  }

  //sets the selected category as the local category to be edited
  selected(cat:Category){
    this.category = cat;
    this.temp = cat.skillCategory;
    this.tempOwner = cat.categoryOwner;
  }

  //gets the categories from the database and inserts them into the category list
  getAll(){
    this.categoryService.listAll().subscribe((res)=>{
      var c = JSON.parse(JSON.stringify(res));

      this.categories = c;
    });
  }


  //saves the changes made to the category into the database
  save(){
    this.categories.skillCategory = this.temp;
    this.categories.categoryOwner = this.tempOwner;
    this.categoryService.edit(this.categories.categoryId,this.categories.categoryOwner, this.categories.skillCategory, this.categories.active).subscribe((res)=>{
      if(res != null){
        let myJSON = JSON.stringify(res);
        let result = JSON.parse(myJSON);

        this.displayResultSuccess = true;
        this.successMessage = result.skillCategory + " has been successfully updated";
      }
    },(err)=>{
      this.displayResultError = true;
      this.errorMessage = err.error.message;
    });
    this.displayResultSuccess = false;
    this.displayResultError = false;
  }

  clearModal(){
    this.displayResultSuccess = false;
    this.displayResultError = false;
    this.temp = '';
    this.tempOwner = '';
  }

  updateComponent(){
    this.catComponent.getAllCategories();
  }
}
