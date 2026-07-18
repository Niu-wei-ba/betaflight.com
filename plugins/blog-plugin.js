// eslint-disable-next-line @typescript-eslint/no-var-requires
const blogPluginExports = require('@docusaurus/plugin-content-blog');
const { toVersionMetadataProp } = require('@docusaurus/plugin-content-docs/lib/props.js');

const defaultBlogPlugin = blogPluginExports.default;

async function blogPluginExtended(...pluginArgs) {
  const blogPluginInstance = await defaultBlogPlugin(...pluginArgs);

  return {
    // Add all properties of the default blog plugin so existing functionality is preserved
    ...blogPluginInstance,

    // Reuse the Wiki doc route at the site root without a redirect or a separate page implementation.
    allContentLoaded: async function (args) {
      await blogPluginInstance.allContentLoaded?.(args);

      const docsPlugin = args.allContent['docusaurus-plugin-content-docs']?.default;
      const currentVersion = docsPlugin?.loadedVersions.find((version) => version.versionName === 'current');
      const wikiHome = currentVersion?.docs.find((doc) => doc.id === 'wiki/wiki');

      if (!currentVersion || !wikiHome) {
        throw new Error('Unable to create the Wiki home route because the current Wiki document was not loaded.');
      }

      const rootPath = pluginArgs[0].baseUrl;
      const wikiRoute = {
        path: rootPath,
        component: '@theme/DocItem',
        exact: true,
        modules: {
          content: wikiHome.source,
        },
        metadata: {
          sourceFilePath: wikiHome.source,
          lastUpdatedAt: wikiHome.lastUpdatedAt,
        },
        sidebar: wikiHome.sidebar,
      };

      args.actions.addRoute({
        path: rootPath,
        component: '@theme/DocsRoot',
        exact: true,
        routes: [
          {
            path: rootPath,
            component: '@theme/DocVersionRoot',
            exact: true,
            props: {
              version: toVersionMetadataProp('default', currentVersion),
            },
            routes: [
              {
                path: rootPath,
                component: '@theme/DocRoot',
                exact: true,
                routes: [wikiRoute],
              },
            ],
          },
        ],
      });
    },
  };
}

module.exports = {
  ...blogPluginExports,
  default: blogPluginExtended,
};
