(function () {
  function segment(full) {
    var colon = full.lastIndexOf(":");
    var tail = colon < 0 ? full : full.slice(colon + 1).replace(/^\s+/, "");
    if (!tail) tail = full;
    return tail
      .replace(/(\S)<([A-Za-z0-9_]+)RepCap>/g, "$1 <$2>")
      .replace(/(\S)<([A-Za-z0-9_]+)>/g, "$1 <$2>");
  }

  function textOf(node) {
    return (node.textContent || "").replace(/\s+/g, " ").replace(/^\s+|\s+$/g, "");
  }

  function chipFor(li, label) {
    var link = li.querySelector("a");
    if (link) {
      link.textContent = label;
      link.className = "api-path-chip";
      return link;
    }
    var chip = document.createElement("span");
    chip.className = "api-path-chip";
    chip.textContent = label;
    return chip;
  }

  function reshape() {
    var list = document.querySelector("ul.wy-breadcrumbs");
    if (!list || list.getAttribute("data-api-path") === "1") return;
    var home = list.querySelector("a.icon-home");
    if (home && home.parentNode && home.parentNode.parentNode === list)
      list.removeChild(home.parentNode);

    var items = list.querySelectorAll("li.breadcrumb-item");
    if (!items.length) return;
    if (textOf(items[0]).indexOf("API Structure") < 0 && textOf(items[0]) !== "Instrument API") {
      list.className += " path-plain";
      list.setAttribute("data-api-path", "1");
      return;
    }

    var nodes = [];
    var i, li, fresh, chip;
    for (i = 0; i < items.length; i++) {
      li = items[i];
      fresh = document.createElement("li");
      fresh.className = "api-path-item";
      if (i === items.length - 1) {
        chip = document.createElement("span");
        chip.className = "api-path-chip api-path-current";
        chip.textContent = i === 0 ? "Root" : segment(textOf(li));
        fresh.appendChild(chip);
      } else {
        fresh.appendChild(chipFor(li, i === 0 ? "Root" : segment(textOf(li))));
      }
      nodes.push(fresh);
    }
    while (list.firstChild) list.removeChild(list.firstChild);
    for (i = 0; i < nodes.length; i++) list.appendChild(nodes[i]);
    list.className += " api-path";
    list.setAttribute("data-api-path", "1");
  }

  if (document.readyState === "loading")
    document.addEventListener("DOMContentLoaded", reshape);
  else
    reshape();
})();
