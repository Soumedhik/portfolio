#!/bin/bash
# Deployment optimization script

echo "🚀 Optimizing Soumedhik's Portfolio for Production Deployment"

echo "📦 Installing dependencies..."
npm ci --only=production

echo "🧹 Cleaning build artifacts..."
rm -rf build/ dist/ .next/

echo "🔧 Building optimized production bundle..."
npm run build

echo "📊 Analyzing bundle size..."
echo "Build complete! Files in build/ directory:"
du -sh build/*

echo "✅ Deployment ready!"
echo "📁 Deploy the 'build' folder to your hosting provider"
echo "🌐 Recommended: Vercel, Netlify, or GitHub Pages"

# Optional: Auto-deploy to Vercel if CLI is installed
if command -v vercel &> /dev/null; then
    read -p "🚀 Deploy to Vercel now? (y/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        vercel --prod
    fi
fi