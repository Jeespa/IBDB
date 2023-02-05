#!/bin/bash

# Exit in case of error
set -e

(npm install)

(npm install vite)

(npm install firebase-tools)

(npm run dev)