namespace PiPortfolio.Data;

// Add your public contact details below, then restart the portfolio.
public static class ProfileData
{
    // Replace null with your full name and public address in quotes.
    public static string? FullName { get; } = "EPIFANIO M. TIGNO JR";
    public static string? Address { get; } = "Central Luzon, Philippines";
    // About Me photo only. Place it in wwwroot/images and use /images/profile.jpg here.
    public static string? PhotoUrl { get; } = "/images/profile.jpg";

    public static string? Email { get; } = "epitigno26@gmail.com";
    public static string? LinkedInUrl { get; } = null;
    public static string? GitHubUrl { get; } = "https://github.com/pi26-py";
    public static bool HasContact => !string.IsNullOrWhiteSpace(Email)
        || !string.IsNullOrWhiteSpace(LinkedInUrl) || !string.IsNullOrWhiteSpace(GitHubUrl);
}



