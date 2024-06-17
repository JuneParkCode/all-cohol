'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { categories } from '@/types/Categories';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import FilterButton from '@/components/common/Button/FilterButton';

export default function DropdownCategory() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const category = searchParams.get('category') || '전체';
  const [selectedCategory, setSelectedCategory] = useState<string>(
    category || '전체'
  );

  useEffect(() => {
    let url = '/rank?page=1';
    if (selectedCategory === '전체') {
      router.push(url);
      return;
    }
    if (selectedCategory) {
      url += `&category=${selectedCategory}`;
    }
    router.push(url);
  }, [selectedCategory]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <FilterButton
          className={'bg-blue-500 font-bold text-white hover:bg-blue-400'}
        >
          {category}
        </FilterButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>주류 카테고리</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={selectedCategory}
          onValueChange={setSelectedCategory}
        >
          <DropdownMenuRadioItem value={'전체'}>전체</DropdownMenuRadioItem>
          {categories.map((category) => (
            <DropdownMenuRadioItem key={category} value={category}>
              {category}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
