using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using System;
using Microsoft.EntityFrameworkCore;


namespace HealthTracker.Models
{
    public class AuthService : IAuthService
    {
        private readonly EFCoreDbContext _context;
        private readonly JwtSettings _jwtSettings;

        public AuthService(EFCoreDbContext context, IOptions<JwtSettings> jwtSettings)
        {
            _context = context;
            _jwtSettings = jwtSettings.Value;
        }
        //string->object
        public async Task<object> Authenticate(string email, string password)
        {
            var user = await _context.Users.SingleOrDefaultAsync(u => u.Email == email);
            if (user == null || user.PasswordHash != password) // Use hashed passwords in production
            {
                return null;
            }

            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSettings.SecretKey));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _jwtSettings.Issuer,
                audience: _jwtSettings.Audience,
                expires: DateTime.Now.AddMinutes(_jwtSettings.ExpirationMinutes),
                signingCredentials: credentials
            );

            return new
            {
                Token = new JwtSecurityTokenHandler().WriteToken(token),
                User = user,  // Directly return user details

            };
            //return new JwtSecurityTokenHandler().WriteToken(token);
        }

    }
}
