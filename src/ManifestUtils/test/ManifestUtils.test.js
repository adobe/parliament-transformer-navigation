/*
Copyright 2020 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http:www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

const stripManifestPath = require('../index')

const manifest = {
  author: 'Nathan Price',
  base_path: 'https://raw.githubusercontent.com',
  description: 'Analytics',
  meta_description: 'default description',
  meta_keywords: 'adobe, analytics',
  name: 'Analytics',
  pages: [
    {
      importedFileName: 'readme',
      pages: [],
      path: 'AdobeDocs/analytics-1.4-apis/master/README.md',
      title: 'Overview'
    },
    {
      importedFileName: 'getting-started-2',
      pages: [
        {
          importedFileName: 'index',
          pages: [],
          path:
            'AdobeDocs/analytics-1.4-apis/master/docs/reporting-api/index.md',
          title: 'Reporting API'
        },
        {
          importedFileName: 'index',
          pages: [],
          path: 'AdobeDocs/analytics-1.4-apis/master/docs/admin-api/index.md',
          title: 'Admin API'
        },
        {
          importedFileName: 'index',
          pages: [],
          path:
            'AdobeDocs/analytics-1.4-apis/master/docs/live-stream-api/index.md',
          title: 'Live Stream'
        },
        {
          importedFileName: 'index',
          pages: [],
          path:
            'AdobeDocs/analytics-1.4-apis/master/docs/data-feeds-api/index.md',
          title: 'Data Feeds'
        },
        {
          importedFileName: 'index',
          pages: [],
          path:
            'AdobeDocs/analytics-1.4-apis/master/docs/data-sources-api/index.md',
          title: 'Data Sources'
        },
        {
          importedFileName: 'index',
          pages: [],
          path:
            'AdobeDocs/analytics-1.4-apis/master/docs/data-insertion-api/index.md',
          title: 'Data Insertion'
        },
        {
          importedFileName: 'index',
          pages: [],
          path:
            'AdobeDocs/analytics-1.4-apis/master/docs/data-warehouse-api/index.md',
          title: 'Data Warehouse'
        },
        {
          importedFileName: 'index',
          pages: [],
          path:
            'AdobeDocs/analytics-1.4-apis/master/docs/classifications-api/index.md',
          title: 'Classifications'
        },
        {
          importedFileName: 'index',
          pages: [],
          path:
            'AdobeDocs/analytics-1.4-apis/master/docs/calc-metrics-api/index.md',
          title: 'Calculated Metrics'
        },
        {
          importedFileName: 'index',
          pages: [],
          path:
            'AdobeDocs/analytics-1.4-apis/master/docs/segments-api/index.md',
          title: 'Segments'
        },
        {
          importedFileName: 'jwt',
          pages: [],
          path: 'AdobeDocs/analytics-1.4-apis/master/jwt.md',
          title: 'JWT Authentication'
        }
      ],
      path:
        'AdobeDocs/analytics-1.4-apis/blob/master/docs/getting-started/getting-started-2.md',
      title: 'Getting Started'
    },
    {
      importedFileName: 'index',
      pages: [
        {
          importedFileName: 'index',
          pages: [],
          path:
            'AdobeDocs/analytics-1.4-apis/master/docs/recommendations-api/index.md',
          title: 'Legacy Recommendations API'
        },
        {
          importedFileName: 'index',
          pages: [],
          path: 'AdobeDocs/analytics-1.4-apis/master/docs/target-api/index.md',
          title: 'Legacy Target API'
        },
        {
          importedFileName: 'index',
          pages: [],
          path: 'AdobeDocs/analytics-1.4-apis/master/docs/saint-api/index.md',
          title: 'Legacy Saint API'
        },
        {
          importedFileName: 'index',
          pages: [],
          path:
            'AdobeDocs/analytics-1.4-apis/master/docs/reporting-api-1.3/index.md',
          title: 'Legacy Reporting API'
        },
        {
          importedFileName: 'index',
          pages: [],
          path:
            'AdobeDocs/analytics-1.4-apis/master/docs/admin-api-1.3/index.md',
          title: 'Legacy Admin API'
        },
        {
          importedFileName: 'index',
          pages: [],
          path:
            'AdobeDocs/analytics-1.4-apis/master/docs/authentication/index.md',
          title: 'Legacy Authentication'
        }
      ],
      path: 'AdobeDocs/analytics-1.4-apis/docs/APIEOL.md',
      title: 'Legacy 1.3 APIs'
    }
  ],
  publish_date: '11/11/2019',
  show_edit_github_banner: false,
  version: '2.0.0',
  view_type: 'mdbook'
}

describe('stripManifestPath', () => {
  it('is truthy', () => {
    expect(stripManifestPath).toBeTruthy()
  })
  it('empty to return empty', () => {
    expect(stripManifestPath('', { org: 'fake', name: 'path' })).toEqual('')
  })
  it('lower case to work', () => {
    expect(
      stripManifestPath('adobedocs/adobeio-events/master/using.md', {
        org: 'adobedocs',
        name: 'adobeio-events',
        branch: 'master'
      })
    ).toEqual('/using.md')
  })
  it('upper case to work', () => {
    expect(
      stripManifestPath('AdobeDocs/adobeio-events/master/using.md', {
        org: 'AdobeDocs',
        name: 'adobeio-events',
        branch: 'master'
      })
    ).toEqual('/using.md')
  })
  it('mixed case to work', () => {
    expect(
      stripManifestPath('AdobeDocs/adobeio-events/master/using.md', {
        org: 'adobedocs',
        name: 'adobeio-events',
        branch: 'master'
      })
    ).toEqual('/using.md')
  })
  it('reversed mixed case to work', () => {
    expect(
      stripManifestPath('adobedocs/adobeio-events/master/using.md', {
        org: 'AdobeDocs',
        name: 'adobeio-events',
        branch: 'master'
      })
    ).toEqual('/using.md')
  })
  it('no url prefix to leave path unchanged', () => {
    expect(
      stripManifestPath('adobedocs/adobeio-events/master/using.md', {})
    ).toEqual('adobedocs/adobeio-events/master/using.md')
  })
  it('undefined url prefix to leave path unchanged', () => {
    expect(
      stripManifestPath('adobedocs/adobeio-events/master/using.md')
    ).toEqual('adobedocs/adobeio-events/master/using.md')
  })
  it('only repo name is in manifest path all options', () => {
    expect(
      stripManifestPath('stock-api-docs/docs/01-getting-started.md', {
        org: 'adobe',
        name: 'stock-api-docs',
        branch: 'master'
      })
    ).toEqual('/docs/01-getting-started.md')
  })
  it('only repo name is in manifest path missing org', () => {
    expect(
      stripManifestPath('stock-api-docs/docs/01-getting-started.md', {
        name: 'stock-api-docs',
        branch: 'master'
      })
    ).toEqual('/docs/01-getting-started.md')
  })
  it('only repo name is in manifest path missing branch', () => {
    expect(
      stripManifestPath('stock-api-docs/docs/01-getting-started.md', {
        org: 'adobe',
        name: 'stock-api-docs'
      })
    ).toEqual('/docs/01-getting-started.md')
  })
  it('only repo name is in manifest path missing org and branch', () => {
    expect(
      stripManifestPath('stock-api-docs/docs/01-getting-started.md', {
        name: 'stock-api-docs'
      })
    ).toEqual('/docs/01-getting-started.md')
  })
  it('path does not include org, name or branch', () => {
    expect(
      stripManifestPath('/docs/01-getting-started.md', {
        org: 'adobe',
        name: 'stock-api-docs',
        branch: 'master'
      })
    ).toEqual('/docs/01-getting-started.md')
  })
  it('path does not include org, name or branch. No org passed', () => {
    expect(
      stripManifestPath('/docs/01-getting-started.md', {
        name: 'stock-api-docs',
        branch: 'master'
      })
    ).toEqual('/docs/01-getting-started.md')
  })
  it('path does not include org, name or branch', () => {
    expect(
      stripManifestPath('/docs/01-getting-started.md', {
        org: 'adobe',
        branch: 'master'
      })
    ).toEqual('/docs/01-getting-started.md')
  })
  it('path does not include org, name or branch', () => {
    expect(
      stripManifestPath('/docs/01-getting-started.md', {
        org: 'adobe',
        name: 'stock-api-docs'
      })
    ).toEqual('/docs/01-getting-started.md')
  })
  it('path does not include org, name or branch', () => {
    expect(
      stripManifestPath('/docs/01-getting-started.md', {
        org: 'adobe',
        branch: 'master'
      })
    ).toEqual('/docs/01-getting-started.md')
  })
  it('remote link with org in url', () => {
    expect(
      stripManifestPath('https://adobe.io/authentication', {
        org: 'adobe',
        name: 'stock-api-docs',
        branch: 'master'
      })
    ).toEqual('https://adobe.io/authentication')
  })
  it('remote link without org in url', () => {
    expect(
      stripManifestPath('https://adobe.io/authentication', {
        org: 'adobedocs',
        name: 'stock-api-docs',
        branch: 'master'
      })
    ).toEqual('https://adobe.io/authentication')
  })
  it('local reference path without org, repo and branch', () => {
    expect(
      stripManifestPath('README.md', {
        org: 'adobedocs',
        name: 'stock-api-docs',
        branch: 'master'
      })
    ).toEqual('/README.md')
  })
  it('complex local reference path without org, repo and branch', () => {
    expect(
      stripManifestPath('docs/reference/openapi.json', {
        org: 'adobedocs',
        name: 'stock-api-docs',
        branch: 'master'
      })
    ).toEqual('/docs/reference/openapi.json')
  })
  it('complex local reference path leading /', () => {
    expect(
      stripManifestPath('/onboarding.md', {
        org: 'adobedocs',
        name: 'stock-api-docs',
        branch: 'master'
      })
    ).toEqual('/onboarding.md')
  })
})