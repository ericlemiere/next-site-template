import { TaskIcon } from '@sanity/icons/Task'

const teamTaskSchema = {
  name: 'teamTask',
  title: 'Team Task',
  type: 'document',
  icon: TaskIcon,
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'assignee',
      title: 'Assignee',
      type: 'string',
    },
    {
      name: 'completed',
      title: 'Completed',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    },
    {
      name: 'dueDate',
      title: 'Due Date',
      type: 'date',
    },
    {
      name: 'createdBy',
      title: 'Created By',
      type: 'string',
    },
  ],
  orderings: [
    {
      title: 'Created Date, New',
      name: 'createdDateDesc',
      by: [{ field: 'createdAt', direction: 'desc' }],
    },
    {
      title: 'Completion Status',
      name: 'completionStatus',
      by: [
        { field: 'completed', direction: 'asc' },
        { field: 'createdAt', direction: 'desc' },
      ],
    },
  ],
  __experimental_omnisearch_visibility: false,
}

export default teamTaskSchema;
