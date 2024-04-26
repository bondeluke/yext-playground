import type { TemplateConfig, Stream } from "@yext/pages";

/**
 * Required when Knowledge Graph data is used for a template.
 */
export const configBuilder: (
  id?: string,
  filter?: Stream["filter"]
) => TemplateConfig = (id?: string, filter?: Stream["filter"]) => ({
  stream: {
    $id: id || "directory-city",
    // Specifies the exact data that each generated document will contain. This data is passed in
    // directly as props to the default exported function.
    fields: [
      "id",
      "uid",
      "meta",
      "name",
      "slug",
      "c_breadcrumb",
      "c_meta",
      "dm_baseEntityCount",
      "c_directoryHeroDescription",
      "c_addressRegionDisplayName",
      // Directory Grid Fields
      "dm_directoryParents.slug",
      "dm_directoryParents.name",
      "dm_directoryParents.c_breadcrumb",
      "dm_directoryChildren.slug",
      "dm_directoryChildren.name",
      "dm_directoryChildren.address",
      "dm_directoryChildren.hours",
      "dm_directoryChildren.c_title",
      "dm_directoryChildren.c_fPName",
      "dm_directoryChildren.c_virtualAgent",
      "dm_directoryChildren.c_cTALocator1",
      "dm_directoryChildren.c_cTALocator2",
      "dm_directoryChildren.c_baseURL",
      "dm_directoryChildren.c_contactURL",
      "dm_directoryChildren.photoGallery",
      "dm_directoryChildren.mainPhone",
      "dm_directoryChildren.c_designations",
      "dm_directoryChildren.c_addressRegionDisplayName",
    ],
    // Defines the scope of entities that qualify for this stream.
    filter: filter || {
      savedFilterIds: ["dm_defaultDirectory_address_city"],
    },
    // The entity language profiles that documents will be generated for.
    localization: {
      locales: ["en"],
    },
  },
});
