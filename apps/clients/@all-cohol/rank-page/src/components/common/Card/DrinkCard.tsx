'use client';

import { useEffect, useState } from 'react';

import { Drink } from '@/types/Drink';
import { Card, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface DrinkCardProps {
  drink: Drink;
}

function getProgressColor(progress: number) {
  if (progress >= 80) {
    return 'bg-green-500';
  }
  if (progress >= 50) {
    return 'bg-blue-500';
  }
  if (progress >= 20) {
    return 'bg-yellow-400';
  }
  return 'bg-red-600';
}

function getEmoji(progress: number) {
  if (progress >= 80) {
    return '🤩';
  }
  if (progress >= 50) {
    return '😊';
  }
  if (progress >= 20) {
    return '😐';
  }
  return '😵';
}

const MIN_INDEX = 15;
const MAX_INDEX = 1000;

function calculateProgressBar(alcohol_index: number) {
  const minIndex = MIN_INDEX;
  const maxIndex = MAX_INDEX;
  let progress;

  if (alcohol_index > maxIndex) {
    progress = 0;
  } else if (alcohol_index <= minIndex) {
    progress = 100;
  } else {
    // 자연 로그를 사용하여 비선형적으로 스케일링
    const logMin = Math.log(minIndex);
    const logMax = Math.log(maxIndex);
    const logCurrent = Math.log(alcohol_index);

    // 로그 스케일로 변환된 값을 0-100%로 매핑
    progress = (100 * (logMax - logCurrent)) / (logMax - logMin);
  }

  return progress;
}

export default function DrinkCard({ drink }: DrinkCardProps) {
  const {
    id,
    kr_name,
    category,
    sub_category,
    price,
    abv,
    volume,
    alcohol_index,
  } = drink;
  const [progress, setProgress] = useState(0);
  const [progressBarColor, setProgressBarColor] = useState('');
  const progressBarCalculated = calculateProgressBar(alcohol_index);
  const krwFormatter = new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'KRW',
  });
  const volumeFormatter = new Intl.NumberFormat('ko-KR', {
    style: 'unit',
    unit: 'milliliter',
  });

  useEffect(() => {
    if (alcohol_index > MAX_INDEX) {
      setProgress(0);
      return;
    }
    setProgress(progressBarCalculated);
    setProgressBarColor(getProgressColor(progressBarCalculated));
  }, [progress, alcohol_index, progressBarCalculated]);

  return (
    <Card
      role={'DrinkCard'}
      className={
        'h-200px w-[90%] hover:cursor-pointer sm:w-4/5 md:w-300px md:transition-transform md:duration-300 md:hover:scale-105'
      }
      onClick={() => {
        window.open(`https://dailyshot.co/m/item/${id}`);
      }}
    >
      <div
        role={'DrinkCardWrapper'}
        className={'flex size-full flex-col justify-between p-5'}
      >
        <div role={'DrinkCardTitle'}>
          <CardTitle className={'w-full'}>
            {/* card 범위 넘기면 ... 처리*/}
            <p className={'h-8 truncate'}>{kr_name}</p>
          </CardTitle>
          <div role={'DrinkCardDescription'}>
            <div role={'DrinkCardCategory'} className={'text-md'}>
              {category} / {sub_category}
            </div>
            <p className={'mt-1 text-lg'}>
              {krwFormatter.format(price)} / {volumeFormatter.format(volume)} /{' '}
              {abv}%
            </p>
          </div>
        </div>
        <div role={'DrinkCardAlcoholIndex'}>
          <p className={'mb-2 text-xl font-extrabold'}>{`${getEmoji(
            progressBarCalculated
          )} ${alcohol_index}`}</p>
          <Progress
            value={progress}
            color={progressBarColor}
            className={'w-full'}
          />
        </div>
      </div>
    </Card>
  );
}
