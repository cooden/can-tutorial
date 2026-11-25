/* ============================================================
   章节练习题：题库数据 + 渲染 + 答题保存(localStorage) + 导出 TXT
   支持两种题型：choice（单选）/ text（填空）
   各章题量不同，覆盖全章核心知识点
   ============================================================ */
(function () {
  'use strict';

  /* ---------- 题库：key 对应页面文件名（去掉 .html） ---------- */
  var EXERCISES = {

    /* ============ 第 1 章 CAN 基础与物理层 ============ */
    'can-basics': {
      title: '第 1 章 · CAN 基础与物理层',
      questions: [
        { type: 'choice', q: 'CAN 总线的“显性”电平对应的逻辑值是？', options: ['0', '1', '高阻态', '不确定'], answer: 'A' },
        { type: 'choice', q: 'CAN 总线两端终端电阻的标准阻值是？', options: ['60 Ω', '100 Ω', '120 Ω', '240 Ω'], answer: 'C' },
        { type: 'choice', q: 'CAN 2.0B 扩展帧的标识符长度是？', options: ['11 位', '16 位', '29 位', '32 位'], answer: 'C' },
        { type: 'choice', q: 'CAN FD 相比经典 CAN，最大数据场长度提升到？', options: ['8 字节', '16 字节', '32 字节', '64 字节'], answer: 'D' },
        { type: 'choice', q: 'CAN 总线推荐采用的拓扑结构是？', options: ['星型', '环型', '线性（总线）型', '树型'], answer: 'C' }
      ]
    },

    /* ============ 第 2 章 帧格式、位时序与错误 ============ */
    'can-framing': {
      title: '第 2 章 · 帧格式、位时序与错误',
      questions: [
        { type: 'choice', q: 'CAN 标准数据帧的标识符（ID）长度是？', options: ['11 位', '29 位', '8 位', '16 位'], answer: 'A' },
        { type: 'choice', q: '错误主动（Error Active）节点发送的错误标志是？', options: ['6 个连续显性位', '6 个连续隐性位', '8 个显性位', '12 个隐性位'], answer: 'A' },
        { type: 'choice', q: '发送错误计数器 TEC 达到多少时，节点进入 Bus-Off 状态？', options: ['127', '128', '255', '256'], answer: 'D' },
        { type: 'choice', q: '帧间空间（Intermission）由多少个隐性位组成？', options: ['2', '3', '5', '7'], answer: 'B' },
        { type: 'choice', q: 'CAN 位时序中，采样点（Sample Point）通常设置在？', options: ['位起始处', '位时间约 50% 处', '位时间约 80%–90% 处', '位结束处'], answer: 'C' },
        { type: 'choice', q: '用于区分标准帧与扩展帧的控制位是？', options: ['RTR', 'IDE', 'SRR', 'DLC'], answer: 'B' }
      ]
    },

    /* ============ 第 3 章 CANopen 概述 ============ */
    'canopen': {
      title: '第 3 章 · CANopen 概述',
      questions: [
        { type: 'choice', q: 'CANopen 中 NMT 报文的 COB-ID 是？', options: ['0x000', '0x700 + NodeID', '0x600 + NodeID', '0x180 + NodeID'], answer: 'A' },
        { type: 'choice', q: 'CANopen 节点上电后，NMT 状态机的第一个状态是？', options: ['Initialisation', 'Pre-operational', 'Operational', 'Stopped'], answer: 'A' },
        { type: 'choice', q: 'COB-ID 与 CAN 标识符（CAN ID）的关系是？', options: ['二者无关', 'COB-ID 就是 CAN 标识符', 'COB-ID 是 IP 地址', 'COB-ID 只用于 PDO'], answer: 'B' },
        { type: 'choice', q: 'CANopen 节点 Node-ID 的常用取值范围是？', options: ['0–15', '1–127', '0–255', '1–1024'], answer: 'B' },
        { type: 'choice', q: '下列哪个属于 CANopen 的过程数据对象？', options: ['SDO', 'PDO', 'NMT', 'LSS'], answer: 'B' },
        { type: 'choice', q: '要让节点进入 Operational 状态，应发送的 NMT 命令是？', options: ['Start Node', 'Stop Node', 'Enter Pre-operational', 'Reset Node'], answer: 'A' },
        { type: 'text', q: 'CANopen 的对象字典（OD）在整个协议栈中扮演什么角色？' },
        { type: 'text', q: 'CANopen 有哪些主要的通信对象？请列举并简述其用途。' },
        { type: 'text', q: 'NMT 状态机中，节点上电后依次经历哪些状态？简述每个状态的含义。' },
        { type: 'text', q: 'Pre-operational 和 Operational 状态下，节点在通信能力上有什么区别？' },
        { type: 'text', q: 'CANopen 的设备子协议（如 CiA 402）解决了什么问题？为什么需要它？' },
        { type: 'text', q: '为什么说 CANopen 是“基于对象字典”的通信？请举一个例子说明。' }
      ]
    },

    /* ============ 第 4 章 对象字典 ============ */
    'object-dictionary': {
      title: '第 4 章 · 对象字典 (OD)',
      questions: [
        { type: 'choice', q: '对象字典中索引 0x1000 表示的对象是？', options: ['Device Type', 'Identity Object', 'Producer Heartbeat Time', 'Pre-defined Error Field'], answer: 'A' },
        { type: 'choice', q: 'UNSIGNED16 数据类型占用的字节数是？', options: ['1', '2', '4', '8'], answer: 'B' },
        { type: 'choice', q: '在对象字典中精确定位一个对象需要？', options: ['仅索引', '仅子索引', '索引 + 子索引', '节点 ID'], answer: 'C' },
        { type: 'choice', q: '索引 0x1017（心跳生产时间）设置为 0 表示？', options: ['心跳周期 0 ms', '不生产心跳报文', '心跳最快速度', '禁用该节点'], answer: 'B' },
        { type: 'choice', q: '对象字典中，用于存放“一组相同类型元素”的对象类别是？', options: ['VAR', 'ARRAY', 'RECORD', 'STRING'], answer: 'B' },
        { type: 'choice', q: '索引 0x1018 对应的对象是？', options: ['设备类型', '厂商标识对象 Identity', '预定义错误域', '心跳时间'], answer: 'B' },
        { type: 'text', q: '对象字典中“索引”和“子索引”分别是什么？它们如何共同定位一个对象？' },
        { type: 'text', q: '对象字典的数据类型 UNSIGNED8 / UNSIGNED16 / UNSIGNED32 分别占几个字节？' },
        { type: 'text', q: '索引 0x1000（Device Type）的作用是什么？' },
        { type: 'text', q: '索引 0x1018（Identity Object）包含哪些常用子索引？各自表示什么？' },
        { type: 'text', q: '索引 0x1003（Pre-defined Error Field）的作用是什么？' },
        { type: 'text', q: '对象字典的对象类别 VAR、ARRAY、RECORD 分别适用于什么场景？' }
      ]
    },

    /* ============ 第 5 章 通信对象 ============ */
    'communication': {
      title: '第 5 章 · 通信对象 (SDO/PDO/NMT)',
      questions: [
        { type: 'choice', q: 'Node-ID = 1 的节点，其 TPDO1 的 COB-ID 是？', options: ['0x181', '0x201', '0x281', '0x381'], answer: 'A' },
        { type: 'choice', q: 'SDO 加速传输适用于数据长度不超过多少字节的对象？', options: ['2 字节', '4 字节', '8 字节', '64 字节'], answer: 'B' },
        { type: 'choice', q: 'SYNC 同步报文的 COB-ID 是？', options: ['0x080', '0x100', '0x700', '0x000'], answer: 'A' },
        { type: 'choice', q: '紧急报文（EMCY）的 COB-ID 是？', options: ['0x080', '0x700 + NodeID', '0x080 + NodeID', '0x180 + NodeID'], answer: 'C' },
        { type: 'choice', q: '心跳报文（Heartbeat）的 COB-ID 是？', options: ['0x700 + NodeID', '0x600 + NodeID', '0x580 + NodeID', '0x180 + NodeID'], answer: 'A' },
        { type: 'choice', q: 'SDO 客户端发起“写（Download）”请求时，命令字节可能是？', options: ['0x2F / 0x2B / 0x23', '0x40', '0x60', '0x80'], answer: 'A' },
        { type: 'text', q: 'SDO 和 PDO 的核心区别是什么？它们分别适用于什么场景？' },
        { type: 'text', q: 'SDO 的“加速传输”和“分段传输”分别在什么情况下使用？' },
        { type: 'text', q: 'SDO 客户端发起读请求（Upload）和写请求（Download）的命令字节分别是多少？' },
        { type: 'text', q: 'PDO 的通信参数和映射参数分别存放在对象字典的哪些索引段？' },
        { type: 'text', q: 'NMT 报文的 COB-ID 是多少？它的目标节点如何指定（广播还是单播）？' },
        { type: 'text', q: 'SYNC 报文的作用是什么？它如何触发 PDO 的同步发送？' }
      ]
    }
  };

  /* ---------- 工具函数 ---------- */
  var STORAGE_PREFIX = 'canopen_ex_';
  var LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];

  function currentPageKey() {
    var name = (location.pathname.split('/').pop() || '').replace(/\.html$/i, '');
    return name;
  }

  function saveAnswer(qid, val) {
    try { localStorage.setItem(STORAGE_PREFIX + qid, val); } catch (e) {}
  }
  function loadAnswer(qid) {
    try { return localStorage.getItem(STORAGE_PREFIX + qid) || ''; } catch (e) { return ''; }
  }

  function pad(n) { return n < 10 ? '0' + n : '' + n; }
  function nowStr() {
    var d = new Date();
    return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()) +
      ' ' + pad(d.getHours()) + ':' + pad(d.getMinutes()) + ':' + pad(d.getSeconds());
  }
  function safeFileName(s) { return s.replace(/[\\/:*?"<>|]/g, '_'); }

  /* 判断题目类型：兼容旧字符串题型 */
  function qType(item) {
    if (typeof item === 'string') return 'text';
    return item.type || 'text';
  }
  function qText(item) { return typeof item === 'string' ? item : item.q; }

  /* ---------- 构造单章 TXT 内容 ---------- */
  function buildChapterText(key) {
    var ch = EXERCISES[key];
    if (!ch) return '';
    var lines = [];
    lines.push('==================================================');
    lines.push(' CAN / CANopen 学习站 · 练习答题');
    lines.push(' 章节：' + ch.title);
    lines.push(' 导出时间：' + nowStr());
    lines.push('==================================================');
    lines.push('');
    ch.questions.forEach(function (item, i) {
      var qid = key + '_' + (i + 1);
      var t = qType(item);
      var ans = loadAnswer(qid);
      lines.push((i + 1) + '. ' + qText(item));
      if (t === 'choice' && item.options) {
        item.options.forEach(function (opt, j) {
          lines.push('   ' + LETTERS[j] + '. ' + opt);
        });
        lines.push('   你的选择：' + (ans ? ans : '（未作答）'));
      } else {
        lines.push('   你的答案：' + (ans ? ans : '（未作答）'));
      }
      lines.push('');
    });
    return lines.join('\r\n');
  }

  /* ---------- 触发下载 ---------- */
  function downloadTxt(filename, text) {
    var blob = new Blob(['\uFEFF' + text], { type: 'text/plain;charset=utf-8' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url; a.download = filename;
    document.body.appendChild(a); a.click();
    document.body.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
  }
  function exportChapter(key) {
    var ch = EXERCISES[key];
    if (!ch) return;
    downloadTxt(safeFileName(ch.title) + '-练习答题.txt', buildChapterText(key));
  }
  function exportAll() {
    var keys = Object.keys(EXERCISES);
    var parts = [];
    keys.forEach(function (key) {
      var txt = buildChapterText(key);
      if (txt) parts.push(txt);
    });
    downloadTxt('全部练习答题.txt', parts.join('\r\n\r\n\r\n'));
  }

  /* ---------- 渲染练习区 ---------- */
  function render(key, scope) {
    var ch = EXERCISES[key];
    if (!ch) return false;
    var root = scope || document;
    /* 精确定位“本章小结”callout 作为插入点：优先匹配 callout-title 文本为“本章小结”的
       .callout.tip，避免章节中间的示例/提示框（也是 .callout.tip）被误判为插入点 */
    var tips = root.querySelectorAll('.callout.tip');
    var summary = null;
    for (var i = tips.length - 1; i >= 0; i--) {
      var t = tips[i].querySelector('.callout-title');
      if (t && t.textContent.trim() === '本章小结') { summary = tips[i]; break; }
    }
    if (!summary) summary = tips.length ? tips[tips.length - 1] : null;
    if (!summary) return false;

    var wrap = document.createElement('section');
    wrap.className = 'exercises';
    wrap.id = scope ? 'exercises-' + key : 'exercises';

    var html = '<h2 class="exercises-title">本章练习</h2>';
    html += '<p class="exercises-desc">共 ' + ch.questions.length + ' 题（选择题 + 填空题）。作答自动保存到本浏览器，完成后可导出为 TXT 提交。</p>';
    html += '<ol class="exercises-list">';
    ch.questions.forEach(function (item, i) {
      var qid = key + '_' + (i + 1);
      var t = qType(item);
      html += '<li class="ex-item ex-' + t + '">';
      html += '<div class="ex-q">' + (i + 1) + '. ' + qText(item);
      if (t === 'choice') html += ' <span class="ex-tag">单选</span>';
      else html += ' <span class="ex-tag">填空</span>';
      html += '</div>';
      if (t === 'choice' && item.options) {
        html += '<div class="ex-options">';
        item.options.forEach(function (opt, j) {
          var letter = LETTERS[j];
          html += '<label class="ex-opt"><input type="radio" name="' + qid + '" value="' + letter + '"><span class="ex-opt-letter">' + letter + '</span><span>' + opt + '</span></label>';
        });
        html += '</div>';
      } else {
        html += '<textarea class="ex-input" data-qid="' + qid + '" rows="3" placeholder="在此输入你的答案…"></textarea>';
      }
      html += '</li>';
    });
    html += '</ol>';
    html += '<div class="ex-actions">' +
      '<button type="button" class="btn btn-primary ex-export-chapter">导出本章 TXT</button>' +
      '<span class="ex-hint">提示：顶部「导出全部 TXT」可把所有章节合并为一个 TXT 一次下载。</span>' +
      '</div>';
    wrap.innerHTML = html;
    summary.parentNode.insertBefore(wrap, summary.nextSibling);

    /* 恢复答案 + 绑定保存 */
    wrap.querySelectorAll('.ex-input').forEach(function (ta) {
      ta.value = loadAnswer(ta.getAttribute('data-qid'));
      ta.addEventListener('input', function () { saveAnswer(ta.getAttribute('data-qid'), ta.value); });
    });
    wrap.querySelectorAll('input[type=radio]').forEach(function (rb) {
      var qid = rb.name;
      if (loadAnswer(qid) === rb.value) rb.checked = true;
      rb.addEventListener('change', function () { saveAnswer(qid, rb.value); });
    });

    var btn = wrap.querySelector('.ex-export-chapter');
    if (btn) btn.addEventListener('click', function () { exportChapter(key); });
    return true;
  }

  /* ---------- 初始化 ---------- */
  function init() {
    var sections = document.querySelectorAll('[data-chapter]');
    if (sections.length) {
      /* 融合单页：遍历每章，在该章小结后渲染对应练习 */
      sections.forEach(function (sec) {
        var key = sec.getAttribute('data-chapter');
        if (EXERCISES[key]) render(key, sec);
      });
    } else {
      var key = currentPageKey();
      if (EXERCISES[key]) render(key);
    }
    var allBtn = document.getElementById('export-all-btn');
    if (allBtn) allBtn.addEventListener('click', exportAll);
  }

  window.ExerciseApp = { init: init, exportChapter: exportChapter, exportAll: exportAll, EXERCISES: EXERCISES };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
