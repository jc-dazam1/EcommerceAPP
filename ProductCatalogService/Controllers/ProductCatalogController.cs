using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using ProductCatalogService.Models;

namespace ProductCatalogService.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly List<Product> _products = new List<Product>
        {
            new Product { Id = 1, Name = "Product 1", Price = 10.99 , Amount = 20},
            new Product { Id = 2, Name = "Product 2", Price = 20.99 , Amount = 20 },
        };

        [HttpGet]
        public IEnumerable<Product> Get()
        {
            return _products;
        }
        [HttpGet("{id}")]
        public ActionResult<Product> Get(int id)
        {
            var product = _products.Find(p => p.Id == id);
            if (product == null)
            {
                return NotFound();
            }
            return product;
        }

        [HttpPost]
        public ActionResult<Product> Post(Product product)
        {
            _products.Add(product);
            return CreatedAtAction(nameof(Get), new { id = product.Id }, product);
        }
    }

}
