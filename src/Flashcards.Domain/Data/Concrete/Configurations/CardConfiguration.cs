﻿using Flashcards.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Flashcards.Domain.Data.Concrete.Configurations
{
    internal class CardConfiguration : IEntityTypeConfiguration<Card>
    {
        public void Configure(EntityTypeBuilder<Card> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Title).HasMaxLength(128);

            builder.HasMany(x => x.Comments)
                .WithOne(x => x.Card)
                .HasForeignKey("CardId")
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
