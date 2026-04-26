import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'orderDetails',
  title: 'OrderDetails',
  type: 'document',
  fields: [
    defineField({
      name: 'orderNumber',
      title: 'Order Number',
      type: 'string',
    }),
    defineField({
      name: 'customer',
      title: 'Customer',
      type: 'reference',
      to: [{type: 'user'}], // <--- This links the Order to the User
    }),
    defineField({
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'product', type: 'reference', to: [{type: 'product'}]},
            {name: 'productName', type: 'string'}, // Snapshot of name in case product is deleted
            {name: 'quantity', type: 'number'},
            {name: 'price', type: 'number'},
            {name: 'size', type: 'string'},
            {name: 'color', type: 'string'},
          ],
        },
      ],
    }),
    defineField({
      name: 'totalPrice',
      title: 'Total Price',
      type: 'number',
    }),
    defineField({
      name: 'currency',
      title: 'Currency',
      type: 'string',
      initialValue: 'USD',
    }),
    defineField({
      name: 'status',
      title: 'Order Status',
      type: 'string',
      options: {
        list: [
          {title: 'Pending', value: 'pending'},
          {title: 'Paid', value: 'paid'},
          {title: 'Shipped', value: 'shipped'},
          {title: 'Delivered', value: 'delivered'},
          {title: 'Cancelled', value: 'cancelled'},
        ],
        layout: 'dropdown',
      },
      initialValue: 'pending',
    }),
    defineField({
      name: 'orderDate',
      title: 'Order Date',
      type: 'datetime',
    }),
  ],
  preview: {
    select: {
      title: 'orderNumber',
      customerName: 'customer.name', // Fetch connected customer name
      status: 'status',
    },
    prepare(selection) {
      const {title, customerName, status} = selection
      return {
        title: title,
        subtitle: `${status.toUpperCase()} - ${customerName || 'Unknown Customer'}`,
      }
    },
  },
})
