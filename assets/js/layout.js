/* ============================================================
   公共布局注入（头部导航 / 侧边栏目录 / 页脚）
   页面只需提供 <header id="site-header">、<aside id="sidebar">、
   <footer id="site-footer"> 容器即可。
   ============================================================ */
(function () {
  'use strict';

  /* 融合单页：前 6 章在 index.html 内用锚点跳转，tools.html 保持独立页 */
  var CHAPTER_ANCHOR = {
    'can-basics': 'ch1',
    'can-framing': 'ch2',
    'canopen': 'ch3',
    'object-dictionary': 'ch4',
    'communication': 'ch5',
    'devices': 'ch6'
  };

  function isIndexPage() {
    var name = (location.pathname.split('/').pop() || '').toLowerCase();
    return name === '' || name === 'index.html' || name === 'index.htm';
  }

  function linkFor(file) {
    if (file === 'index.html') return isIndexPage() ? '#top' : 'index.html';
    if (file === 'tools.html') return 'tools.html';
    var key = file.replace(/\.html$/, '');
    if (CHAPTER_ANCHOR[key]) {
      return isIndexPage() ? '#' + CHAPTER_ANCHOR[key] : 'index.html#' + CHAPTER_ANCHOR[key];
    }
    return file;
  }

  var NAV = [
    { href: 'index.html', label: '首页' },
    { href: 'can-basics.html', label: 'CAN 基础' },
    { href: 'can-framing.html', label: '帧格式' },
    { href: 'canopen.html', label: 'CANopen' },
    { href: 'object-dictionary.html', label: '对象字典' },
    { href: 'communication.html', label: '通信对象' },
    { href: 'devices.html', label: '设备协议' },
    { href: 'tools.html', label: '工具速查' }
  ];

  var SIDEBAR = [
    {
      title: '入门',
      items: [
        { href: 'index.html', label: '学习路线与首页' }
      ]
    },
    {
      title: 'CAN 总线',
      items: [
        { href: 'can-basics.html', label: '1. CAN 基础与物理层' },
        { href: 'can-framing.html', label: '2. 帧格式、时序与错误' }
      ]
    },
    {
      title: 'CANopen 协议',
      items: [
        { href: 'canopen.html', label: '3. CANopen 概述' },
        { href: 'object-dictionary.html', label: '4. 对象字典 (OD)' },
        { href: 'communication.html', label: '5. 通信对象 (SDO/PDO/NMT)' },
        { href: 'devices.html', label: '6. 设备子协议与 EDS/DCF' },
        { href: 'tools.html', label: '7. 工具与参数速查' }
      ]
    }
  ];

  function headerHTML() {
    var links = NAV.map(function (n) {
      return '<a href="' + linkFor(n.href) + '">' + n.label + '</a>';
    }).join('');
    return '' +
      '<div class="nav-inner">' +
        '<a class="brand" href="' + linkFor('index.html') + '">' +
          '<span class="logo">C</span>CAN / CANopen' +
        '</a>' +
        '<nav class="nav-links">' + links + '</nav>' +
        '<button class="nav-export" id="export-all-btn" type="button">导出全部 TXT</button>' +
        '<button class="nav-toggle" aria-label="菜单">☰</button>' +
      '</div>';
  }

  function sidebarHTML() {
    var html = '';
    SIDEBAR.forEach(function (group) {
      html += '<h3>' + group.title + '</h3><ul>';
      group.items.forEach(function (it) {
        html += '<li><a href="' + linkFor(it.href) + '">' + it.label + '</a></li>';
      });
      html += '</ul>';
    });
    // 侧边栏广告位容器
    html += '<div id="ad-sidebar" style="margin-top:16px"></div>';
    return html;
  }

  function footerHTML() {
    return '' +
      '<div class="footer-inner">' +
        '<div>© 2026 CAN / CANopen 学习站 · 基于 CiA 301 / ISO 11898 整理</div>' +
        '<div><a href="' + linkFor('index.html') + '">首页</a> · <a href="' + linkFor('tools.html') + '">速查表</a> · <a href="' + linkFor('canopen.html') + '">CANopen</a></div>' +
      '</div>';
  }

  function set(id, html) {
    var el = document.getElementById(id);
    if (el) el.innerHTML = html;
  }

  document.addEventListener('DOMContentLoaded', function () {
    set('site-header', headerHTML());
    set('sidebar', sidebarHTML());
    set('site-footer', footerHTML());
  });
})();
