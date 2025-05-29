export const config = {
  dir: {
    input: "src"
  }
};

export default function(eleventyConfig) {
	eleventyConfig.addLayoutAlias("page", "page.njk");
};