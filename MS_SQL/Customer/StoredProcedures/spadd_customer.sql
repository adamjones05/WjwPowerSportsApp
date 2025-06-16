CREATE PROC customer.spadd_customer
    @firstName VARCHAR(50),
    @lastName VARCHAR(50),
    @email VARCHAR(50),
    @phone NVARCHAR(50)
AS
BEGIN
    INSERT INTO Customer.CustomerInfo (
        firstName, 
        lastName, 
        email, 
        phone
    ) VALUES (
        @firstName,
        @lastName,
        @email,
        @phone )
END

GO

