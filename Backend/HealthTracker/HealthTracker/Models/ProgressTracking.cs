using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace HealthTracker.Models
{
    public class ProgressTracking
    {
        [Key]
        public int ProgressId { get; set; }

        [Required]
        [ForeignKey("User")]
        public int UserId { get; set; }

        public decimal WeightKG { get; set; }

        public decimal? BodyFatPercentage { get; set; }

        public DateTime CheckingDate { get; set; } = DateTime.Now;
    }
}
