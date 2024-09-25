
var builder = WebApplication.CreateBuilder(args);

builder.AddArquitetura().AddServicos();

var app = builder.Build();

app.UseArquitetura();

app.Run();
