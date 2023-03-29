export default function EditRoom () {
  return (
    <main>
      <h1>Edit Room</h1>

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
        <label>Select Room:</label>
        <select id='student' name='student'>
          <option value='room1'>Room1</option>
          <option value='room2'>Room2</option>
          <option value='room3'>Room3</option>
        </select>
        <label>Name:</label>
        <input type='text' id='name' name='name' />

        <button type='submit'>Submit</button>
      </form>
    </main>
  )
}
