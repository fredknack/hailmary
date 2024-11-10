// components/Header.js

export default function Header() {
  return (
    <header className="flex justify-between items-center p-6 bg-gray-800 text-white">
      <nav>
        <ul className="flex space-x-8">
          <li><a href="/" className="hover:text-gray-400">Home</a></li>
          <li><a href="/teams" className="hover:text-gray-400">Teams</a></li>
          <li><a href="/games" className="hover:text-gray-400">Games</a></li>
          <li><a href="#contact" className="hover:text-gray-400">Contact</a></li>
        </ul>
      </nav>
      <div className="text-2xl font-bold">FredBook</div>
    </header>
  );
}
