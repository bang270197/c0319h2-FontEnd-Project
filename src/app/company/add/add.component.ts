import {Component, OnInit} from '@angular/core';
import {Company} from '../company';
import {CompanyserviceService} from '../companyservice.service';
import {TechnologyServiceService} from '../../technology/technology-service.service';
import {Technology} from '../../technology/technology';
import {Observable} from 'rxjs';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {chainedInstruction} from '@angular/compiler/src/render3/view/util';
import {HttpEvent, HttpEventType} from '@angular/common/http';
import {Language} from '../Language';
import {Market} from '../Market';
import {Specialize} from '../Specialize';
import {Relationship} from '../Relationship';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  newCompany: Company;
  company: Company;
  message;
  // hien thi du lieu
  technology: Technology[];
  language: Language[];
  market: Market[];
  specialize: Specialize[];
  relationship: Relationship[];
  // lai id
  ArrayTechnology: number[] = [];
  ArrayLanguage: number[] = [];
  ArrayMarket: number[] = [];
  ArraySpecialize: number[] = [];
  newRelationship: Relationship;
  // ddng mang cac doi tuong checkbox
  newTechnology: Technology[] = [];
  newLanguage: Language[] = [];
  newSpecialize: Specialize[] = [];
  newMarket: Market[] = [];
  formCompany: FormGroup;
  file: any;
  imageLogo = '';
  formData = new FormData();
  id: number;

  constructor(private companyService: CompanyserviceService,
              private technologyService: TechnologyServiceService,
              private fb: FormBuilder
  ) {
  }

  ngOnInit() {
    // this.company = this.companyService.findByIdCompany();
    this.getAllTechnology();
    this.getAllLanguage();
    this.getAllMarket();
    this.getAllRelationship();
    this.getAllSpecialize();
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

  getAllLanguage() {
    this.companyService.getAllLanguage().subscribe(list => {
      this.language = list;
    });
  }

  getAllMarket() {
    this.companyService.getAllMarket().subscribe(list => {
      this.market = list;
    });
  }

  getAllSpecialize() {
    this.companyService.getAllSpecialize().subscribe(list => {
      this.specialize = list;
    });
  }

  getAllRelationship() {
    this.companyService.getAllRelationship().subscribe(list => {
      this.relationship = list;
    });
  }


  selectFile(event) {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
      this.imageLogo = event.target.files[0].name;
    }
  }

  onCheckboxChangeRelationship(rela) {
    this.newRelationship = rela;
  }


  onCheckboxChangeLanguage(event, lang: Language) {

    if (event.target.checked) {
      this.ArrayLanguage.push(lang.id);
    } else {
      for (let i = 0; i < this.language.length; i++) {
        if (this.ArrayLanguage[i] === lang.id) {
          this.ArrayLanguage.splice(i, 1);
        }
      }
    }
    this.newLanguage = [];
    for (let j = 0; j < this.ArrayLanguage.length; j++) {
      if (this.ArrayLanguage[j] != null) {
        this.companyService.getLanguageById(this.ArrayLanguage[j]).subscribe(newLang => {
          this.newLanguage.push(newLang);
        });
      }
    }

  }

  onCheckboxChangeMarket(event, mar: Market) {
    if (event.target.checked) {
      this.ArrayMarket.push(mar.id);
    } else {
      for (let i = 0; i < this.market.length; i++) {
        if (this.ArrayMarket[i] === mar.id) {
          this.ArrayMarket.splice(i, 1);
        }
      }
    }
    this.newMarket = [];
    for (let j = 0; j < this.ArrayMarket.length; j++) {
      if (this.ArrayMarket[j] != null) {
        this.companyService.getMarketById(this.ArrayMarket[j]).subscribe(newMar => {
          this.newMarket.push(newMar);
        });
      }
    }
  }

  onCheckboxChange(event, tech: Technology) {
    // debugger;
    if (event.target.checked) {
      this.ArrayTechnology.push(tech.id);
    } else {
      for (let i = 0; i < this.technology.length; i++) {
        if (this.ArrayTechnology[i] === tech.id) {
          this.ArrayTechnology.splice(i, 1);
        }
      }
    }
    this.newTechnology = [];
    for (let j = 0; j < this.ArrayTechnology.length; j++) {
      if (this.ArrayTechnology[j] != null) {
        this.technologyService.getTechnologyById(this.ArrayTechnology[j]).subscribe(newTech => {
          this.newTechnology.push(newTech);
        });
      }
    }
  }

  onCheckboxChangeSpecialize(event, spec: Specialize) {
    if (event.target.checked) {
      this.ArraySpecialize.push(spec.id);
    } else {
      for (let i = 0; i < this.technology.length; i++) {
        if (this.ArraySpecialize[i] === spec.id) {
          this.ArraySpecialize.splice(i, 1);
        }
      }
    }
    this.newSpecialize = [];
    for (let j = 0; j < this.ArraySpecialize.length; j++) {
      if (this.ArraySpecialize[j] != null) {
        this.companyService.getSpecializeById(this.ArraySpecialize[j]).subscribe(newSpec => {
          this.newSpecialize.push(newSpec);
        });
      }
    }
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
     this.newRelationship,
      this.newSpecialize,
      this.newLanguage,
      this.newTechnology,
      this.newMarket,
      this.formCompany.get('note').value
    );
    // debugger;
    this.companyService.createCompany(this.company).subscribe(newComapny => {
      this.newCompany = newComapny;


      if (this.newCompany !== null) {
        if (this.file != null) {

          this.formData.append('companylogo', this.file);
          this.companyService.createLogo(this.newCompany.id, this.formData).subscribe(() => {
              // this.loading = false;
              // this.messageImg = 'Avatar uploaded successfully!';
              alert('Up anh thanh cong');
            },
            error1 => {
              alert('Up anh that bai');
              // this.messageImg = 'Failed to upload avatar!!. Cause: ' + error1.message;
            }
          );
        }
      }
      // alert(`Detail: ${JSON.stringify(this.newCompany.companyName)}`);
      this.message = 'Them Company thanh cong!!';
      alert('them thanh cong');
    }, error => {
      this.message = 'Them that bai!!';
      alert('them that bai');
      this.companyService.handleError(error);
    });


  }
}
