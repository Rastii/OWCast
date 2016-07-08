#!/bin/bash
set -o errexit

rm -rf dist
mkdir dist

# config
git config --global user.email "nobody@nobody.org"
git config --global user.name "Travis CI"

# build
bower install
gulp

# deploy
cd dist
git init
git add .
git commit -m "Deploy to Github Pages"
git push --force "https://${GITHUB_TOKEN}@github.com/${GITHUB_REPO}.git" master:gh-pages
