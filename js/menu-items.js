(function (global) {
  var di = {};

  var menuItemsUrlTemplate = "data/menu_items/{{short_name}}.json";
  var menuItemsTitleHtml = "js/snippets/menu-items-title.html";
  var menuItemHtml = "js/snippets/menu-item.html";

  function insertHtml(selector, html) {
    var targetElem = document.querySelector(selector);
    targetElem.innerHTML = html;
  }

  function insertProperty(string, propName, propValue) {
    var propToReplace = "{{" + propName + "}}";
    return string.replace(new RegExp(propToReplace, "g"), propValue);
  }

  function showLoading(selector) {
    var html = "<div class='text-center mt-5'><div class='spinner-border text-warning' role='status'><span class='visually-hidden'>Loading...</span></div></div>";
    insertHtml(selector, html);
  }

  di.loadMenuItems = function (short_name) {
    showLoading("#main-content");
    var url = menuItemsUrlTemplate.replace("{{short_name}}", short_name);
    $ajaxUtils.sendGetRequest(url, buildAndShowMenuItemsHTML);
  };

  function buildAndShowMenuItemsHTML(menuItems) {
    $ajaxUtils.sendGetRequest(menuItemsTitleHtml, function (menuItemsTitleHtml) {
      $ajaxUtils.sendGetRequest(menuItemHtml, function (menuItemHtml) {
        var titleHtml = insertProperty(menuItemsTitleHtml, "name", menuItems.category);
        var itemsHtml = "<div class='row'>";
        for (var i = 0; i < menuItems.menu_items.length; i++) {
          var html = menuItemHtml;
          var item = menuItems.menu_items[i];
          html = insertProperty(html, "short_name", item.short_name);
          html = insertProperty(html, "name", item.name);
          html = insertProperty(html, "description", item.description || "");
          html = insertProperty(html, "price_small", item.price_small != null ? item.price_small : "");
          html = insertProperty(html, "price_large", item.price_large != null ? item.price_large : "");
          itemsHtml += html;
        }
        itemsHtml += "</div>";
        insertHtml("#main-content", titleHtml + itemsHtml);
      }, false);
    }, false);
  }

  global.$di = di;
})(window);
