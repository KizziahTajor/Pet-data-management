import Link from 'next/link';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <style>{`
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f9; /* Solid background for the whole page */
            color: #333;
            min-height: 100vh;
          }
          header {
            background: linear-gradient(135deg, #ff4081, #ff77a9); /* Gradient navbar */
            padding: 20px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            color: #f4f4f9;
          }
          .nav-container {
            display: flex;
            gap: 15px;
          }
          .nav-container a {
            color: #f4f4f9;
            text-decoration: none;
            font-weight: bold;
          }
          .nav-container a:hover {
            color: #f4f4f9; /* Maintain text color on hover */
          }
          .title {
            flex: 1;
            text-align: center;
            font-size: 1.5rem;
            color: #f4f4f9;
          }
          main {
            padding: 20px;
          }
        `}</style>
      </head>
      <body>
        <header>
          <div className="title"></div>
          <div className="nav-container">
            <Link href="/species">Pet list management</Link>
          </div>
        </header>
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
