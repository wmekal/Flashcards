﻿using Flashcards.Core.Exceptions;
using Flashcards.Core.Extensions;
using Flashcards.Domain.Data.Abstract;
using System;
using System.Collections.Generic;

namespace Flashcards.Domain.Entities
{
    public class Deck : Entity
    {
        private List<Card> _cards = new List<Card>();

        public string Name { get; protected set; }
        public string Description { get; protected set; }
        public virtual Category Category { get; protected set; }
        public virtual IReadOnlyCollection<Card> Cards => _cards;

        protected Deck() { }

        public Deck(string name, string description)
        :this(Guid.NewGuid(), name, description) { }

        public Deck(Guid id, string name, string description)
        {
            SetId(id);
            SetName(name);
            SetDescription(description);
        }

        public void SetId(Guid id)
        {
            if (id.IsEmpty())
            {
                throw new FlashcardsException(ErrorCode.InvalidDeckId);
            }

            Id = id;
        }

        public void SetName(string name)
        {
            if (name.IsEmpty())
            {
                throw new FlashcardsException(ErrorCode.InvalidDeckName);
            }

            Name = name;
        }

        public void SetDescription(string description)
        {
            Description = description;
        }

        public void AddCard(Card card)
        {
            _cards.Add(card);
        }      
    }
}
