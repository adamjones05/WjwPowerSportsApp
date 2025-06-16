CREATE PROC customer.spget_single_customer
@customerId INT
AS
BEGIN
SELECT * FROM Customer.CustomerInfo
WHERE customerId = @customerId
END

GO

