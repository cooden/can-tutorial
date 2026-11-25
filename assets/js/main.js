/* ============================================================
   CAN/CANopen 学习站 —— 主交互脚本
   依赖：assets/js/ad.js（广告模块，须在本脚本之前加载）
   ============================================================ */
(function () {
  'use strict';

  /* ---------- 1. 当前页面导航高亮（单页 scroll spy / 多页 pathname） ---------- */
  function highlightNav() {
    var path = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    var isIndex = path === '' || path === 'index.html' || path === 'index.htm';
    var links = document.querySelectorAll('.nav-links a, .sidebar a');

    function clearActive() {
      links.forEach(function (a) { a.classList.remove('active'); });
    }

    if (isIndex && document.querySelectorAll('[data-chapter]').length) {
      /* 融合单页：滚动时高亮当前章节对应的导航链接 */
      var chapters = Array.prototype.slice.call(document.querySelectorAll('[data-chapter]'));
      function update() {
        var y = window.scrollY + 140;
        var current = null;
        chapters.forEach(function (c) { if (c.offsetTop <= y) current = c; });
        clearActive();
        if (!current) {
          links.forEach(function (a) {
            if ((a.getAttribute('href') || '') === '#top') a.classList.add('active');
          });
          return;
        }
        var target = '#' + current.id;
        links.forEach(function (a) {
          if ((a.getAttribute('href') || '') === target) a.classList.add('active');
        });
      }
      window.addEventListener('scroll', update, { passive: true });
      update();
      return;
    }

    /* 多页（如 tools.html）：按文件名匹配（忽略锚点） */
    clearActive();
    links.forEach(function (a) {
      var href = (a.getAttribute('href') || '').split('#')[0].split('/').pop().toLowerCase();
      if (href === path) a.classList.add('active');
    });
  }

  /* ---------- 2. 移动端侧边栏 ---------- */
  function initMobileNav() {
    var toggle = document.querySelector('.nav-toggle');
    var sidebar = document.querySelector('.sidebar');
    var scrim = document.querySelector('.scrim');
    if (!toggle || !sidebar) return;
    function close() { sidebar.classList.remove('open'); scrim && scrim.classList.remove('show'); }
    toggle.addEventListener('click', function () {
      sidebar.classList.toggle('open');
      scrim && scrim.classList.toggle('show');
    });
    scrim && scrim.addEventListener('click', close);
    sidebar.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { if (window.innerWidth <= 900) close(); });
    });
  }

  /* ---------- 3. 回到顶部 ---------- */
  function initToTop() {
    var btn = document.querySelector('.to-top');
    if (!btn) return;
    window.addEventListener('scroll', function () {
      if (window.scrollY > 400) btn.classList.add('show');
      else btn.classList.remove('show');
    });
    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- 4. 广告模块初始化与填充 ---------- */
  function initAds() {
    if (typeof Ad === 'undefined' || !Ad.init) return;

    // ad.js 已内置兄弟站点列表（DEFAULT_SITES），此处仅声明当前站点，
    // 用于过滤掉指向自身的卡片；不在此处传入任何链接，广告模块的链接完全由 ad.js 自身决定。
    Ad.init({ currentSite: 'canopen' });

    function fill(id, type) {
      var node = document.getElementById(id);
      if (node && typeof Ad.slot === 'function') {
        node.appendChild(Ad.slot(type));
      }
    }
    fill('ad-sidebar', 'rectangle');
    fill('ad-bottom', 'rectangle');
  }

  /* ---------- 启动 ---------- */
  document.addEventListener('DOMContentLoaded', function () {
    highlightNav();
    initMobileNav();
    initToTop();
    initAds();
  });
})();
