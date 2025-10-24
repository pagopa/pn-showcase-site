/**
 * Calcola le pagine per il componente CustomPagination
 * @param  {number} pageSize number of elements per page
 * @param  {number} numOfItems total elements
 * @param  {number} numOfDisplayedPages number of pages to show
 * @param  {number} pageSelected selected page
 * @returns Array
 */
export function calculatePages(
  pageSize: number,
  numOfItems: number,
  numOfDisplayedPages: number,
  pageSelected: number
): Array<number> {
  /* IMPORTANT!
   * We assume numOfDisplayedPages is odd.
   */
  if (pageSize && numOfItems) {
    const numOfPages = Math.ceil(numOfItems / pageSize);
    const pages = Array.from({ length: numOfPages }, (_, i) => i + 1);
    const offset = (numOfDisplayedPages - 1) / 2;
    /*
     * if total number of pages is less or equal to numOfDisplayedPages,
     * show all the pages
     */
    if (numOfPages <= numOfDisplayedPages) {
      return pages;
    }

    /*
     * if selected page number is less than numOfDisplayedPages,
     * show from 1 to numOfDisplayedPages, followed by points
     */
    if (pageSelected + 1 < numOfDisplayedPages) {
      return pages.slice(0, numOfDisplayedPages);
    }

    /*
     * if selected page number is bigger than total number of pages minus numOfDisplayedPages,
     * show points followed by total number of pages minus numOfDisplayedPages until last page
     */
    if (pageSelected > numOfPages - numOfDisplayedPages) {
      return pages.slice(numOfPages - numOfDisplayedPages);
    }

    /*
     * all of other cases in the middle pagination
     */
    return pages.slice(pageSelected - offset, pageSelected + offset + 1);
  }
  return [];
}
