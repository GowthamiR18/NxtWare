import '@/styles/globals.css';

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

// File: pages/index.js
import Head from 'next/head';
import ProductList from '@/components/ProductList';

export async function getServerSideProps() {
  const res = await fetch('https://fakestoreapi.com/products');
  const products = await res.json();
  return { props: { products } };
}

export default function Home({ products }) {
  return (
    <div>
      <Head>
        <title>Product Listing Page</title>
        <meta name="description" content="Responsive PLP with SSR" />
      </Head>
      <main className="p-4">
        <h1 className="text-2xl font-bold text-center mb-6">All Products</h1>
        <ProductList products={products} />
      </main>
    </div>
  );
}

// File: components/ProductList.js
export default function ProductList({ products }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map(product => (
        <div key={product.id} className="border p-4 rounded shadow">
          <img src={product.image} alt={product.title} className="h-48 w-full object-contain mb-2" />
          <h2 className="font-semibold text-lg">{product.title}</h2>
          <p className="text-gray-700">${product.price}</p>
        </div>
      ))}
    </div>
  );
}

// File: pages/auth/signin.js
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      localStorage.setItem('user', JSON.stringify({ email }));
      router.push('/');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="w-full max-w-sm p-6 bg-white rounded shadow">
        <h2 className="text-xl font-bold mb-4">Sign In</h2>
        <input className="w-full p-2 mb-2 border" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input className="w-full p-2 mb-2 border" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button className="w-full p-2 bg-blue-600 text-white rounded">Sign In</button>
      </form>
    </div>
  );
}

// File: pages/auth/signup.js
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('user', JSON.stringify({ email }));
    router.push('/');
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="w-full max-w-sm p-6 bg-white rounded shadow">
        <h2 className="text-xl font-bold mb-4">Sign Up</h2>
        <input className="w-full p-2 mb-2 border" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input className="w-full p-2 mb-2 border" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button className="w-full p-2 bg-green-600 text-white rounded">Sign Up</button>
      </form>
    </div>
  );
}

// File: styles/globals.css
// @tailwind base;
// @tailwind components;
// @tailwind utilities;