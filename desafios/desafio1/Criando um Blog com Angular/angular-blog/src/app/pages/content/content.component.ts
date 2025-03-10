import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { data } from '../../data/data';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css', './content.responsive.component.css'],
  standalone: true,
  imports: [RouterModule],
})
export class ContentComponent implements OnInit {
  photoCover: string = '';
  contentTitle: string = '';
  contentDescription: string = '';
  private id: string | null = '0';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe((value) => {
      this.id = value.get('id');
      // Chamar o método setValuesToComponent quando o id for obtido
      if (this.id) {
        this.setValuesToComponent(this.id);
      }
    });
  }

  setValuesToComponent(id: string) {
    const result = data.filter((article) => article.id.toString() === id);
    if (result.length > 0) {
      this.contentTitle = result[0].title;
      this.contentDescription = result[0].description;
      this.photoCover = result[0].photoCover;
    }
  }
}
