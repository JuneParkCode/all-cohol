// 유저가 직접 알성비를 측정할 수 있도록 하는 페이지.

import MeasureForm from '@/app/measure/components/MeasureForm';

export default function MeasurePage() {
  return (
    <div role={'MeasurePageContainer'}>
      <div
        role={'MeasureContentBody'}
        className={'flex items-center justify-center'}
      >
        <MeasureForm />
      </div>
    </div>
  );
}
