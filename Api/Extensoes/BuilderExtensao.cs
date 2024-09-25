using api.Infraestrutura.Db;
using Api.Dominio.Interfaces;
using Api.Dominio.Servicos;

namespace Api.Extensao;

public static class BuilderExtensao
{
    public static WebApplicationBuilder AddArquitetura(this WebApplicationBuilder builder)
    {
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();

        return builder;
    }

    public static WebApplicationBuilder AddServicos(this WebApplicationBuilder builder)
    {
        builder.Services.AddDbContext<DbContexto>();

        builder.Services.AddScoped<ITarefa, TarefaServico>();

        return builder;
    }
}