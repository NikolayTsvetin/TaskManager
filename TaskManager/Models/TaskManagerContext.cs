using Microsoft.EntityFrameworkCore;

namespace TaskManager.Models
{
    public class TaskManagerContext : DbContext
    {
        public TaskManagerContext(DbContextOptions<TaskManagerContext> options) : base(options)
        {
        }

        public DbSet<Task> Tasks { get; set; }
    }
}
