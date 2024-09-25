namespace Api.Extensao;

public static class AppExtensoes
{
    public static void UseArquitetura(this WebApplication app)
    {

        #region Swagger
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "Tarefas API V1");
                c.RoutePrefix = string.Empty;
            });
        }

        app.UseHttpsRedirection();
        #endregion

    }
}