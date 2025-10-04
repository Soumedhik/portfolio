# PowerShell Deployment Script for Soumedhik's Portfolio
# Usage: .\deploy.ps1

Write-Host "🚀 Optimizing Soumedhik's Portfolio for Production Deployment" -ForegroundColor Cyan

Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
npm install

Write-Host "🧹 Cleaning build artifacts..." -ForegroundColor Yellow
if (Test-Path "build") { Remove-Item -Recurse -Force "build" }
if (Test-Path "dist") { Remove-Item -Recurse -Force "dist" }
if (Test-Path ".next") { Remove-Item -Recurse -Force ".next" }

Write-Host "🔧 Building optimized production bundle..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Build successful!" -ForegroundColor Green
    
    Write-Host "📊 Build size analysis:" -ForegroundColor Yellow
    if (Test-Path "build") {
        $buildSize = (Get-ChildItem -Recurse "build" | Measure-Object -Property Length -Sum).Sum / 1MB
        Write-Host "Build folder size: $([math]::Round($buildSize, 2)) MB" -ForegroundColor Green
        
        Write-Host "`n📁 Build contents:" -ForegroundColor Yellow
        Get-ChildItem "build" | Format-Table Name, @{Name="Size(KB)";Expression={[math]::Round($_.Length/1KB,2)}}
    }
    
    Write-Host "`n🌐 Testing production build locally..." -ForegroundColor Yellow
    Write-Host "Run 'npm run serve' to test the production build locally" -ForegroundColor Cyan
    
    Write-Host "`n✅ Deployment ready!" -ForegroundColor Green
    Write-Host "📁 Deploy the 'build' folder to your hosting provider" -ForegroundColor White
    Write-Host "🌐 Recommended: Vercel, Netlify, or GitHub Pages" -ForegroundColor White
    
    # Check if Vercel CLI is installed
    $vercelInstalled = Get-Command "vercel" -ErrorAction SilentlyContinue
    if ($vercelInstalled) {
        $deploy = Read-Host "`n🚀 Deploy to Vercel now? (y/n)"
        if ($deploy -eq "y" -or $deploy -eq "Y") {
            Write-Host "🚀 Deploying to Vercel..." -ForegroundColor Cyan
            vercel --prod
        }
    } else {
        Write-Host "`n💡 To deploy to Vercel:" -ForegroundColor Yellow
        Write-Host "   1. Install Vercel CLI: npm i -g vercel" -ForegroundColor White
        Write-Host "   2. Deploy: vercel --prod" -ForegroundColor White
    }
} else {
    Write-Host "❌ Build failed!" -ForegroundColor Red
    Write-Host "Please check the error messages above and fix any issues." -ForegroundColor Yellow
}