namespace HealthTracker.Models
{
    public interface IAuthService
    {

        Task<object> Authenticate(string email, string password);

    }
}
