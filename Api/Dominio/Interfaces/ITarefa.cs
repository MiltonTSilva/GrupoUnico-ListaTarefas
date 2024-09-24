using Api.Dominio.Entidades;
using Api.Dominio.Enuns;

namespace Api.Dominio.Interfaces;
public interface ITarefa
{
    List<Tarefa> Todos(int? paginas = 1, string? titulo = null, string? descricao = null, DateTime? dataTarefa = null, string? status = null);
    Tarefa? BuscarPorId(int id);
    Task<List<string>> Adicionar(Tarefa Tarefa);
    Task<List<string>> Atualizar(Tarefa Tarefa);
    Task<string> AtualizarStatus(int id, Status status);
    string Remover(Tarefa Tarefa);
}