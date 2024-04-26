import { useSearchActions, useSearchState } from "@yext/search-headless-react";
import { useState } from "react";
import { useTemplateData } from "src/common/useTemplateData";
import SpecialtyFilter from "./SpecialtyFilter";
import c from "classnames";
import { useAnalytics } from "@yext/pages-components";
import { AnalyticsScopeProvider } from "@yext/pages-components";
import StickySearchBar from "src/components/search/StickySearchBar";

type SearchBoxProps = {
  title: string;
  placeholderText?: string;
  type: string;
};

const SearchBox = (props: SearchBoxProps) => {
  const { title, placeholderText, type } = props;
  const [filtersOpen, setFiltersOpen] = useState(false);
  const searchActions = useSearchActions();
  const { relativePrefixToRoot } = useTemplateData();

  const staticFilters = useSearchState((s) => s.filters.static);
  const analytics = useAnalytics();

  return (
    <>
      <div className="Search-header bg-brand-primary shadow-brand-shadow">
        <h1 className="Heading--locatorTitle mb-4 text-white font-heading p-4 pb-0">
          {title}
        </h1>
        <div className="flex w-full items-start font-bold text-[12px] lg:text-[14px] leading-[20px] border-b border-brand-secondary">
          {type === "location" ? (
            <>
              <div className="text-white border-b-[3px] border-brand-secondary p-2 lg:p-4 w-1/2 lg:w-auto">
                Search by location
              </div>
              <a
                href={`${relativePrefixToRoot}search-by-name`}
                className="text-brand-secondary p-2 lg:p-4 w-1/2 lg:w-auto"
                onClick={analytics?.trackClick("link")}
              >
                Search by name
              </a>
            </>
          ) : (
            <>
              <a
                href={`${relativePrefixToRoot}index.html`}
                className="text-brand-secondary p-2 lg:p-4 w-1/2 lg:w-auto"
                onClick={analytics?.trackClick("link")}
              >
                Search by location
              </a>
              <div className="text-white border-b-[3px] border-brand-secondary p-2 lg:p-4 w-1/2 lg:w-auto">
                Search by name
              </div>
            </>
          )}
        </div>
      </div>
      <StickySearchBar
        placeholderText={placeholderText}
        type={type}
        isDesktop={true}
        filtersOpen={filtersOpen}
        setFiltersOpen={setFiltersOpen}
      />
      <StickySearchBar
        placeholderText={placeholderText}
        type={type}
        isDesktop={false}
        filtersOpen={filtersOpen}
        setFiltersOpen={setFiltersOpen}
      />
      <div>
        <div className={c("p-4", { hidden: !filtersOpen })}>
          <AnalyticsScopeProvider name="filters">
            <SpecialtyFilter
              actions={searchActions}
              staticFilters={staticFilters}
              setFiltersOpen={setFiltersOpen}
            />
          </AnalyticsScopeProvider>
        </div>
      </div>
    </>
  );
};

export default SearchBox;
