using AuthService.Models;
using AuthService.Services;
using Microsoft.AspNetCore.Mvc;

namespace AuthService.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("login")]
        public IActionResult Login(User user)
        {
            var token = _authService.Authenticate(user.Username, user.Password);
            if (token == null)
                return Unauthorized();

            return Ok(new { token });
        }

        [HttpPost("register")]
        public IActionResult Register(User user)
        {
            var success = _authService.Register(user);
            if (!success)
                return Conflict("El usuario ya existe");

            return Ok("Registro exitoso");
        }
    }
}
