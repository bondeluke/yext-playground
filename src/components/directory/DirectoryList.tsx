import { Link } from "@yext/pages-components";
import type { DirectoryProfile } from "src/types/entities";
import ErrorBoundaryWithAnalytics from "../common/ErrorBoundaryWithAnalytics";
import { useTemplateData } from "src/common/useTemplateData";

interface DirectoryListProps {
  showNumLocs: boolean;
}

// This template unpacks/transforms data from the API response and then calls the Layout template
const DirectoryList = (props: DirectoryListProps) => {
  const templateData = useTemplateData();
  const profile = templateData.document as DirectoryProfile<never>;
  const relativePrefixToRoot = templateData.relativePrefixToRoot;

  if (profile.dm_directoryChildren) {
    return (
      <DirectoryListLayout
        directoryChildren={profile.dm_directoryChildren}
        relativePrefixToRoot={relativePrefixToRoot}
        showNumLocs={props.showNumLocs}
        isRoot={profile.meta.entityType.id === "ce_root"}
      />
    );
  }

  return null;
};

interface DirectoryListLayoutProps {
  showNumLocs: boolean;
  directoryChildren: DirectoryProfile<never>[];
  relativePrefixToRoot: string;
  isRoot: boolean;
}

// This template renders the data into HTML
const DirectoryListLayout = (props: DirectoryListLayoutProps) => {
  const { showNumLocs, directoryChildren, relativePrefixToRoot, isRoot } =
    props;
  const displayNameField = isRoot ? "c_addressRegionDisplayName" : "name";
  return (
    <ErrorBoundaryWithAnalytics name="directory">
      <div className="container my-8">
        <ul className="lg:columns-4 md:columns-3 sm:columns-2 columns-1 -m-3 py-8 px-5 sm:py-16">
          {directoryChildren
            .sort((el1, el2) => {
              return (el1[displayNameField] || "") >
                (el2[displayNameField] || "")
                ? 1
                : -1;
            })
            .map((child, idx) => (
              <li className="mb-4" key={idx}>
                <Link
                  className="Link--directory text-fontSize.lg inline-block after:content-[attr(data-count)] after:ml-2"
                  href={relativePrefixToRoot + child.slug}
                  data-count={
                    showNumLocs ? "(" + child.dm_baseEntityCount + ")" : ""
                  }
                >
                  <span className="text-brand-blue underline hover:no-underline">
                    {child[displayNameField]}
                  </span>
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </ErrorBoundaryWithAnalytics>
  );
};

export default DirectoryList;
