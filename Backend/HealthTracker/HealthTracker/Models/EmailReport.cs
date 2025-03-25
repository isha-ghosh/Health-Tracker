using System.ComponentModel.DataAnnotations;

namespace HealthTracker.Models
{
    public class EmailReport
    {
        [Key]
        public string RecipientEmail { get; set; }
        public string Subject { get; set; }
        public string Body { get; set; }
    }
}
