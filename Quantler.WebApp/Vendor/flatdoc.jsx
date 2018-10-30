/*!
 * Flatdoc - (c) 2013, 2014 Rico Sta. Cruz
 * http://ricostacruz.com/flatdoc
 * @license MIT
 */
(function($) {
  var exports = window;

  /**
   * Basic Flatdoc module.
   *
   * The main entry point is `Flatdoc.run()`, which invokes the [Runner].
   *
   *     Flatdoc.run({
   *       fetcher: Flatdoc.github('rstacruz/backbone-patterns');
   *     });
   *
   * These fetcher functions are available:
   *
   *     Flatdoc.github('owner/repo')
   *     Flatdoc.github('owner/repo', 'API.md')
   *     Flatdoc.github('owner/repo', 'API.md', 'branch')
   *     Flatdoc.bitbucket('owner/repo')
   *     Flatdoc.bitbucket('owner/repo', 'API.md')
   *     Flatdoc.bitbucket('owner/repo', 'API.md', 'branch')
   *     Flatdoc.file('http://path/to/url')
   *     Flatdoc.file([ 'http://path/to/url', ... ])
   */

  var Flatdoc = exports.Flatdoc = {};

  /**
   * Creates a runner.
   * See [Flatdoc].
   */

  Flatdoc.run = function(options) {
    $(function() { (new Flatdoc.runner(options)).run(); });
  };

  /**
   * File fetcher function.
   *
   * Fetches a given `url` via AJAX.
   * See [Runner#run()] for a description of fetcher functions.
   */

  Flatdoc.file = function(url) {
    function loadData(locations, response, callback) {

      callback(null, response)
      return;

      if (locations.length === 0) callback(null, response);

      else $.get(locations.shift())
        .fail(function(e) {
          callback(e, null);
        })
        .done(function (data) {
          if (response.length > 0) response += '\n\n';
          response += data;
          loadData(locations, response, callback);
        });
    }

    return function(callback) {
      loadData(url instanceof Array ?
        url : [url], '', callback);
    };
  };

  /**
   * Github fetcher.
   * Fetches from repo `repo` (in format 'user/repo').
   *
   * If the parameter `filepath` is supplied, it fetches the contents of that
   * given file in the repo's default branch. To fetch the contents of
   * `filepath` from a different branch, the parameter `ref` should be
   * supplied with the target branch name.
   *
   * See [Runner#run()] for a description of fetcher functions.
   *
   * See: http://developer.github.com/v3/repos/contents/
   */
  Flatdoc.github = function(opts) {
    if (typeof opts === 'string') {
      opts = {
        repo: arguments[0],
        filepath: arguments[1]
      };
    }
    var url;
    if (opts.filepath) {
      url = 'https://api.github.com/repos/'+opts.repo+'/contents/'+opts.filepath;
    } else {
      url = 'https://api.github.com/repos/'+opts.repo+'/readme';
    }
    var data = {};
    if (opts.token) {
      data.access_token = opts.token;
    }
    if (opts.ref) {
      data.ref = opts.ref;
    }
    return function(callback) {
      $.get(url, data)
        .fail(function(e) { callback(e, null); })
        .done(function(data) {
          var markdown = exports.Base64.decode(data.content);
          callback(null, markdown);
        });
    };
  };

  /**
   * Bitbucket fetcher.
   * Fetches from repo `repo` (in format 'user/repo').
   *
   * If the parameter `filepath` is supplied, it fetches the contents of that
   * given file in the repo.
   *
   * See [Runner#run()] for a description of fetcher functions.
   *
   * See: https://confluence.atlassian.com/display/BITBUCKET/src+Resources#srcResources-GETrawcontentofanindividualfile
   * See: http://ben.onfabrik.com/posts/embed-bitbucket-source-code-on-your-website
   * Bitbucket appears to have stricter restrictions on
   * Access-Control-Allow-Origin, and so the method here is a bit
   * more complicated than for Github
   *
   * If you don't pass a branch name, then 'default' for Hg repos is assumed
   * For git, you should pass 'master'. In both cases, you should also be able
   * to pass in a revision number here -- in Mercurial, this also includes
   * things like 'tip' or the repo-local integer revision number
   * Default to Mercurial because Git users historically tend to use GitHub
   */
  Flatdoc.bitbucket = function(opts) {
    if (typeof opts === 'string') {
      opts = {
        repo: arguments[0],
        filepath: arguments[1],
        branch: arguments[2]
      };
    }
    if (!opts.filepath) opts.filepath = 'readme.md';
    if (!opts.branch) opts.branch = 'default';

    var url = 'https://bitbucket.org/api/1.0/repositories/'+opts.repo+'/src/'+opts.branch+'/'+opts.filepath;

   return function(callback) {
     $.ajax({
      url: url,
      dataType: 'jsonp',
      error: function(xhr, status, error) {
        alert(error);
      },
      success: function(response) {
        var markdown = response.data;
        callback(null, markdown);
      }
  });
};
};

  /**
   * Parser module.
   * Parses a given Markdown document and returns a JSON object with data
   * on the Markdown document.
   *
   *     var data = Flatdoc.parser.parse('markdown source here');
   *     console.log(data);
   *
   *     data == {
   *       title: 'My Project',
   *       content: '<p>This project is a...',
   *       menu: {...}
   *     }
   */

  var Parser = Flatdoc.parser = {};

  /**
   * Parses a given Markdown document.
   * See `Parser` for more info.
   */
  Parser.parse = function(source, highlight) {


    //Parser.setMarkedOptions(highlight);

    var html = $("<div>" + require('html!../Files/readme.html'));
    var h1 = html.find('h1').eq(0);
    var title = h1.text();

    // Mangle content
    Transformer.mangle(html);
    var menu = Transformer.getMenu(html);

    return { title: title, content: html, menu: menu };
  };

  Parser.setMarkedOptions = function(highlight) {

  };

  /**
   * Transformer module.
   * This takes care of any HTML mangling needed.  The main entry point is
   * `.mangle()` which applies all transformations needed.
   *
   *     var $content = $("<p>Hello there, this is a docu...");
   *     Flatdoc.transformer.mangle($content);
   *
   * If you would like to change any of the transformations, decorate any of
   * the functions in `Flatdoc.transformer`.
   */

  var Transformer = Flatdoc.transformer = {};

  /**
   * Takes a given HTML `$content` and improves the markup of it by executing
   * the transformations.
   *
   * > See: [Transformer](#transformer)
   */
  Transformer.mangle = function($content) {
    this.addIDs($content);
    this.buttonize($content);
    this.smartquotes($content);
  };

  /**
   * Adds IDs to headings.
   */

  Transformer.addIDs = function($content) {
    var slugs = ['', '', ''];
    $content.find('h1, h2, h3').each(function() {
      var $el = $(this);
      var num = parseInt(this.nodeName[1]);
      var text = $el.text();
      var slug = Flatdoc.slugify(text);
      if (num > 1) slug = slugs[num - 2] + '-' + slug;
      slugs.length = num - 1;
      slugs = slugs.concat([slug, slug]);
      $el.attr('id', slug);
    });
  };

  /**
   * Returns menu data for a given HTML.
   *
   *     menu = Flatdoc.transformer.getMenu($content);
   *     menu == {
   *       level: 0,
   *       items: [{
   *         section: "Getting started",
   *         level: 1,
   *         items: [...]}, ...]}
   */

  Transformer.getMenu = function($content) {
    var root = {items: [], id: '', level: 0};
    var cache = [root];

    function mkdir_p(level) {
      cache.length = level + 1;
      var obj = cache[level];
      if (!obj) {
        var parent = (level > 1) ? mkdir_p(level-1) : root;
        obj = { items: [], level: level };
        cache = cache.concat([obj, obj]);
        parent.items.push(obj);
      }
      return obj;
    }

    $content.find('h1, h2, h3').each(function() {
      var $el = $(this);
      var level = +(this.nodeName.substr(1));

      var parent = mkdir_p(level-1);

      var obj = { section: $el.text(), items: [], level: level, id: $el.attr('id') };
      parent.items.push(obj);
      cache[level] = obj;
    });

    return root;
  };

  /**
   * Changes "button >" text to buttons.
   */

  Transformer.buttonize = function($content) {
    $content.find('a').each(function() {
      var $a = $(this);

      var m = $a.text().match(/^(.*) >$/);
      if (m) $a.text(m[1]).addClass('button');
    });
  };

  /**
   * Applies smart quotes to a given element.
   * It leaves `code` and `pre` blocks alone.
   */

  Transformer.smartquotes = function ($content) {
    var nodes = getTextNodesIn($content), len = nodes.length;
    for (var i=0; i<len; i++) {
      var node = nodes[i];
      node.nodeValue = quotify(node.nodeValue);
    }
  };

  /**
   * Syntax highlighters.
   *
   * You may add or change more highlighters via the `Flatdoc.highlighters`
   * object.
   *
   *     Flatdoc.highlighters.js = function(code) {
   *     };
   *
   * Each of these functions
   */

  var Highlighters = Flatdoc.highlighters = {};

  /**
   * JavaScript syntax highlighter.
   *
   * Thanks @visionmedia!
   */

  Highlighters.js = Highlighters.javascript = function(code) {
    return code
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/("[^\"]*?")/g, '<span class="string">$1</span>')
      .replace(/('[^\']*?')/g, '<span class="string">$1</span>')
      .replace(/\/\/(.*)/gm, '<span class="comment">//$1</span>')
      .replace(/\/\*(.*)\*\//gm, '<span class="comment">/*$1*/</span>')
      .replace(/(\d+\.\d+)/gm, '<span class="number">$1</span>')
      .replace(/(\d+)/gm, '<span class="number">$1</span>')
      .replace(/\bnew *(\w+)/gm, '<span class="keyword">new</span> <span class="init">$1</span>')
      .replace(/\b(function|new|throw|return|var|if|else)\b/gm, '<span class="keyword">$1</span>');
  };

  Highlighters.html = function(code) {
    return code
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/("[^\"]*?")/g, '<span class="string">$1</span>')
      .replace(/('[^\']*?')/g, '<span class="string">$1</span>')
      .replace(/&lt;!--(.*)--&gt;/g, '<span class="comment">&lt;!--$1--&gt;</span>')
      .replace(/&lt;([^!][^\s&]*)/g, '&lt;<span class="keyword">$1</span>');
  };

  Highlighters.generic = function(code) {
    return code
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/("[^\"]*?")/g, '<span class="string">$1</span>')
      .replace(/('[^\']*?')/g, '<span class="string">$1</span>')
      .replace(/(\/\/|#)(.*)/gm, '<span class="comment">$1$2</span>')
      .replace(/(\d+\.\d+)/gm, '<span class="number">$1</span>')
      .replace(/(\d+)/gm, '<span class="number">$1</span>');
  };

  /**
   * Menu view. Renders menus
   */

  var MenuView = Flatdoc.menuView = function(menu) {
    var $el = $("<ul>");

    function process(node, $parent) {
      var id = node.id || 'root';

      var $li = $('<li>')
        .attr('id', id + '-item')
        .addClass('level-' + node.level)
        .appendTo($parent);

      if (node.section) {
        var $a = $('<a>')
          .html(node.section)
          .attr('id', id + '-link')
          .attr('href', '#' + node.id)
          .addClass('level-' + node.level)
          .appendTo($li);
      }

      if (node.items.length > 0) {
        var $ul = $('<ul>')
          .addClass('level-' + (node.level+1))
          .attr('id', id + '-list')
          .appendTo($li);

        node.items.forEach(function(item) {
          process(item, $ul);
        });
      }
    }

    process(menu, $el);
    return $el;
  };

  /**
   * A runner module that fetches via a `fetcher` function.
   *
   *     var runner = new Flatdoc.runner({
   *       fetcher: Flatdoc.url('readme.txt')
   *     });
   *     runner.run();
   *
   * The following options are available:
   *
   *  - `fetcher` - a function that takes a callback as an argument and
   *    executes that callback when data is returned.
   *
   * See: [Flatdoc.run()]
   */

  var Runner = Flatdoc.runner = function(options) {
    this.initialize(options);
  };

  Runner.prototype.root    = '[role~="flatdoc"]';
  Runner.prototype.menu    = '[role~="flatdoc-menu"]';
  Runner.prototype.title   = '[role~="flatdoc-title"]';
  Runner.prototype.content = '[role~="flatdoc-content"]';

  Runner.prototype.initialize = function(options) {
    $.extend(this, options);
  };

  /**
   * Syntax highlighting.
   *
   * You may define a custom highlight function such as `highlight` from
   * the highlight.js library.
   *
   *     Flatdoc.run({
   *       highlight: function (code, value) {
   *         return hljs.highlight(lang, code).value;
   *       },
   *       ...
   *     });
   *
   */

  Runner.prototype.highlight = function(code, lang) {
    var fn = Flatdoc.highlighters[lang] || Flatdoc.highlighters.generic;
    return fn(code);
  };

  /**
   * Loads the Markdown document (via the fetcher), parses it, and applies it
   * to the elements.
   */

  Runner.prototype.run = function() {
    var doc = this;
    $(doc.root).trigger('flatdoc:loading');
    doc.fetcher(function(err, markdown) {
      var data = Flatdoc.parser.parse(markdown, doc.highlight);
      doc.applyData(data, doc);
      var id = location.hash.substr(1);
      if (id) {
        var el = document.getElementById(id);
        if (el) el.scrollIntoView(true);
      }
      $(doc.root).trigger('flatdoc:ready');
    });
  };

  /**
   * Applies given doc data `data` to elements in object `elements`.
   */

  Runner.prototype.applyData = function(data) {
    var elements = this;

    elements.el('title').html(data.title);
    elements.el('content').html(data.content.find('>*'));
    elements.el('menu').html(MenuView(data.menu));
  };

  /**
   * Fetches a given element from the DOM.
   *
   * Returns a jQuery object.
   * @api private
   */

  Runner.prototype.el = function(aspect) {
    return $(this[aspect], this.root);
  };

  /*
   * Helpers
   */

  // http://stackoverflow.com/questions/298750/how-do-i-select-text-nodes-with-jquery
  function getTextNodesIn(el) {
    var exclude = 'iframe,pre,code';
    return $(el).find(':not('+exclude+')').andSelf().contents().filter(function() {
      return this.nodeType == 3 && $(this).closest(exclude).length === 0;
    });
  }

  // http://www.leancrew.com/all-this/2010/11/smart-quotes-in-javascript/
  function quotify(a) {
    a = a.replace(/(^|[\-\u2014\s(\["])'/g, "$1\u2018");        // opening singles
    a = a.replace(/'/g, "\u2019");                              // closing singles & apostrophes
    a = a.replace(/(^|[\-\u2014\/\[(\u2018\s])"/g, "$1\u201c"); // opening doubles
    a = a.replace(/"/g, "\u201d");                              // closing doubles
    a = a.replace(/\.\.\./g, "\u2026");                         // ellipses
    a = a.replace(/--/g, "\u2014");                             // em-dashes
    return a;
  }

})(window.$);

/*!
 * base64.js
 * http://github.com/dankogai/js-base64
 */
(function(r){"use strict";if(r.Base64)return;var e="2.1.2";var t;if(typeof module!=="undefined"&&module.exports){t=require("buffer").Buffer}var n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";var a=function(r){var e={};for(var t=0,n=r.length;t<n;t++)e[r.charAt(t)]=t;return e}(n);var o=String.fromCharCode;var u=function(r){if(r.length<2){var e=r.charCodeAt(0);return e<128?r:e<2048?o(192|e>>>6)+o(128|e&63):o(224|e>>>12&15)+o(128|e>>>6&63)+o(128|e&63)}else{var e=65536+(r.charCodeAt(0)-55296)*1024+(r.charCodeAt(1)-56320);return o(240|e>>>18&7)+o(128|e>>>12&63)+o(128|e>>>6&63)+o(128|e&63)}};var c=/[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g;var i=function(r){return r.replace(c,u)};var f=function(r){var e=[0,2,1][r.length%3],t=r.charCodeAt(0)<<16|(r.length>1?r.charCodeAt(1):0)<<8|(r.length>2?r.charCodeAt(2):0),a=[n.charAt(t>>>18),n.charAt(t>>>12&63),e>=2?"=":n.charAt(t>>>6&63),e>=1?"=":n.charAt(t&63)];return a.join("")};var h=r.btoa||function(r){return r.replace(/[\s\S]{1,3}/g,f)};var d=t?function(r){return new t(r).toString("base64")}:function(r){return h(i(r))};var v=function(r,e){return!e?d(r):d(r).replace(/[+\/]/g,function(r){return r=="+"?"-":"_"}).replace(/=/g,"")};var g=function(r){return v(r,true)};var l=new RegExp(["[À-ß][-¿]","[à-ï][-¿]{2}","[ð-÷][-¿]{3}"].join("|"),"g");var A=function(r){switch(r.length){case 4:var e=(7&r.charCodeAt(0))<<18|(63&r.charCodeAt(1))<<12|(63&r.charCodeAt(2))<<6|63&r.charCodeAt(3),t=e-65536;return o((t>>>10)+55296)+o((t&1023)+56320);case 3:return o((15&r.charCodeAt(0))<<12|(63&r.charCodeAt(1))<<6|63&r.charCodeAt(2));default:return o((31&r.charCodeAt(0))<<6|63&r.charCodeAt(1))}};var s=function(r){return r.replace(l,A)};var p=function(r){var e=r.length,t=e%4,n=(e>0?a[r.charAt(0)]<<18:0)|(e>1?a[r.charAt(1)]<<12:0)|(e>2?a[r.charAt(2)]<<6:0)|(e>3?a[r.charAt(3)]:0),u=[o(n>>>16),o(n>>>8&255),o(n&255)];u.length-=[0,0,2,1][t];return u.join("")};var C=r.atob||function(r){return r.replace(/[\s\S]{1,4}/g,p)};var b=t?function(r){return new t(r,"base64").toString()}:function(r){return s(C(r))};var B=function(r){return b(r.replace(/[-_]/g,function(r){return r=="-"?"+":"/"}).replace(/[^A-Za-z0-9\+\/]/g,""))};r.Base64={VERSION:e,atob:C,btoa:h,fromBase64:B,toBase64:v,utob:i,encode:v,encodeURI:g,btou:s,decode:B};if(typeof Object.defineProperty==="function"){var S=function(r){return{value:r,enumerable:false,writable:true,configurable:true}};r.Base64.extendString=function(){Object.defineProperty(String.prototype,"fromBase64",S(function(){return B(this)}));Object.defineProperty(String.prototype,"toBase64",S(function(r){return v(this,r)}));Object.defineProperty(String.prototype,"toBase64URI",S(function(){return v(this,true)}))}}})(window);

/*!
 * node-parameterize 0.0.7
 * https://github.com/fyalavuz/node-parameterize
 * Exported as `Flatdoc.slugify`
 */
var downcode
(function(r){var LATIN_MAP={"À":"A","Á":"A","Â":"A","Ã":"A","Ä":"A","Å":"A","Æ":"AE","Ç":"C","È":"E","É":"E","Ê":"E","Ë":"E","Ì":"I","Í":"I","Î":"I","Ï":"I","Ð":"D","Ñ":"N","Ò":"O","Ó":"O","Ô":"O","Õ":"O","Ö":"O","Ő":"O","Ø":"O","Ù":"U","Ú":"U","Û":"U","Ü":"U","Ű":"U","Ý":"Y","Þ":"TH","ß":"ss","à":"a","á":"a","â":"a","ã":"a","ä":"a","å":"a","æ":"ae","ç":"c","è":"e","é":"e","ê":"e","ë":"e","ì":"i","í":"i","î":"i","ï":"i","ð":"d","ñ":"n","ò":"o","ó":"o","ô":"o","õ":"o","ö":"o","ő":"o","ø":"o","ù":"u","ú":"u","û":"u","ü":"u","ű":"u","ý":"y","þ":"th","ÿ":"y"};var LATIN_SYMBOLS_MAP={"©":"(c)"};var GREEK_MAP={"α":"a","β":"b","γ":"g","δ":"d","ε":"e","ζ":"z","η":"h","θ":"8","ι":"i","κ":"k","λ":"l","μ":"m","ν":"n","ξ":"3","ο":"o","π":"p","ρ":"r","σ":"s","τ":"t","υ":"y","φ":"f","χ":"x","ψ":"ps","ω":"w","ά":"a","έ":"e","ί":"i","ό":"o","ύ":"y","ή":"h","ώ":"w","ς":"s","ϊ":"i","ΰ":"y","ϋ":"y","ΐ":"i","Α":"A","Β":"B","Γ":"G","Δ":"D","Ε":"E","Ζ":"Z","Η":"H","Θ":"8","Ι":"I","Κ":"K","Λ":"L","Μ":"M","Ν":"N","Ξ":"3","Ο":"O","Π":"P","Ρ":"R","Σ":"S","Τ":"T","Υ":"Y","Φ":"F","Χ":"X","Ψ":"PS","Ω":"W","Ά":"A","Έ":"E","Ί":"I","Ό":"O","Ύ":"Y","Ή":"H","Ώ":"W","Ϊ":"I","Ϋ":"Y"};var TURKISH_MAP={"ş":"s","Ş":"S","ı":"i","İ":"I","ç":"c","Ç":"C","ü":"u","Ü":"U","ö":"o","Ö":"O","ğ":"g","Ğ":"G"};var RUSSIAN_MAP={"а":"a","б":"b","в":"v","г":"g","д":"d","е":"e","ё":"yo","ж":"zh","з":"z","и":"i","й":"j","к":"k","л":"l","м":"m","н":"n","о":"o","п":"p","р":"r","с":"s","т":"t","у":"u","ф":"f","х":"h","ц":"c","ч":"ch","ш":"sh","щ":"sh","ъ":"","ы":"y","ь":"","э":"e","ю":"yu","я":"ya","А":"A","Б":"B","В":"V","Г":"G","Д":"D","Е":"E","Ё":"Yo","Ж":"Zh","З":"Z","И":"I","Й":"J","К":"K","Л":"L","М":"M","Н":"N","О":"O","П":"P","Р":"R","С":"S","Т":"T","У":"U","Ф":"F","Х":"H","Ц":"C","Ч":"Ch","Ш":"Sh","Щ":"Sh","Ъ":"","Ы":"Y","Ь":"","Э":"E","Ю":"Yu","Я":"Ya"};var UKRAINIAN_MAP={"Є":"Ye","І":"I","Ї":"Yi","Ґ":"G","є":"ye","і":"i","ї":"yi","ґ":"g"};var CZECH_MAP={"č":"c","ď":"d","ě":"e","ň":"n","ř":"r","š":"s","ť":"t","ů":"u","ž":"z","Č":"C","Ď":"D","Ě":"E","Ň":"N","Ř":"R","Š":"S","Ť":"T","Ů":"U","Ž":"Z"};var POLISH_MAP={"ą":"a","ć":"c","ę":"e","ł":"l","ń":"n","ó":"o","ś":"s","ź":"z","ż":"z","Ą":"A","Ć":"C","Ę":"e","Ł":"L","Ń":"N","Ó":"o","Ś":"S","Ź":"Z","Ż":"Z"};var LATVIAN_MAP={"ā":"a","č":"c","ē":"e","ģ":"g","ī":"i","ķ":"k","ļ":"l","ņ":"n","š":"s","ū":"u","ž":"z","Ā":"A","Č":"C","Ē":"E","Ģ":"G","Ī":"i","Ķ":"k","Ļ":"L","Ņ":"N","Š":"S","Ū":"u","Ž":"Z"};var ALL_DOWNCODE_MAPS=new Array;ALL_DOWNCODE_MAPS[0]=LATIN_MAP;ALL_DOWNCODE_MAPS[1]=LATIN_SYMBOLS_MAP;ALL_DOWNCODE_MAPS[2]=GREEK_MAP;ALL_DOWNCODE_MAPS[3]=TURKISH_MAP;ALL_DOWNCODE_MAPS[4]=RUSSIAN_MAP;ALL_DOWNCODE_MAPS[5]=UKRAINIAN_MAP;ALL_DOWNCODE_MAPS[6]=CZECH_MAP;ALL_DOWNCODE_MAPS[7]=POLISH_MAP;ALL_DOWNCODE_MAPS[8]=LATVIAN_MAP;var Downcoder=new Object;Downcoder.Initialize=function(){if(Downcoder.map)return;Downcoder.map={};Downcoder.chars="";for(var i in ALL_DOWNCODE_MAPS){var lookup=ALL_DOWNCODE_MAPS[i];for(var c in lookup){Downcoder.map[c]=lookup[c];Downcoder.chars+=c}}Downcoder.regex=new RegExp("["+Downcoder.chars+"]|[^"+Downcoder.chars+"]+","g")};downcode=function(slug){Downcoder.Initialize();var downcoded="";var pieces=slug.match(Downcoder.regex);if(pieces){for(var i=0;i<pieces.length;i++){if(pieces[i].length==1){var mapped=Downcoder.map[pieces[i]];if(mapped!=null){downcoded+=mapped;continue}}downcoded+=pieces[i]}}else{downcoded=slug}return downcoded};Flatdoc.slugify=function(s,num_chars){s=downcode(s);s=s.replace(/[^-\w\s]/g,"");s=s.replace(/^\s+|\s+$/g,"");s=s.replace(/[-\s]+/g,"-");s=s.toLowerCase();return s.substring(0,num_chars)};})();
