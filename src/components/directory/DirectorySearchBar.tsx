import {
  getSearchProvider,
  LOCATOR_ENTITY_TYPE,
  LOCATOR_STATIC_FILTER_FIELD,
} from "src/config";
import { useTemplateData } from "src/common/useTemplateData";
import { SearchHeadlessProvider } from "@yext/search-headless-react";
import { FilterSearch } from "@yext/search-ui-react";
import GeolocateButton from "src/components/search/GeolocateButton";
import { encodeStaticFilters } from "src/components/search/utils/handleSearchParams";
import { useAnalytics } from "@yext/pages-components";

const searchFields = [
  {
    fieldApiName: LOCATOR_STATIC_FILTER_FIELD,
    entityType: LOCATOR_ENTITY_TYPE,
  },
];

interface DirectorySearchBarProps {
  placeholder: string;
  searcherPath: string;
}

const DirectorySearchBar = (props: DirectorySearchBarProps) => {
  const { document } = useTemplateData();

  if (!document._site.c_searchExperienceAPIKey) {
    console.error("Add the search experience API key to the Site Entity");
  }

  const searcher = getSearchProvider(
    document._site.c_searchExperienceAPIKey ?? "",
    document.meta.locale,
    document.siteDomain,
    "locations"
  );

  return (
    <SearchHeadlessProvider searcher={searcher}>
      <DirectorySearchBarInternal {...props} />
    </SearchHeadlessProvider>
  );
};

const DirectorySearchBarInternal = (props: DirectorySearchBarProps) => {
  const { placeholder, searcherPath } = props;
  const analytics = useAnalytics();
  return (
    <div className="flex items-center justify-center w-full">
      <div className="DirectorySearchBar-container relative w-full md:w-[710px] justify-center h-[54px]">
        <FilterSearch
          customCssClasses={{
            filterSearchContainer: "absolute w-full mb-0",
            inputElement: "p-4 text-[18px] h-auto rounded-none",
          }}
          label=""
          placeholder={placeholder}
          searchFields={searchFields}
          key="directory-search"
          onSelect={({ newDisplayName, newFilter }) => {
            analytics?.track("input");
            const searchParams = encodeStaticFilters([
              {
                displayName: newDisplayName,
                filter: newFilter,
                selected: true,
              },
            ]);

            if (searchParams) {
              window.location.href = `${searcherPath}?${searchParams.toString()}`;
            }
          }}
        />
      </div>
      <GeolocateButton
        className="GeolocateButton ml-4"
        redirectToSearchPage={true}
        searcherPath={searcherPath}
      />
    </div>
  );
};

export default DirectorySearchBar;
