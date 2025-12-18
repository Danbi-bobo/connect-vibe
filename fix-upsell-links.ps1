$file = "c:\Users\Danbi\Downloads\quiz-github\components\ResultPage.tsx"
$content = Get-Content $file -Raw

# Replace opening div with anchor
$content = $content -replace '(\s+)<div key=\{idx\} className="flex gap-5 items-center group cursor-pointer hover:bg-stone-50 p-2 rounded-lg -mx-2 transition-colors">', '$1<a key={idx} href={item.url || "https://store.taichigemstone.com/"} target="_blank" rel="noopener noreferrer" className="flex gap-5 items-center group cursor-pointer hover:bg-stone-50 p-2 rounded-lg -mx-2 transition-colors">'

# Replace closing div with anchor (be specific to this section)
$content = $content -replace '(\s+)</div>(\s+)\)\}\)', '$1</a>$2))}'

Set-Content $file -Value $content -NoNewline
Write-Host "Updated successfully!"
