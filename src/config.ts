import { isProduction } from "@yext/pages/util";
import { provideHeadless } from "@yext/search-headless-react";
import type { ConfigurationProviderContextType } from "@yext/sites-react-components";
// import { SandboxEndpoints } from "@yext/search-headless-react"; // Add if using a sandbox account

declare global {
  const YEXT_PUBLIC_MAPS_API_KEY: string;
}

const config: ConfigurationProviderContextType = {
  components: {},
};

export default config;

// Key for Maps provider.
export const MAPS_API_KEY =
  YEXT_PUBLIC_MAPS_API_KEY ||
  "pk.eyJ1IjoieWV4dCIsImEiOiJqNzVybUhnIn0.hTOO5A1yqfpN42-_z_GuLw"; //TODO: replace with client key (pk.eyJ1IjoieWV4dCIsImEiOiJjbHJsZjQ1ZWUwams4MmtwOTBveHppN21lIn0.Ibap_DlOLEM79E77R1zT8Q) - using old yext key for testing

// Path for the search page.
// Exported here since it's required across multiple pages such as the nearby section and directory search bar.
export const FALLBACK_SEARCH_PATH = "index.html";
// Static filter field for FilterSearch.
export const LOCATOR_STATIC_FILTER_FIELD = "builtin.location";

// Static filter field for FilterSearch - Name Locator.
export const LOCATOR_STATIC_FILTER_FIELD_NAME = "c_fPName";
// Entity type for FilterSearch
export const LOCATOR_ENTITY_TYPE = "location";
// Radius used for the locator geolocate button.
export const GEOLOCATE_RADIUS = 50;

export const getSearchProvider = (
  apiKey: string,
  locale: string,
  domain: string,
  verticalKey: string
) => {
  const experienceVersion = isProduction(domain) ? "PRODUCTION" : "STAGING";

  return provideHeadless({
    apiKey,
    experienceKey: "locator",
    locale,
    verticalKey: verticalKey,
    experienceVersion,
    // endpoints: SandboxEndpoints // Add if using a sandbox account
  });
};
