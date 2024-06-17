'use client';

import Head from 'next/head';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();
  router.push('/rank');
  return (
    <>
      <Head>
        <title>All-Cohol - home</title>
        <meta name="description" content="All-Cohol home page" />
      </Head>
    </>
  );
}
