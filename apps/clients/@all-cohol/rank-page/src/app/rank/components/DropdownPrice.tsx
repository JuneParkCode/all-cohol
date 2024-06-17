'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import FilterButton from '@/components/common/Button/FilterButton';

export default function DropdownPrice() {
  const router = useRouter();
  const [minPrice, setMinPrice] = useState<string>('0');
  const [maxPrice, setMaxPrice] = useState<string>('0');

  const searchParams = useSearchParams();

  const submit = () => {
    const params = new URLSearchParams(searchParams.toString());
    if (minPrice === '0' && maxPrice === '0') {
      params.delete('price_gte');
      params.delete('price_lte');
      router.push(`/rank?${params.toString()}`);
      return;
    }
    if (minPrice && minPrice !== '0') {
      params.set('price_gte', minPrice.replace('₩', '').replace(',', ''));
    } else {
      params.delete('price_gte');
    }
    if (maxPrice && maxPrice !== '0') {
      params.set('price_lte', maxPrice.replace('₩', '').replace(',', ''));
    } else {
      params.delete('price_lte');
    }
    router.push(`/rank?${params.toString()}`);
  };

  const formatPrice = (price: string) => {
    const value = +price.replace('₩', '').replace(',', '');
    return Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW',
    }).format(value || 0);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <FilterButton>가격</FilterButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <div
          role={'DropdownPriceContainer'}
          className="flex w-200px flex-col p-4"
        >
          최소가격 (원)
          <Input
            value={minPrice}
            onChange={(event) => {
              const formatted = formatPrice(event.target.value);
              setMinPrice(formatted);
            }}
          />
          최대 가격 (원)
          <Input
            value={maxPrice}
            onChange={(event) => {
              const formatted = formatPrice(event.target.value);
              setMaxPrice(formatted);
            }}
          />
          <div
            role={'DropdownPriceButtonContainer'}
            className={'mt-4 flex w-full justify-between'}
          >
            <Button
              className={
                'bg-neutral-100 text-neutral-950 hover:cursor-pointer hover:bg-neutral-200'
              }
              onClick={() => {
                setMinPrice('0');
                setMaxPrice('0');
              }}
            >
              초기화
            </Button>
            <Button onClick={submit}>적용</Button>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
