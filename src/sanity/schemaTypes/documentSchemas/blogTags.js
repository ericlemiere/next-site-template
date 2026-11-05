import { SlTag } from 'react-icons/sl'

const blogTags = {
  name: 'blogTags',
  title: 'Blog Tag',
  type: 'document',
  icon: SlTag,
  fields: [
    {
      name: 'tagName',
      type: 'string',
      title: 'Tag Name',
      validation: (Rule) => Rule.required(),
    },
  ],
}

export default blogTags;
