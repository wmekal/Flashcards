import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';

import {Card} from '../../../models/card';
import {AlertService} from '../../../../shared/services/alert.service';
import {CardsService} from '../../../services/cards.service';
import {ConfirmDeleteComponent} from '../../../../shared/components/confirm-delete/confirm-delete.component';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.less']
})
export class CardListComponent implements OnInit {

  topic: string;
  category: string;
  deck: string;

  displayedColumns = ['no', 'title', 'confirmed', 'question', 'id'];
  dataSource: MatTableDataSource<Card>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private dialog: MatDialog,
              private alertService: AlertService,
              private cardsService: CardsService) {
  }

  ngOnInit() {
    this.topic = this.route.snapshot.paramMap.get('topic');
    this.category = this.route.snapshot.paramMap.get('category');
    this.deck = this.route.snapshot.paramMap.get('deck');
    this.loadCards();
  }

  loadCards(): void {
    this.cardsService.getByDeck(this.topic, this.category, this.deck)
      .subscribe((cards) => {
        this.dataSource = new MatTableDataSource(cards.body);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, (ex: HttpErrorResponse) => {
        this.alertService.handleError(ex);
      });
  }

  add(): void {
    this.router.navigate(
      [`flashcards/topics/${this.topic}/categories/${this.category}/decks/${this.deck}/cards/add`]
    );
  }

  edit(card: Card): void {
    this.router.navigate(
      [`flashcards/topics/${this.topic}/categories/${this.category}/decks/${this.deck}/cards/${card.id}`]
    );
  }

  delete(card: Card): void {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      data: {name: card.title}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cardsService.remove(this.topic, this.category, this.deck, card)
          .subscribe((response) => {
            if (response.ok) {
              this.loadCards();
            }
          }, (ex: HttpErrorResponse) => {
            this.alertService.handleError(ex);
          });
      }
    });
  }

  session(): void {
    this.router.navigate(
      [`flashcards/topics/${this.topic}/categories/${this.category}/decks/${this.deck}/session`]
    );
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  goBack(): void {
    this.router.navigate(
      [`flashcards/topics/${this.topic}/categories/${this.category}/decks`]
    );
  }

}
