# PowerShell script to replace gradient colors
$errorPagePath = "c:\Projects\FeastFlow\src\pages\ErrorPage.jsx"

$content = Get-Content $errorPagePath -Raw

# Replace gradient colors
$content = $content -replace'from-\[#FFE52A\] to-\[#F79A19\]', 'from-amber-glow-300 to-amber-glow-500'

Set-Content -Path $errorPagePath -Value $content -NoNewline

Write-Host "Updated ErrorPage gradients"
