using Dapper;
using Microsoft.AspNetCore.Mvc;
using WjwApi.Data;
using WjwApi.Models;

namespace WjwApi.Controllers
{
    [Route("customers")]
    [ApiController]
    public class WjwController : ControllerBase
    {
        DataContextDapper _dapper;
        public WjwController(IConfiguration config)
        {
            _dapper = new DataContextDapper(config);
        }

        [HttpGet("Post")]
        public IEnumerable<Customer> GetAllCustomers()
        {
            string getSql = "EXEC customer.spget_all_customers";
            return _dapper.LoadData<Customer>(getSql);
        }

        [HttpGet("Post/{customerId}")]
        public Customer GetSingleCustomer(int customerId)
        {
            string getSingleSql = @"
                EXEC customer.spget_single_customer
                @customerId = '" + customerId + @"'";
            if (customerId <= 0)
            {
                throw new ArgumentException("Invalid customer ID");
            }
            return _dapper.LoadDataSingle<Customer>(getSingleSql);
        }

        [HttpPut("Post")]
        public IActionResult UpdateCustomer(Customer customerToUpdate)
        {
            string updateSql = @"
                EXEC customer.spupdate_customer
                @customerId = '" + customerToUpdate.customerId + @"',
                @firstName = '" + customerToUpdate.firstName + @"',
                @lastName = '" + customerToUpdate.lastName + @"',
                @email = '" + customerToUpdate.email + @"',
                @phone = '" + customerToUpdate.phone + @"'";
            _dapper.ExecuteSql(updateSql);
            {
                return Ok();
            }

            throw new Exception("Failed to Update Customer");
        }

        [HttpPost("Post")]
        public IActionResult AddCustomer(Customer customerToAdd)
        {
            string insertSql = @"
            EXEC customer.spadd_customer
            @firstName = '" + customerToAdd.firstName + @"',
            @lastName = '" + customerToAdd.lastName + @"',
            @email = '" + customerToAdd.email + @"',
            @phone = '" + customerToAdd.phone + @"'";

            _dapper.ExecuteSql(insertSql);
            {
                return Ok();
            }

            throw new Exception("Failed to Add Customer");
        }

        [HttpDelete("Post/{customerId}")]
        public IActionResult DeleteCustomer(int customerId)
        {
            if (customerId <= 0)
            {
                return BadRequest("Invalid customer ID");
            }

            string deleteSql = @"EXEC customer.spdelete_customer @customerId = @CustomerIdParam";

            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("@CustomerIdParam", customerId);

            try
            {
                var isDeleted = _dapper.ExecuteSqlWithParameters(deleteSql, parameters);

                if (!isDeleted)
                {
                    // Customer wasn't found in DB
                    return NotFound("Customer not found.");
                }

                return Ok("Customer deleted successfully.");
            }
            catch (Exception ex)
            {
                // Something went wrong during deletion
                return StatusCode(500, "Error deleting customer: " + ex.Message);
            }
        }
    }
}