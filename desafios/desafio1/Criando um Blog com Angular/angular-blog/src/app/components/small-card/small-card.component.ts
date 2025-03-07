import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-small-card',
  imports: [],
  templateUrl: './small-card.component.html',
  styleUrl: './small-card.component.css',
})
export class SmallCardComponent {
  @Input()
  photoCover: string = 'https://placehold.co/600x400';
  @Input()
  cardTitle: string = '';
  @Input()
  cardDescription: string = '';

  constructor() {}

  ngOnInit(): void {}
}
