import { Component, OnInit } from '@angular/core';
import quizz_questions from '../../../../public/data/quizz_questions.json';

@Component({
  selector: 'app-quizz',
  imports: [],
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css', './quizz.responsive.component.css'],
})
export class QuizzComponent implements OnInit {
  [x: string]: any;
  title: string = 'TITLE';

  questions: any;
  questionSelected: any = 'Selected Question';

  answers: string[] = [];
  answerSelected: string = 'Selected Answer';

  questionIndex: number = 0;
  questionMaxIndex: number = 0;

  finished: boolean = false;

  showRestartButton: boolean = false;

  constructor() {}

  ngOnInit(): void {
    if (quizz_questions) {
      this.finished = false;
      this.title = quizz_questions.title;

      this.questions = quizz_questions.questions;
      this.questionSelected = this.questions[this.questionIndex];

      this.questionIndex = 0;
      this.questionMaxIndex = this.questions.length;
    }
  }

  selectOption(value: string) {
    this.answers.push(value);
    this.answerSelected = value;
    this.nextStep();
  }

  async nextStep() {
    this.questionIndex += 1;

    if (this.questionIndex < this.questionMaxIndex) {
      this.questionSelected = this.questions[this.questionIndex];
    } else {
      const finalAnswer: string = await this.checkResult(this.answers);
      this.finished = true;
      this.answerSelected =
        quizz_questions.results[
          finalAnswer as keyof typeof quizz_questions.results
        ];

      setTimeout(() => {
        this.showRestartButton = true;
      }, 1000);
    }
  }

  async checkResult(answers: string[]) {
    const result = await answers.reduce((previous, current, i, arr) => {
      if (
        arr.filter((item) => item === previous).length >
        arr.filter((item) => item === current).length
      ) {
        return previous;
      } else {
        return current;
      }
    });

    return result;
  }

  restart() {
    this.finished = false;
    this.showRestartButton = false;
    this.questionIndex = 0;
    this.questionSelected = this.questions[this.questionIndex];
    this.answers = [];
    this.answerSelected = '';
  }
}
