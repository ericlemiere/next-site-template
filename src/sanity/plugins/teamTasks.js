// Main plugin file
import { definePlugin } from 'sanity'
import TeamTasksComponent from '../components/TeamTasksComponent'

export const teamTasksPlugin = definePlugin({
  name: 'team-tasks',
  tools: [
    {
      name: 'team-tasks',
      title: 'Tasks',
      component: TeamTasksComponent,
    },
  ],
})
