import { useEffect, useRef } from "react";
import classNames from "classnames";
import type { CardComponent } from "@yext/search-ui-react";
import type { Result } from "@yext/search-headless-react";
import { useLocator } from "src/components/search/utils/useLocator";
import LocatorCard, {
  LocatorCardProps,
  DefaultLocatorCard,
} from "src/components/cards/LocatorCard";
import "src/components/search/ResultList.css";
import { LocationProfile } from "src/types/entities";
import { useSearchState } from "@yext/search-headless-react";

interface ResultListProps extends LocatorCardProps {
  updateModalState: (open: boolean, title: string, content: string) => void;
}

const ResultList = (props: ResultListProps) => {
  const { updateModalState } = props;

  const { results } = useLocator();
  const state = useSearchState((state) => state);
  const resultsCount = state.vertical.resultsCount || 0;
  const offset = state.vertical.offset || 0;
  const limit = state.vertical.limit || 20;
  const currentPageNumber = offset / limit + 1;
  const maxPageCount = Math.ceil(resultsCount / limit);

  const footerCFP = document.querySelector(".Footer-cFPCopyright");

  return (
    <div className="ResultList">
      {results?.map((result) => (
        <ResultListItem
          key={result.id || result.index}
          result={result}
          cFPFooter={footerCFP}
          updateModalState={updateModalState}
        />
      ))}
      {(currentPageNumber === maxPageCount || resultsCount == 0) &&
        state.searchStatus.isLoading != null &&
        state.vertical.verticalKey == "locations" && <DefaultLocatorCard />}
    </div>
  );
};

interface ResultListItemProps {
  result: Result<LocationProfile>;
  cFPFooter: any;
  updateModalState: (open: boolean, title: string, content: string) => void;
}

function ResultListItem(props: ResultListItemProps) {
  const { result, updateModalState } = props;
  const cFPFooter = props;
  const {
    selectedId,
    setSelectedId,
    hoveredId,
    setHoveredId,
    focusedId,
    setFocusedId,
  } = useLocator();
  const listItemRef = useRef<HTMLDivElement | null>(null);

  // When the selectedId is updated from a marker click scroll the ResultList to show the current LocatorCard
  useEffect(() => {
    if (selectedId === result.id) {
      listItemRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [selectedId, result.id]);

  return (
    <div
      ref={listItemRef}
      className={classNames(
        "ResultList-item",
        { "is-selected": selectedId === result.id },
        { "is-hovered": hoveredId === result.id || focusedId === result.id }
      )}
      onClick={() => setSelectedId(result.id ?? "")}
      onFocus={() => setFocusedId(result.id ?? "")}
      onBlur={() => setFocusedId("")}
      onMouseEnter={() => setHoveredId(result.id ?? "")}
      onMouseLeave={() => setHoveredId("")}
    >
      <LocatorCard
        result={result}
        cFPFooter={cFPFooter}
        updateModalState={updateModalState}
      />
    </div>
  );
}

export default ResultList;
