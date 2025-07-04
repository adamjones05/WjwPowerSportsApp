CREATE PROC [Customer].[spCustomer_Get_Single]
@CustomerId INT
AS
BEGIN
SELECT * FROM Customer.Customers
WHERE CustomerId = @CustomerId
END

GO

