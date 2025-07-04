CREATE   PROC Users.spUser_upsert
    @UserId INT = NUll,
    @FirstName NVARCHAR(50),
    @LastName NVARCHAR(50),
    @Email NVARCHAR(50),
    @Gender NVARCHAR(50),
    @Active BIT = 1
AS
BEGIN
    IF NOT EXISTS (SELECT * FROM Users.Users WHERE UserId = @UserId)
        BEGIN
        IF NOT EXISTS (SELECT * FROM Users.Users WHERE Email = @Email)
            BEGIN

                INSERT INTO Users.Users(
                    [FirstName],
                    [LastName],
                    [Email],
                    [Gender],
                    [Active]
                ) VALUES (
                    @FirstName,
                    @LastName,
                    @Email,
                    @Gender,
                    @Active
                )
    END
END
ELSE
BEGIN
            UPDATE Users.Users 
                SET FirstName = @FirstName,
                    LastName = @LastName,
                    Email = @Email,
                    Gender = @Gender,
                    Active = @Active
                WHERE UserId = @UserId
    END
END

GO

