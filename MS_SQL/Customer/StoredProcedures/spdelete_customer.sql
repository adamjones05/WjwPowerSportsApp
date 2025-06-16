CREATE PROC customer.spdelete_customer
    (@customerId INT)
AS
BEGIN
    DELETE FROM Customer.CustomerInfo 
WHERE customerId = @customerId
END

GO

