using Api.Dominio.Entidades;
using Api.Dominio.Enuns;

namespace Api.Dominio.Interfaces;
public interface ITarefa
{
    List<Tarefa> Todos(int? paginas = 1, string? nome = null, string? marca = null);
    Tarefa? BuscarPorId(int id);
    Task<List<string>> Adicionar(Tarefa Tarefa);
    Task<List<string>> Atualizar(Tarefa Tarefa);
    Task<List<string>> AtualizarStatus(int id, Status status);
    bool Remover(Tarefa Tarefa);
}