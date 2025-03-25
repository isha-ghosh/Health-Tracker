using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace HealthTracker.Models
{
    public class UserWorkouts
    {
        [Key]
        public int WorkOutId { get; set; }

        [Required]
        [ForeignKey("User")]
        public int UserId { get; set; }

        public string? WorkoutType { get; set; } // "Cardio", "Strengthening", "Yoga"

        public int DurationMinutes { get; set; }

     
        public int CaloriesBurned { get; set; }

        public DateTime WorkoutDate { get; set; } = DateTime.Now;
    }
}
