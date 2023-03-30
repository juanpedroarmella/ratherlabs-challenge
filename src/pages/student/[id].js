import Link from 'next/link'

export default function Student () {
  return (
    <main>
      <h1>StudentName</h1>
      <p>Age: 15</p>
      <p>Gender: male</p>
      <p>
        Room: <Link href='/room/1'>RoomName</Link>
      </p>
      <p>siblings:</p>
      <ul>
        <li>
          <Link href='/student/1'>Silgbing1</Link>
        </li>
        <li>
          <Link href='/student/1'>Silgbing2</Link>
        </li>
      </ul>
    </main>
  )
}
