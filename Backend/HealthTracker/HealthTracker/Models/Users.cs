using System.ComponentModel.DataAnnotations;

namespace HealthTracker.Models
{
    public class Users
    {
        [Key]
        public int UserId { get; set; }

        public string? FullName { get; set; }

      
        public string? Email { get; set; }

     
        public string? PasswordHash { get; set; } // Hashed password for security

        public DateTime CreatedAt { get; set; } = DateTime.Now;

        
        public string? Gender { get; set; }  // "Male", "Female", "Other"

    
        public decimal Height { get; set; } // In meters

     
        public decimal Weight { get; set; } // In kg
    }
}
