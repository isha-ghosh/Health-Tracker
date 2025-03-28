﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HealthTracker.Models;
using HealthTracker.Middleware;

namespace HealthTracker.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly EFCoreDbContext _context;

        public UsersController(EFCoreDbContext context)
        {
            _context = context;
        }

        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Users>>> GetUsers()
        {
            return await _context.Users.ToListAsync();
        }


        [HttpGet("login/{email}/{password}")]
        public async Task<IActionResult> Login(string email, string password)
        {
            string encr = EncryptionHelper.Encrypt(password);
            Users user = _context.Users.Where(x => x.Email == email && x.PasswordHash == encr).FirstOrDefault<Users>();
            //var token = await _authService.Authenticate(request.Username, request.Password);
            if (user == null)
            {
                return Unauthorized("Invalid credentials");
            }
            return Ok(user);
        }



        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Users>> GetUsers(int id)
        {
            var users = await _context.Users.FindAsync(id);

            if (users == null)
            {
                return NotFound();
            }

            return users;
        }

        // PUT: api/Users/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUsers(int id, Users users)
        {
            if (id != users.UserId)
            {
                return BadRequest();
            }

            _context.Entry(users).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UsersExists(id))
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

        // POST: api/Users
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        //[HttpPost]
        //public async Task<ActionResult<Users>> PostUsers(Users users)
        //{

        //    SendMail.MailInfo("dishaghosh1808@gmail.com", ".NET Core Mail", "This is First Mail");
        //    string encry = EncryptionHelper.Encrypt(users.PasswordHash);
        //    users.PasswordHash = encry;
        //    _context.Users.Add(users);
        //    await _context.SaveChangesAsync();

        //    return CreatedAtAction("GetUsers", new { id = users.UserId }, users);
        //}


        //[HttpPost("SendTestMail")]
        //public IActionResult SendTestMail([FromBody] EmailReport emailRequest)
        //{
        //    // Validate the input model
        //    if (emailRequest == null || string.IsNullOrEmpty(emailRequest.RecipientEmail) || string.IsNullOrEmpty(emailRequest.Subject) || string.IsNullOrEmpty(emailRequest.Body))
        //    {
        //        return BadRequest("Invalid email details.");
        //    }

        //    // Call the SendMail.MailInfo function to send the email
        //    string result = SendMail.MailInfo(emailRequest.RecipientEmail, emailRequest.Subject, emailRequest.Body);

        //    // Return appropriate response based on the result
        //    if (result == "success")
        //    {
        //        return Ok("Email sent successfully!");
        //    }
        //    else
        //    {
        //        return BadRequest($"Error sending email: {result}");
        //    }
        //}



        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUsers(int id)
        {
            var users = await _context.Users.FindAsync(id);
            if (users == null)
            {
                return NotFound();
            }

            _context.Users.Remove(users);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UsersExists(int id)
        {
            return _context.Users.Any(e => e.UserId == id);
        }

        
        
    }
}
