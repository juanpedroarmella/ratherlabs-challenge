export default function NewStudent () {
  return (
    <main>
      <h1>Add Student</h1>

      <form
        action='/edit_student'
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

        <label>Age:</label>
        <input type='number' id='age' name='age' />

        <label>Gender:</label>
        <select id='gender' name='gender'>
          <option value='male'>Male</option>
          <option value='female'>Female</option>
          <option value='other'>Other</option>
        </select>

        <label>Room:</label>
        <select id='room' name='room'>
          <option value='room1'>Room 1</option>
          <option value='room2'>Room 2</option>
          <option value='room3'>Room 3</option>
        </select>

        <label>Add silbings:</label>

        <table style={{ textAlign: 'center' }}>
          <thead>
            <tr>
              <th>Sibling Name</th>
              <th>Option</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <select id='siblings' name='siblings'>
                  <option value='sibling3'>Sibling3</option>
                  <option value='sibling4'>Sibling4</option>
                  <option value='sibling5'>Sibling5</option>
                </select>
              </td>
              <td>
                <button>Add</button>
              </td>
            </tr>
          </tbody>
        </table>

        <button type='submit'>Submit</button>
      </form>
    </main>
  )
}
