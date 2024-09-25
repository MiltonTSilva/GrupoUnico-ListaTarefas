
using Api.Dominio.Rotas;

var builder = WebApplication.CreateBuilder(args);

builder.AddArquitetura().AddServicos();

var app = builder.Build();

app.UseArquitetura();

app.MapTarefaRota();

app.Run();
