// Test next-on-netlify when i18n is set in next.config.js (Next 10+)

const { parse, join } = require("path");
const buildNextApp = require("./helpers/buildNextApp");

// The name of this test file (without extension)
const FILENAME = parse(__filename).name;

// The directory which will be used for testing.
// We simulate a NextJS app within that directory, with pages, and a
// package.json file.
const PROJECT_PATH = join(__dirname, "builds", FILENAME);

// Capture the output to verify successful build
let buildOutput;

beforeAll(
  async () => {
    buildOutput = await buildNextApp()
      .forTest(__filename)
      .withPages("pages")
      .withNextConfig("next.config.js-with-i18n.js")
      .withPackageJson("package.json")
      .build();
  },
  // time out after 180 seconds
  180 * 1000
);

describe.only("next-on-netlify", () => {
  test("builds successfully", () => {
    expect(buildOutput).toMatch("Next on Netlify");
    expect(buildOutput).toMatch("Success! All done!");
  });
});