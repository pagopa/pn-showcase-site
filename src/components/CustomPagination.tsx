import {
  Pagination,
  PaginationItem,
  PaginationRenderItemParams,
} from "@mui/material";
import { PaginationData } from "model";
import { calculatePages } from "@utils/pagination";

interface PaginationProps {
  pagination: PaginationData;
  onChange: (event: React.ChangeEvent<unknown>, value: number) => void;
}

const CustomPagination: React.FC<PaginationProps> = ({
  pagination,
  onChange,
}) => {
  const pagesToShow = pagination
    ? calculatePages(
        pagination.size, // righe per pagina
        pagination.totalElements, // numero totale di elementi
        pagination.numOfDisplayedPages, // numero di pagine
        pagination.currentPage
      )
    : [];

  const renderingPaginationItems = (itemParam: PaginationRenderItemParams) => {
    if (
      itemParam.type === "start-ellipsis" ||
      itemParam.type === "end-ellipsis"
    ) {
      return null;
    }
    if (
      itemParam.type === "page" &&
      itemParam.page !== null &&
      pagesToShow.indexOf(itemParam.page) === -1
    ) {
      if (itemParam.page === pagesToShow[0] - 1) {
        return (
          <PaginationItem
            {...itemParam}
            type="start-ellipsis"
            sx={{ border: "none" }}
          />
        );
      }
      if (itemParam.page === pagesToShow[pagesToShow.length - 1] + 1) {
        return (
          <PaginationItem
            {...itemParam}
            type="end-ellipsis"
            sx={{ border: "none" }}
          />
        );
      }
      return null;
    }

    return <PaginationItem {...itemParam} sx={{ border: "none" }} />;
  };
  return (
    <Pagination
      sx={{ display: "flex" }}
      color="primary"
      variant="text"
      shape="circular"
      page={pagination.currentPage + 1}
      count={Math.ceil(pagination.totalElements / pagination.size)}
      onChange={onChange}
      siblingCount={1}
      boundaryCount={0}
      renderItem={renderingPaginationItems}
    />
  );
};

export default CustomPagination;
