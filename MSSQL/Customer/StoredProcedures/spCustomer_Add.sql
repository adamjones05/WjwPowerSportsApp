CREATE PROC [Customer].[spCustomer_Add]
    @FirstName VARCHAR(50),
    @LastName VARCHAR(50),
    @Email VARCHAR(50),
    @Phone NVARCHAR(50)
AS
BEGIN
    INSERT INTO Customer.Customers
        (
        FirstName,
        LastName,
        Email,
        Phone
        )
    VALUES
        (
        @FirstName,
        @LastName,
        @Email,
        @Phone 
        )
END

GO

