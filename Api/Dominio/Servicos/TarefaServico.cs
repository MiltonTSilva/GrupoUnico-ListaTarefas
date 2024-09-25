
namespace Api.Dominio.Servicos;
public class TarefaServico(DbContexto contexto) : ITarefa
{
    private readonly DbContexto _contexto = contexto;

    public async Task<List<string>> Adicionar(Tarefa tarefa)
    {
        var erros = ValidarTarefa(tarefa);
        if (erros.Count > 0) return erros;

        _contexto.Tarefas.Add(tarefa);
        await _contexto.SaveChangesAsync();
        return [];
    }

    public async Task<List<string>> Atualizar(Tarefa tarefa)
    {

        var erros = ValidarTarefa(tarefa);
        if (erros.Count > 0) return erros;

        _contexto.Tarefas.Update(tarefa);
        await _contexto.SaveChangesAsync();
        return [];
    }

    public async Task<string> AtualizarStatus(int id, Status status)
    {

        var tarefa = BuscarPorId(id);
        if (tarefa == null)
        {
            return "Tarefa não encontrada.";
        }

        tarefa.Status = status;
        _contexto.Entry(tarefa).Property(t => t.Status).IsModified = true;

        try
        {
            await _contexto.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException ex)
        {
            if (!_contexto.Tarefas.Any(t => t.Id == id))
            {
                return "Tarefa não encontrada.";
            }
            else
            {
                return $"Erro: {ex.Message}";
            }
        }

        return string.Empty;
    }

    public Tarefa? BuscarPorId(int id)
    {
        return _contexto.Tarefas.Find(id);
    }

    public string Remover(Tarefa tarefa)
    {
        var tarefaEncontrada = BuscarPorId(tarefa.Id);
        if (tarefaEncontrada == null)
        {
            return "Tarefa não encontrada.";
        }

        _contexto.Tarefas.Remove(tarefaEncontrada);
        _contexto.SaveChanges();

        return string.Empty;
    }

    public List<Tarefa> Todos(int? paginas = 1, string? titulo = null, string? descricao = null, DateTime? dataTarefa = null, string? status = null)
    {
        List<Tarefa> lista = [.. _contexto.Tarefas];
        int itensPorPagina = 10;

        Status statusEnum = new();
        if (!string.IsNullOrEmpty(status))
        {
            if (Enum.IsDefined(typeof(Status), status!))
            {
                statusEnum = (Status)Enum.Parse(typeof(Status), status!);
            }
        }

        if (!string.IsNullOrEmpty(titulo))
        {
            lista = [.. _contexto.Tarefas.Where(w => w.Titulo.Contains(titulo, StringComparison.CurrentCultureIgnoreCase))];
        }

        if (!string.IsNullOrEmpty(descricao))
        {
            lista = [.. _contexto.Tarefas.Where(w => w.Descricao.Contains(descricao, StringComparison.CurrentCultureIgnoreCase))];
        }

        if (dataTarefa != null)
        {
            lista = [.. _contexto.Tarefas.Where(w => w.DataTarefa == dataTarefa)];
        }

        if (!string.IsNullOrEmpty(status))
        {
            lista = [.. _contexto.Tarefas.Where(w => w.Status == statusEnum)];
        }

        if (paginas != null)
            return lista.Skip(((int)paginas - 1) * itensPorPagina).Take(itensPorPagina).ToList();
        else
            return lista;
    }

    public List<string> ValidarTarefa(Tarefa tarefa)
    {
        List<string> erros = [];

        if (string.IsNullOrEmpty(tarefa.Titulo)) erros.Add("O título não pode ser vazio!");
        if (string.IsNullOrEmpty(tarefa.Descricao)) erros.Add("A Descrição não pode ser vazia!");

        if (tarefa.DataTarefa < DateTime.Now.Date) erros.Add($"Tarefa não pode ser em data anterior a {DateTime.Now.Date}!");

        return erros;
    }
}