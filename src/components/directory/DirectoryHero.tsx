import { useTemplateData } from "src/common/useTemplateData";
import DirectorySearchBar from "src/components/directory/DirectorySearchBar";
import { FALLBACK_SEARCH_PATH } from "src/config";
import { DirectoryProfile } from "src/types/entities";
import ErrorBoundaryWithAnalytics from "../common/ErrorBoundaryWithAnalytics";

// This template unpacks/transforms data from the API response and then calls the Layout template
const DirectoryHero = (props: { isRoot: boolean }) => {
  const { isRoot } = props;
  const templateData = useTemplateData();
  const profile = templateData.document as DirectoryProfile<never>;
  const searchPath =
    templateData.relativePrefixToRoot +
    (profile._site.c_searchPage?.slug || FALLBACK_SEARCH_PATH);

  return (
    <DirectoryHeroLayout
      line1={profile._site.c_brand}
      line2={profile.c_directoryHeroDescription}
      searchPath={searchPath}
    />
  );
};

interface DirectoryHeroProps {
  line1?: string;
  line2?: string;
  searchPath?: string;
}

// This template renders the data into HTML
const DirectoryHeroLayout = (props: DirectoryHeroProps) => {
  const { line1, line2 } = props;

  return (
    <ErrorBoundaryWithAnalytics name="directory_hero">
      <div className="DirectoryHero bg-brand-primary py-8 md:py-20">
        <div className="flex flex-col items-center container">
          <h1 className="mb-6 text-center">
            {line1 && (
              <div className="Heading Heading--sub mb-6 text-brand-white">
                {line1}
              </div>
            )}
            {line2 && (
              <div className="Heading Heading--head text-[36px] font-normal text-brand-white sm:w-[590px] m-auto">
                {line2}
              </div>
            )}
          </h1>
          {props.searchPath && (
            <div className="flex flex-col items-center justify-center w-full sm:w-[70%] lg:w-1/2">
              <div className="text-white text-center p-4 font-extrabold text-[18px]">
                Search by City and State, or Zip
              </div>
              <DirectorySearchBar
                placeholder="ZIP or City, State"
                searcherPath={props.searchPath}
              />
            </div>
          )}
        </div>
      </div>
    </ErrorBoundaryWithAnalytics>
  );
};

export default DirectoryHero;
