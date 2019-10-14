import {Component, OnInit} from '@angular/core';
import {Technology} from '../technology';
import {TechnologyServiceService} from '../technology-service.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  technology: Technology[];

  constructor(private technologyService: TechnologyServiceService) {
  }

  ngOnInit() {
    this.getAllTechnology();
  }

  getAllTechnology() {
    this.technologyService.getAllTechnology().subscribe(list => {
      this.technology = list;
    });
  }

}
