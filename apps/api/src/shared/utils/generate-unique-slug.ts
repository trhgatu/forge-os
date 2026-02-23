import slugify from 'slugify';

export async function generateUniqueSlug(
  base: string,
  existsFn: (slug: string) => Promise<boolean>,
): Promise<string> {
  const baseSlug = slugify(base, { lower: true, strict: true });
  let slug = baseSlug;
  let counter = 1;

  while (await existsFn(slug)) {
    slug = `${baseSlug}-${counter++}`;
  }

  return slug;
}
