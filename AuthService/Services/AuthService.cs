using AuthService.Data;
using AuthService.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace AuthService.Services
{
    public class AuthService : IAuthService
    {
        private readonly UsersContext _usersContext;


        public AuthService(UsersContext usersContext) {
            _usersContext = usersContext;
        }

        /// <summary>
        /// Metodo usado para registrar usuario 
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        public bool Register(User user)
        {
            // Verificar si el usuario ya existe
            if (_usersContext.Users.Any(u => u.Username == user.Username))
                return false;
            // Hashear la contraseña antes de guardarla en la base de datos
            user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);
            // Agregar el usuario
            _usersContext.Users.Add(user);
            _usersContext.SaveChanges();
            return true;
        }
        
        /// <summary>
        /// Metodo para autenticar usuario
        /// </summary>
        /// <param name="username"></param>
        /// <param name="password"></param>
        /// <returns></returns>
        public string Authenticate(string username, string password)
        {
            var user = _usersContext.Users.FirstOrDefault(u => u.Username == username);

            if (user != null && VerifyPassword(password, user.Password))
            {
                // Generar y devolver el token JWT
                return GenerateJwtToken(username);
            }
            return null;
        }

        private bool VerifyPassword(string password, string hashedPassword)
        {
            return BCrypt.Net.BCrypt.Verify(password, hashedPassword);
        }

        private string GenerateJwtToken(string username)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            
            var keyGenerate = GenerateSecretKey(256);
            var key = Encoding.ASCII.GetBytes(keyGenerate);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim(ClaimTypes.Name, username) }),
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        public string GenerateSecretKey(int keySize)
        {
            // Crear una instancia de RNGCryptoServiceProvider para generar bytes aleatorios
            using (var rng = new RNGCryptoServiceProvider())
            {
                // Generar una secuencia de bytes aleatorios
                var bytes = new byte[keySize / 8];
                rng.GetBytes(bytes);

                // Convertir los bytes en una cadena base64
                return Convert.ToBase64String(bytes);
            }
        }
    }
}
