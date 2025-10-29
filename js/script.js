(function (global) {
  document.addEventListener('DOMContentLoaded', function () {
    var homeLink = document.getElementById('homeLink');
    var menuLink = document.getElementById('menuLink');

    function loadHome() {
      $ajaxUtils.sendGetRequest('js/snippets/home-snippet.html', function (homeHtml) {
        document.querySelector('#main-content').innerHTML = homeHtml;
      }, false);
      setActiveNav('homeLink');
    }

    function setActiveNav(activeId) {
      var ids = ['homeLink', 'menuLink'];
      ids.forEach(function (id) {
        var el = document.getElementById(id);
        if (el) {
          if (id === activeId) el.classList.add('active');
          else el.classList.remove('active');
        }
      });
    }

    homeLink.addEventListener('click', function (event) {
      event.preventDefault();
      loadHome();
    });

    menuLink.addEventListener('click', function (event) {
      event.preventDefault();
      $dc.loadMenuCategories();
      setActiveNav('menuLink');
    });

    // Load home on start
    loadHome();

    // Delegate clicks on dynamically generated category cards and menu items
    document.addEventListener('click', function (e) {
      var target = e.target;
      // category button or any element with data-category-short
      while (target && target !== document) {
        if (target.getAttribute && target.getAttribute('data-category-short')) {
          var short = target.getAttribute('data-category-short');
          e.preventDefault();
          $di.loadMenuItems(short);
          setActiveNav('menuLink');
          return;
        }
        target = target.parentNode;
      }
      // menu item short click (optional): elements with data-item-short
      target = e.target;
      while (target && target !== document) {
        if (target.getAttribute && target.getAttribute('data-item-short')) {
          // Here we could show a modal or details; for assignment we'll just prevent default
          e.preventDefault();
          return;
        }
        target = target.parentNode;
      }
    });

  });
})(window);
