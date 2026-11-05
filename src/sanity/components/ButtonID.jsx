'use client'

import { Stack, Text } from '@sanity/ui'
import { useFormValue } from 'sanity'

export function ButtonIdInput(props) {
  const {
    inputProps: { onChange },
    value = '',
    path,
  } = props

  // Get the parent object (the button) using useFormValue
  const buttonObj = useFormValue(path.slice(0, -1)) || {}
  const { _id: id, _key: key, text = '', __randomId } = buttonObj
  const uniqueId = id || key || __randomId

  if (!text || !uniqueId) {
    return null
  }

  const alwaysProductionId = id ? id.replace(/drafts\./, '') : key || __randomId
  const formattedName = text.replace(/[^a-zA-Z0-9]+/g, '_')?.toLowerCase() ?? ''
  const trackingId = `${formattedName}-${alwaysProductionId}`

  return (
    <Stack gap={2}>
      <Text style={{ marginTop: 30, marginLeft: 14 }}>
        <small>
          <em>
            The unique ID of the button/link. This can be used for tracking
            purposes.
          </em>
        </small>
      </Text>
      <Text style={{ marginTop: 10, marginLeft: 14 }}>
        <code>{trackingId}</code>
      </Text>
    </Stack>
  )
}
