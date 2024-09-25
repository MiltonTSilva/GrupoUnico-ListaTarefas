var builder = WebApplication.CreateBuilder(args);

builder.AddArquitetura().AddServicos();

var app = builder.Build();

app.MapGet("/", () => "Hello World!");

app.UseArquitetura();

app.Run();
