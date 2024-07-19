import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [RouterModule,RouterLink],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {


  constructor(private router: Router){}

  doSearch(value:string){
    console.log("search content : " + value);
    this.router.navigateByUrl(`search/${value}`);
  }

}
