// Core
import { useMemo } from "react";

// Store dots
export const DOTS = "...";

// Create range
const range = ($start: number, $end: number) => {
  let length = $end - $start + 1;

  /*
    Create an array of certain length and set the elements within it from
    $start value to $end value.
  */
  return Array.from({ length }, (_, idx) => idx + $start);
};

export const usePagination = ({
  $length,
  $limit,
  $pagination,
}: {
  $length: number;
  $limit: number;
  $pagination: number;
}) => {
  const paginationRange: (string | number)[] = useMemo(() => {
    // Count of numbers to show between the dots
    const siblingCount = 2;

    // Total number of pages to be shown
    const totalPageCount = Math.ceil($length / $limit);

    // Pages count is determined as siblingCount + firstPage + lastPage + $pagination + 2*DOTS
    const totalPageNumbers = siblingCount + 5;

    /*
      Case 1:
      If the number of pages is less than the page numbers we want to show in our
      paginationComponent, we return the range [1..totalPageCount]
    */
    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount);
    }

    /*
    	Calculate left and right sibling index and make sure they are within range 1 and totalPageCount
    */
    const leftSiblingIndex = Math.max($pagination - siblingCount, 1);
    const rightSiblingIndex = Math.min(
      $pagination + siblingCount,
      totalPageCount
    );

    /*
     Don't show dots when there is only one page number to be inserted between the extremes of sibling and the page limits i.e 1 and totalPageCount. Hence we are using leftSiblingIndex > 2 and rightSiblingIndex < totalPageCount - 2
    */
    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    /*
    	No left dots to show, but rights dots to be shown
    */
    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 3 + 2 * siblingCount;
      let leftRange = range(1, leftItemCount);

      return [...leftRange, DOTS, totalPageCount];
    }

    /*
    	No right dots to show, but left dots to be shown
    */
    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = 3 + 2 * siblingCount;
      let rightRange = range(
        totalPageCount - rightItemCount + 1,
        totalPageCount
      );

      const d = [firstPageIndex as number, DOTS, ...rightRange];

      return d;
    }

    /*
    	Both left and right dots to be shown
    */
    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex);

      const d = [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];

      return d;
    }

    return [];
  }, [$length, $limit, $pagination]);

  return { range: paginationRange, DOTS };
};
