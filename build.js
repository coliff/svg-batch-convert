const fs = require("fs");
const { exec } = require("child_process");
const path = require("path");
const sharp = require("sharp");

const svgDir = "./src"; // directory containing SVG icons
const outputDir = "./dist"; // directory to save PNG icons

// sizes you want to convert to
const sizes = [220, 790];

fs.readdir(svgDir, (err, files) => {
  if (err) {
    console.error(`Error reading directory: ${err}`);
    return;
  }

  files.forEach((file) => {
    if (path.extname(file) === ".svg") {
      const svgFile = path.join(svgDir, file);
      const baseName = path.basename(file, ".svg");

      sharp(svgFile)
        .metadata()
        .then((metadata) => {
          const baselineSize = metadata.width; // baseline size

          sizes.forEach((size) => {
            const sizeDir = path.join(outputDir, `${size}`);
            if (!fs.existsSync(sizeDir)) {
              fs.mkdirSync(sizeDir);
            }

            const outputFile = path.join(sizeDir, `${baseName}.png`);
            const cmd = `convert -background none -density 5000 -resize ${size}x${size} ${svgFile} ${outputFile}`;

            exec(cmd, (error, stdout, stderr) => {
              if (error) {
                console.error(`Error executing command: ${error}`);
                return;
              }
              console.log(`Generated ${outputFile}`);
            });
          });
        })
        .catch((err) => {
          console.error(`Error reading SVG metadata: ${err}`);
        });
    }
  });
});
