import { useState } from "react";
import { useSearchState } from "@yext/search-headless-react";
import type { State } from "@yext/search-headless-react";
import { LOCATOR_STATIC_FILTER_FIELD } from "src/config";
import { useTemplateData } from "src/common/useTemplateData";
import { checkIsLocationFilter } from "src/components/search/utils/checkIsLocationFilter";
import { useLocator } from "./utils/useLocator";

const ResultSummary = () => {
  const searchState = useSearchState((state) => state);
  const { relativePrefixToRoot } = useTemplateData();
  const [searchMade, setSearchMade] = useState(false);
  const { results } = useLocator();
  const resultsText = getResultsCountText(
    searchState,
    results.length,
    searchState.vertical.resultsCount || results.length,
    searchState.vertical.offset || 0,
    searchState.vertical.limit || 10,
    relativePrefixToRoot
  );

  // Element to render for results summary when page is first loaded before a search is made.
  const initialSummaryText = (
    <span>
      Use our locator to find financial professionals near you or{" "}
      <a
        href={relativePrefixToRoot + "directory"}
        className="Link--underline font-extrabold text-brand-secondary"
      >
        browse our directory
      </a>
      .
    </span>
  );

  // Check if a search has been made in order to conditionally render initialSummaryText.
  if (
    !searchMade &&
    searchState.query.queryId &&
    !searchState.searchStatus.isLoading
  ) {
    setSearchMade(true);
  }

  return (
    <div className="mr-4">{searchMade ? resultsText : initialSummaryText}</div>
  );
};

function getResultsCountText(
  state: State,
  resultsCount: number,
  totalResultsCount: number,
  offset: number,
  limit: number,
  relativePrefixToRoot: string
) {
  let prettyQuery = "";
  let queryDescriptor = "";
  if (state.query.mostRecentSearch) {
    prettyQuery = state.query.mostRecentSearch;
    queryDescriptor = "named";
    if (totalResultsCount === 0) {
      return (
        <span>
          Sorry, there are no financial professionals named "{prettyQuery}".
          Please modify your search and try again or{" "}
          <a
            href={relativePrefixToRoot + "directory"}
            className="Link--underline font-extrabold text-brand-secondary"
          >
            browse our directory.
          </a>
        </span>
      );
    }
  } else if (state.filters.static?.length) {
    // Make sure to get the match to the correct filter in case multiple are set.
    const activeFilter =
      state.filters.static.find(
        (f) =>
          f.selected &&
          f.filter.kind === "fieldValue" &&
          // If the locator is searching on "builtin.location", check if the selected filter is also a location filter.
          // Otherwise just match the locator filter fieldId to the selected filter fieldId.
          (LOCATOR_STATIC_FILTER_FIELD === "builtin.location"
            ? checkIsLocationFilter(f.filter)
            : LOCATOR_STATIC_FILTER_FIELD === f.filter.fieldId) &&
          f.displayName
      ) ?? null;
    if (activeFilter?.displayName) {
      prettyQuery = activeFilter.displayName;
    }
  }

  if (prettyQuery) {
    if (totalResultsCount === 0) {
      return `No financial professionals found ${queryDescriptor} "${prettyQuery}"`;
    }
    if (totalResultsCount === 1) {
      return `1 financial professional found ${queryDescriptor} "${prettyQuery}"`;
    }
    if (totalResultsCount <= limit) {
      return `${totalResultsCount} financial professionals ${queryDescriptor} "${prettyQuery}"`;
    }
    return (
      <>
        <div>
          {totalResultsCount} financial professionals {queryDescriptor} "
          {prettyQuery}"
        </div>
        <div>
          {offset + 1}-{offset + resultsCount} of {totalResultsCount} Results
        </div>
      </>
    );
  }

  if (totalResultsCount === 0) {
    return `No financial professionals found.`;
  }
  if (totalResultsCount === 1) {
    return `1 financial professional found.`;
  }
  if (totalResultsCount <= limit) {
    return `${totalResultsCount} financial professionals found.`;
  }
  return `${totalResultsCount} financial professionals found.\n${offset + 1}-${
    offset + resultsCount
  } of ${totalResultsCount} Results`;
}

export default ResultSummary;
