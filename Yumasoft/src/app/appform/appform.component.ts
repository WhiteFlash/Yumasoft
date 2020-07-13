import { Component, OnInit, Type, NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Model } from './model';


@Component({
  selector: 'app-appform',
  templateUrl: './appform.component.html',
  styleUrls: ['./appform.component.css']
})
export class AppformComponent implements OnInit {

  constructor(private http: HttpClient) { }
  ngOnInit(): void {
    this.http.get('assets/data.json')
              .subscribe((data:Model[]) => this.JSONString = data);
    
  }

  ArrayOfJson: Model[];
  JSONString:  any;
  name: string = "";
  year: any = 0;

  UnloadJson():void {
    this.http.get('assets/data.json')
             .subscribe((data:Model[]) => this.ArrayOfJson = data);             
  }

  Show(textBox: any) : void{
    this.JSONString = JSON.parse(textBox);
    console.log(this.JSONString);
  }

  test($event:any):void 
  {
    if($event.target.value as string)
    {
      this.name = $event.target.value;
      console.log($event.target.value);
    }
    else
    {
      this.year = $event.target.value;
      console.log($event.target.value);
    }

    for(var i = 0; i <= this.JSONString.length - 1; i++)
    {
      if(this.name == this.JSONString[i].name)
      {
        this.year = this.JSONString[i].year;
      }
    }
    console.log(this.name + " " + this.year);

  }

  Update(name, year):void{
    var x = new Model();
    x.name = name;
    x.year = year;
    console.log(this.JSONString);
    for(var i = 0; i <= this.JSONString.length - 1; i++)
    {
        if(x.name == this.JSONString[i].name || this.JSONString[i].year == x.year)
        {
            this,this.JSONString[i] = x;
        }
    }
    console.log(this.JSONString);
    console.log(x.name + " " + x.year);


  }

}
