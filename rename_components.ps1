# PowerShell script to rename component files from ComponentName.tsx to index.tsx

$components = @(
    "src/components/Bar/PowerStackBarRefresh/PowerStackBarRefresh.tsx",
    "src/components/Bar/PyramidTrend/PyramidTrend.tsx",
    "src/components/Bar/scrollBarChart/ScrollBarChart.tsx",
    "src/components/Bar/stackBar/StackBar.tsx",
    "src/components/Bar/StockDetailsBar/StockDetailsBar.tsx",
    "src/components/Bar/SzBar/SzBar.tsx",
    "src/components/Bar/companySummary/Business/Business.tsx"
)

foreach ($component in $components) {
    if (Test-Path $component) {
        $dir = Split-Path $component -Parent
        $indexPath = Join-Path $dir "index.tsx"

        Write-Host "Moving $component to $indexPath"
        Move-Item $component $indexPath -Force
    } else {
        Write-Host "File not found: $component"
    }
}

Write-Host "Renaming completed!"
