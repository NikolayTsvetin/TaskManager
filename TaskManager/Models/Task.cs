using System.ComponentModel.DataAnnotations;

namespace TaskManager.Models
{
    public class Task
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public string Title { get; set; }

        public string Description { get; set; }

        [Required]
        public DateTime DateCreated { get; set; }

        public DateTime? DueDate { get; set; }
    }
}
