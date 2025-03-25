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
    public class UserWorkoutsController : ControllerBase
    {
        private readonly EFCoreDbContext _context;

        public UserWorkoutsController(EFCoreDbContext context)
        {
            _context = context;
        }

        // GET: api/UserWorkouts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserWorkouts>>> GetUserWorkouts()
        {
            return await _context.UserWorkouts.ToListAsync();
        }

        // GET: api/UserWorkouts/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UserWorkouts>> GetUserWorkouts(int id)
        {
            var userWorkouts = await _context.UserWorkouts.FindAsync(id);

            if (userWorkouts == null)
            {
                return NotFound();
            }

            return userWorkouts;
        }

        [HttpGet("user/{userId}")]
        public async Task<ActionResult<IEnumerable<UserWorkouts>>> GetWorkoutsByUser(int userId)
        {
            var workouts = await _context.UserWorkouts
                                         .Where(w => w.UserId == userId)
                                         .ToListAsync();

            if (workouts.Count == 0)
            {
                return NotFound("No workouts found for this user.");
            }

            return workouts;
        }



        // PUT: api/UserWorkouts/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUserWorkouts(int id, UserWorkouts userWorkouts)
        {
            if (id != userWorkouts.WorkOutId)
            {
                return BadRequest();
            }

            _context.Entry(userWorkouts).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserWorkoutsExists(id))
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

        // POST: api/UserWorkouts
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<UserWorkouts>> PostUserWorkouts(UserWorkouts userWorkouts)
        {
            _context.UserWorkouts.Add(userWorkouts);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUserWorkouts", new { id = userWorkouts.WorkOutId }, userWorkouts);
        }

        // DELETE: api/UserWorkouts/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUserWorkouts(int id)
        {
            var userWorkouts = await _context.UserWorkouts.FindAsync(id);
            if (userWorkouts == null)
            {
                return NotFound();
            }

            _context.UserWorkouts.Remove(userWorkouts);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserWorkoutsExists(int id)
        {
            return _context.UserWorkouts.Any(e => e.WorkOutId == id);
        }
    }
}
