import type { TemplateRenderProps, HeadConfig, Tag } from "@yext/pages";
import { SchemaBuilder } from "src/common/schema";
import favicon from "src/assets/images/favicon.ico";

const dnsPrefetchTags: Tag[] = [
  {
    type: "link",
    attributes: { rel: "dns-prefetch", href: "//www.yext-pixel.com" },
  },
  {
    type: "link",
    attributes: { rel: "dns-prefetch", href: "//a.cdnmktg.com" },
  },
  {
    type: "link",
    attributes: { rel: "dns-prefetch", href: "//a.mktgcdn.com" },
  },
  {
    type: "link",
    attributes: { rel: "dns-prefetch", href: "//dynl.mktgcdn.com" },
  },
  {
    type: "link",
    attributes: { rel: "dns-prefetch", href: "//dynm.mktgcdn.com" },
  },
  {
    type: "link",
    attributes: { rel: "dns-prefetch", href: "//www.google-analytics.com" },
  },
];

const defaultHeadTags: Tag[] = [
  {
    type: "meta",
    attributes: {
      "http-equiv": "X-UA-Compatible",
      content: "IE=edge",
    },
  },
  ...dnsPrefetchTags,
  {
    type: "meta",
    attributes: {
      name: "format-detection",
      content: "telephone=no",
    },
  },
  {
    type: "meta",
    attributes: {
      property: "og:type",
      content: "website",
    },
  },
  {
    type: "meta",
    attributes: {
      property: "twitter:card",
      content: "summary",
    },
  },
];

export function defaultHeadConfig(
  data: TemplateRenderProps,
  additionalTags?: Tag[]
): HeadConfig {
  const logoTags: Tag[] = data.document?.logo
    ? [
        {
          type: "meta",
          attributes: {
            property: "og:image",
            content: data.document.logo.image.url,
          },
        },
      ]
    : [];

  const geoTags: Tag[] = data.document?.yextDisplayCoordinate
    ? [
        {
          type: "meta",
          attributes: {
            name: "geo.position",
            content: `${data.document.yextDisplayCoordinate.lat},${data.document.yextDisplayCoordinate.long}`,
          },
        },
      ]
    : [];
  const addressTags: Tag[] = data.document.address
    ? [
        {
          type: "meta",
          attributes: {
            name: "geo.placename",
            content: `${data.document.address.city},${data.document.address.region}`, // TODO: dono't use abbreviated form here when it's available
          },
        },
        {
          type: "meta",
          attributes: {
            name: "geo.region",
            content: `${data.document.address.countryCode}-${data.document.address.region}`,
          },
        },
      ]
    : [];

  return {
    title: metaTitle(data),
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1, maximum-scale=5",
    tags: [
      {
        type: "meta",
        attributes: {
          name: "description",
          content: metaDescription(data),
        },
      },
      {
        type: "meta",
        attributes: {
          property: "og:title",
          content: metaTitle(data),
        },
      },
      {
        type: "meta",
        attributes: {
          property: "og:description",
          content: metaDescription(data),
        },
      },
      {
        type: "meta",
        attributes: {
          property: "og:url",
          content: canonicalUrl(data),
        },
      },
      {
        type: "link",
        attributes: {
          rel: "canonical",
          href: canonicalUrl(data),
        },
      },
      {
        type: "link",
        attributes: {
          rel: "shortcut icon",
          type: "image/ico",
          href: favicon,
        },
      },
      ...logoTags,
      ...defaultHeadTags,
      ...geoTags,
      ...addressTags,
      ...(additionalTags || []),
    ],
    other: [
      yaScript(),
      SchemaBuilder(data),
      yextEntityData(data),
      googleSiteTag(),
      googleOptimizeTag(),
      oneTrustScript(),
      adobeScript(data),
    ].join("\n"),
  };
}

function yaScript(): string {
  return `<script>window.yextAnalyticsEnabled=false;window.enableYextAnalytics=()=>{window.yextAnalyticsEnabled=true}</script>`;
}

function adobeScript(data: TemplateRenderProps): string {
  return data.document.siteDomain === "local.thrivent.com"
    ? '<script src="//assets.adobedtm.com/b8a11b7ab6ae/cd4943875ef2/launch-1d0ae6484012.min.js" async></script>'
    : '<script src="https://assets.adobedtm.com/b8a11b7ab6ae/cd4943875ef2/launch-9b662665fbd7-development.min.js" async></script>';
}

function oneTrustScript(): string {
  return `<script src="https://cdn.cookielaw.org/scripttemplates/otSDKStub.js" type="text/javascript" charset="UTF-8" data-domain-script="f79fbc85-c572-42b0-bdb2-94f46b976518"></script>
            <script type="text/javascript">
            function OptanonWrapper() { }
          </script>`;
}

function googleSiteTag(): string {
  return `<!-- Global site tag (gtag.js) - Google Analytics -->
          <script class=”optanon-category-4” async src="https://www.googletagmanager.com/gtag/js?id=UA-217856677-1"></script>
          <script>
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'UA-217856677-1');
          </script>`;
}

function googleOptimizeTag(): string {
  return '<script src="https://www.googleoptimize.com/optimize.js?id=OPT-M8C8JHS"></script>';
}

// Script for passing entity ID to yextension
function yextEntityData(data: TemplateRenderProps): string {
  return `<script id="yext-entity-data" data-entity-id="${data.document.uid}"></script>`;
}

function metaTitle(data: TemplateRenderProps): string {
  // 1. Check for meta field on the entity
  const { c_meta: entityMeta } = data.document;
  if (entityMeta?.title) return entityMeta.title;

  return "";
}

function metaDescription(data: TemplateRenderProps): string {
  // 1. Check for meta field on the entity
  const { c_meta: entityMeta } = data.document;
  if (entityMeta?.description) return entityMeta.description;

  // 2. Check for breadcrumbs
  const { dm_directoryParents } = data.document;
  if (dm_directoryParents) {
    return `${dm_directoryParents
      .map((crumb: { name: string }) => crumb.name)
      .join(", ")}.`;
  }

  return "";
}

function canonicalUrl(data: TemplateRenderProps): string {
  let pagePath = data.path;

  if (pagePath === "index.html") {
    pagePath = "";
  }

  return `https://${data.document.siteDomain}/${pagePath}`;
}
