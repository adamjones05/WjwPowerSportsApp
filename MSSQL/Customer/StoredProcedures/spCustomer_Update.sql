CREATE PROC [Customer].[spCustomer_Update]
    @CustomerId INT,
    @FirstName VARCHAR(50),
    @LastName VARCHAR(50),
    @Email VARCHAR(50),
    @Phone NVARCHAR(50)
AS
BEGIN
    UPDATE Customer.Customers
    SET 
    FirstName = @firstName,
    LastName = @lastName,
    Email = @email,
    Phone = @phone
    WHERE CustomerId = @CustomerId
END

GO

