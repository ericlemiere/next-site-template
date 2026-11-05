import { FaPaintBrush, FaPencilAlt } from 'react-icons/fa'
import { RiLayoutMasonryFill } from 'react-icons/ri'
import { GoBeaker } from 'react-icons/go'

export const schemaGroup = [
  {
    name: 'content',
    title: 'Content',
    icon: FaPencilAlt,
  },
  {
    name: 'style',
    title: 'Styles',
    icon: FaPaintBrush,
  },
  {
    name: 'layout',
    title: 'Layout',
    icon: RiLayoutMasonryFill,
  },
  {
    name: 'advanced',
    title: 'Advanced',
    icon: GoBeaker,
  },
]
