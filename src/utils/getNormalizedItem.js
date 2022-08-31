export const getNormalizedItem = async (item) => {
  const { frontmatter, compiledContent, file } = item;

  return {
    ...frontmatter, 
    draft: !!frontmatter.draft,
    slug: file.split("/").pop().split(".").shift(),
    title: frontmatter.title,
    description: frontmatter.description,
    body: compiledContent(),
    image: frontmatter.image,
    excerpt: frontmatter.excerpt,
  };
};
