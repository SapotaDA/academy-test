#!/usr/bin/env pwsh

Set-Location "D:\academy-test-main\academy-test-main"
$env:NODE_ENV='production'
node dist/index.cjs
