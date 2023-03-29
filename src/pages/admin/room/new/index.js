export default function NewRoom () {
  return (
    <main>
      <h1>Add Room</h1>

      <form
        action='/newroom'
        method='post'
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          width: 'min-content'
        }}
      >
        <label>Name:</label>
        <input type='text' id='name' name='name' />

        <button type='submit'>Submit</button>
      </form>
    </main>
  )
}
