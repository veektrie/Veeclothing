import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Product Name',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'price',
      title: 'Price (₦)',
      type: 'number',
      description: 'Numeric value only (e.g. 85000)',
    }),
    defineField({
      name: 'tag',
      title: 'Product Tag',
      type: 'string',
      options: {
        list: [
          { title: 'BESTSELLER', value: 'bestseller' },
          { title: 'NEW', value: 'new' },
          { title: 'LIMITED', value: 'limited' },
          { title: 'NEW ARRIVAL', value: 'new arrival' },
          { title: 'BESPOKE', value: 'bespoke' },
          { title: 'SIGNATURE', value: 'signature' },
        ],
      },
      description: 'e.g., BESTSELLER, NEW, LIMITED',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Corporate', value: 'corporate' },
          { title: 'Bespoke', value: 'bespoke' },
          { title: 'Kaftan', value: 'kaftan' },
          { title: 'Hoodies', value: 'hoodies' },
          { title: 'Tees', value: 'tees' },
          { title: 'Polo', value: 'polo' },
          { title: 'Agbada', value: 'agbada' },
          { title: 'Pants', value: 'pants' },
          { title: 'Jacket', value: 'jacket' },
          { title: 'Shirts', value: 'shirts' },
        ],
      },
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'longDesc',
      title: 'Long Description',
      type: 'text',
    }),
    defineField({
      name: 'image',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'gallery',
      title: 'Image Gallery (Multi-Shot)',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      description: 'Add multiple shots: front, back, detail, etc. These appear as thumbnails on the product page.',
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Feature Title', type: 'string' },
            { name: 'desc', title: 'Feature Description', type: 'string' },
          ],
        },
      ],
    }),
    defineField({
      name: 'colors',
      title: 'Colors',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', title: 'Color Name', type: 'string' },
            { name: 'hex', title: 'Hex Code', type: 'string' },
          ],
        },
      ],
    }),
    defineField({
      name: 'sizes',
      title: 'Sizes',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Small', value: 'S' },
          { title: 'Medium', value: 'M' },
          { title: 'Large', value: 'L' },
          { title: 'XL', value: 'XL' },
          { title: 'XXL', value: 'XXL' },
          { title: 'Bespoke', value: 'Bespoke' },
          { title: 'Bulk Sizing', value: 'Bulk Sizing' },
        ],
      },
    }),
    defineField({
      name: 'soldOutSizes',
      title: 'Sold Out Sizes',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Small', value: 'S' },
          { title: 'Medium', value: 'M' },
          { title: 'Large', value: 'L' },
          { title: 'XL', value: 'XL' },
          { title: 'XXL', value: 'XXL' },
          { title: 'Bespoke', value: 'Bespoke' },
          { title: 'Bulk Sizing', value: 'Bulk Sizing' },
        ],
      },
      description: 'Select sizes that are currently out of stock to trigger the "Notify Me" button.',
    }),
    defineField({
      name: 'reviews',
      title: 'Reviews & Social Proof',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'reviewerName', title: 'Reviewer Name', type: 'string' },
            { 
              name: 'rating', 
              title: 'Rating', 
              type: 'number',
              validation: (Rule) => Rule.min(1).max(5).integer(),
              description: '1 to 5 stars',
            },
            { name: 'body', title: 'Review Body', type: 'text', rows: 3 },
            { name: 'isVerifiedPurchase', title: 'Verified Purchase?', type: 'boolean', initialValue: true },
          ],
        },
      ],
    }),
  ],
})