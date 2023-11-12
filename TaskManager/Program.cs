using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using TaskManager.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllersWithViews();
string connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddDbContext<TaskManagerContext>(options => options.UseSqlServer(connectionString));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

using (IServiceScope scope = app.Services.CreateScope())
{
    bool needsSave = false;
    IServiceProvider services = scope.ServiceProvider;
    TaskManagerContext? context = services.GetRequiredService<TaskManagerContext>();
    context.Database.Migrate();

    List<ExpenseType> expectedExpenseTypesToExist = new() {
        new ExpenseType() { Id = Guid.NewGuid(), Name = "Credit" },
        new ExpenseType() { Id = Guid.NewGuid(), Name = "Food" },
        new ExpenseType() { Id = Guid.NewGuid(), Name = "Going out" },
        new ExpenseType() { Id = Guid.NewGuid(), Name = "Home stuff" },
        new ExpenseType() { Id = Guid.NewGuid(), Name = "Clothes" }
    };

    List<ExpenseType> existingExpenseTypes = await context.ExpenseTypes.ToListAsync();

    expectedExpenseTypesToExist.ForEach(async x =>
    {
        ExpenseType? expenseType = existingExpenseTypes.Find(existing => existing.Name == x.Name);

        if (expenseType == null)
        {
            await context.ExpenseTypes.AddAsync(x);
            needsSave = true;
        }
    });

    if (needsSave)
    {
        await context.SaveChangesAsync();
    }
}

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html"); ;

app.Run();
