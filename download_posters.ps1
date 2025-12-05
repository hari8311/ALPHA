# Download poster images from Google Drive
# Usage: cd 'C:\Users\Hariprasath\Downloads\ALPHA'; .\download_posters.ps1

Set-StrictMode -Version Latest

$posterDir = Join-Path -Path $PSScriptRoot -ChildPath "assets/posters"
if (-not (Test-Path $posterDir)) {
    New-Item -ItemType Directory -Path $posterDir -Force | Out-Null
}

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
    param([string]$FileId, [string]$OutPath)
    $url = "https://drive.google.com/uc?export=download&id=$FileId"
    try {
        Invoke-WebRequest -Uri $url -OutFile $OutPath -UseBasicParsing -ErrorAction Stop
        return $true
    } catch {
        return $false
    }
}

$downloaded = 0
$failed = 0

Write-Host "Downloading posters..." -ForegroundColor Cyan

foreach ($p in $posters) {
    $outPath = Join-Path $posterDir $p.FileName
    $idx = $posters.IndexOf($p) + 1
    
    Write-Host "[$idx/$($posters.Count)] $($p.FileName)..." -NoNewline
    
    $success = Download-GDriveFile -FileId $p.FileId -OutPath $outPath
    
    if ($success -and (Test-Path $outPath)) {
        $size = (Get-Item $outPath).Length
        if ($size -gt 500) {
            Write-Host " OK ($([math]::Round($size/1024,1)) KB)" -ForegroundColor Green
            $downloaded++
        } else {
            Write-Host " SKIP (too small)" -ForegroundColor Yellow
            Remove-Item $outPath -Force -ErrorAction SilentlyContinue
            $failed++
        }
    } else {
        Write-Host " FAIL" -ForegroundColor Red
        $failed++
    }
}

Write-Host ""
Write-Host "Results: $downloaded downloaded, $failed failed" -ForegroundColor Cyan

if ($downloaded -gt 0) {
    $gitOk = (Get-Command git -ErrorAction SilentlyContinue) -ne $null
    if ($gitOk) {
        $ans = Read-Host "Commit to git? (y/n)"
        if ($ans -match '^[Yy]') {
            git add -- "$posterDir\*"
            git commit -m "Add $downloaded poster images"
            Write-Host "Committed. Run 'git push' to upload." -ForegroundColor Green
        }
    }
}
