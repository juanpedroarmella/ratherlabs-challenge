import Link from 'next/link'

export default function Home () {
  return (
    <main>
      <h1>Rooms</h1>
      <ul>
        <li>
          <Link href='/room/1'>Room1</Link>
        </li>
        <li>
          <Link href='/room/2'>Room2</Link>
        </li>
        <li>
          <Link href='/room/3'>Room3</Link>
        </li>
      </ul>
    </main>
  )
}
