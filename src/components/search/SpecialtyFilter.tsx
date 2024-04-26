import {
  useSearchActions,
  useSearchState,
  Matcher,
  FilterCombinator,
  SelectableStaticFilter,
  SearchHeadless,
  State,
} from "@yext/search-headless-react";
import { executeSearch } from "@yext/search-ui-react";
import { IoMdClose } from "react-icons/io";
import { useAnalytics } from "@yext/pages-components";

type SpecialtyFilterProps = {
  actions: SearchHeadless;
  staticFilters: SelectableStaticFilter[] | undefined;
  setFiltersOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const SpecialtyFilter = (props: SpecialtyFilterProps) => {
  const { actions, staticFilters, setFiltersOpen } = props;
  const searchActions = useSearchActions();
  const filterTitles = [
    "Financial Planning",
    "Financial Education",
    "Estate/Wealth Management",
    "College Planning",
    "Divorce Planning",
    "Legacy Planning",
    "Investment Management",
    "Insurance",
    "Retirement Planning",
    "General Planning",
  ];

  const filterMappings = new Map<String, SelectableStaticFilter>([
    [
      "Financial Planning",
      {
        selected: true,
        displayName: "Financial Planning",
        filter: {
          kind: "disjunction",
          combinator: FilterCombinator.OR,
          filters: [
            {
              kind: "fieldValue",
              fieldId: "c_designations",
              matcher: Matcher.Equals,
              value: "AAMS®",
            },
            {
              kind: "fieldValue",
              fieldId: "c_designations",
              matcher: Matcher.Equals,
              value: "BFA™",
            },
            {
              kind: "fieldValue",
              fieldId: "c_designations",
              matcher: Matcher.Equals,
              value: "CFP®",
            },
            {
              kind: "fieldValue",
              fieldId: "c_designations",
              matcher: Matcher.Equals,
              value: "ChFC®",
            },
            {
              kind: "fieldValue",
              fieldId: "c_designations",
              matcher: Matcher.Equals,
              value: "MSPFP",
            },
          ],
        },
      },
    ],
    [
      "Financial Education",
      {
        selected: true,
        displayName: "Financial Education",
        filter: {
          kind: "disjunction",
          combinator: FilterCombinator.OR,
          filters: [
            {
              kind: "fieldValue",
              fieldId: "c_designations",
              matcher: Matcher.Equals,
              value: "RICP®",
            },
          ],
        },
      },
    ],
    [
      "Estate/Wealth Management",
      {
        selected: true,
        displayName: "Estate/Wealth Management",
        filter: {
          kind: "disjunction",
          combinator: FilterCombinator.OR,
          filters: [
            {
              kind: "fieldValue",
              fieldId: "c_designations",
              matcher: Matcher.Equals,
              value: "WMCP®",
            },
            {
              kind: "fieldValue",
              fieldId: "c_designations",
              matcher: Matcher.Equals,
              value: "CPWA®",
            },
          ],
        },
      },
    ],
    [
      "College Planning",
      {
        selected: true,
        displayName: "College Planning",
        filter: {
          kind: "disjunction",
          combinator: FilterCombinator.OR,
          filters: [
            {
              kind: "fieldValue",
              fieldId: "c_designations",
              matcher: Matcher.Equals,
              value: "RICP®",
            },
          ],
        },
      },
    ],
    [
      "Divorce Planning",
      {
        selected: true,
        displayName: "Divorce Planning",
        filter: {
          kind: "disjunction",
          combinator: FilterCombinator.OR,
          filters: [
            {
              kind: "fieldValue",
              fieldId: "c_designations",
              matcher: Matcher.Equals,
              value: "RICP®",
            },
          ],
        },
      },
    ],
    [
      "Legacy Planning",
      {
        selected: true,
        displayName: "Legacy Planning",
        filter: {
          kind: "disjunction",
          combinator: FilterCombinator.OR,
          filters: [
            {
              kind: "fieldValue",
              fieldId: "c_designations",
              matcher: Matcher.Equals,
              value: "RICP®",
            },
          ],
        },
      },
    ],
    [
      "Investment Management",
      {
        selected: true,
        displayName: "Investment Management",
        filter: {
          kind: "disjunction",
          combinator: FilterCombinator.OR,
          filters: [
            {
              kind: "fieldValue",
              fieldId: "c_designations",
              matcher: Matcher.Equals,
              value: "CPM",
            },
            {
              kind: "fieldValue",
              fieldId: "c_designations",
              matcher: Matcher.Equals,
              value: "CIPM",
            },
            {
              kind: "fieldValue",
              fieldId: "c_designations",
              matcher: Matcher.Equals,
              value: "CIMA®",
            },
          ],
        },
      },
    ],
    [
      "Insurance",
      {
        selected: true,
        displayName: "Insurance",
        filter: {
          kind: "disjunction",
          combinator: FilterCombinator.OR,
          filters: [
            {
              kind: "fieldValue",
              fieldId: "c_designations",
              matcher: Matcher.Equals,
              value: "RHU®",
            },
            {
              kind: "fieldValue",
              fieldId: "c_designations",
              matcher: Matcher.Equals,
              value: "LUTCF®",
            },
            {
              kind: "fieldValue",
              fieldId: "c_designations",
              matcher: Matcher.Equals,
              value: "FSA",
            },
            {
              kind: "fieldValue",
              fieldId: "c_designations",
              matcher: Matcher.Equals,
              value: "FPC",
            },
            {
              kind: "fieldValue",
              fieldId: "c_designations",
              matcher: Matcher.Equals,
              value: "FLMI",
            },
            {
              kind: "fieldValue",
              fieldId: "c_designations",
              matcher: Matcher.Equals,
              value: "FICF",
            },
            {
              kind: "fieldValue",
              fieldId: "c_designations",
              matcher: Matcher.Equals,
              value: "FIC",
            },
            {
              kind: "fieldValue",
              fieldId: "c_designations",
              matcher: Matcher.Equals,
              value: "CLU®",
            },
            {
              kind: "fieldValue",
              fieldId: "c_designations",
              matcher: Matcher.Equals,
              value: "CLTC®",
            },
          ],
        },
      },
    ],
    [
      "Retirement Planning",
      {
        selected: true,
        displayName: "Retirement Planning",
        filter: {
          kind: "disjunction",
          combinator: FilterCombinator.OR,
          filters: [
            {
              kind: "fieldValue",
              fieldId: "c_designations",
              matcher: Matcher.Equals,
              value: "RICP®",
            },
            {
              kind: "fieldValue",
              fieldId: "c_designations",
              matcher: Matcher.Equals,
              value: "CRPS®",
            },
            {
              kind: "fieldValue",
              fieldId: "c_designations",
              matcher: Matcher.Equals,
              value: "CPRC",
            },
          ],
        },
      },
    ],
    [
      "General Planning",
      {
        selected: true,
        displayName: "General Planning",
        filter: {
          kind: "disjunction",
          combinator: FilterCombinator.OR,
          filters: [
            {
              kind: "fieldValue",
              fieldId: "c_designations",
              matcher: Matcher.Equals,
              value: "CFA®",
            },
          ],
        },
      },
    ],
  ]);

  const analytics = useAnalytics();
  const handleClick = (title: string, checked: boolean) => {
    analytics?.track(`${title}`);
    const filtersWithoutServicesFilters =
      staticFilters?.filter((filter) => filter.displayName !== title) || [];

    checked
      ? actions.setStaticFilters([
          ...filtersWithoutServicesFilters,
          filterMappings.get(title) as SelectableStaticFilter,
        ])
      : actions.setStaticFilters([...filtersWithoutServicesFilters]);
  };

  const clearSpecialties = () => {
    analytics?.track("clear");
    const filtersWithoutServicesFilters =
      staticFilters?.filter(
        (filter) => !filterTitles.includes(filter.displayName || "")
      ) || [];

    actions.setStaticFilters([...filtersWithoutServicesFilters]);

    const filterBoxEl = document.querySelector(".FilterBox");
    if (filterBoxEl) {
      const filters = filterBoxEl.querySelectorAll("input");
      for (let i = 0; i < filters.length; i++) {
        (filters[i] as HTMLInputElement).checked = false;
      }
    }
  };

  const submitSearch = () => {
    analytics?.track("search");
    searchActions.setOffset(0);
    executeSearch(searchActions);
    setFiltersOpen(false);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    const contentEl = document.querySelector(".Locator-content");
    contentEl &&
      contentEl.scrollTo({
        top: 0,
        behavior: "smooth",
      });
  };

  return (
    <div className="FilterBox p-3 pt-0">
      <div className="flex justify-between text-black font-extrabold text-[20px] mb-4">
        <h3>Services</h3>
        <button
          onClick={() => {
            analytics?.track("button");
            setFiltersOpen(false);
          }}
        >
          <IoMdClose className="h-6 w-6 mr-[-10px]" />
          <div className="sr-only">Close Filters</div>
        </button>
      </div>
      {filterTitles.map((title) => (
        <div
          className="w-full flex justify-between text-[20px] mb-4"
          key={title}
        >
          {title}
          <input
            type="checkbox"
            className="h-5 w-5"
            title={title}
            onClick={(e) => {
              handleClick(
                title,
                (e.target as HTMLInputElement).checked || false
              );
            }}
          />
        </div>
      ))}
      <div className="flex justify-between text-black font-extrabold text-[20px]">
        <button className="pl-5" onClick={clearSpecialties}>
          Clear All
        </button>
        <button className="bg-brand-gray-300 p-4 ml-2" onClick={submitSearch}>
          Show Advisors
        </button>
      </div>
    </div>
  );
};

export default SpecialtyFilter;
