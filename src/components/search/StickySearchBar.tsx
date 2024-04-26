import { FilterSearch, SearchBar, executeSearch } from "@yext/search-ui-react";
import { useSearchActions } from "@yext/search-headless-react";
import {
  LOCATOR_STATIC_FILTER_FIELD,
  LOCATOR_STATIC_FILTER_FIELD_NAME,
  LOCATOR_ENTITY_TYPE,
} from "src/config";
import GeolocateButton from "src/components/search/GeolocateButton";
import RadiusDropdown from "src/components/search/utils/RadiusDropdown";
import FilterSvg from "src/assets/images/icons.svg";
import { useEffect, useState } from "react";
import c from "classnames";
import { useAnalytics } from "@yext/pages-components";

type StickySearchBarProps = {
  placeholderText?: string;
  type: string;
  isDesktop: boolean;
  filtersOpen: boolean;
  setFiltersOpen: (arg: boolean) => void;
};

const StickySearchBar = (props: StickySearchBarProps) => {
  const { placeholderText, type, isDesktop, filtersOpen, setFiltersOpen } =
    props;
  const [stickyHeader, setStickyHeader] = useState(false);
  const searchActions = useSearchActions();

  const analytics = useAnalytics();

  const searchFields = [
    {
      fieldApiName:
        type === "location"
          ? LOCATOR_STATIC_FILTER_FIELD
          : LOCATOR_STATIC_FILTER_FIELD_NAME,
      entityType: LOCATOR_ENTITY_TYPE,
    },
  ];

  const submitSearch = () => {
    // Execute search on select.
    searchActions.setOffset(0);
    executeSearch(searchActions);
    analytics?.track("search");
  };

  const toggleFilters = () => {
    setFiltersOpen(!filtersOpen);
    analytics?.track("filters_open");
  };

  const OnSearch = (searchEventData: {
    verticalKey?: string;
    query?: string;
  }) => {
    if (searchEventData.query && searchEventData.query.trim() !== "") {
      searchActions.executeVerticalQuery();
    }
  };

  const handleScroll = () => {
    const stickyEl = document.querySelector(".Sticky-search");
    const resultsList = document.querySelector(".Locator-content");
    const searchHeaderEl = document.querySelector(".Search-header");
    const mainHeaderEl = document.querySelector(".Header");
    if (stickyEl && resultsList && searchHeaderEl && mainHeaderEl) {
      const scrollHeight = isDesktop ? resultsList.scrollTop : window.scrollY;
      const scrollLimit = isDesktop
        ? (searchHeaderEl as HTMLDivElement).offsetHeight
        : (mainHeaderEl as HTMLDivElement).offsetHeight +
          (searchHeaderEl as HTMLDivElement).offsetHeight;
      if (scrollHeight > scrollLimit) {
        setStickyHeader(true);
      } else {
        setStickyHeader(false);
      }
    }
  };

  useEffect(() => {
    const resultsList = document.querySelector(".Locator-content");
    if (isDesktop) {
      resultsList?.addEventListener("scroll", () => {
        handleScroll();
      });
    } else {
      document.addEventListener("scroll", () => {
        handleScroll();
      });
    }
  });

  return (
    <>
      <div className={c({ "h-[160px]": !isDesktop && stickyHeader })} />
      <div
        className={c(
          "Sticky-search bg-brand-primary items-center justify-between p-2",
          { "hidden sm:flex": isDesktop },
          { "flex sm:hidden": !isDesktop },
          {
            "sticky z-[10] top-[-1px] w-full lg:w-[720px]":
              isDesktop && stickyHeader,
          },
          { "fixed z-[10] top-[-1px] w-full": !isDesktop && stickyHeader }
        )}
      >
        <div className="flex flex-wrap sm:flex-nowrap items-center w-full">
          <div className="relative w-full sm:w-[336px] h-9 top-[-10px] m-4">
            {type === "location" ? (
              <FilterSearch
                customCssClasses={{
                  filterSearchContainer: " w-full",
                  inputElement: "rounded-none h-[56px] pr-[32px]",
                }}
                label=""
                placeholder={placeholderText}
                searchFields={searchFields}
                onSelect={({
                  currentFilter,
                  executeFilterSearch,
                  newDisplayName,
                  newFilter,
                  setCurrentFilter,
                }) => {
                  // Update static filters.
                  if (currentFilter) {
                    searchActions.setFilterOption({
                      filter: currentFilter,
                      selected: false,
                    });
                  }
                  searchActions.setFilterOption({
                    filter: newFilter,
                    displayName: newDisplayName,
                    selected: true,
                  });
                  setCurrentFilter(newFilter);
                  executeFilterSearch(newDisplayName);

                  // Execute search on select.
                  searchActions.setOffset(0);
                  searchActions.resetFacets();
                  executeSearch(searchActions);
                }}
              />
            ) : (
              <SearchBar
                placeholder={placeholderText}
                customCssClasses={{
                  searchBarContainer: "SearchBar h-[56px]",
                  inputElement: "h-[56px]",
                  clearButton: "hidden",
                  searchButtonContainer: "hidden",
                }}
                showVerticalLinks={false}
                onSearch={OnSearch}
              />
            )}
          </div>
          {type === "location" && (
            <>
              <GeolocateButton
                className={c(
                  "GeolocateButton absolute right-[4px] sm:static ml-[-42px] mr-[36px] sm:mr-[20px] z-10",
                  { "top-[32px]": !isDesktop && stickyHeader },
                  { "top-[135px]": !isDesktop && !stickyHeader }
                )}
              />
              <RadiusDropdown />
            </>
          )}
          <button
            className="bg-brand-blue text-white font-bold rounded p-4 ml-2 m-[10px] w-[105px]"
            onClick={submitSearch}
          >
            Search
          </button>
        </div>
        <button
          className={c(
            "p-2 absolute right-[10px] sm:static sm:pl-4 sm:self-center",
            { "top-[86px]": !isDesktop && stickyHeader },
            { "top-[190px]": !isDesktop && !stickyHeader }
          )}
          onClick={toggleFilters}
        >
          <svg className="FiltersToggle w-[40px] h-[40px]" aria-hidden="true">
            <use xlinkHref={`${FilterSvg}#filters`} />
          </svg>
          <div className="sr-only">Open Filters</div>
        </button>
      </div>
    </>
  );
};

export default StickySearchBar;
