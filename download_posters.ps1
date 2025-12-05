<#
.SYNOPSIS
Download poster images from Google Drive and save to assets/posters/

.DESCRIPTION
This script downloads all 13 poster images from the user's Google Drive folder
and saves them locally. File IDs are pre-populated from poster_links/links.txt.

.USAGE
From project root (C:\Users\Hariprasath\Downloads\ALPHA):
  .\download_posters.ps1
#>

Set-StrictMode -Version Latest

# Ensure output directory exists
$posterDir = Join-Path -Path $PSScriptRoot -ChildPath "assets/posters"
if (-not (Test-Path $posterDir)) {
    New-Item -ItemType Directory -Path $posterDir -Force | Out-Null
    Write-Host "Created directory: $posterDir" -ForegroundColor Green
}

# File IDs from user's Google Drive poster folder (poster_links/links.txt)
$posters = @(
    @{ FileName = 'aurora.jpg'; FileId = '11TPfvjiWWfuvnFuq-WG1HoddJvpSR6cU' },
    @{ FileName = 'cosmic_waves.jpg'; FileId = '1HFe1eQrAnPQRM0TrX33ntphx61_yRHNK' },
    @{ FileName = 'galaxy_spiral.jpg'; FileId = '1n8RNTqbjhwN3lt1kQ_MLQnkxQ2NAcDjV' },
    @{ FileName = 'ocean_waves.jpg'; FileId = '1jdoPujQVyGIcw4Jx-PXH6quLo5gk6ftm' },
    @{ FileName = 'fluid_gradient.jpg'; FileId = '1VX6WvA9YLkAaPDbEUi7m45LVNdD9n0gv' },
    @{ FileName = 'minimal_geometry.jpg'; FileId = '1fAWqn4wTuknB9xcDBLO1aiHbNP3N_rcu' },
    @{ FileName = 'nebula_dream.jpg'; FileId = '1nYN16BtWldukYYG4zOoF2WZxW4oFQ8co' },
    @{ FileName = 'forest_rain.jpg'; FileId = '1PcsNYz2_iSSZHnsP3g8aEm4ivMwEqqYk' },
    @{ FileName = 'particle_flow.jpg'; FileId = '1aGLW9IsksKDltfCtSndfGWlWxa6_ZL55' },
    @{ FileName = 'anime_city_night.jpg'; FileId = '1eMRNzk-4hRqiu6XPw3JPgDmeL4OPMIc2' },
    @{ FileName = 'sakura_dreams.jpg'; FileId = '1iWi-XVqtC629jR-EWgIntvH5_jhdp3Yk' },
    @{ FileName = 'neon_tokyo.jpg'; FileId = '15LPxFxCF4TObvXxesumMp5MvSYdq57X-' },
    @{ FileName = 'dragon_ball_frame10.jpg'; FileId = '1gfyuvJwThd6HGonHW-xTfau2zDuwdgYd' },
    @{ FileName = 'goku_black_warrior.jpg'; FileId = '1MVyh5BB8ZRWWsqfEC5vg7QLMMOpvUvRQ' },
    @{ FileName = 'perfected_ultra_instinct.jpg'; FileId = '1lL_RVIb4mIIq4-yGQMIz1Za88-bieF5z' },
    @{ FileName = 'son_goku_dragonball.jpg'; FileId = '1gfyuvJwThd6HGonHW-xTfau2zDuwdgYd' }
)

function Download-GDriveFile {
    param(
        [Parameter(Mandatory=$true)] [string] $FileId,
        [Parameter(Mandatory=$true)] [string] $OutPath
    )

    $url = "https://drive.google.com/uc?export=download&id=$FileId"

    try {
        Invoke-WebRequest -Uri $url -OutFile $OutPath -UseBasicParsing -ErrorAction Stop
        return $true
    } catch {
        Write-Warning "Download failed for FileId=$FileId : $_"
        return $false
    }
}

$downloaded = @()
$failed = @()

Write-Host "Downloading posters from Google Drive..." -ForegroundColor Cyan

foreach ($p in $posters) {
    $fileName = $p.FileName
    $fileId = $p.FileId
    $outPath = Join-Path $posterDir $fileName

    Write-Host "  [$($posters.IndexOf($p)+1)/$($posters.Count)] Downloading $fileName ..."

    $success = Download-GDriveFile -FileId $fileId -OutPath $outPath
    
    if ($success -and (Test-Path $outPath)) {
        $size = (Get-Item $outPath).Length
        if ($size -gt 500) {
            Write-Host "    ✓ Saved ($([math]::Round($size/1024,1)) KB)" -ForegroundColor Green
            $downloaded += $outPath
        } else {
            Write-Warning "    ✗ File too small (likely HTML error page, not image)"
            $failed += $fileName
            Remove-Item $outPath -Force -ErrorAction SilentlyContinue
        }
    } else {
        Write-Warning "    ✗ Download failed"
        $failed += $fileName
    }
}

Write-Host ""
if ($downloaded.Count -gt 0) {
    Write-Host "✓ Downloaded $($downloaded.Count) poster(s) successfully" -ForegroundColor Green
} else {
    Write-Host "✗ No files downloaded" -ForegroundColor Red
}

if ($failed.Count -gt 0) {
    Write-Host "✗ Failed: $($failed -join ', ')" -ForegroundColor Yellow
}

# Offer git commit
$gitAvailable = (Get-Command git -ErrorAction SilentlyContinue) -ne $null
if ($gitAvailable -and $downloaded.Count -gt 0) {
    Write-Host ""
    $doGit = Read-Host "Commit downloaded posters to git? (y/n)"
    if ($doGit -match '^[Yy]') {
        try {
            git add -- "$posterDir\*"
            git commit -m "Add poster images from Google Drive ($($downloaded.Count) files)"
            Write-Host "✓ Committed to git (run 'git push' to upload)" -ForegroundColor Green
        } catch {
            Write-Warning "Git commit failed: $_"
        }
    }
}

Write-Host "Done. Posters are in $posterDir" -ForegroundColor Cyan
