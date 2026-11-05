export const SanityHeading = (props) => {
  // To use this, you must use the placeholder field in the Schema
  // To render the body, use a colon and a space after the heading
  const heading = props.elementProps.placeholder.split(': ')[0] ?? ''
  const body = props.elementProps.placeholder.split(': ')[1] ?? null

  return (
    <div
      style={{
        width: 'calc(100%)',
        padding: '10px 0',
        borderBottom: `2px solid lightblue`,
        marginBottom: -30,
        fontSize: '1.2rem',
        fontWeight: 800,
        textAlign: 'center',
        backgroundColor: 'inherit',
        color: 'inherit',
      }}
    >
      {heading}
      {body && (
        <p
          style={{
            fontSize: '.9rem',
            fontWeight: 500,
          }}
        >
          {body}
        </p>
      )}
    </div>
  )
}
