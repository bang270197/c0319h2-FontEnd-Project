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
  company: Company;
  message;
  id;

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

  changeActive(id) {
    this.companyService.getCompanyByid(id).subscribe(company => {
      this.company = company;
      // alert(JSON.stringify(this.company));

      this.companyService.changeActive(this.company.id).subscribe(() => {
       this.getAllCompany();
        // alert('Da thay doi active thanh cong');
      }, error => {
        this.companyService.handleError(error);
      });


    }, error => {
      this.companyService.handleError(error);
    });


  }

  reload() {
    window.location.reload();
  }
}
