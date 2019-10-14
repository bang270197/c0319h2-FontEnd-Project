import {Component, OnInit} from '@angular/core';
import {Company} from '../company';
import {CompanyserviceService} from '../companyservice.service';
import {TechnologyServiceService} from '../../technology/technology-service.service';
import {Technology} from '../../technology/technology';
import {Observable} from 'rxjs';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  company: Company;
  message;
  technology: Technology[];
  tech: Technology[];
  newTechnology: Technology;
  relationship = ['Doi tac', 'Khach hang'];
  specialize = ['Product', 'outsourcing'];
  language = ['php', 'java', '.net'];
  market = ['Nhat', 'Viet Nam', 'Eu'];
  active = ['true', 'false'];
  formCompany: FormGroup;

  constructor(private companyService: CompanyserviceService,
              private technologyService: TechnologyServiceService,
              private fb: FormBuilder
  ) {
  }

  ngOnInit() {
    // this.company = this.companyService.findByIdCompany();
    this.getAllTechnology();
    this.formCompany = this.fb.group({
      companyName: [''],
      shortname: [''],
      address: [''],
      website: [''],
      phonenumber: [''],
      email: [''],
      introductoryinformation: [''],
      relationship: [''],
      specialize: [''],
      language: [''],
      technology: [''],
      market: [''],
      note: [''],
      active: ['']
    });
  }

  getAllTechnology() {
    this.technologyService.getAllTechnology().subscribe(list => {
      this.technology = list;
    });
  }

  getTechByid(id) {
   this.technologyService.getTechnologyById(id).subscribe( technology =>{
     this.newTechnology = technology;
   });
  }

  onSubmit() {
    this.company = new Company(
      this.formCompany.get('companyName').value,
      this.formCompany.get('shortname').value,
      this.formCompany.get('address').value,
      this.formCompany.get('website').value,
      this.formCompany.get('phonenumber').value,
      this.formCompany.get('email').value,
      this.formCompany.get('introductoryinformation').value,
      this.formCompany.get('relationship').value,
      this.formCompany.get('specialize').value,
      this.formCompany.get('language').value,
      this.formCompany.get('market').value,
      this.formCompany.get('note').value,
      this.formCompany.get('active').value
    );
    this.companyService.createCompany(this.company).subscribe(() => {
      this.message = 'Them thanh cong!!';
      alert('them thanh cong');
    }, error => {
      this.message = 'Them that bai!!';
      alert('them that bai');
      this.companyService.handleError(error);
    });
  }

}
