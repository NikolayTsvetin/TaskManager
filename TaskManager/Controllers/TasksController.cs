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

        [HttpDelete("delete")]
        public async Task<JsonResult> DeleteTaskAsync([FromBody] string id)
        {
            if (!Guid.TryParse(id, out Guid key))
            {
                return new JsonResult(new { success = false, error = $"Unable to find parse with id: {id}" });
            }

            try
            {
                Models.Task taskToDelete = await context.Tasks.FindAsync(key);

                if (taskToDelete == null)
                {
                    return new JsonResult(new { success = false, error = $"Unable to find Task with id: {id}" });
                }

                context.Tasks.Remove(taskToDelete);
                await context.SaveChangesAsync();

                return new JsonResult(new { success = true });
            }
            catch (Exception ex)
            {
                return new JsonResult(new { success = false, error = ex.Message });
            }
        }

        [HttpPut("edit")]
        public async Task<JsonResult> EditTaskAsync([FromBody]  Models.Task task)
        {
            try
            {
                Models.Task existingRecord = await context.Tasks.FindAsync(task.Id);

                if (existingRecord == null)
                {
                    return new JsonResult(new { success = false, error = $"Unable to find Task with id: {task.Id}" });
                }

                existingRecord.Title = task.Title;
                existingRecord.Description = task.Description;
                existingRecord.DueDate = task.DueDate;

                context.Tasks.Update(existingRecord);
                await context.SaveChangesAsync();

                return new JsonResult(new { success = true });
            }
            catch (Exception ex)
            {
                return new JsonResult(new { success = false, error = ex.Message });
            }
        }
    }
}
