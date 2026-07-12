#!/bin/bash
# Deploy Script - Concurrent Studios Mod
# This script builds the mod and copies only the required files to the GDT mods folder.

set -e

# Define directories
PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
GDT_MODS_DIR="/home/deck/.local/share/Steam/steamapps/common/Game Dev Tycoon/mods/concurrent-studios"

echo "[DEPLOY] Building the mod..."
cd "$PROJECT_DIR"
python3 scripts/build.py

echo "[DEPLOY] Preparing mod folder..."
# Remove the dynamic link or existing folder
rm -rf "$GDT_MODS_DIR"
mkdir -p "$GDT_MODS_DIR"

echo "[DEPLOY] Copying clean files..."
# Copy only the files needed to run the mod
cp main.js "$GDT_MODS_DIR/"
cp package.json "$GDT_MODS_DIR/"

echo "[DEPLOY] Successfully deployed to Game Dev Tycoon!"
