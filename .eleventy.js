const { DateTime } = require('luxon');
const readingTime = require('eleventy-plugin-reading-time');
const pluginRss = require('@11ty/eleventy-plugin-rss');
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const Image = require('@11ty/eleventy-img');
const fs = require('fs');
const path = require('path');

const isDev = process.env.APP_ENV === 'development';

const manifestPath = path.resolve(
  __dirname,
  'public',
  'assets',
  'manifest.json'
);

const manifest = isDev
  ? {
      'main.js': '/assets/main.js',
      'main.css': '/assets/main.css',
    }
  : JSON.parse(fs.readFileSync(manifestPath, { encoding: 'utf8' }));

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(readingTime);
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(syntaxHighlight);

  eleventyConfig.addPassthroughCopy('src/favicon.ico');
  eleventyConfig.addPassthroughCopy({ 'src/assets/images': 'images' });
  eleventyConfig.setDataDeepMerge(true);
  eleventyConfig.setBrowserSyncConfig({ files: [manifestPath] });

  eleventyConfig.addNunjucksAsyncShortcode('image', async function (src, alt) {
    if (alt === undefined) {
      // throw an error on missing alt (alt="" works okay)
      throw new Error(`Missing \`alt\` on myImage from: ${src}`);
    }

    let metadata = await Image(src, {
      widths: [null],
      formats: ['jpeg'],
      urlPath: '/images/',
      outputDir: './public/images/',
    });

    let data = metadata.jpeg.pop();
    return `<img src="${data.url}" width="${data.width}" height="${data.height}" alt="${alt}">`;
  });

  eleventyConfig.addNunjucksAsyncShortcode(
    'responsiveimage',
    async function (src, alt, sizes = '100vw') {
      if (alt === undefined) {
        throw new Error(`Missing \`alt\` on myImage from: ${src}`);
      }

      let metadata = await Image(src, {
        widths: [null],
        urlPath: '/images/',
        outputDir: './public/images/',
        formats: ['webp', 'jpeg'],
        filenameFormat: function (id, src, width, format, options) {
          const extension = path.extname(src);
          const name = path.basename(src, extension);

          return `${name}-${width}w.${format}`;
        },
      });

      let lowsrc = metadata.jpeg[0];

      return `<picture>
      ${Object.values(metadata)
        .map((imageFormat) => {
          return `  <source type="image/${
            imageFormat[0].format
          }" srcset="${imageFormat
            .map((entry) => entry.srcset)
            .join(', ')}" sizes="${sizes}">`;
        })
        .join('\n')}
        <img
          src="${lowsrc.url}"
          width="${lowsrc.width}"
          height="${lowsrc.height}"
          alt="${alt}">
      </picture>`;
    }
  );

  eleventyConfig.addShortcode('bundledcss', function () {
    return manifest['main.css']
      ? `<link href="${manifest['main.css']}" rel="stylesheet" />`
      : '';
  });

  eleventyConfig.addShortcode('bundledjs', function () {
    return manifest['main.js']
      ? `<script src="${manifest['main.js']}"></script>`
      : '';
  });

  eleventyConfig.addFilter('excerpt', (post) => {
    const content = post.replace(/(<([^>]+)>)/gi, '');
    return content.substr(0, content.lastIndexOf(' ', 200)) + '...';
  });

  eleventyConfig.addFilter('readableDate', (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat(
      'dd LLL yyyy'
    );
  });

  eleventyConfig.addFilter('htmlDateString', (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat('yyyy-LL-dd');
  });

  eleventyConfig.addFilter('head', (array, n) => {
    if (n < 0) {
      return array.slice(n);
    }

    return array.slice(0, n);
  });

  eleventyConfig.addCollection('tagList', function (collection) {
    let tagSet = new Set();
    collection.getAll().forEach(function (item) {
      if ('tags' in item.data) {
        let tags = item.data.tags;

        tags = tags.filter(function (item) {
          switch (item) {
            case 'all':
            case 'nav':
            case 'post':
            case 'posts':
              return false;
          }

          return true;
        });

        for (const tag of tags) {
          tagSet.add(tag);
        }
      }
    });

    return [...tagSet];
  });

  eleventyConfig.addFilter('pageTags', (tags) => {
    const generalTags = ['all', 'nav', 'post', 'posts'];

    return tags
      .toString()
      .split(',')
      .filter((tag) => {
        return !generalTags.includes(tag);
      });
  });

  return {
    dir: {
      input: 'src',
      output: 'public',
      includes: 'includes',
      data: 'data',
      layouts: 'layouts',
      passthroughFileCopy: true,
      templateFormats: ['html', 'njk', 'md'],
      htmlTemplateEngine: 'njk',
      markdownTemplateEngine: 'njk',
    },
  };
};
