using System.Collections.Generic;
using System.Linq;
using ProductCatalogService.Models;

namespace ProductCatalogService.Services
{
    public class ProductsService
    {
        private readonly List<Product> _products = new List<Product>
        {
            new Product { Id = 1, Name = "Product 1", Price = 10.99, Amount = 20 },
            new Product { Id = 2, Name = "Product 2", Price = 20.99, Amount = 20 },
        };

        public IEnumerable<Product> GetAllProducts()
        {
            return _products;
        }

        public Product GetProductById(int id)
        {
            return _products.FirstOrDefault(p => p.Id == id);
        }

        public void AddProduct(Product product)
        {
            _products.Add(product);
        }
    }
}
