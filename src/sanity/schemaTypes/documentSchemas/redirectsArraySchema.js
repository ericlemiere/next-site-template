const redirectsArraySchema = {
  name: 'redirectsArray',
  title: 'URL Redirects',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      placeholder: 'Redirects',
      initialValue: 'Redirects',
      hidden: true,
    },
    {
      name: 'redirects',
      title: 'Redirects',
      type: 'array',
      of: [{ type: 'redirect' }],
    },
  ],
}

export default redirectsArraySchema;
