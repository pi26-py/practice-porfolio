# Pi — Engineering Portfolio

A Blazor Web App (.NET 8, Interactive Server render mode) showing five projects as
status-tracked panels: **Arcana**, **NexusGPS**, **Fault Automation**, **Temperature
Sensor**, and **Ultra Maverick Dry**.

## Run it

Requires the [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0).

```bash
cd PiPortfolio
dotnet run
```

Then open the URL printed in the console (usually `https://localhost:5001`).

## Project structure

```
PiPortfolio/
├── Program.cs                     # host + Blazor setup
├── Components/
│   ├── App.razor                  # root HTML document, fonts
│   ├── Routes.razor                # router
│   ├── Layout/MainLayout.razor     # page shell
│   ├── Layout/NavMenu.razor        # top nav
│   └── Pages/
│       ├── Home.razor              # project grid ("/")
│       └── Project.razor           # project detail ("/project/{slug}")
├── Data/
│   ├── ProjectInfo.cs               # project record type
│   └── ProjectData.cs               # the 5 projects live here
└── wwwroot/app.css                # visual theme
```

## Where to edit content

All project copy lives in one place: **`Data/ProjectData.cs`**. Each entry is a
`ProjectInfo` with a slug, name, tagline, status, tech stack, summary, and a list of
highlights — add, remove, or edit entries there and both the home grid and the detail
pages pick it up automatically.

## Notes / assumptions made while filling this in

Four of the five projects were filled in from what I had context on already —
double check these against reality and adjust:

- **Arcana** and **NexusGPS** — mapped to the RDF.Arcana.API backend and its ESP32
  companion firmware.
- **Fault Automation** — mapped to the conveyor/RFID line-controller backend
  (heartbeat protocol, reconnect handling, SignalR). If "Fault Automation" is actually
  a different project, swap the `Stack`/`Summary`/`Highlights` for that entry.
- **Temperature Sensor** — mapped to the ESP32 weather-station node (DHT22 + OLED +
  battery fuel gauge).
- **Ultra Maverick Dry** — no details on hand, so it's a placeholder entry. Fill in
  its `Stack`, `Summary`, and `Highlights` in `ProjectData.cs` whenever you're ready.

The `Status` / `StatusVariant` fields ("active" = amber dot, "development" = blue dot,
"complete" = green dot) are my best guess at what's currently maintained vs. still
in progress — adjust freely per project.

## Personal details and homepage
The homepage is ordered: introduction and portrait, featured projects, About, Contact.
Set your photo path, email, LinkedIn and GitHub in `Data/ProfileData.cs`.
Place your portrait under `wwwroot/images` and set PhotoUrl to `/images/profile.jpg`.
Until configured, a Pi monogram and a contact-coming-soon message appear.
Add projects in `Data/ProjectData.cs`; update the ordering array at the end of the list to choose their position.
The current collection is Arcana, UM Dry, Fault Automation, Temperature IoT, and ServerMon.
UM Dry still needs its technical details. Confirm all project descriptions and statuses before publishing.
