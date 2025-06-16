    CREATE   PROCEDURE Users.spLoginConfirmation_Get
    @Email NVARCHAR(50)
AS
BEGIN
    SELECT [Auth].[PasswordHash],
        [Auth].[PasswordSalt] 
    FROM users.Auth AS Auth 
        WHERE Auth.Email = @Email
END;

GO

