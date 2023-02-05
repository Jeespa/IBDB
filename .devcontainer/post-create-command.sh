#!/bin/bash

# Exit in case of error
set -e

# vite must be installed
(npm install vite)

# essential in order for firebase functions to work as intended
(npm install firebase-tools)
