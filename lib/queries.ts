import { groq } from "next-sanity";

export const allProducts = groq`*[_type == "product"] {
  _id,
  name,
  "slug": slug.current,
  price,
  description,
  "imageUrl": images[0].asset->url,
  "category": category->title,
  sizes,
  colors
}`;

export const fourProds = groq`*[_type == "product"][0..3] {
  _id,
  name,
  "slug": slug.current,
  price,
  description,
  "imageUrl": images[0].asset->url,
  "category": category->title
}`;

export const singleProduct = groq`*[_type == "product" && slug.current == $slug][0] {
  _id,
  name,
  price,
  description,
  "images": images[].asset->url,    
  "imageUrl": images[].asset->url,
  "category": category->title,
  sizes,
  colors
}`;

export const allCategories = groq`*[_type == "category"] {
  title,
  "slug": slug.current
}`;

export const relatedProducts = groq`*[_type == "product" && category->title == $category && _id != $currentId][0..3] {
  _id,
  name,
  price,
  "imageUrl": images[0].asset->url,
  "slug": slug.current
}`;

export const allBlogs = groq`*[_type == "blog"] | order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  "image": image.asset->url,
  category,
  author,
  "authorImage": authorImage.asset->url,
  publishedAt,
  "excerpt": array::join(string::split((pt::text(content)), "")[0..100], "") + "..."
}`;

// UPDATED: Checks for either "blog" OR "post" type
export const singleBlog = groq`*[(_type == "blog" || _type == "post") && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  "image": image.asset->url,
  category,
  author,
  "authorImage": authorImage.asset->url,
  publishedAt,
  content
}`;
