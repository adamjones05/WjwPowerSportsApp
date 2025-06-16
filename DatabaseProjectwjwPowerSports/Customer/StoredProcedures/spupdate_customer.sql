CREATE PROC customer.spupdate_customer
    @customerId INT,
    @firstName VARCHAR(50),
    @lastName VARCHAR(50),
    @email VARCHAR(50),
    @phone NVARCHAR(50)
AS
BEGIN
    UPDATE Customer.CustomerInfo
    SET 
    firstName = @firstName,
    lastName = @lastName,
    email = @email,
    phone = @phone
    WHERE customerId = @customerId
END

GO

