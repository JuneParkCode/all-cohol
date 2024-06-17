'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SearchIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Search() {
  const [search, setSearch] = useState<string>('');
  const router = useRouter();

  return (
    <div className={'flex space-x-1'}>
      <Input
        value={search}
        className={'w-150px rounded-2xl sm:w-full'}
        placeholder={'검색어를 입력하세요'}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            router.push(`/rank?kr_name=${search}`);
          }
        }}
      />
      <Button
        className={'h-10 rounded-2xl px-3 py-2 text-sm'}
        onClick={() => {
          router.push(`/rank?kr_name=${search}`);
        }}
      >
        <SearchIcon size={20} />
      </Button>
    </div>
  );
}
