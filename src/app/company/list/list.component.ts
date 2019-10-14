import {Component, OnInit} from '@angular/core';
import {CompanyserviceService} from '../companyservice.service';
import {Company} from '../company';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  listCompany: Company[];
  listCompany1: Company[];
  isHidden = false;
  id;
  x;
  company: Company;

  constructor(private companyService: CompanyserviceService) {
  }

  ngOnInit() {
    this.getAllCompany();
  }


  getAllCompany() {
    this.companyService.getAllCompany().subscribe(list => {
      this.listCompany = list;
    }, error => {
      this.companyService.handleError(error);
    });
  }

  // deleteCompany(id) {
  //   this.companyService.findByIdCompany(id).subscribe(company => {
  //     this.company = company;
  //   });
  //   this.company.active = true;
  // }
}
