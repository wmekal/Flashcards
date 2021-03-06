﻿using Flashcards.Domain.Enums;
using Flashcards.Infrastructure.Commands.Abstract;
using System;
using System.ComponentModel.DataAnnotations;

namespace Flashcards.Infrastructure.Commands.Models.Categories
{
    public class EditCategoryCommandModel : ICommandModel
    {
        [Required]
        public Guid Id { get; set; }

        [Required]
        [MaxLength(32)]
        [RegularExpression(@"([A-Za-z\d\-]+)", ErrorMessage = "Name can contains only letters from a-z and \"-\" not case sensitive.")]
        public string Name { get; set; }

        public string Description { get; set; }

        [Required]
        public Topic? Topic { get; set; }
    }
}
