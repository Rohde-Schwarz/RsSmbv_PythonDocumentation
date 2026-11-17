window.WEBHELP=["https://www.rohde-schwarz.com/webhelp/SMBVB_HTML_UserManual_en/Content//subprojects/rs_smbvb_1xev-do/","https://www.rohde-schwarz.com/webhelp/SMBVB_HTML_UserManual_en/Content//subprojects/rs_smbvb_3gpp-fdd/","https://www.rohde-schwarz.com/webhelp/SMBVB_HTML_UserManual_en/Content//subprojects/rs_smbvb_5gnr/","https://www.rohde-schwarz.com/webhelp/SMBVB_HTML_UserManual_en/Content//subprojects/rs_smbvb_avionics/","https://www.rohde-schwarz.com/webhelp/SMBVB_HTML_UserManual_en/Content//subprojects/rs_smbvb_bert/","https://www.rohde-schwarz.com/webhelp/SMBVB_HTML_UserManual_en/Content//subprojects/rs_smbvb_bluetooth_edr/","https://www.rohde-schwarz.com/webhelp/SMBVB_HTML_UserManual_en/Content//subprojects/rs_smbvb_cdma2000/","https://www.rohde-schwarz.com/webhelp/SMBVB_HTML_UserManual_en/Content//subprojects/rs_smbvb_cfr/","https://www.rohde-schwarz.com/webhelp/SMBVB_HTML_UserManual_en/Content//subprojects/rs_smbvb_et_dpd/","https://www.rohde-schwarz.com/webhelp/SMBVB_HTML_UserManual_en/Content//subprojects/rs_smbvb_eutra_lte/","https://www.rohde-schwarz.com/webhelp/SMBVB_HTML_UserManual_en/Content//subprojects/rs_smbvb_frc/","https://www.rohde-schwarz.com/webhelp/SMBVB_HTML_UserManual_en/Content//subprojects/rs_smbvb_gbas/","https://www.rohde-schwarz.com/webhelp/SMBVB_HTML_UserManual_en/Content//subprojects/rs_smbvb_gnss/","https://www.rohde-schwarz.com/webhelp/SMBVB_HTML_UserManual_en/Content//subprojects/rs_smbvb_gsm_edge/","https://www.rohde-schwarz.com/webhelp/SMBVB_HTML_UserManual_en/Content//subprojects/rs_smbvb_ieee802_11/","https://www.rohde-schwarz.com/webhelp/SMBVB_HTML_UserManual_en/Content//subprojects/rs_smbvb_ieee802_15_4/","https://www.rohde-schwarz.com/webhelp/SMBVB_HTML_UserManual_en/Content//subprojects/rs_smbvb_lora/","https://www.rohde-schwarz.com/webhelp/SMBVB_HTML_UserManual_en/Content//subprojects/rs_smbvb_nfc_a_b_f/","https://www.rohde-schwarz.com/webhelp/SMBVB_HTML_UserManual_en/Content//subprojects/rs_smbvb_ofdm/","https://www.rohde-schwarz.com/webhelp/SMBVB_HTML_UserManual_en/Content//subprojects/rs_smbvb_operating/","https://www.rohde-schwarz.com/webhelp/SMBVB_HTML_UserManual_en/Content//subprojects/rs_smbvb_td-scdma/"];
(function () {
  function commandOf(block) {
    var pre = block.querySelector("pre");
    if (!pre) return "";
    var lines = (pre.textContent || "").split("\n");
    var i, line;
    for (i = 0; i < lines.length; i++) {
      line = lines[i].trim();
      if (!line) continue;
      if (line.charAt(0) !== "#" && line.indexOf("//") !== 0) return "";
      return line.replace(/^(?:\/\/|#)\s*(?:SCPI:\s*)?/, "").trim();
    }
    return "";
  }

  function linkLists() {
    var lists = document.querySelectorAll("dl.scpi");
    if (!lists.length) return;
    var blocks = document.querySelectorAll("dl.method, dl.property, dl.attribute, dl.function, dl.csharp");
    var byCommand = {};
    var i, cmd, block;
    for (i = 0; i < blocks.length; i++) {
      block = blocks[i];
      cmd = commandOf(block);
      if (cmd && !byCommand[cmd]) byCommand[cmd] = block;
    }
    var serial = 0;
    for (i = 0; i < lists.length; i++) {
      var items = lists[i].children;
      var j;
      for (j = 0; j < items.length; j++) {
        var dt = items[j];
        if (!dt || dt.tagName !== "DT") continue;
        cmd = (dt.textContent || "").replace(/\s+/g, "");
        block = byCommand[cmd];
        if (!block) continue;
        if (!block.id) {
          serial += 1;
          block.id = "scpi-" + serial;
        }
        var link = document.createElement("a");
        link.className = "scpi-jump";
        link.href = "#" + block.id;
        var node = dt.firstChild;
        while (node && node.nodeType === 3) {
          var next = node.nextSibling;
          link.appendChild(node);
          node = next;
        }
        dt.insertBefore(link, dt.firstChild);
      }
    }
  }

  function addWebHelp() {
    var bases = window.WEBHELP;
    if (!bases || !bases.length) return;
    var items = document.querySelectorAll("dl.scpi > dt");
    var i, dt, raw, cut, base, slot;
    for (i = 0; i < items.length; i++) {
      dt = items[i];
      if (dt.querySelector(".instrument-webhelp")) continue;
      raw = dt.getAttribute("data-h") || "";
      cut = raw.indexOf(",");
      slot = null;
      if (cut >= 1 && cut < raw.length - 1) {
        base = bases[raw.slice(0, cut)];
        if (base) {
          if (base.charAt(base.length - 1) !== "/")
            base += "/";
          slot = document.createElement("a");
          slot.href = base + raw.slice(cut + 1) + ".htm";
          slot.target = "_blank";
          slot.rel = "noopener";
          slot.title = "Instrument web help";
          slot.setAttribute("aria-label", "Instrument web help");
        }
      }
      if (!slot) {
        slot = document.createElement("span");
        slot.setAttribute("aria-hidden", "true");
      }
      slot.className = "instrument-webhelp";
      dt.insertBefore(slot, dt.firstChild);
    }
  }

  function start() {
    linkLists();
    addWebHelp();
  }

  if (document.readyState === "loading")
    document.addEventListener("DOMContentLoaded", start);
  else
    start();
})();
