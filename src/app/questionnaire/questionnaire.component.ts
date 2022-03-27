import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.css']
})
export class QuestionnaireComponent implements OnInit {

  result: number = 0;

  readonly RESULT_KEY = 'result';

  canonDisabled: boolean = false;
  alDisabled: boolean = false;
  spaceDisabled: boolean = false;

  canonButtonIsActive: [boolean, boolean, boolean] = [false, false, false];
  alButtonIsActive: [boolean, boolean, boolean, boolean] = [false, false, false, false];
  spaceButtonIsActive: [boolean, boolean, boolean] = [false, false, false];

  canonHidden: boolean = false;
  ALHidden: boolean = true;
  spaceHidden: boolean = true;
  revealHidden: boolean = true;
  resultHidden: boolean = true;

  resultDetails: any = { content: '', source: '' };

  constructor() {
  }

  ngOnInit(): void {

    let savedResult = localStorage.getItem(this.RESULT_KEY);

    if (savedResult != null) {
      this.result = parseInt(savedResult);
      if (this.result > 0) {
        this.canonHidden = true;
        this.setResultDetails();
        this.resultHidden = false;
      }
    }
  }

  handleCanonClick(index: number, addToRes: number) {

    this.result += addToRes;
    this.canonButtonIsActive[index] = true;
    this.canonDisabled = true;
    this.ALHidden = false;
  }

  handleAlClick(index: number, addToRes: number) {

    this.result += addToRes;
    this.alButtonIsActive[index] = true;
    this.alDisabled = true;
    this.spaceHidden = false;
  }

  handleSpaceClick(index: number, addToRes: number) {

    this.result += addToRes;
    this.spaceButtonIsActive[index] = true;
    this.spaceDisabled = true;
    this.revealHidden = false;
  }

  handleRevealClick() {
    this.resultHidden = false;
    this.setResultDetails();
  }

  setResultDetails() {
    if (this.result === 30) {
      this.resultDetails.content = 'תותח-על-חלל !!!!!';
      this.resultDetails.source = 'https://rotemdan267.github.io/AreYouABigShot/assets/space-canon.gif';
    }
    else {
      this.resultDetails.content = 'לא. פשוט לא.';
      this.resultDetails.source = 'https://rotemdan267.github.io/AreYouABigShot/assets/no.png';
    }
  }

  handleSaveResults() {
    localStorage.setItem(this.RESULT_KEY, this.result.toString());
    alert('Saved Successfully');
  }

  handleReset() {

    localStorage.setItem(this.RESULT_KEY, '0');

    this.result = 0;

    this.canonDisabled = false;
    this.alDisabled = false;
    this.spaceDisabled = false;

    this.canonButtonIsActive = [false, false, false];
    this.alButtonIsActive = [false, false, false, false];
    this.spaceButtonIsActive = [false, false, false];

    this.canonHidden = false;
    this.ALHidden = true;
    this.spaceHidden = true;
    this.revealHidden = true;
    this.resultHidden = true;
  }
}
