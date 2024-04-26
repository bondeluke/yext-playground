import type {
  DirectoryProfile,
  LocationProfile,
  TemplateRenderProps,
} from "src/types/entities";
import Breadcrumbs from "src/components/common/Breadcrumbs";
import DirectoryCard from "src/components/cards/DirectoryCard";
import DirectoryGrid from "src/components/directory/DirectoryGrid";
import DirectoryHero from "src/components/directory/DirectoryHero";
import DirectoryList from "src/components/directory/DirectoryList";
import Banner from "src/components/common/Banner";
import { useTemplateData } from "src/common/useTemplateData";
import { AnalyticsScopeProvider } from "@yext/pages-components";

interface DirectoryListLayoutProps {
  data: TemplateRenderProps<DirectoryProfile<never>>;
}

interface DirectoryGridLayoutProps {
  data: TemplateRenderProps<DirectoryProfile<LocationProfile>>;
}

type DirectoryLayoutProps = DirectoryListLayoutProps | DirectoryGridLayoutProps;

const DirectoryLayout = ({ data }: DirectoryLayoutProps) => {
  const { dm_directoryParents, dm_directoryChildren, _site } = data.document;

  const templateData = useTemplateData();
  const profile = templateData.document as DirectoryProfile<never>;
  const defaultBannerText =
    "Connect with our Virtual Advice Team. We have a team of professionals just a phone call away";
  const defaultBannerURL =
    "https://www.thrivent.com/about-us/working-with-thrivent/thrivent-financial-guidance-team.html";
  const isRoot = profile.meta.entityType.id === "ce_root";

  return (
    <>
      <AnalyticsScopeProvider name="hero">
        <DirectoryHero isRoot={isRoot} />
      </AnalyticsScopeProvider>
      <div className="border-b border-black">
        <Breadcrumbs
          breadcrumbs={dm_directoryParents || []}
          separator="|"
          className="hidden lg:flex container justify-start"
        />
      </div>
      {dm_directoryChildren && isDirectoryGrid(dm_directoryChildren) && (
        <DirectoryGrid CardComponent={DirectoryCard} />
      )}
      {dm_directoryChildren && !isDirectoryGrid(dm_directoryChildren) && (
        <DirectoryList showNumLocs={true} />
      )}
      <AnalyticsScopeProvider name="promo">
        <Banner
          text={_site.c_bannerText || defaultBannerText}
          url={_site.c_bannerURL || defaultBannerURL}
        />
      </AnalyticsScopeProvider>
      <div className="border-t border-black">
        <Breadcrumbs
          breadcrumbs={dm_directoryParents || []}
          separator="|"
          className="flex lg:hidden px-4 justify-start"
        />
      </div>
    </>
  );
};

// Type guard to determine whether to render the DirectoryGrid or DirectoryList component
// based on the type of dm_directoryChildren.
const isDirectoryGrid = (
  children: LocationProfile[] | DirectoryProfile<never>[]
): children is LocationProfile[] => {
  return children.length > 0 && "address" in children[0];
};

export default DirectoryLayout;
