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

const { GraphQLJSON } = require("gatsby/graphql")

const openApiEngineTypes = ["redoc", "swagger-ui", "stoplight"]

const reduceGraphQLToJson = (nodes) => {
  return nodes
    .map(({ id, parent, children, internal, ...rest }) => Object.keys(rest))
    .reduce((a, f) => a.concat(f), [])
    .reduce((o, name) => ({ ...o, [name]: GraphQLJSON }), {})
}

const validateOpenApiEngine = (engine) => {
  return openApiEngineTypes.includes(engine) ? engine : "redoc"
}

module.exports = { reduceGraphQLToJson, validateOpenApiEngine }
