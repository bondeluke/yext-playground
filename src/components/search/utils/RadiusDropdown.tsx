import { useSearchActions } from "@yext/search-headless-react";
import { useEffect } from "react";

const RadiusDropdown = () => {
  const searchActions = useSearchActions();

  useEffect(() => {
    //Set Initial Radius upon page load

    searchActions.setLocationRadius(25 * 1609); // This takes radius in meters
  }, []);

  return (
    <div className="m-2 ml-4 sm:m-2 border border-brand-secondary p-[6px] bg-brand-primary text-white h-[56px] w-[76px]">
      <fieldset>
        <div className="text-[12px]">radius</div>
        <select
          className="js-radius-select form-select w-full mr-7 text-base bg-brand-primary"
          id="locationRadius"
          name="locationRadius"
          onChange={(e) => {
            const r = parseInt(e.target?.value) * 1609;
            searchActions.setLocationRadius(r); // This takes radius in meters
          }}
          defaultValue={25}
        >
          <option value="10">10 mi</option>
          <option value="25">25 mi</option>
          <option value="50">50 mi</option>
          <option value="100">100 mi</option>
          <option value="200">200 mi</option>
        </select>
      </fieldset>
    </div>
  );
};

export default RadiusDropdown;
