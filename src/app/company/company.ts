import {Technology} from '../technology/technology';

export class Company {
  id: number;


  companyName: string;


  shortname: string;


  address: string;


  website: string;


  phonenumber: number;


  email: string;


  introductoryinformation: string;

  companylogo: string | any;


  companyavatar: string | any;


  relationship: string;


  specialize: string;


  language: string;


  technology: Technology[];


  market: string;


  note: string;

  active: boolean;

  constructor(companyName: string, shortname: string, address: string, website: string, phonenumber: number, email: string, introductoryinformation: string, relationship: string, specialize: string, language: string, market: string, note: string, active: boolean, technology: Technology[]) {
    this.companyName = companyName;
    this.shortname = shortname;
    this.address = address;
    this.website = website;
    this.phonenumber = phonenumber;
    this.email = email;
    this.introductoryinformation = introductoryinformation;
    this.relationship = relationship;
    this.specialize = specialize;
    this.language = language;
    this.market = market;
    this.note = note;
    this.active = active;
    this.technology = technology;
  }
}
