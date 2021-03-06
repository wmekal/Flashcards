﻿using Flashcards.Domain.Enums;
using System;
using System.Threading.Tasks;

namespace Flashcards.Infrastructure.Services.Abstract.Commands
{
    public interface ICategoriesCommandService
    {
        Task AddAsync(string name, Topic topic, string description);
        Task EditAsync(Guid id, string name, Topic topic, string description);
        Task RemoveAsync(Guid id);
    }
}
