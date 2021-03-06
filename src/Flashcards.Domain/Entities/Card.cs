﻿using Flashcards.Core.Exceptions;
using Flashcards.Core.Extensions;
using Flashcards.Domain.Data.Abstract;
using System;
using System.Collections.Generic;

namespace Flashcards.Domain.Entities
{
    public class Card : Entity
    {
        private List<Comment> _comments = new List<Comment>();

        public string Title { get; protected set; }
        public string Question { get; protected set; }
        public string Answer { get; protected set; }
        public bool Confirmed { get; protected set; }
        public virtual Deck Deck { get; protected set; }
        public virtual IReadOnlyCollection<Comment> Comments => _comments;

        protected Card() { }

        public Card(string title, string question, string answer)
            : this(Guid.NewGuid(), title, question, answer) { }

        public Card(Guid id, string title, string question, string answer)
        {
            SetId(id);
            SetTitle(title);
            SetQuestion(question);
            SetAnswer(answer);
            SetConfirmed(false);
        }

        public void SetId(Guid id)
        {
            if (id.IsEmpty())
            {
                throw new FlashcardsException(ErrorCode.InvalidCardId);
            }

            Id = id;
        }

        public void SetTitle(string title)
        {
            if (title.IsEmpty())
            {
                throw new FlashcardsException(ErrorCode.InvalidCardTitle);
            }

            Title = title;
        }

        public void SetQuestion(string question)
        {
            if (question.IsEmpty())
            {
                throw new FlashcardsException(ErrorCode.InvalidCardQuestion);
            }

            Question = question;
        }

        public void SetAnswer(string answer)
        {
            if (answer.IsEmpty())
            {
                throw new FlashcardsException(ErrorCode.InvalidCardAnswer);
            }

            Answer = answer;
        }

        public void AddComment(Comment comment)
        {
            _comments.Add(comment);
        }

        public void SetConfirmed(bool confirmed)
        {
            Confirmed = confirmed;
        }
    }
}
