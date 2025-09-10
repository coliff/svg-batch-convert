# SVG Batch Image Generator

A script to generate images from SVGs.

## Setup

1. It requires [imageMagick](https://imagemagick.org/script/download.php) to be installed.
   _Note: When installing be sure to check the 'Legacy Convert' feature_
2. Once ImageMagick is installed, restart VS Code if it is already open.
3. Run `npm install` to install the required dependencies (Sharp is required to get the SVG size attributes).

## Usage

Run `npm run build` to output all icons as PNGs in the relevant folders. In the event of needing a different size you can edit the sizes on line 10 of `build.js`.

## Notes

- Running the build script again does not delete any files in the 'dist' folder prior to running.
