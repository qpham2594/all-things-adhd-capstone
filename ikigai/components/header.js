import Link from 'next/link';

export default function Header() {
  return (
    <header>
      <div>
        <Link href="/">Home</Link>
        <Link href="/createaccount">Create An Account</Link>
        <Link href="/login">Login</Link>
        <Link href="/monthlylist">Create Your Monthly List!</Link>
        <Link href="/recipes">Search for Recipes</Link>
        <Link href="/logout">Logout</Link>  
      </div>
    </header>
  );
}
