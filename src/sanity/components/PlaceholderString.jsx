import { useFormValue } from 'sanity'

const PlaceholderStringInput = (props) => {
  const { schemaType } = props

  const path = schemaType?.options?.field
  const doc = useFormValue([])

  const proxyValue = path ? doc?.[path] : ''

  return props.renderDefault({
    ...props,
    elementProps: { ...props.elementProps, placeholder: proxyValue },
  })
}

export default PlaceholderStringInput
