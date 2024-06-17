'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import { Page } from '@/types/Page';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationFirst,
  PaginationItem,
  PaginationLast,
  PaginationLink,
} from '@/components/ui/pagination';

export interface PaginationProps {
  pageData: Page<unknown>;
  current: number;
}

function generatePagination(current: number, pageData: Page<unknown>) {
  const { last } = pageData;
  const pageArr = [];

  // current 앞 뒤로 총 5개의 페이지를 담아둡니다. 만약, last 보다 마지막 페이지가 적을 경우 0을 마지막에 추가합니다.
  for (let i = current - 2; i <= current + 2; i++) {
    if (i > 0 && i <= last) {
      pageArr.push(i);
    }
  }
  if (pageArr[pageArr.length - 1] < last) {
    pageArr.push(0);
  }

  return pageArr;
}

export default function CustomPagination({
  pageData,
  current,
}: PaginationProps) {
  const router = useRouter();
  const { first, prev, next, last, pages, items, data } = pageData;
  const pagination = generatePagination(current, pageData);
  const searchParams = useSearchParams();

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    router.push(`/rank?${params.toString()}`);
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationFirst href={`#`} onClick={() => handlePageChange(first)} />
        </PaginationItem>
        {pagination.length ? (
          pagination.map((page, index) => {
            if (current == page) {
              return (
                <PaginationItem key={index}>
                  <PaginationLink href={`#`} isActive={true}>
                    {page}
                  </PaginationLink>
                </PaginationItem>
              );
            }
            if (page == 0) {
              return (
                <PaginationItem key={index}>
                  <PaginationEllipsis />
                </PaginationItem>
              );
            }
            return (
              <PaginationItem key={index}>
                <PaginationLink
                  href={`#`}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            );
          })
        ) : (
          <></>
        )}
        <PaginationItem>
          <PaginationLast href={`#`} onClick={() => handlePageChange(last)} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
