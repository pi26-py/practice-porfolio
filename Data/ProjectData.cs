namespace PiPortfolio.Data;

public static class ProjectData
{
    public static readonly IReadOnlyList<ProjectInfo> All = new List<ProjectInfo>
    {
        new(
            Slug: "arcana",
            Name: "Arcana",
            Tagline: "Sales and Inventory Management",
            Status: "Actively maintained",
            StatusVariant: "active",
            Stack: new[] { "ASP.NET Core","Firebase RTDB","Arduino"},
            Summary: "RDF.Arcana.API is the backend Sales and Inventory system, " +
                     "pushing firmware, and turning raw location logs into reports a dispatcher can read.",
            Highlights: new[]
            {
                "GPS device registration and Firebase provisioning through a CQRS pipeline (AddStoreDevice)",
                "Firmware OTA management: uploads, version history, and a per-device update audit trail",
                "Travel-log ingestion: CSV parsing, dedup, reverse geocoding, and Douglas-Peucker route simplification",
                "Two-sheet Excel export of daily logs and per-vehicle distance summaries via ClosedXML"
            }
        ),
        new(
            Slug: "fault-automation",
            Name: "Fault Automation",
            Tagline: "Conveyor & RFID line controller",
            Status: "Maintained",
            StatusVariant: "active",
            Stack: new[] { "ASP.NET Core", "SignalR", "Carter", "EF Core", "RC522 RFID" },
            Summary: "A conveyor-line control backend built around a serial link to the line's Arduino that has to " +
                     "recover cleanly from every drop, jam, and reconnect.",
            Highlights: new[]
            {
                "PING/PONG heartbeat protocol over serial with automatic fault detection and reconnect handling",
                "SignalR hub broadcasting live tag reads and line state to connected UIs",
                "RC522 tag read/write state machine synchronized with a servo gate and IR sensor",
                "Evaluated UHF RFID and face-recognition access-control modules for the same line"
            }
        ),
        new(
            Slug: "temperature-sensor",
            Name: "Temperature IoT",
            Tagline: "Rechargeable weather station node",
            Status: "Prototype",
            StatusVariant: "development",
            Stack: new[] { "ESP32", "DHT22", "SH1106 OLED", "MAX17043 fuel gauge" },
            Summary: "A battery-powered environmental sensor node designed to run for days between charges " +
                     "while still showing its own status on an onboard display.",
            Highlights: new[]
            {
                "Temperature and humidity readings pushed to Firebase on an interval",
                "On-device OLED display with a live battery-percentage widget",
                "MAX17043 fuel-gauge integration over I2C for accurate charge readout",
                "Deep-sleep power budgeting aimed at multi-day runtime on a single charge"
            }
        ),
        new(
            Slug: "ultra-maverick-dry",
            Name: "UM Dry",
            Tagline: "Project overview in preparation",
            Status: "In development",
            StatusVariant: "development",
            Stack: Array.Empty<string>(),
            Summary: "UM Dry is part of this project collection. A technical overview will be added here.",
            Highlights: new[]
            {
                "Technical details and project documentation are being prepared."
            }
        ),
        new(
            Slug: "servermon",
            Name: "ServerMon",
            Tagline: "Server monitoring & management dashboard",
            Status: "In development",
            StatusVariant: "development",
            Stack: new[] { "Blazor", "C#", "ASP.NET Core", "REST API" },
            Summary: "A Blazor dashboard for monitoring server availability, reviewing check history, and managing monitored servers through an authenticated API.",
            Highlights: new[]
            {
                "Server dashboard with search, filters, and periodic refresh",
                "On-demand availability checks, recent history, and saved logs",
                "Authenticated API access and server management workflows"
            }
        ),
        new(
            Slug: "NexusGPS",
            Name: "Nexus GPS",
            Tagline: "Fleet Monitoring and Dashboard",
            Status: "In development",
            StatusVariant: "development",
            Stack: new[] { "C#", "ASP.NET Core", "REST API","Arduino" },
            Summary: "A Blazor dashboard for monitoring server availability, reviewing check history, and managing monitored servers through an authenticated API.",
            Highlights: new[]
            {
                "GPS device registration and Firebase provisioning",
                "Firmware OTA management: uploads, version history, and a per-device update audit trail",
                "Travel-log ingestion: CSV parsing, dedup, reverse geocoding, and Douglas-Peucker route simplification",
            }
        )



    }.OrderBy(p => Array.IndexOf(new[] { "arcana", "ultra-maverick-dry", "fault-automation", "temperature-sensor", "servermon" }, p.Slug)).ToArray();

    public static ProjectInfo? Find(string slug) =>
        All.FirstOrDefault(p => p.Slug == slug);
}

