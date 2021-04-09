## 注意
```js
// 项目报错
// ×  D:\front\react-test\react-source-study\parcel-bundler\simple\index.js: function __clone() {
// 解决办法
// \node_modules\@babel\core\lib\transformation\util\clone-deep.js
function _default(value) {
  if (v8.deserialize && v8.serialize) {
    return Object.assign({}, value)
    // return v8.deserialize(v8.serialize(value));
  }

  return (0, _cloneDeepBrowser.default)(value);
}
```