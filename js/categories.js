(function (global) {
  var dc = {};

  var categoriesUrl = "data/categories.json";
  var categoriesTitleHtml = "js/snippets/categories-title-snippet.html";
  var categoryHtml = "js/snippets/category-snippet.html";

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

  dc.loadMenuCategories = function () {
    showLoading("#main-content");
    $ajaxUtils.sendGetRequest(categoriesUrl, buildAndShowCategoriesHTML);
  };

  function buildAndShowCategoriesHTML(categories) {
    $ajaxUtils.sendGetRequest(categoriesTitleHtml, function (categoriesTitleHtml) {
      $ajaxUtils.sendGetRequest(categoryHtml, function (categoryHtml) {
        var finalHtml = categoriesTitleHtml;
        finalHtml += "<div class='row'>";
        for (var i = 0; i < categories.length; i++) {
          var html = categoryHtml;
          var name = categories[i].name;
          var short_name = categories[i].short_name;
          html = insertProperty(html, "name", name);
          html = insertProperty(html, "short_name", short_name);
          finalHtml += html;
        }
        finalHtml += "</div>";
        insertHtml("#main-content", finalHtml);
      }, false);
    }, false);
  }

  global.$dc = dc;
})(window);
