CREATE TABLE [Customer].[Customers] (
    [CustomerID] INT            IDENTITY (1, 1) NOT NULL,
    [FirstName]  NVARCHAR (50)  NOT NULL,
    [LastName]   NVARCHAR (50)  NOT NULL,
    [Email]      NVARCHAR (100) NOT NULL,
    [Phone]      NVARCHAR (15)  NULL,
    UNIQUE NONCLUSTERED ([Email] ASC)
);


GO

CREATE CLUSTERED INDEX [cix_Customers_CustomerId]
    ON [Customer].[Customers]([CustomerID] ASC);


GO

