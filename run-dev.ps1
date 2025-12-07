#!/usr/bin/env pwsh

Set-Location "D:\academy-test-main\academy-test-main"
$env:NODE_ENV='development'
npx tsx server/index.ts
