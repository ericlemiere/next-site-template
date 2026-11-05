import { useTheme } from '@sanity/ui'
import { GoAlert } from 'react-icons/go'

export const CustomMessageDisplay = (props) => {
  // To use this, you must use the placeholder field in the Schema
  const theme = useTheme()
  const darkMode = theme.sanity?.color?.dark || theme.sanity?.v2?.color?._dark

  return (
    <>
      <div
        style={{
          color: darkMode ? 'white' : 'black',
          width: 'calc(100% - 30px)',
          fontSize: '14px',
          padding: '14px',
          borderRadius: 4,
          borderWidth: 1,
          borderStyle: 'solid',
          borderColor: darkMode ? 'orange' : '#932F03',
          boxShadow: `2px 2px 4px ${darkMode ? 'orange' : '#932F03'}80`,
          display: 'flex',
          alignItems: 'center',
          gap: 14,
        }}
      >
        <GoAlert color={darkMode ? 'orange' : '#932F03'} size={18} />
        <p style={{ width: '100%' }}>{props.elementProps.placeholder}</p>
      </div>
    </>
  )
}
