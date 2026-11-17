(function () {
  var here = document.currentScript.src.split("?")[0];
  var base = here.slice(0, here.lastIndexOf("/") + 1);
  var files = ["jquery.js?v=5d32c60e", "_sphinx_javascript_frameworks_compat.js?v=2cd50e6c", "documentation_options.js?v=2a5c1155", "doctools.js?v=9bcbadda", "sphinx_highlight.js?v=dc90522c", "clipboard.min.js?v=a7894cd8", "copybutton.js?v=f281be69", "scpi-jump.js?v=b5fdd09b", "page-path.js?v=9233e019", "type-hint.js?v=a6b911f4", "js/theme.js"];
  for (var i = 0; i < files.length; i++)
    document.write('<script src="' + base + files[i] + '"><\/script>');
})();
