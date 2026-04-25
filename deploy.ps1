#!/usr/bin/env pwsh
<#
.SYNOPSIS
  Deploy Election-Challenges to Google Cloud Run.

.DESCRIPTION
  Builds the Docker image via Cloud Build (no local Docker daemon needed),
  pushes it to Artifact Registry, and deploys to Cloud Run.

.PARAMETER Project
  Your GCP project ID. Required.

.PARAMETER Region
  GCP region to deploy to. Default: us-central1

.PARAMETER ServiceName
  Cloud Run service name. Default: election-challenges

.EXAMPLE
  .\deploy.ps1 -Project my-gcp-project-id
#>

param(
    [Parameter(Mandatory=$true)]
    [string]$Project,

    [string]$Region      = "us-central1",
    [string]$ServiceName = "election-challenges"
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

# ── Load the Gemini API key from .env ──────────────────────────────────────────
$EnvFile = Join-Path $PSScriptRoot ".env"
if (-not (Test-Path $EnvFile)) {
    Write-Error ".env file not found at $EnvFile"
    exit 1
}

$GeminiKey = ""
foreach ($line in Get-Content $EnvFile) {
    if ($line -match "^VITE_GEMINI_API_KEY=(.+)$") {
        $GeminiKey = $Matches[1].Trim()
    }
}

if (-not $GeminiKey) {
    Write-Error "VITE_GEMINI_API_KEY not found in .env"
    exit 1
}

$ImageUri = "gcr.io/$Project/$ServiceName"

Write-Host ""
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host "  ElectWise  →  Cloud Run Deployment" -ForegroundColor Cyan
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host "  Project     : $Project"
Write-Host "  Region      : $Region"
Write-Host "  Service     : $ServiceName"
Write-Host "  Image       : $ImageUri"
Write-Host ""

# ── Step 1: Build & push image via Cloud Build ─────────────────────────────────
Write-Host "[1/2] Building image with Cloud Build (cloudbuild.yaml) …" -ForegroundColor Yellow
gcloud builds submit `
    --project       $Project `
    --config        cloudbuild.yaml `
    --substitutions "_VITE_GEMINI_API_KEY=$GeminiKey" `
    .

# ── Step 2: Deploy to Cloud Run ────────────────────────────────────────────────
Write-Host "[2/2] Deploying to Cloud Run …" -ForegroundColor Yellow
gcloud run deploy $ServiceName `
    --project        $Project `
    --image          $ImageUri `
    --region         $Region `
    --platform       managed `
    --allow-unauthenticated `
    --port           8080 `
    --memory         256Mi `
    --cpu            1 `
    --min-instances  0 `
    --max-instances  10

Write-Host ""
Write-Host "✅  Deployment complete!" -ForegroundColor Green
Write-Host "    Run: gcloud run services describe $ServiceName --region $Region --project $Project --format 'value(status.url)'"
