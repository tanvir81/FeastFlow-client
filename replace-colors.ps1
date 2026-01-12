# PowerShell script to replace hex colors with Tailwind amber-glow classes
$projectPath = "c:\Projects\FeastFlow\src"

# Define color mappings
$colorMap = @{
    # Primary yellow to amber-glow-300
    'border-\[#FFE52A\]' = 'border-amber-glow-300'
    'bg-\[#FFE52A\]' = 'bg-amber-glow-300'
    'text-\[#FFE52A\]' = 'text-amber-glow-300'
    'ring-\[#FFE52A\]' = 'ring-amber-glow-300'
    'focus:ring-\[#FFE52A\]' = 'focus:ring-amber-glow-300'
    'focus:border-\[#FFE52A\]' = 'focus:border-amber-glow-300'
    'hover:bg-\[#FFE52A\]' = 'hover:bg-amber-glow-300'
    'hover:border-\[#FFE52A\]' = 'hover:border-amber-glow-300'
    '\[#FFE52A\]/20' = 'amber-glow-300/20'
    '\[#FFE52A\]/10' = 'amber-glow-300/10'
    
    # Orange to amber-glow-500
    'border-\[#F79A19\]' = 'border-amber-glow-500'
    'bg-\[#F79A19\]' = 'bg-amber-glow-500'
    'text-\[#F79A19\]' = 'text-amber-glow-500'
    'ring-\[#F79A19\]' = 'ring-amber-glow-500'
    'focus:ring-\[#F79A19\]' = 'focus:ring-amber-glow-500'
    'focus:border-\[#F79A19\]' = 'focus:border-amber-glow-500'
    'hover:text-\[#F79A19\]' = 'hover:text-amber-glow-500'
    '\[#F79A19\]/10' = 'amber-glow-500/10'
    '\[#F79A19\]/20' = 'amber-glow-500/20'
    
    # Light Orange to amber-glow-400
    'border-\[#FFA239\]' = 'border-amber-glow-400'
    'bg-\[#FFA239\]' = 'bg-amber-glow-400'
    'text-\[#FFA239\]' = 'text-amber-glow-400'
    'hover:bg-\[#FFA239\]' = 'hover:bg-amber-glow-400'
    
    # Dark Orange variants to amber-glow-600
    'bg-\[#e08914\]' = 'bg-amber-glow-600'
    'hover:bg-\[#e08914\]' = 'hover:bg-amber-glow-600'
    'hover:text-\[#e08914\]' = 'hover:text-amber-glow-600'
    'text-\[#e08914\]' = 'text-amber-glow-600'
    
    'bg-\[#e68a0f\]' = 'bg-amber-glow-600'
    'hover:bg-\[#e68a0f\]' = 'hover:bg-amber-glow-600'
    
    # Dark Yellow to amber-glow-200
    'bg-\[#e6ce25\]' = 'bg-amber-glow-200'
    'hover:file:bg-\[#e6ce25\]' = 'hover:file:bg-amber-glow-200'
}

# Get all JSX files
$files = Get-ChildItem -Path $projectPath -Filter "*.jsx" -Recurse

$totalReplacements = 0

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    $originalContent = $content
    $fileReplacements = 0
    
    foreach ($pattern in $colorMap.Keys) {
        $replacement = $colorMap[$pattern]
        $matches = ([regex]::Matches($content, $pattern)).Count
        if ($matches -gt 0) {
            $content = $content -replace $pattern, $replacement
            $fileReplacements += $matches
            $totalReplacements += $matches
        }
    }
    
    # Only write if changes were made
    if ($content -ne $originalContent) {
        Set-Content -Path $file.FullName -Value $content -NoNewline
        Write-Host "Updated $($file.Name): $fileReplacements replacements"
    }
}

Write-Host "`nTotal replacements made: $totalReplacements"
