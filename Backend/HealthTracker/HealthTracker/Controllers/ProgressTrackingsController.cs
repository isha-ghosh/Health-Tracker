using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HealthTracker.Models;

namespace HealthTracker.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProgressTrackingsController : ControllerBase
    {
        private readonly EFCoreDbContext _context;

        public ProgressTrackingsController(EFCoreDbContext context)
        {
            _context = context;
        }

        // GET: api/ProgressTrackings
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProgressTracking>>> GetProgressTrackings()
        {
            return await _context.ProgressTrackings.ToListAsync();
        }

        // GET: api/ProgressTrackings/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ProgressTracking>> GetProgressTracking(int id)
        {
            var progressTracking = await _context.ProgressTrackings.FindAsync(id);

            if (progressTracking == null)
            {
                return NotFound();
            }

            return progressTracking;
        }

        // PUT: api/ProgressTrackings/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProgressTracking(int id, ProgressTracking progressTracking)
        {
            if (id != progressTracking.ProgressId)
            {
                return BadRequest();
            }

            _context.Entry(progressTracking).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProgressTrackingExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }
        // ✅ GET: api/ProgressTrackings/user/{userId}  --> Get Progress for a Specific User
        [HttpGet("user/{userId}")]
        public async Task<ActionResult<IEnumerable<ProgressTracking>>> GetUserProgress(int userId)
        {
            var progressRecords = await _context.ProgressTrackings
                .Where(p => p.UserId == userId)
                .OrderByDescending(p => p.CheckingDate)
                .ToListAsync();

            if (!progressRecords.Any())
            {
                return NotFound(new { message = "No progress records found for this user." });
            }

            return progressRecords;
        }

        // ✅ POST: api/ProgressTrackings/add  --> Add New Progress Record
        [HttpPost("add")]
        public async Task<ActionResult<ProgressTracking>> AddProgress(ProgressTracking progress)
        {
            if (progress == null)
            {
                return BadRequest(new { message = "Invalid progress data." });
            }

            _context.ProgressTrackings.Add(progress);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetUserProgress), new { userId = progress.UserId }, progress);
        }

        // POST: api/ProgressTrackings
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ProgressTracking>> PostProgressTracking(ProgressTracking progressTracking)
        {
            _context.ProgressTrackings.Add(progressTracking);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProgressTracking", new { id = progressTracking.ProgressId }, progressTracking);
        }

        // DELETE: api/ProgressTrackings/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProgressTracking(int id)
        {
            var progressTracking = await _context.ProgressTrackings.FindAsync(id);
            if (progressTracking == null)
            {
                return NotFound();
            }

            _context.ProgressTrackings.Remove(progressTracking);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProgressTrackingExists(int id)
        {
            return _context.ProgressTrackings.Any(e => e.ProgressId == id);
        }
    }
}
