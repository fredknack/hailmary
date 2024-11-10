// app/page.js
"use client";
import Header from '@/components/Header';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center text-center p-4">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Welcome to the Sports Database</h2>
        <p className="text-lg text-gray-600">Your go-to database for sports teams and players.</p>
      </main>
    </div>
  );
}

