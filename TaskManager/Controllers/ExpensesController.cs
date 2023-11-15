using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using TaskManager.Models;

namespace TaskManager.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ExpensesController : ControllerBase
    {
        private readonly TaskManagerContext context;

        public ExpensesController(TaskManagerContext context)
        {
            this.context = context;
        }

        public RedirectResult Index()
        {
            return Redirect("/");
        }

        [HttpGet("allExpenseTypes")]
        public async Task<IEnumerable<ExpenseType>> GetExpenseTypesAsync()
        {
            List<ExpenseType> expenseTypes = await context.ExpenseTypes.ToListAsync();

            return expenseTypes;
        }

        [HttpGet("allExpenses")]
        public async Task<IEnumerable<Expense>> GetExpensesAsync()
        {
            List<Expense> expenses = await context.Expenses.ToListAsync();

            return expenses;
        }

        [HttpPost("newExpense")]
        public async Task<JsonResult> CreateExpenseAsync([FromBody] ExpenseViewModel expense)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    List<ExpenseType> expenseTypes = await context.ExpenseTypes.ToListAsync();

                    Expense newExpense = new()
                    {
                        Id = Guid.NewGuid(),
                        DateCreated = DateTime.Now,
                        Description = expense?.Description,
                        Amount = expense.Amount,
                        TypeId = expense.Type.Id
                    };

                    await context.Expenses.AddAsync(newExpense);
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
