'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Drink } from '@/types/Drink';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import DrinkCard from '@/components/common/Card/DrinkCard';

const formSchema = z.object({
  volume: z.number().min(0).max(100000),
  price: z.number().min(0).max(100000),
  abv: z.number().min(0).max(100),
  name: z.union([z.string().min(1).max(255), z.literal('')]),
  category: z.union([z.string().min(1).max(20), z.literal('')]),
  sub_category: z.union([z.string().min(1).max(20), z.literal('')]),
});

export default function MeasureForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      volume: 0,
      price: 0,
      category: '',
      sub_category: '',
      abv: 0.0,
    },
  });
  const [drink, setDrink] = useState<Drink | null>(null);

  function handleChange(values: z.infer<typeof formSchema>) {
    const { name, volume, price, category, sub_category, abv } = values;

    if (volume === 0 || price === 0 || abv === 0) return;

    const newDrink: Drink = {
      id: 0,
      kr_name: name.length ? name : '술',
      en_name: name.length ? name : '술',
      volume,
      price,
      category: category.length ? category : '기타',
      sub_category: sub_category.length ? sub_category : '기타',
      abv,
      alcohol_index: parseFloat((price / ((volume * abv) / 100)).toFixed(2)),
    };
    setDrink(newDrink);
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    const { name, volume, price, category, sub_category, abv } = values;

    if (volume === 0 || price === 0 || abv === 0) {
      alert('용량, 가격, 도수는 0이 될 수 없습니다.');
      return;
    }
    if (name === '' || category === '' || sub_category === '') {
      alert('주류명, 대분류, 소분류는 필수 입력 사항입니다.');
      return;
    }

    const newDrink: Drink = {
      id: 0,
      kr_name: name.length ? name : '술',
      en_name: name.length ? name : '술',
      volume,
      price,
      category: category.length ? category : '기타',
      sub_category: sub_category.length ? sub_category : '기타',
      abv,
      alcohol_index: parseFloat((price / ((volume * abv) / 100)).toFixed(2)),
    };
    setDrink(newDrink);
  }

  return (
    <div
      role={'MeasureFormContainer'}
      className={
        'my-6 flex w-[90%] flex-col rounded-xl border p-5 sm:w-sm sm:p-6 md:items-center'
      }
    >
      <div
        role={'MeasureHeader'}
        className={'mx-4 flex flex-col items-center pt-5 md:mx-auto '}
      >
        <p className={'text-xl font-extrabold'}>알성비 측정 하기</p>
        <p className={'pt-2 text-sm'}>직접 알성비를 측정해보세요!</p>
      </div>
      <div role={'result'} className={'pb-5'}>
        {drink && (
          <div
            className={'mt-4 flex w-full flex-col items-center justify-center'}
          >
            <p className={'text-md mb-2 text-center font-extrabold'}>결과</p>
            <DrinkCard drink={drink} />
          </div>
        )}
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          onChange={form.handleSubmit(handleChange)}
          className={'space-y-3'}
        >
          <FormField
            control={form.control}
            name={'volume'}
            render={({ field }) => (
              <FormItem>
                <FormLabel>용량(ml)</FormLabel>
                <FormControl>
                  <Input
                    type={'number'}
                    className={'sm:w-80% w-full md:w-300px'}
                    {...field}
                    value={field.value === 0 ? '' : field.value}
                    onChange={(e) => {
                      field.onChange(parseInt(e.target.value));
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={'price'}
            render={({ field }) => (
              <FormItem>
                <FormLabel>가격(원)</FormLabel>
                <FormControl>
                  <Input
                    type={'number'}
                    className={'sm:w-80% w-full md:w-300px'}
                    {...field}
                    value={field.value === 0 ? '' : field.value}
                    onChange={(e) => {
                      field.onChange(+e.target.value);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={'abv'}
            render={({ field }) => (
              <FormItem>
                <FormLabel>도수(%)</FormLabel>
                <FormControl>
                  <Input
                    type={'number'}
                    className={'sm:w-80% w-full md:w-300px'}
                    {...field}
                    value={field.value === 0 ? '' : field.value}
                    onChange={(e) => {
                      field.onChange(+e.target.value);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className={'border-b-2 border-gray-300'}></div>
          <div
            role={'OptionalFieldsDescription'}
            className={'text-center text-sm font-light'}
          >
            <p>주류명, 대분류, 소분류는 선택 사항입니다.</p>
            <p>* (등록 시 필수 입력)</p>
          </div>
          <FormField
            control={form.control}
            name={'name'}
            render={({ field }) => (
              <FormItem>
                <FormLabel>주류명</FormLabel>
                <FormControl>
                  <Input className={'sm:w-80% w-full md:w-300px'} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={'category'}
            render={({ field }) => (
              <FormItem>
                <FormLabel>대분류</FormLabel>
                <FormControl>
                  <Input className={'sm:w-80% w-full md:w-300px'} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={'sub_category'}
            render={({ field }) => (
              <FormItem>
                <FormLabel>소분류</FormLabel>
                <FormControl>
                  <Input className={'sm:w-80% w-full md:w-300px'} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div
            role={'OptionalFieldsDescription'}
            className={'text-center text-sm font-light'}
          >
            <p>검토 후 All-Cohol! 에 등록됩니다.</p>
          </div>
          <div className={'flex items-center justify-center'}>
            <Button type={'submit'} size={'sm'}>
              등록하기
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
