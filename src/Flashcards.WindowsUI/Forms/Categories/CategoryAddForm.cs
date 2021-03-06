﻿using System;
using Flashcards.WindowsUI.Controls;
using Flashcards.WindowsUI.Models;
using Flashcards.WindowsUI.Services;

namespace Flashcards.WindowsUI.Forms.Categories
{
    public partial class CategoryAddForm : FlashcardsForm
    {
        private readonly Topic _topic;
        private readonly CategoriesService _categoriesService;

        public CategoryAddForm(Topic topic)
        {
            InitializeComponent();

            _topic = topic;
            _categoriesService = new CategoriesService();
        }

        private void BtnSave_Click(object sender, EventArgs e)
        {
            if (_categoriesService.Add(_topic, new Category()
            {
                Name = tbName.Text,
                Description = tbDescription.Text,
                Topic = _topic
            }))
            {
                Close();
            }
        }
    }
}
