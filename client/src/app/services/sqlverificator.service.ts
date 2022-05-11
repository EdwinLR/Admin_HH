import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SQLVerificatorService {

  keywords : string[];
  mayusText : string;
  regExp : RegExp;
  injection : boolean = false;

  constructor() { 
    this.keywords = ["SELECT","FROM","WHERE",
    "DROP","IN","INSERT","UPDATE","DELETE",
    "CREATE","ALTER","VIEW","PROCEDURE","FUNCTION",
    "TRIGGER","EXEC","EXECUTE","PRINT","IF","EXISTS",
    "CONCAT","DATABASE","SET","DECLARE","AS","%","="];
    this.mayusText = '';
    this.regExp = new RegExp('');
  }

  VerifyInjection(text : string){
    this.injection = false;
    this.mayusText = text.toUpperCase();
    //console.log(this.mayusText)

    for(let i=0; i<this.keywords.length; i++){
      let keyword = '\\b'+this.keywords[i]+'\\b';
      this.regExp = new RegExp(keyword, 'gi');
      if(this.regExp.test(this.mayusText)){
        this.injection = true;
        break;
      }
    };

    if(this.injection)
      return '';
    else
      return text;
  }
}
