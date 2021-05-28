/**
 *  Copyright 2020 Adobe. All rights reserved.
 *  This file is licensed to you under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License. You may obtain a copy
 *  of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software distributed under
 *  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 *  OF ANY KIND, either express or implied. See the License for the specific language
 *  governing permissions and limitations under the License.
 */

const fromJson = require("../fromJson")

test("manifest-docs.json content", () => {
  const fileContent = `
{
  "name": "Parliament Site",
  "view_type": "mdbook",
  "pages": [
    {
      "pages": [
        {
          "pages": [],
          "path": "DevRel/parliament-docs/master/onboarding.md",
          "title": "Onboarding"
        }
      ],
      "path": "DevRel/parliament-docs/master/README.md",
      "title": "Overview"
    },
    {
      "pages": [
      ],
      "path": "DevRel/parliament-docs/master/.github/CONTRIBUTING.md",
      "title": "Contributing"
    }
  ]
}
`
  const parsedContent = fromJson(fileContent)

  expect(parsedContent).toMatchSnapshot()
})

test("missing pages property", () => {
  const fileContent = `
{
  "name": "Parliament Site",
  "view_type": "mdbook",
  "pages": [
    {
      "pages": [
        {
          "path": "DevRel/parliament-docs/master/onboarding.md",
          "title": "Onboarding"
        }
      ],
      "path": "DevRel/parliament-docs/master/README.md",
      "title": "Overview"
    },
    {
      "path": "DevRel/parliament-docs/master/.github/CONTRIBUTING.md",
      "title": "Contributing"
    }
  ]
}
`
  const parsedContent = fromJson(fileContent)

  expect(parsedContent).toMatchSnapshot()
})

test("Valid json but not a navigation file", () => {
  const fileContent = `
{
    "name": "Yaml file",
    "id": "112358",
    "message": "Hello World"
}
`
  const parsedContent = fromJson(fileContent)

  expect(parsedContent).toBeUndefined()
})

test("empty json file content", () => {
  const fileContent = ``

  const parsedContent = fromJson(fileContent)

  expect(parsedContent).toBeUndefined()
})

test("search for a homepage is breadth first", () => {
  const fileContent = `
{
  "name": "Parliament Site",
  "view_type": "mdbook",
  "pages": [
    {
      "pages": [
        {
          "pages": [],
          "path": "DevRel/parliament-docs/master/onboarding.md",
          "title": "Onboarding"
        }
      ],
      "title": "Overview"
    },
    {
      "pages": [
      ],
      "title": "Contributing"
    },
    {
        "pages": [
            {
                "pages": [],
                "path": "not/the/target.md",
                "title": "Not the target"
            }
        ],
        "path": "target/path.md",
        "title": "Target"
    }
  ]
}
`
  const parsedContent = fromJson(fileContent)

  expect(parsedContent.homePage).toBe("target/path.md")
})

test("manifest with tabs", () => {
  const fileContent = `
{
  "name": "Parliament Site",
  "view_type": "mdbook",
  "pages": [
    {
      "pages": [],
      "path": "DevRel/parliament-docs/master/README.md",
      "title": "Overview"
    }
  ],
  "tabs": [
    {
      "title": "foo",
      "path": "foo/"
    },
    {
      "title": "bar",
      "path": "foo/bar"
    }
  ]
}
`
  const parsedContent = fromJson(fileContent)

  expect(parsedContent).toMatchSnapshot()
})

test("manifest without issues", () => {
  const fileContent = `
{
  "name": "Parliament Site",
  "view_type": "mdbook",
  "pages": [
    {
      "pages": [],
      "path": "DevRel/parliament-docs/master/README.md",
      "title": "Overview"
    }
  ],
  "tabs": [
    {
      "title": "foo",
      "path": "foo/"
    },
    {
      "title": "bar",
      "path": "foo/bar"
    }
  ]
}
`
  const parsedContent = fromJson(fileContent)

  expect(parsedContent).toMatchSnapshot()
})

test("manifest with issues", () => {
  const fileContent = `
{
  "name": "Parliament Site",
  "view_type": "mdbook",
  "issues": "https://github.com/adobe/parliament-transformer-navigation/issues",
  "pages": [
    {
      "pages": [],
      "path": "DevRel/parliament-docs/master/README.md",
      "title": "Overview"
    }
  ],
  "tabs": [
    {
      "title": "foo",
      "path": "foo/"
    },
    {
      "title": "bar",
      "path": "foo/bar"
    }
  ]
}
`
  const parsedContent = fromJson(fileContent)

  expect(parsedContent).toMatchSnapshot()
})
