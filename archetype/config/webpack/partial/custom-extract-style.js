/**
 * A Partial created to not autoprefix the antd design css
 */
const archetype = require("electrode-archetype-react-app/config/archetype");
const Path = require("path");
const webpack = require("webpack");
const glob = require("glob");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CSSSplitPlugin = require("css-split-webpack-plugin").default;
const atImport = require("postcss-import");
const cssnext = require("postcss-cssnext");
const autoprefixer = require("autoprefixer-stylus");
const cssLoader = require.resolve("css-loader");
const styleLoader = require.resolve("style-loader");
const postcssLoader = require.resolve("postcss-loader");
let cssModuleSupport = archetype.webpack.cssModuleSupport;
const cssLoaderOptions =
  "?modules&localIdentName=[local]";
const cssQuery = `${cssLoader}!${postcssLoader}`;
const cssModuleQuery = `${cssLoader}${cssLoaderOptions}!${postcssLoader}`;
const rules = [];
module.exports = function() {
  rules.push(
    {
      _name: `extract-css${cssModuleSupport ? "-modules" : ""}`,
      test: /\.css$/,
      loader: ExtractTextPlugin.extract({
        fallback: styleLoader,
        use: cssModuleSupport ? cssModuleQuery : cssQuery,
        publicPath: ""
      })
    }
  );


  return {

    module: { rules },
    plugins: [
      new ExtractTextPlugin({ filename: "[name].style.css" }),
      process.env.NODE_ENV === "production" && new OptimizeCssAssetsPlugin(),
      /*
       preserve: default: false. Keep the original unsplit file as well.
       Sometimes this is desirable if you want to target a specific browser (IE)
       with the split files and then serve the unsplit ones to everyone else.
       */
      new CSSSplitPlugin({
        size: 4000,
        imports: true,
        preserve: true,
        defer: true
      }),
      new webpack.LoaderOptionsPlugin({
        options: {
          context: Path.resolve(process.cwd(), "src"),
          postcss: () => {
            return cssModuleSupport
              ? [
                atImport,
                cssnext({
                  browsers: ["last 2 versions", "ie >= 9", "> 5%"]
                })
              ]
              : [];
          }
        }
      }),
        /**
         * Fix for global not defined error
         * https://github.com/lodash/lodash/issues/1916#issuecomment-177659991
         */
        process.env.NODE_ENV === "production" && (new webpack.optimize.OccurrenceOrderPlugin(),
            {
                'apply': function(compiler) {
                    compiler.parser.plugin('expression global', function() {
                        this.state.module.addVariable('global', "(function() { return this; }()) || Function('return this')()");
                        return true;
                    });
                }
            }),
    ].filter(x => !!x)
  };
};
