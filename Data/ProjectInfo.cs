namespace PiPortfolio.Data;

/// <summary>
/// A single portfolio entry. StatusVariant drives the status-dot color in CSS
/// and should be one of: "active", "development", "complete".
/// </summary>
public record ProjectInfo(
    string Slug,
    string Name,
    string Tagline,
    string Status,
    string StatusVariant,
    string[] Stack,
    string Summary,
    string[] Highlights
);
