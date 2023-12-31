﻿using System.ComponentModel.DataAnnotations;

namespace TaskManager.Models
{
    public class Expense
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public Guid TypeId { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public DateTime DateCreated { get; set; }

        [Required]
        public decimal Amount { get; set; }
    }
}
