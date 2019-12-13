/*
 将 html 解析为适用于小程序 rich-text 的 DOM 结构
 github地址：https://github.com/jin-yufeng/Parser
 文档地址：https://jin-yufeng.github.io/Parser
 author：JinYufeng
*/
const CssHandler = require("./CssHandler.js");
const config = require("./config.js");
var emoji;
try {
  emoji = require("./emoji.js")
} catch (e) {};

function isBlankChar(c) {
  if (c == undefined) return false;
  return c == ' ' || c == '\t' || c == '\r' || c == '\n' || c == '\v' || c == '\f';
};
class MpHtmlParser {
  constructor(data, options = {}, cb) {
    this.cb = cb;
    this.CssHandler = new CssHandler(options.tagStyle);
    this.data = data;
    this.DOM = [];
    this.imgList = [];
    this.title = '';
    this._attrName = '';
    this._attrValue = '';
    this._attrs = {};
    this._domain = options.domain;
    this._protocol = options.domain ? (options.domain.includes("://") ? this._domain.split("://")[0] : "http") : undefined;
    this._i = 0;
    this._sectionStart = 0;
    this._stateHandler = this.TextHandler;
    this._STACK = [];
    this._tagName = '';
    this._audioNum = 0;
    this._videoNum = 0;
    this._useAnchor = options.useAnchor;
    this._whiteSpace = false;
  };
  parse() {
    if (this.CssHandler) this.data = this.CssHandler.getStyle(this.data);
    for (; this._i < this.data.length; this._i++)
      this._stateHandler(this.data[this._i]);
    if (this._stateHandler == this.TextHandler) this.setText();
    while (this._STACK.length)
      this.popNode(this._STACK.pop());
    var res = {
      title: this.title,
      nodes: this.DOM,
      imgList: this.imgList
    };
    if (this.cb)
      this.cb(res)
    else return res;
  };
  TextHandler(c) {
    if (c == '<') {
      var next = this.data[this._i + 1];
      if ((next >= 'a' && next <= 'z') || (next >= 'A' && next <= 'Z')) {
        this.setText();
        this._stateHandler = this.TagNameHandler;
      } else if (next == '/') {
        this.setText();
        this._i++;
        next = this.data[this._i + 1];
        if ((next >= 'a' && next <= 'z') || (next >= 'A' && next <= 'Z')) {
          this._sectionStart = this._i + 1;
          this._stateHandler = this.EndTagHandler;
        } else
          this._stateHandler = this.CommentHandler;
      } else if (next == '!') {
        this.setText();
        this._stateHandler = this.CommentHandler;
      }
    }
  };
  CommentHandler() {
    if (this.data.substring(this._i + 1, this._i + 3) == "--" || this.data.substring(this._i + 1, this._i + 7) == "[CDATA[") {
      this._i = this.data.indexOf("-->", this._i + 1);
      if (this._i == -1) return this._i = this.data.length;
      else this._i = this._i + 2;
    } else {
      this._i = this.data.indexOf(">", this._i + 1);
      if (this._i == -1) return this._i = this.data.length;
    }
    this._sectionStart = this._i + 1;
    this._stateHandler = this.TextHandler;
  };
  TagNameHandler(c) {
    if (isBlankChar(c)) {
      this._tagName = this.getSelection(true);
      if (this.checkClose()) this.setNode();
      else this._stateHandler = this.AttrNameHandler;
    } else if (this.checkClose()) {
      this._tagName = this.getSelection();
      this.setNode();
    }
  };
  AttrNameHandler(c) {
    if (isBlankChar(c)) {
      this._attrName = this.getSelection(true);
      if (this.data[this._i] == '=') {
        while (isBlankChar(this.data[++this._i]));
        this._sectionStart = this._i;
        this._i--;
        this._stateHandler = this.AttrValueHandler;
      } else this.setAttr();
    } else if (c == '=') {
      this._attrName = this.getSelection();
      while (isBlankChar(this.data[++this._i]));
      this._sectionStart = this._i;
      this._i--;
      this._stateHandler = this.AttrValueHandler;
    } else if (this.checkClose()) {
      this._attrName = this.getSelection();
      this.setAttr();
    }
  };
  AttrValueHandler(c) {
    if (c == '"' || c == "'") {
      this._sectionStart++;
      if ((this._i = this.data.indexOf(c, this._i + 1)) == -1) return this._i = this.data.length;
    } else
      for (; !isBlankChar(this.data[this._i] && this.data[this._i] != '/' && this.data[this._i] != '>'); this._i++);
    this._attrValue = this.getSelection();
    while (this._attrValue.includes("&quot;")) this._attrValue = this._attrValue.replace("&quot;", '');
    this.setAttr();
  };
  EndTagHandler(c) {
    if (isBlankChar(c) || c == '>' || c == '/') {
      var name = this.getSelection().toLowerCase();
      var flag = false;
      for (var i = this._STACK.length - 1; i >= 0; i--)
        if (this._STACK[i].name == name) {
          flag = true;
          break;
        }
      if (flag) {
        var node;
        while (flag) {
          node = this._STACK.pop();
          if (node.name == name) flag = false;
          this.popNode(node);
        }
      } else if (name == 'p' || name == "br") {
        var slibings = this._STACK.length ? this._STACK[this._STACK.length - 1].children : this.DOM;
        var node = {
          name,
          attrs: {},
          children: []
        }
        slibings.push(node);
      }
      this._i = this.data.indexOf('>', this._i);
      if (this._i == -1) this._i = this.data.length;
      else this._stateHandler = this.TextHandler;
    }
  };
  checkClose() {
    if (this.data[this._i] == '>' || (this.data[this._i] == '/' && this.data[this._i + 1] == '>'))
      return true;
    return false;
  };
  getSelection(trim) {
    var str = (this._sectionStart == this._i ? '' : this.data.substring(this._sectionStart, this._i));
    while (trim && isBlankChar(this.data[++this._i]));
    if (trim) this._i--;
    this._sectionStart = this._i + 1;
    return str;
  };
  setAttr() {
    if (config.trustAttrs[this._attrName])
      this._attrs[this._attrName] = this._attrValue || "true";
    this._attrValue = '';
    while (isBlankChar(this.data[this._i])) this._i++;
    if (this.checkClose()) this.setNode();
    else this._stateHandler = this.AttrNameHandler;
  };
  setText() {
    var text = this.getSelection();
    if (text) {
      if (!this._whiteSpace) {
        // 移除空白符
        var flag = false,
          has = false,
          pos;
        for (var i = 0; i < text.length; i++) {
          if (isBlankChar(text[i])) {
            if (!flag) {
              pos = i;
              flag = true;
            }
          } else {
            has = true;
            if (flag) {
              if (i - pos > 1) text = text.substring(0, pos) + ' ' + text.substring(i);
              i = pos;
              flag = false;
            }
          }
        }
        if (flag) text = text.substring(0, pos) + ' ';
        if (!text || !has) return;
      }
      if (emoji) text = emoji.parseEmoji(text);
      while (text.includes("&nbsp;")) text = text.replace("&nbsp;", '\u00A0');
      // 检查实体
      var i = text.indexOf('&'),
        j, decode;
      while (i != -1 && i < text.length) {
        j = text.indexOf(';', i);
        if (j - i >= 2 && j - i <= 6) {
          var entity = text.substring(i, j);
          if (!entity.includes("sp") && !entity.includes("lt") && !entity.includes("gt")) {
            decode = true
            break;
          }
        }
        i = text.indexOf('&', i + 1);
      }
      var slibings = this._STACK.length ? this._STACK[this._STACK.length - 1].children : this.DOM;
      if (slibings.length && slibings[slibings.length - 1].type == "text") {
        slibings[slibings.length - 1].text += text;
        if (decode) slibings[slibings.length - 1].decode = true;
      } else {
        var node = {
          type: "text",
          text,
          decode
        };
        if (decode) node.decode = true;
        slibings.push(node);
      }
    }
  };
  bubbling() {
    for (var i = this._STACK.length - 1; i >= 0; i--) {
      if (config.trustTags[this._STACK[i].name] !== 0)
        this._STACK[i].continue = true;
      else
        return this._STACK[i].name;
    }
  };
  setNode() {
    var slibings = this._STACK.length ? this._STACK[this._STACK.length - 1].children : this.DOM;
    var node = {
      name: this._tagName.toLowerCase(),
      attrs: this._attrs,
      children: []
    }
    config.LabelAttrsHandler(node, this);
    if (this._useAnchor && node.attrs.id) this.bubbling();
    this._attrs = {};
    if (!config.selfClosingTags[this._tagName]) {
      if (config.ignoreTags[node.name] || node.name == 'title') {
        // 处理要被移除的标签
        var j = ++this._i;
        while (this._i < this.data.length) {
          this._i = this.data.indexOf("</", this._i);
          if (this._i == -1) return this._i = this.data.length;
          this._i += 2;
          this._sectionStart = this._i;
          while (!isBlankChar(this.data[this._i]) && this.data[this._i] != '>' && this.data[this._i] != '/') this._i++;
          if (this.data.substring(this._sectionStart, this._i).toLowerCase() == node.name) {
            // 获取标题
            if (node.name == "title")
              this.title = this.data.substring(j, this._sectionStart - 2);
            this._i = this.data.indexOf('>', this._i);
            if (this._i == -1) this._i = this.data.length;
            else this._sectionStart = this._i + 1;
            this._stateHandler = this.TextHandler;
            break;
          }
        }
        return;
      } else this._STACK.push(node);
      if (node.name == "pre") {
        this._whiteSapce = true;
        node.pre = true;
        // 高亮处理接口
        if (config.highlight) {
          this._sectionStart = this._i + 1;
          this._i = this.data.indexOf("</pre", this._sectionStart);
          this.data = this.data.substring(0, this._sectionStart) + config.highlight(this.data.substring(this._sectionStart, this._i), node.attrs) + this.data.substring(this._i);
          this._i = this._sectionStart - 1;
        }
      }
    }
    if (this.data[this._i] == '/') this._i++;
    this._sectionStart = this._i + 1;
    this._stateHandler = this.TextHandler;
    if (!config.ignoreTags[node.name]) {
      node.attrs.style = this.CssHandler.match(node.name, node.attrs, node) + (node.attrs.style || '');
      if (!node.attrs.style) delete node.attrs.style;
      // 检查空白符是否有效
      var styles = node.attrs.style ? node.attrs.style.toLowerCase().split(';') : [];
      for (var i = 0; i < styles.length; i++)
        if (styles[i].includes("white-space") && styles[i].includes("pre")) {
          this._whiteSpace = true;
          node.pre = true;
          break;
        }
      slibings.push(node);
    }
  };
  popNode(node) {
    // 替换一些标签名
    if (config.blockTags[node.name]) node.name = 'div';
    else if (!config.trustTags.hasOwnProperty(node.name)) node.name = 'span';
    // 空白符处理
    if (node.pre) {
      this._whiteSpace = false;
      delete node.pre;
      for (var i = 0; i < this._STACK.length; i++)
        if (this._STACK[i].pre)
          this._whiteSpace = true;
    }
    // 处理表格的边框
    if (node.name == 'table') {
      node.attrs.style = node.attrs.style || '';
      if (node.attrs.border)
        node.attrs.style += (";border:" + node.attrs.border + "px solid gray;");
      if (node.attrs.hasOwnProperty("cellspacing"))
        node.attrs.style += (";border-spacing:" + node.attrs.cellspacing + "px");

      function setBorder(elem) {
        if (elem.name == 'th' || elem.name == 'td') {
          if (node.attrs.border)
            elem.attrs.style = (elem.attrs.style || '') + ";border:" + node.attrs.border + "px solid gray;";
          if (node.attrs.hasOwnProperty("cellpadding"))
            elem.attrs.style = (elem.attrs.style || '') + ";padding:" + node.attrs.cellpadding + "px";
          return;
        }
        if (elem.type == 'text') return;
        for (var i = 0; i < elem.children.length; i++)
          setBorder(elem.children[i]);
      }
      if (node.attrs.border || node.attrs.hasOwnProperty("cellpadding"))
        for (var i = 0; i < node.children.length; i++)
          setBorder(node.children[i]);
    }
    // 合并一些不必要的层，减小节点深度
    if (node.children.length == 1 && node.name == "div" && node.children[0].name == "div") {
      var child = node.children[0];
      node.attrs.style = node.attrs.style || '';
      child.attrs.style = child.attrs.style || '';
      if (node.attrs.style.includes("padding") && (node.attrs.style.includes("margin") || child.attrs.style.includes("margin")) && node.attrs.style.includes("display") && child.attrs.style.includes("display") && !(node.attrs.id && node.attrs.id) && !(node.attrs.class && child.attrs.class)) {
        if (child.attrs.style.includes("padding"))
          child.attrs.style = "box-sizing:border-box;" + child.attrs.style;
        node.attrs.style = node.attrs.style + ";" + child.attrs.style;
        node.attrs.id = (child.attrs.id || '') + (node.attrs.id || '');
        node.attrs.class = (child.attrs.class || '') + (node.attrs.class || '');
        node.children = child.children;
      }
    }
    // 多层样式处理
    if (this.CssHandler.pop)
      this.CssHandler.pop(node);
  };
};
module.exports = {
  parseHtml: (data, options) => new Promise((resolve) => new MpHtmlParser(data, options, resolve).parse()),
  parseHtmlSync: (data, options) => new MpHtmlParser(data, options).parse()
};