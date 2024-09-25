namespace Api.Dominio.DTOs;

public class TarefaDTO
{
    public string Titulo { get; set; } = string.Empty;
    public string Descricao { get; set; } = string.Empty;
    public DateTime DataTarefa { get; set; }
    public Status Status { get; set; }
}