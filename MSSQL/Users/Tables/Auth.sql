CREATE TABLE [Users].[Auth] (
    [Email]        NVARCHAR (50)   NOT NULL,
    [PasswordHash] VARBINARY (MAX) NULL,
    [PasswordSalt] VARBINARY (MAX) NULL,
    PRIMARY KEY CLUSTERED ([Email] ASC)
);


GO

