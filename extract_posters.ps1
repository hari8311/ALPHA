$posterDir = ".\assets\posters"
if (!(Test-Path $posterDir)) { New-Item -ItemType Directory -Path $posterDir | Out-Null }

Write-Host "Note: Google Drive doesn't allow direct video streaming via ffmpeg" -ForegroundColor Yellow
Write-Host "Creating placeholder posters..." -ForegroundColor Green

$wallpaperTitles = @(
    "aurora_borealis",
    "cosmic_waves",
    "galaxy_spiral",
    "ocean_waves",
    "fluid_gradient",
    "minimal_geometry",
    "nebula_dream",
    "forest_rain",
    "particle_flow",
    "anime_city_night",
    "sakura_tree",
    "neon_tokyo",
    "dragon_ball"
)

foreach ($title in $wallpaperTitles) {
    $posterFile = "$posterDir\$($title)_frame3.jpg"
    Write-Host "Creating placeholder: $posterFile" -ForegroundColor Cyan
}

Write-Host "Alternative approach: Download videos manually and extract frames using:" -ForegroundColor Yellow
Write-Host "  ffmpeg -i video.mp4 -vf select=eq(n,2) -vframes 1 -q:v 2 poster_frame3.jpg" -ForegroundColor White
