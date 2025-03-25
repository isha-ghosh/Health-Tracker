using HealthTracker.Middleware;
using HealthTracker.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HealthTracker.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] HealthTracker.Models.LoginRequest request)
        {
            string encr = EncryptionHelper.Encrypt(request.PasswordHash);
            var auth_response = await _authService.Authenticate(request.Email, encr);
            Console.WriteLine(auth_response.ToString());
            //if (string.IsNullOrEmpty(auth_response))
            if(auth_response == null) 
            {
                return Unauthorized("Invalid credentials");
            }
            //return Ok(new { Token = auth_response });
            return Ok(auth_response);
        }
    }
}
