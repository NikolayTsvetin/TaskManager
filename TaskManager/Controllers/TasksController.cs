using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaskManager.Models;

namespace TaskManager.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TasksController : ControllerBase
    {
        private readonly TaskManagerContext context;

        public TasksController(TaskManagerContext context)
        {
            this.context = context;
        }

        public RedirectResult Index()
        {
            return Redirect("/");
        }

        [HttpGet("all")]
        public async Task<IEnumerable<Models.Task>> GetTasksAsync()
        {
            List<Models.Task> tasks = await context.Tasks.ToListAsync();

            return tasks;
        }

        [HttpPost("new")]
        public async Task<JsonResult> CreateTaskAsync([FromBody] Models.TaskViewModel task)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    Models.Task newTask = new()
                    {
                        Id = Guid.NewGuid(),
                        DateCreated = DateTime.Now,
                        Title = task.Title,
                        Description = task?.Description,
                        DueDate = task?.DueDate
                    };

                    await context.Tasks.AddAsync(newTask);
                    await context.SaveChangesAsync();
                }
                catch (Exception ex)
                {
                    return new JsonResult(new { success = false, errors = ex.Message });
                }

                return new JsonResult(new { success = true });
            }
            else
            {
                return new JsonResult(new { success = false });
            }
        }
    }
}
