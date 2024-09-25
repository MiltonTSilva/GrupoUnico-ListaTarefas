using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Api.Dominio.Enuns;

namespace Api.Dominio.Entidades;

public class Tarefa
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    [Required(ErrorMessage = "Título da tarefa é obrigatório.")]
    [StringLength(100)]
    public string Titulo { get; set; } = string.Empty;

    [StringLength(255)]
    public string Descricao { get; set; } = string.Empty;

    [Required(ErrorMessage = "Data da tarefa é obrigatório.")]
    public DateTime DataTarefa { get; set; }

    [Required(ErrorMessage = "Status da tarefa é obrigatório.")]
    [StringLength(10)]
    public Status Status { get; set; }
}