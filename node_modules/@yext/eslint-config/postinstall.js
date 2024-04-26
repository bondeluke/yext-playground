const fs = require("fs");
const path = require("path");

const preamble =
  "Contains information from the language-subtag-registry JSON Database " +
  "(https://github.com/mattcg/language-subtag-registry/tree/master/data/json)\n" +
  "which is made available under the ODC Attribution License " +
  "(https://github.com/mattcg/language-subtag-registry/blob/master/LICENSE.md).";

const licensePath = path.resolve(process.env.INIT_CWD, "LICENSE");
if (!fs.existsSync(licensePath)) {
  console.log("--- Writing new LICENSE with eslint-config preamble.");
  fs.writeFileSync(licensePath, preamble);
} else {
  const preexistingLicenseContent = fs.readFileSync(licensePath);
  if (!preexistingLicenseContent.includes(preamble)) {
    console.log("--- prepending eslint-config preamble to LICENSE.");
    fs.writeFileSync(
      licensePath,
      `${preamble}\n\n${preexistingLicenseContent}`
    );
  }
}
