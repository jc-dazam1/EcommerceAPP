using Microsoft.AspNetCore.Mvc;
using ProductCatalogService.Models;
using ProductCatalogService.Services;

namespace ProductCatalogService.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly ProductsService _productCatalogService;

        public ProductsController(ProductsService productCatalogService)
        {
            _productCatalogService = productCatalogService;
        }

        [HttpGet]
        public IEnumerable<Product> Get()
        {
            return _productCatalogService.GetAllProducts();
        }

        [HttpGet("{id}")]
        public ActionResult<Product> Get(int id)
        {
            var product = _productCatalogService.GetProductById(id);
            if (product == null)
            {
                return NotFound();
            }
            return product;
        }

        [HttpPost]
        public ActionResult<Product> Post(Product product)
        {
            _productCatalogService.AddProduct(product);
            return CreatedAtAction(nameof(Get), new { id = product.Id }, product);
        }
    }
}
