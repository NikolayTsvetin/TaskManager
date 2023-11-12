using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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
    }
}
