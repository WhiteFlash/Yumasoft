import { Component, OnInit, Type, NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Model } from './model';


@Component({
  selector: 'app-appform',
  templateUrl: './appform.component.html',
  styleUrls: ['./appform.component.css']
})
export class AppformComponent implements OnInit {

  //Injection of HttpClient to component
  constructor(private http: HttpClient) { }
  
  //Array is avaliable for manipulations on the 
  //load stage of the app.
  ngOnInit(): void {
    this.http.get('assets/data.json')
              .subscribe((data:Model[]) => this.JSONString = data);
    
  }

  //Array to load data from JSONFile.
  ArrayOfJson: Model[];
  //Array to work with data in the working process of app.
  JSONString:  any;

  //variables store date for the Model fields class.
  name: string = "";
  year: any = "";

  //Unload data into textarea from JSON file.
  //JSON array is stored by this path => assets/data.json
  UnloadJson():void {
    this.http.get('assets/data.json')
             .subscribe((data:Model[]) => this.ArrayOfJson = data);             
  }

  //Lodaing data from textarea to array that will be manupulated.
  LoadJsonData(textBox: any) : void{
    this.JSONString = JSON.parse(textBox);
    console.log(this.JSONString);
  }

  //Method selects element from table. 
  //And populate inputfields with data to correct info.
  SelectElement($event:any):void 
  {
    if($event.target.value as string)
    {
      this.name = $event.target.value;
    }
    else
    {
      this.year = $event.target.value;
    }

    for(var i = 0; i <= this.JSONString.length - 1; i++)
    {
      if(this.name == this.JSONString[i].name)
      {
        this.year = this.JSONString[i].year;
      }
    }
  }

  //Update JSONString array with selected element.
  Update(name, year):void
  {
    var model = new Model();
    model.name = name;
    model.year = year;
    console.log(this.JSONString);
    for(var i = 0; i <= this.JSONString.length - 1; i++)
    {
        if(model.name == this.JSONString[i].name || this.JSONString[i].year == model.year)
        {
          this,this.JSONString[i] = model;
        }
    }
  }

  //Create new element in JSONString array.
  Create(name, year):void
  {
    var model = new Model();
    model.name = name;
    model.year = year;
    this.JSONString.push(model);
  }

  //Delete elemente from JSONString array.
  Delete(name, year){
    if(name != null || year != null){
      for(var i = 0; i <= this.JSONString.length - 1; i++)
      {
        if(name == this.JSONString[i].name || this.JSONString[i].year == year)
        {
          this.JSONString.splice(i,1);
        }
      }
    }
  }

}
