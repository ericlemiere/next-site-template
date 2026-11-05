'use client'

import { Stack, Text } from '@sanity/ui'
import { useFormValue } from 'sanity'

export function LinkIdInput(props) {
  const {
    inputProps: { onChange },
    value = '',
    path,
  } = props

  // Get the parent object (the button) using useFormValue
  const buttonObj = useFormValue(path.slice(0, -1)) || {}
  const { _id: id, _key: key, linkText = '' } = buttonObj
  const uniqueId = id || key

  if (!linkText || !uniqueId) {
    return null
  }

  const alwaysProductionId = id ? id.replace(/drafts\./, '') : key
  const formattedName =
    linkText.replace(/[^a-zA-Z0-9]+/g, '_')?.toLowerCase() ?? ''
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
