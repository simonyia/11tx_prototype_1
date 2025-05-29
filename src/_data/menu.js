const fs = require("fs");
const path = require("path");

function buildMenuFromDirectory(dirPath, baseUrl = "") {
  const items = [];

  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.name.startsWith("_")) continue; // Skip private/layout dirs
    const fullPath = path.join(dirPath, entry.name);
    const urlPath = path.join(baseUrl, entry.name).replace(/\\/g, "/");

    if (entry.isDirectory()) {
      const children = buildMenuFromDirectory(fullPath, urlPath);
      items.push({
        label: entry.name,
        url: `/${urlPath}/`,
        children: children.length ? children : null,
      });
    } else if (entry.name.endsWith(".md") || entry.name.endsWith(".njk")) {
      const name = path.basename(entry.name, path.extname(entry.name));
      if (name === "index") continue;
      items.push({
        label: name,
        url: `/${urlPath.replace(/\.[^/.]+$/, "")}`,
      });
    }
  }

  return items;
}

module.exports = () => {
  const contentDir = path.join(__dirname, "../pages"); // or whatever your content dir is
  return buildMenuFromDirectory(contentDir);
};
