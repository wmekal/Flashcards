import {Component, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Comment} from '../../../models/comment';
import {CommentsService} from '../../../services/comments.service';
import {HttpErrorResponse} from '@angular/common/http';
import {AlertService} from '../../../../shared/services/alert.service';
import {CommentAddComponent} from '../comment-add/comment-add.component';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.less']
})
export class CommentListComponent implements OnInit {

  @Input() topic: string;
  @Input() category: string;
  @Input() deck: string;
  @Input() cardId: string;

  @ViewChild("commentAdd") commentAdd: CommentAddComponent;

  comments: Comment[];

  constructor(private commentsService: CommentsService,
              private alertService: AlertService) {
  }

  ngOnInit() {
    this.loadComments();
    this.commentAdd.cardId = this.cardId;
  }

  loadComments(): void {
    this.commentsService.getByCard(this.topic, this.category, this.deck, this.cardId)
      .subscribe((comments) => {
        this.comments = comments.body;
      }, (ex: HttpErrorResponse) => {
        this.alertService.handleError(ex);
      })
  }

  changeCard(card: string): void {
    this.cardId = card;
    this.loadComments();
    this.commentAdd.cardId = this.cardId;
  }

}
