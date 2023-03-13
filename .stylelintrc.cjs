// @see: https://stylelint.io
module.exports = {
  extends: [
    "stylelint-config-standard", // 配置stylelint拓展插件
    "stylelint-config-prettier", // 配置stylelint和prettier兼容
    "stylelint-config-recess-order", // 配置stylelint css属性书写顺序插件,
  ],
  plugins: ["stylelint-less"], // 配置stylelint less拓展插件
  customSyntax: "postcss-html",
  rules: {
    "alpha-value-notation": "percentage",
    "color-function-notation": "modern",
    "length-zero-no-unit": true,
    "no-duplicate-selectors": false,
    "property-no-vendor-prefix": true,
    "rule-empty-line-before": "always",
    "comment-whitespace-inside": "always",
    "no-invalid-double-slash-comments": false,
    "order/properties-order": null,
    "selector-class-pattern": false,
    "selector-pseudo-class-no-unknown": [
      true,
      {
        ignorePseudoClasses: ["global", "v-deep", "deep"],
      },
    ],
  },
};
