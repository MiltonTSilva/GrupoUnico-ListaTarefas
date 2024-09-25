namespace Api.Extensoes;

public static class BuilderExtensao
{
    public static WebApplicationBuilder AddArquitetura(this WebApplicationBuilder builder)
    {

        builder.Services.AddEndpointsApiExplorer();

        var origemAngular = builder.Configuration.GetValue<string>("OrigemAngular")!.Split(",");

        builder.Services.AddCors(opcao =>
        {

            opcao.AddDefaultPolicy(politica =>
            {
                politica.WithOrigins("origemAngular").AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
            });
        });

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