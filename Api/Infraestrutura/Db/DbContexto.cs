using Microsoft.EntityFrameworkCore;
using Api.Dominio.Entidades;
using Api.Dominio.Enuns;

namespace api.Infraestrutura.Db;

public class DbContexto(IConfiguration configuration) : DbContext
{
    private readonly IConfiguration _configuration = configuration;

    public DbSet<Tarefa> Tarefas { get; set; }


    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Tarefa>()
        .HasData(
            new Tarefa
            {
                Id = 1,
                Titulo = "Avaliar projeto",
                Descricao = "Avaliar projeto Sistema Gerenciamento de Tarefas",
                DataTarefa = DateTime.Now.Date,
                Status = Status.Pendente
            });
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        base.OnConfiguring(optionsBuilder);

        if (!optionsBuilder.IsConfigured)
        {
            string? conection = _configuration.GetConnectionString("SqlServer");

            if (!string.IsNullOrEmpty(conection))
            {
                optionsBuilder.UseSqlServer(conection);
            }
        }
    }
}