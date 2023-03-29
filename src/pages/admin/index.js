import Link from 'next/link'

export default function Admin () {
  return (
    <main>
      <h1>Admin Panel</h1>

      <section>
        <h2>Room Settings</h2>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link href='/admin/room/new'>Create New Room</Link>
          <Link href='/admin/room/edit'>Edit Rooms</Link>
        </div>
      </section>

      <section>
        <h2>Student Settings</h2>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link href='/admin/student/new'>Create New Student</Link>
          <Link href='/admin/student/edit'>Edit Students</Link>
        </div>
      </section>
    </main>
  )
}
