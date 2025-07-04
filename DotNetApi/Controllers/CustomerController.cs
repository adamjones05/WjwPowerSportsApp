using System.Data;
using Dapper;
using Microsoft.AspNetCore.Mvc;
using WjwApi.Data;
using WjwApi.Models;

namespace WjwApi.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        DataContextDapper _dapper;
        public CustomerController(IConfiguration config)
        {
            _dapper = new DataContextDapper(config);
        }

        [HttpGet("GetCustomers")]
        public IEnumerable<Customer> GetAllCustomers()
        {
            string getSql = "EXEC Customer.spCustomer_Get";
            return _dapper.LoadData<Customer>(getSql);
        }

        [HttpGet("GetCustomer/{CustomerId}")]
        public Customer GetSingleCustomer(int CustomerId)
        {
            string getSingleSql = @"
                EXEC Customer.spCustomer_Get_Single
                @CustomerId = @CustomerIdParam";
            DynamicParameters sqlParameters = new DynamicParameters();
            sqlParameters.Add("@CustomerIdParam", CustomerId, DbType.Int32);

            if (CustomerId <= 0)
            {
                throw new ArgumentException("Invalid Customer ID");
            }
            return _dapper.LoadDataSingleWithParameters<Customer>(getSingleSql, sqlParameters);
        }

        [HttpPut("UpdateCustomer")]
        public IActionResult UpdateCustomer(Customer CustomerToUpdate)
        {
            string updateSql = @"
                EXEC Customer.spCustomer_Update
                @CustomerId = @CustomerIdParam,
                @FirstName = @FirstNameParam,
                @LastName = @LastNameParam,
                @Email = @EmailParam,
                @Phone = @PhoneParam";
            DynamicParameters sqlParameters = new DynamicParameters();
            sqlParameters.Add("@CustomerIdParam", CustomerToUpdate.CustomerId, DbType.Int32);
            sqlParameters.Add("@FirstNameParam", CustomerToUpdate.FirstName, DbType.String);
            sqlParameters.Add("@LastNameParam", CustomerToUpdate.LastName, DbType.String);
            sqlParameters.Add("@EmailParam", CustomerToUpdate.Email, DbType.String);
            sqlParameters.Add("@PhoneParam", CustomerToUpdate.Phone, DbType.String);
            _dapper.ExecuteSqlWithParameters(updateSql, sqlParameters);
            {
                return Ok();
            }

            throw new Exception("Failed to Update Customer");
        }

        [HttpPost("AddCustomer")]
        public IActionResult AddCustomer(Customer CustomerToAdd)
        {
            string insertSql = @"
            EXEC Customer.spCustomer_Add
            @firstName = @FirstNameParam,
            @lastName = @LastNameParam,
            @email = @EmailParam,
            @phone = @PhoneParam";

            DynamicParameters sqlParameters = new DynamicParameters();
            sqlParameters.Add("@FirstNameParam", CustomerToAdd.FirstName, DbType.String);
            sqlParameters.Add("@LastNameParam", CustomerToAdd.LastName, DbType.String);
            sqlParameters.Add("@EmailParam", CustomerToAdd.Email, DbType.String);
            sqlParameters.Add("@PhoneParam", CustomerToAdd.Phone, DbType.String);

            _dapper.ExecuteSqlWithParameters(insertSql, sqlParameters);
            {
                return Ok();
            }

            throw new Exception("Failed to Add Customer");
        }

        [HttpDelete("DeleteCustomer/{CustomerId}")]
        public IActionResult DeleteCustomer(int CustomerId)
        {
            if (CustomerId <= 0)
            {
                return BadRequest("Invalid Customer ID");
            }

            string deleteSql = @"EXEC Customer.spCustomer_Delete @CustomerId = @CustomerIdParam";

            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("@CustomerIdParam", CustomerId);

            try
            {
                var isDeleted = _dapper.ExecuteSqlWithParameters(deleteSql, parameters);

                if (!isDeleted)
                {
                    return NotFound("Customer not found.");
                }

                return Ok("Customer deleted successfully.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Error deleting Customer: " + ex.Message);
            }
        }
    }
}