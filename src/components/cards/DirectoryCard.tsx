import { Address } from "@yext/pages-components";
import type { LiveAPIProfile, LocationProfile } from "src/types/entities";
import { CardComponent } from "src/models/cardComponent";
import { useTemplateData } from "src/common/useTemplateData";
import { Image, Link } from "@yext/pages-components";
import { formatPhone } from "src/common/helpers";
import CardCTA from "src/components/common/CardCTA";

const DirectoryCard: CardComponent<
  LocationProfile | LiveAPIProfile<LocationProfile>
> = function DirectoryCard(props): JSX.Element {
  const { profile } = props;
  const { document } = useTemplateData();
  const teaserImage =
    profile.photoGallery?.[0]?.image || document._site.c_placeholderPhoto;

  return (
    <div className="Directorycard bg-white flex items-center border border-brand-secondary sm:border-black h-full">
      <div>hi</div>
      <div className="hidden sm:flex border-r border-black w-1/3 h-full items-center">
        <div className="flex justify-center py-8">
          <Image layout="fill" image={teaserImage} />
        </div>
      </div>
      <div className="w-full p-4 h-full sm:p-8 sm:w-2/3">
        <div className="flex flex-row sm:block">
          <div className="flex sm:hidden mr-4 border border-brand-secondary items-center">
            <div className="flex justify-center max-w-[63px]">
              <Image layout="fill" image={teaserImage} />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium sm:mb-1">
              <div className="Heading--teaser">
                {(profile.c_fPName
                  ? profile.c_fPName
                  : profile.name
                ).replaceAll(" - Thrivent", "")}
              </div>
            </h3>

            {profile.c_designations && (
              <div className="mr-2 text-brand-dark-gold text-[14px] sm:text-[18px]">
                {profile.c_designations.join(", ")}
              </div>
            )}

            {profile.c_title && (
              <div className="mb-2 text-[14px] uppercase text-brand-dark-gold font-extrabold">
                {profile.c_title}
              </div>
            )}

            {profile.mainPhone && (
              <>
                <div className="hidden sm:block text-[18px]">
                  {formatPhone(profile.mainPhone, "US")}
                </div>
                <Link
                  className="sm:hidden text-brand-blue underline hover:no-underline"
                  href={`tel:${profile.mainPhone}`}
                >
                  {formatPhone(profile.mainPhone, "US")}
                </Link>
              </>
            )}
          </div>
        </div>
        {profile.address && (
          <div className="text-[18px] py-2">
            <Address
              address={profile.address}
              lines={[
                ["line1"],
                ["line2"],
                ["city", ",", "region", "postalCode"],
              ]}
            />
          </div>
        )}

        <div className="flex gap-4 sm:block">
          {profile.c_cTALocator1 && profile.c_baseURL && (
            <CardCTA
              url={profile.c_baseURL}
              label={profile.c_cTALocator1}
              primary={true}
            />
          )}

          {profile.c_cTALocator2 && profile.c_contactURL && (
            <CardCTA
              url={profile.c_contactURL}
              label={profile.c_cTALocator2}
              primary={false}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default DirectoryCard;
