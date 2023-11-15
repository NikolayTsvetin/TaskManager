using System.ComponentModel.DataAnnotations;

namespace TaskManager.Models
{
    public class ExpenseViewModel
    {
        [Required]
        public ExpenseType Type { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public decimal Amount { get; set; }
    }
}
