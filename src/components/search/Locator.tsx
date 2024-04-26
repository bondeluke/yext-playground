import { useCallback, useEffect, useState } from "react";
import { useSearchActions, useSearchState } from "@yext/search-headless-react";
import { Map, MapboxMaps } from "@yext/pages-components";
import { useBreakpoint } from "src/common/useBreakpoints";
import {
  useHandleSearchParams,
  useLoadInitialSearchParams,
} from "src/components/search/utils/handleSearchParams";
import { useGetSearchResults } from "src/components/search/utils/useGetSearchResults";
import { LocatorProvider } from "./utils/useLocator";
import { LocationProfile } from "src/types/entities";
import "src/components/search/Locator.css";
import mapStyles from "src/components/search/defaultMapStyles.json";
import SearchBox from "src/components/search/SearchBox";
import ResultInfo from "src/components/search/ResultInfo";
import ResultList from "src/components/search/ResultList";
import CustomMarker from "src/components/search/CustomMarker";
import LoadingSpinner from "src/components/common/LoadingSpinner";
import { getMapKey } from "src/common/getMapKey";
import { Pagination } from "@yext/search-ui-react";
import { IoMdClose } from "react-icons/io";
import c from "classnames";

type LocatorProps = {
  // Will display results up to the verticalLimit (default 20, change with searchActions.setVerticalLimit(num))
  displayAllOnNoResults?: boolean;
  placeholderText?: string;
  title: string;
  allResultsOnLoad?: boolean;
  type: string;
};

const Locator = (props: LocatorProps) => {
  const {
    displayAllOnNoResults = false,
    allResultsOnLoad = false,
    placeholderText,
    title,
    type,
  } = props;
  const mapKey = getMapKey();
  const [selectedEntityId, setSelectedEntityId] = useState("");
  const [focusedEntityId, setFocusedEntityId] = useState("");
  const [hoveredEntityId, setHoveredEntityId] = useState("");

  const searchActions = useSearchActions();
  const isLoading = useSearchState((state) => state.searchStatus.isLoading);
  const isDesktopBreakpoint = useBreakpoint("lg");
  const [allLocationsLoaded, setAllLocationsLoaded] = useState(false);
  const [initialParamsLoaded, setInitialParamsLoaded] = useState(false);
  const initialParamsLoadedCallback = useCallback(
    () => setInitialParamsLoaded(true),
    [setInitialParamsLoaded]
  );

  searchActions.setVerticalLimit(10);

  // Load static and facet filters on page load.
  useLoadInitialSearchParams(initialParamsLoaded, initialParamsLoadedCallback);
  // Update the search params whenever the search state filters property changes.
  useHandleSearchParams(initialParamsLoaded);

  // Unset any selected, hovered, or focused markers on new search
  useEffect(() => {
    setSelectedEntityId("");
    setFocusedEntityId("");
    setHoveredEntityId("");
  }, [searchActions.state.query.queryId]);
  const results = useGetSearchResults<LocationProfile>(
    displayAllOnNoResults,
    allResultsOnLoad,
    () => {
      setAllLocationsLoaded(true);
    }
  );

  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState("");

  useEffect(() => {
    if (modalOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [modalOpen]);

  const updateModalState = (open: boolean, title = "", content = "") => {
    if (content === "") return;
    setModalOpen(open);
    setModalTitle(title);
    setModalContent(content);
  };

  const MAPBOX_STYLE = "mapbox://styles/mapbox/streets-v9";

  const footerCFP = document.querySelector(".Footer-cFPCopyright");

  if (footerCFP) {
    footerCFP.setAttribute("style", "display: none");
  }

  return (
    <LocatorProvider
      value={{
        results,
        selectedId: selectedEntityId,
        setSelectedId: setSelectedEntityId,
        focusedId: focusedEntityId,
        setFocusedId: setFocusedEntityId,
        hoveredId: hoveredEntityId,
        setHoveredId: setHoveredEntityId,
      }}
    >
      <div className="Locator">
        {(!initialParamsLoaded ||
          isLoading ||
          (allResultsOnLoad && !allLocationsLoaded)) && <LoadingSpinner />}
        <div className="Locator-content">
          <SearchBox
            title={title}
            placeholderText={placeholderText}
            type={type}
          />

          <ResultInfo />
          <ResultList updateModalState={updateModalState} />
          <Pagination
            customCssClasses={{
              paginationContainer: "my-4",
              label:
                "Locator-pageNum text-brand-blue border-0 underline font-normal underline hover:no-underline",
              selectedLabel: "text-brand-primary no-underline border-0",
              leftIconContainer: "hidden",
              rightIconContainer: "hidden",
              icon: "text-brand-primary",
            }}
          />
        </div>
        {isDesktopBreakpoint && (
          <div className="Locator-map">
            <Map
              provider={MapboxMaps}
              providerOptions={{
                styles: mapStyles,
                style: MAPBOX_STYLE,
                dragRotate: true,
              }}
              bounds={
                selectedEntityId
                  ? results
                      .filter((r) => r.id === selectedEntityId)
                      .map((data) => data.rawData.yextDisplayCoordinate)
                  : results.map((data) => data.rawData.yextDisplayCoordinate)
              }
              padding={{ top: 100, bottom: 200, left: 50, right: 50 }}
              className="h-full"
              {...mapKey}
            >
              {results.map((data, index) => (
                <CustomMarker
                  key={data.rawData.id}
                  coordinate={data.rawData.yextDisplayCoordinate}
                  id={data.rawData.id}
                  index={index + 1}
                />
              ))}
            </Map>
          </div>
        )}
      </div>
      <DesignationModal
        open={modalOpen}
        setOpen={setModalOpen}
        title={modalTitle}
        content={modalContent}
      />
    </LocatorProvider>
  );
};

interface DesignationModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  title: string;
  content: string;
}

const DesignationModal = (props: DesignationModalProps) => {
  const { open, setOpen, title, content } = props;

  return (
    <div
      className={c(
        "fixed p-[50px] bg-white lg:top-[30%] lg:left-[35%] z-10 w-full h-full lg:max-w-[600px] lg:w-fit lg:h-fit leading-tight",
        { hidden: !open }
      )}
    >
      <div className="flex justify-between">
        <div className="font-heading text-xl">{title}</div>
        <button
          onClick={() => {
            setOpen(false);
          }}
        >
          <IoMdClose className="h-6 w-6 mt-[-6px]" />
          <div className="sr-only">Close Filters</div>
        </button>
      </div>
      <div className="text-sm">{content}</div>
    </div>
  );
};

export default Locator;
