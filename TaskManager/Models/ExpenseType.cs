using System.ComponentModel.DataAnnotations;

namespace TaskManager.Models
{
    public class ExpenseType
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public string Name { get; set; }
    }
}
