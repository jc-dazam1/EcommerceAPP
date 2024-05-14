using AuthService.Models;

namespace AuthService.Services
{
    public interface IAuthService
    {
        string Authenticate(string username, string password);
        bool Register(User user);
    }
}
