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

/**
 * Converts an array of manifest-docs.json page objects into a standard
 * format for a parliamentNavigation GraphQL node object.
 *
 * This function calls itself recursively.
 *
 * @param {Object[]} pages
 *
 * @returns {Object[]} A converted array
 */
const stripManifestPath = require("./ManifestUtils")
const { validateOpenApiEngine } = require("./utils")

const convertPages = (pages, gitRepoInfo) => {
  if (pages === undefined) {
    return []
  }

  const convertedPages = pages.map((page) => {
    return {
      title: page.title,
      path: stripManifestPath(page.path, gitRepoInfo),
      pages: convertPages(page.pages, gitRepoInfo),
    }
  })

  return convertedPages
}

/**
 * Converts an array of manifest-docs.json tab objects into a standard
 * format for a parliamentNavigation GraphQL node object.
 *
 * @param {Object[]} tabs
 *
 * @returns {Object[]} A converted array
 */
const convertTabs = (tabs, gitRepoInfo) => {
  if (tabs === undefined) {
    return []
  }

  const convertedTabs = tabs.map((tab) => {
    return {
      title: tab.title,
      path: stripManifestPath(tab.path, gitRepoInfo),
    }
  })

  return convertedTabs
}

/**
 * Get the first defined path from a navigation tree structure.
 * This search is breadth first.
 *
 * @param {Object[]} pages A nested list of page objects
 *
 * @returns {String} The first defined path value encountered.
 */
const getHomePage = (pages) => {
  let found = pages.find((page) => {
    return page.path !== undefined && page.path !== ""
  })

  if (!found) {
    pages.some((page) => {
      found = getHomePage(page.pages)
      return found
    })
  }

  return found.path
}

/**
 * A utility function for converting navigation data from a json file.
 * A json file is identified as having navigation data if it has
 * the view_type property and it is set to "mdbook".
 *
 * @param {String} content The JSON file content
 *
 * @return {Object} The main data for a GraphQL node object
 */
const fromJson = (content, gitRepoInfo) => {
  if (content === "") return

  try {
    const object = JSON.parse(content)

    if (object.view_type !== "mdbook") {
      return
    }

    const { name, pages, tabs, issues = null, openApiEngine = "redoc" } = object

    const convertedPages = convertPages(pages, gitRepoInfo)
    const convertedTabs = convertTabs(tabs, gitRepoInfo)

    const homePage = getHomePage(convertedPages)

    return {
      section: name,
      title: name,
      order: 0,
      issues: issues,
      pages: convertedPages,
      homePage: homePage,
      tabs: convertedTabs,
      openApiEngine: validateOpenApiEngine(openApiEngine),
    }
  } catch (error) {
    // We should probably do something with this error
    return
  }
}

module.exports = fromJson
