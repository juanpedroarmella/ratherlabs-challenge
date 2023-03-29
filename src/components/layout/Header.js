import Link from 'next/link'

export default function Header () {
  return (
    <header style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
      <h1 style={{ margin: 0 }}>Ratherlabs Challenge</h1>
      <nav style={{ display: 'flex', gap: '1rem' }}>
        <Link href='/'>Rooms</Link>
        <Link href='/admin'>Admin</Link>
      </nav>
    </header>
  )
}
