import {Component, OnInit} from '@angular/core';
import {Deck} from '../../../models/deck';
import {ActivatedRoute, Router} from '@angular/router';
import {DecksService} from '../../../services/decks.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-deck-edit',
  templateUrl: './deck-edit.component.html',
  styleUrls: ['./deck-edit.component.less']
})
export class DeckEditComponent implements OnInit {

  deck: Deck;
  deckForm: FormGroup;
  deckName: string;
  category: string;
  topic: string;
  errors: any;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private deckService: DecksService,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.topic = this.route.snapshot.paramMap.get('topic');
    this.category = this.route.snapshot.paramMap.get('category');
    this.deckName = this.route.snapshot.paramMap.get('deck');
    this.createForm();
    this.getDeck();
  }

  getDeck() {
    this.deckService.getByName(this.topic, this.category, this.deckName).subscribe(resp => {
      if (resp.ok) {
        this.deck = resp.body;
        this.deckForm.controls['name'].setValue(this.deck.name);
        this.deckForm.controls['description'].setValue(this.deck.description);
      }
    }, (err: HttpErrorResponse) => {
      this.errors = err.error.message;
    });
  }

  save() {
    this.deck.name = this.deckForm.value['name'];
    this.deck.description = this.deckForm.value['description'];
    this.deckService.edit(this.topic, this.category, this.deck).subscribe(resp => {
        if (resp.ok) {
          this.router.navigate([`/flashcards/topics/${this.topic}/categories/${this.category}/decks`]);
        }
      }, (err: HttpErrorResponse) => {
      }
    );
  }

  createForm() {
    this.deckForm = this.fb.group({
      name: new FormControl('', [Validators.required, Validators.pattern('([A-Za-z\\d\\-]+)')]),
      description: new FormControl('', Validators.maxLength(100))
    });
  }

  goBack() {
    let url = `/flashcards/topics/${this.topic}/categories/${this.category}/decks`;
    console.log(url);
    this.router.navigate([`/flashcards/topics/${this.topic}/categories/${this.category}/decks`]);
  }
}
