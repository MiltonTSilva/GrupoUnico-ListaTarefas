namespace Api.Dominio.Rotas;

public static class TarefaRotas
{

    public static void MapTarefaRota(this WebApplication app)
    {
        #region Tarefa
        app.MapGet("/Tarefa", ([FromQuery] int? pagina, string? titulo, string? descricao, DateTime? dataTarefa, string? status, ITarefa Tarefa) =>
        {
            return Results.Ok(Tarefa.Todos(pagina, titulo, descricao, dataTarefa, status));
        }).WithTags("Tarefa");

        app.MapGet("/Tarefa/{id}", ([FromRoute] int id, ITarefa Tarefa) =>
        {
            var resultado = Tarefa.BuscarPorId(id);

            if (resultado == null) return Results.NotFound();

            return Results.Ok(resultado);

        }).WithTags("Tarefa");

        app.MapPost("/Tarefa", async ([FromBody] TarefaDTO TarefaDTO, [FromServices] ITarefa Tarefa) =>
        {
            try
            {
                var newTarefa = new Tarefa
                {
                    Titulo = TarefaDTO.Titulo,
                    Descricao = TarefaDTO.Descricao,
                    DataTarefa = TarefaDTO.DataTarefa,
                    Status = TarefaDTO.Status
                };

                var erro = await Tarefa.Adicionar(newTarefa);
                if (erro.Count > 0) return Results.BadRequest(erro);

                return Results.Created($"/Tarefa/{newTarefa.Id}", newTarefa);
            }
            catch (Exception ex)
            {
                // Log the exception (ex) if necessary
                return Results.Problem("Ocorreu um erro ao incluid a tarefa.", ex.Message);
            }
        }).WithTags("Tarefa");

        app.MapPut("/Tarefa/{id}", async ([FromRoute] int id, [FromBody] TarefaDTO TarefaDTO, [FromServices] ITarefa Tarefa) =>
        {
            if (TarefaDTO == null)
            {
                return Results.BadRequest("Dados da tarefa são obrigatórios.");
            }

            var resultado = Tarefa.BuscarPorId(id);

            if (resultado == null)
            {
                return Results.NotFound();
            }

            try
            {
                resultado.Titulo = TarefaDTO.Titulo;
                resultado.Descricao = TarefaDTO.Descricao;
                resultado.DataTarefa = TarefaDTO.DataTarefa;
                resultado.Status = TarefaDTO.Status;

                var erro = await Tarefa.Atualizar(resultado);
                if (erro.Count > 0) return Results.BadRequest(erro);

                return Results.Ok(resultado);
            }
            catch (Exception ex)
            {
                // Log the exception (ex) if necessary
                return Results.Problem("Ocorreu um erro ao atualizar a tarefa.", ex.Message);
            }
        }).WithTags("Tarefa");

        app.MapPatch("/Tarefa/{id}/", async ([FromRoute] int id, [FromBody] int status, [FromServices] ITarefa Tarefa) =>
        {
            Console.WriteLine("Chegou aqui na api");

            var resultado = Tarefa.BuscarPorId(id);

            if (resultado == null)
            {
                return Results.NotFound();
            }

            try
            {
                var erro = await Tarefa.AtualizarStatus(id, (Status)status);

                return Results.Ok(resultado);
            }
            catch (Exception ex)
            {
                // Log the exception (ex) if necessary
                return Results.Problem("Ocorreu um erro ao atualizar o status da tarefa.", ex.Message);
            }
        }).WithTags("Tarefa");

        app.MapDelete("/Tarefa/{id}", ([FromRoute] int id, ITarefa Tarefa) =>
        {
            var resultado = Tarefa.BuscarPorId(id);

            if (resultado == null) return Results.NotFound();

            Tarefa.Remover(resultado);
            return Results.NoContent();

        }).WithTags("Tarefa");
        #endregion
    }
}