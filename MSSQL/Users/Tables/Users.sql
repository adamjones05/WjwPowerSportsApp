CREATE TABLE [Users].[Users] (
    [UserId]    INT          IDENTITY (1, 1) NOT NULL,
    [FirstName] VARCHAR (50) NULL,
    [LastName]  VARCHAR (50) NULL,
    [Email]     VARCHAR (50) NULL,
    [Gender]    VARCHAR (50) NULL,
    [Active]    BIT          NULL,
    PRIMARY KEY CLUSTERED ([UserId] ASC)
);


GO

