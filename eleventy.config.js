export const config = {
  dir: {
    input: "src"
  }
};

export default function(eleventyConfig) {
	eleventyConfig.addLayoutAlias("page", "page.njk");
  eleventyConfig.addPassthroughCopy({ "./node_modules/flowbite/dist/flowbite.min.js": "scripts/flowbite.min.js" });
};