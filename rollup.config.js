import ts from "@wessberg/rollup-plugin-ts";
import resolve from "@rollup/plugin-node-resolve";
import postcss from "rollup-plugin-postcss";
import autoprefixer from "autoprefixer";
import path from "path";

export default [
  {
    input: "src/index.tsx",
    output: {
      file: "lib/index.js",
      format: "cjs",
      exports: "default"
    },
    plugins: [
      ts(),
      resolve(),
      postcss({
        extract: path.resolve("lib/slider.min.css"),
        minimize: true,
        plugins: [autoprefixer()]
      })
    ],
    external: ["react", "react-dom"]
  }
];
