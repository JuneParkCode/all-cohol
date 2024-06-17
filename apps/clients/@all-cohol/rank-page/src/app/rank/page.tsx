import { Drink } from '@/types/Drink';
import { Page } from '@/types/Page';
import DrinkCard from '@/components/common/Card/DrinkCard';
import CustomPagination from '@/components/common/Pagination/CustomPagination';
import { metadata } from '@/app/layout';
import DropdownCategory from '@/app/rank/components/DropdownCategory';
import DropdownPrice from '@/app/rank/components/DropdownPrice';
import Search from '@/app/rank/components/Search';

interface SearchParams {
  page?: string;
  kr_name?: string;
  category?: string;
  sub_category?: string;
  price_lte?: string;
  price_gte?: string;
  sort?: string;
}

async function getPage(params: SearchParams): Promise<Page<Drink>> {
  const { page, kr_name, category, price_gte, price_lte, sort } = params;
  const currentPage = page ? parseInt(page) : 1;
  let url = 'http://localhost:8080/drinks';

  url += `?_page=${currentPage}&_per_page=12&_sort=alcohol_index&_order=asc`;
  if (category) url += `&category=${category}`;
  if (price_gte) url += `&price_gte=${price_gte}`;
  if (price_lte) url += `&price_lte=${price_lte}`;
  if (kr_name) url += `&kr_name=${kr_name}`;

  const res = await fetch(encodeURI(url));
  return await res.json();
}

export default async function RankPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { page, category } = searchParams;
  const currentPage = page ? parseInt(page) : 1;
  const pageData = await getPage(searchParams);
  const data = pageData.data;

  metadata.title = '알성비 랭킹 - All-Cohol';
  metadata.openGraph = {
    title: '알성비 랭킹',
    description:
      '소주 말고 저렴한 술은 뭐가 있을까?\n저렴한 술을 찾아서... All-Cohol!',
    url: 'https://all-cohol.com/rank',
  };

  return (
    <>
      <div role={'RankPageContainer'}>
        <div
          role={'RankCardList'}
          className={'w-full md:container md:mx-auto md:w-700px lg:w-1000px'}
        >
          <div
            role={'RankCardListHeader'}
            className={'mx-4 flex flex-col items-center  pt-5 md:mx-auto '}
          >
            <div className={'text-3xl font-extrabold'}>알성비 랭킹</div>
            <div className={'pt-2 text-center font-light'}>
              {/*<p className={"text-sm"}>클릭시 데일리샷으로 이동합니다</p>*/}
              <div className={'text-sm font-light'}>
                <p>{'알성비 지수: 주류의 알코올당 가격을 환산함'}</p>
                <p>{'계산식: 원 / ml 알코올 in 주류'}</p>
                <p className={'text-md font-medium'}>
                  * 낮은 값일수록 알성비가 좋습니다
                </p>
              </div>
            </div>
            <div
              role={'RankCardListFilter'}
              className={'my-3 hidden sm:flex sm:space-x-2'}
            >
              <DropdownCategory />
              <DropdownPrice />
              <div role={'RankCardListSearch'} className={'flex items-center'}>
                <Search />
              </div>
            </div>
            <div
              role={'RankCardListFilter'}
              className={'mt-3 flex flex-col space-y-2 sm:hidden'}
            >
              <div role={'RankCardListSearch'} className={'flex items-center'}>
                <Search />
              </div>
              <div className={'flex items-center justify-center space-x-2'}>
                <DropdownCategory />
                <DropdownPrice />
              </div>
            </div>
          </div>
          <div
            role={'RankCardListBody'}
            className={
              'my-5 flex w-full flex-col items-center justify-center space-y-4 md:grid md:grid-cols-2 md:gap-4 md:space-y-0 lg:grid-cols-3'
            }
          >
            {data ? (
              data.map((drink, index) => (
                <DrinkCard key={index} drink={drink} />
              ))
            ) : (
              <div className={'text-center'}>데이터가 없습니다.</div>
            )}
          </div>
          <div role={'RankCardListPagination'} className={'pb-5 text-center'}>
            <CustomPagination pageData={pageData} current={currentPage} />
          </div>
          <div role={'RankCardListFooter'} className={'text-center'}></div>
        </div>
      </div>
    </>
  );
}
