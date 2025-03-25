using Microsoft.EntityFrameworkCore;
using HealthTracker.Models;

namespace HealthTracker.Models
{
    public class EFCoreDbContext : DbContext
    {
        public EFCoreDbContext(DbContextOptions<EFCoreDbContext> options) : base(options)
        {
        }
        //OnConfiguring() method is used to select and configure the data source
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {

        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Users>().ToTable("Users");//map the db to frontend employee class and fields map to corresponding values
            modelBuilder.Entity<UserWorkouts>().ToTable("UserWorkouts");
            modelBuilder.Entity<ProgressTracking>().ToTable("ProgressTracking");

        }

        public DbSet<Users> Users { get; set; }
        public DbSet<UserWorkouts> UserWorkouts { get; set; }
        public DbSet<ProgressTracking> ProgressTrackings { get; set; }
        public DbSet<HealthTracker.Models.EmailReport> EmailReport { get; set; } = default!;


    }
}