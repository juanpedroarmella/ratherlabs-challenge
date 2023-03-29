import Link from 'next/link'

export default function Room () {
  return (
    <main>
      <h1>Room1</h1>
      <ul>
        <li>
          <Link href='/student/1'>Student1</Link>
        </li>
        <li>
          <Link href='/student/2'>Student2</Link>
        </li>
        <li>
          <Link href='/student/3'>Student3</Link>
        </li>
      </ul>
    </main>
  )
}
