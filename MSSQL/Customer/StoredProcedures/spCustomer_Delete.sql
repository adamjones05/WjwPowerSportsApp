CREATE PROC [Customer].[spCustomer_Delete]
    (@CustomerId INT)
AS
BEGIN
    DELETE FROM Customer.Customers 
WHERE CustomerId = @CustomerId
END

GO

