# Fix text colors in specific sections only
$file = "c:\Users\Danbi\Downloads\quiz-github\components\ResultPage.tsx"
$content = Get-Content $file -Raw

# Fix mantra section (lines ~340-346)
$content = $content -replace '(<Quote className=")text-warm-200/50(" size=\{28\} />)', '$1text-white$2'
$content = $content -replace '(<h3 className="font-serif text-2xl md:text-4xl italic leading-relaxed mb-6 )text-warm-50(")', '$1text-white$2'
$content = $content -replace '(<p className="text-xs uppercase tracking-widest )text-warm-200/70(">daily mantra</p>)', '$1text-white$2'

# Fix bundle section  
$content = $content -replace 'className="text-sand-300"','className="text-white"'
$content = $content -replace 'text-sand-200','text-white'
$content = $content -replace '(mb-6 pb-6 border-b )border-clay-400/30','$1border-white/30'
$content = $content -replace '(total bundle value</p>.*?<div className="flex items-baseline gap-3">.*?<span className=")text-warm-200/50(.*?line-through)', '$1text-white/50$2', 'Singleline'
$content = $content -replace '(<span className="font-serif text-3xl md:text-4xl )text-warm-50( italic">\$\{formatPrice\(bundlePrice\)\}</span>)', '$1text-white$2'
$content = $content -replace 'bg-cosmic-400/60/10','bg-white/10'
$content = $content -replace '(<span className="w-2 h-2 rounded-full )bg-ethereal-400(")', '$1bg-gold-400$2'
$content = $content -replace '(uppercase tracking-wider )text-warm-50( font-medium">save)', '$1text-white$2'

# Fix email form
$content = $content -replace '(<form onSubmit=\{handleSubscribe\} className="flex bg-cosmic-400/50 p-1 hand-drawn)(">)', '$1 border border-cosmic-300$2'
$content = $content -replace '(<button type="submit" className="text-xs uppercase tracking-wider )text-warm-50( font-medium )bg-clay-500( px-4 py-3 )hover:bg-gold-400()', '$1text-cosmic-600$2bg-gold-400$3hover:bg-gold-500$4'

$content | Set-Content $file -Encoding UTF8 -NoNewline
Write-Host "Fixed colors in ResultPage.tsx"
