/*! mns-tax-calc 2021-03-19 */
function CountChildInvalidError() {
   (this.name = 'CountChildInvalidError'),
      (this.message = 'Count children invalid more then child before 18');
}
if ('undefined' == typeof jQuery)
   throw new Error("Bootstrap's JavaScript requires jQuery");
+(function (a) {
   'use strict';
   var b = a.fn.jquery.split(' ')[0].split('.');
   if ((b[0] < 2 && b[1] < 9) || (1 == b[0] && 9 == b[1] && b[2] < 1))
      throw new Error(
         "Bootstrap's JavaScript requires jQuery version 1.9.1 or higher"
      );
})(jQuery),
   +(function (a) {
      'use strict';
      function b(b, d) {
         return this.each(function () {
            var e = a(this),
               f = e.data('bs.modal'),
               g = a.extend(
                  {},
                  c.DEFAULTS,
                  e.data(),
                  'object' == typeof b && b
               );
            f || e.data('bs.modal', (f = new c(this, g))),
               'string' == typeof b ? f[b](d) : g.show && f.show(d);
         });
      }
      var c = function (b, c) {
         (this.options = c),
            (this.$body = a(document.body)),
            (this.$element = a(b)),
            (this.$dialog = this.$element.find('.modal-dialog')),
            (this.$backdrop = null),
            (this.isShown = null),
            (this.originalBodyPad = null),
            (this.scrollbarWidth = 0),
            (this.ignoreBackdropClick = !1),
            this.options.remote &&
               this.$element.find('.modal-content').load(
                  this.options.remote,
                  a.proxy(function () {
                     this.$element.trigger('loaded.bs.modal');
                  }, this)
               );
      };
      (c.VERSION = '3.3.5'),
         (c.TRANSITION_DURATION = 300),
         (c.BACKDROP_TRANSITION_DURATION = 150),
         (c.DEFAULTS = { backdrop: !0, keyboard: !0, show: !0 }),
         (c.prototype.toggle = function (a) {
            return this.isShown ? this.hide() : this.show(a);
         }),
         (c.prototype.show = function (b) {
            var d = this,
               e = a.Event('show.bs.modal', { relatedTarget: b });
            this.$element.trigger(e),
               this.isShown ||
                  e.isDefaultPrevented() ||
                  ((this.isShown = !0),
                  this.checkScrollbar(),
                  this.setScrollbar(),
                  this.$body.addClass('modal-open'),
                  this.escape(),
                  this.resize(),
                  this.$element.on(
                     'click.dismiss.bs.modal',
                     '[data-dismiss="modal"]',
                     a.proxy(this.hide, this)
                  ),
                  this.$dialog.on('mousedown.dismiss.bs.modal', function () {
                     d.$element.one('mouseup.dismiss.bs.modal', function (b) {
                        a(b.target).is(d.$element) &&
                           (d.ignoreBackdropClick = !0);
                     });
                  }),
                  this.backdrop(function () {
                     var e =
                        a.support.transition && d.$element.hasClass('fade');
                     d.$element.parent().length || d.$element.appendTo(d.$body),
                        d.$element.show().scrollTop(0),
                        d.adjustDialog(),
                        e && d.$element[0].offsetWidth,
                        d.$element.addClass('show'),
                        d.enforceFocus();
                     var f = a.Event('shown.bs.modal', { relatedTarget: b });
                     e
                        ? d.$dialog
                             .one('bsTransitionEnd', function () {
                                d.$element.trigger('focus').trigger(f);
                             })
                             .emulateTransitionEnd(c.TRANSITION_DURATION)
                        : d.$element.trigger('focus').trigger(f);
                  }));
         }),
         (c.prototype.hide = function (b) {
            b && b.preventDefault(),
               (b = a.Event('hide.bs.modal')),
               this.$element.trigger(b),
               this.isShown &&
                  !b.isDefaultPrevented() &&
                  ((this.isShown = !1),
                  this.escape(),
                  this.resize(),
                  a(document).off('focusin.bs.modal'),
                  this.$element
                     .removeClass('show')
                     .off('click.dismiss.bs.modal')
                     .off('mouseup.dismiss.bs.modal'),
                  this.$dialog.off('mousedown.dismiss.bs.modal'),
                  a.support.transition && this.$element.hasClass('fade')
                     ? this.$element
                          .one('bsTransitionEnd', a.proxy(this.hideModal, this))
                          .emulateTransitionEnd(c.TRANSITION_DURATION)
                     : this.hideModal());
         }),
         (c.prototype.enforceFocus = function () {
            a(document)
               .off('focusin.bs.modal')
               .on(
                  'focusin.bs.modal',
                  a.proxy(function (a) {
                     this.$element[0] === a.target ||
                        this.$element.has(a.target).length ||
                        this.$element.trigger('focus');
                  }, this)
               );
         }),
         (c.prototype.escape = function () {
            this.isShown && this.options.keyboard
               ? this.$element.on(
                    'keydown.dismiss.bs.modal',
                    a.proxy(function (a) {
                       27 == a.which && this.hide();
                    }, this)
                 )
               : this.isShown || this.$element.off('keydown.dismiss.bs.modal');
         }),
         (c.prototype.resize = function () {
            this.isShown
               ? a(window).on(
                    'resize.bs.modal',
                    a.proxy(this.handleUpdate, this)
                 )
               : a(window).off('resize.bs.modal');
         }),
         (c.prototype.hideModal = function () {
            var a = this;
            this.$element.hide(),
               this.backdrop(function () {
                  a.$body.removeClass('modal-open'),
                     a.resetAdjustments(),
                     a.resetScrollbar(),
                     a.$element.trigger('hidden.bs.modal');
               });
         }),
         (c.prototype.removeBackdrop = function () {
            this.$backdrop && this.$backdrop.remove(), (this.$backdrop = null);
         }),
         (c.prototype.backdrop = function (b) {
            var d = this,
               e = this.$element.hasClass('fade') ? 'fade' : '';
            if (this.isShown && this.options.backdrop) {
               var f = a.support.transition && e;
               if (
                  ((this.$backdrop = a(document.createElement('div'))
                     .addClass('modal-backdrop ' + e)
                     .appendTo(this.$body)),
                  this.$element.on(
                     'click.dismiss.bs.modal',
                     a.proxy(function (a) {
                        return this.ignoreBackdropClick
                           ? void (this.ignoreBackdropClick = !1)
                           : void (
                                a.target === a.currentTarget &&
                                ('static' == this.options.backdrop
                                   ? this.$element[0].focus()
                                   : this.hide())
                             );
                     }, this)
                  ),
                  f && this.$backdrop[0].offsetWidth,
                  this.$backdrop.addClass('show'),
                  !b)
               )
                  return;
               f
                  ? this.$backdrop
                       .one('bsTransitionEnd', b)
                       .emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION)
                  : b();
            } else if (!this.isShown && this.$backdrop) {
               this.$backdrop.removeClass('show');
               var g = function () {
                  d.removeBackdrop(), b && b();
               };
               a.support.transition && this.$element.hasClass('fade')
                  ? this.$backdrop
                       .one('bsTransitionEnd', g)
                       .emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION)
                  : g();
            } else b && b();
         }),
         (c.prototype.handleUpdate = function () {
            this.adjustDialog();
         }),
         (c.prototype.adjustDialog = function () {
            var a =
               this.$element[0].scrollHeight >
               document.documentElement.clientHeight;
            this.$element.css({
               paddingLeft:
                  !this.bodyIsOverflowing && a ? this.scrollbarWidth : '',
               paddingRight:
                  this.bodyIsOverflowing && !a ? this.scrollbarWidth : '',
            });
         }),
         (c.prototype.resetAdjustments = function () {
            this.$element.css({ paddingLeft: '', paddingRight: '' });
         }),
         (c.prototype.checkScrollbar = function () {
            var a = window.innerWidth;
            if (!a) {
               var b = document.documentElement.getBoundingClientRect();
               a = b.right - Math.abs(b.left);
            }
            (this.bodyIsOverflowing = document.body.clientWidth < a),
               (this.scrollbarWidth = this.measureScrollbar());
         }),
         (c.prototype.setScrollbar = function () {
            var a = parseInt(this.$body.css('padding-right') || 0, 10);
            (this.originalBodyPad = document.body.style.paddingRight || ''),
               this.bodyIsOverflowing &&
                  this.$body.css('padding-right', a + this.scrollbarWidth);
         }),
         (c.prototype.resetScrollbar = function () {
            this.$body.css('padding-right', this.originalBodyPad);
         }),
         (c.prototype.measureScrollbar = function () {
            var a = document.createElement('div');
            (a.className = 'modal-scrollbar-measure'), this.$body.append(a);
            var b = a.offsetWidth - a.clientWidth;
            return this.$body[0].removeChild(a), b;
         });
      var d = a.fn.modal;
      (a.fn.modal = b),
         (a.fn.modal.Constructor = c),
         (a.fn.modal.noConflict = function () {
            return (a.fn.modal = d), this;
         }),
         a(document).on(
            'click.bs.modal.data-api',
            '[data-toggle="modal"]',
            function (c) {
               var d = a(this),
                  e = d.attr('href'),
                  f = a(
                     d.attr('data-target') ||
                        (e && e.replace(/.*(?=#[^\s]+$)/, ''))
                  ),
                  g = f.data('bs.modal')
                     ? 'toggle'
                     : a.extend(
                          { remote: !/#/.test(e) && e },
                          f.data(),
                          d.data()
                       );
               d.is('a') && c.preventDefault(),
                  f.one('show.bs.modal', function (a) {
                     a.isDefaultPrevented() ||
                        f.one('hidden.bs.modal', function () {
                           d.is(':visible') && d.trigger('focus');
                        });
                  }),
                  b.call(f, g, this);
            }
         );
   })(jQuery),
   +(function (a) {
      'use strict';
      function b(b) {
         return this.each(function () {
            var d = a(this),
               e = d.data('bs.tooltip'),
               f = 'object' == typeof b && b;
            (!e && /destroy|hide/.test(b)) ||
               (e || d.data('bs.tooltip', (e = new c(this, f))),
               'string' == typeof b && e[b]());
         });
      }
      var c = function (a, b) {
         (this.type = null),
            (this.options = null),
            (this.enabled = null),
            (this.timeout = null),
            (this.hoverState = null),
            (this.$element = null),
            (this.inState = null),
            this.init('tooltip', a, b);
      };
      (c.VERSION = '4.4.6'),
         (c.TRANSITION_DURATION = 150),
         (c.DEFAULTS = {
            animation: !0,
            placement: 'top',
            selector: !1,
            template:
               '<div class="tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>',
            trigger: 'hover focus',
            title: '',
            delay: 0,
            html: !1,
            container: !1,
            viewport: { selector: 'body', padding: 0 },
         }),
         (c.prototype.init = function (b, c, d) {
            if (
               ((this.enabled = !0),
               (this.type = b),
               (this.$element = a(c)),
               (this.options = this.getOptions(d)),
               (this.$viewport =
                  this.options.viewport &&
                  a(
                     a.isFunction(this.options.viewport)
                        ? this.options.viewport.call(this, this.$element)
                        : this.options.viewport.selector ||
                             this.options.viewport
                  )),
               (this.inState = { click: !1, hover: !1, focus: !1 }),
               this.$element[0] instanceof document.constructor &&
                  !this.options.selector)
            )
               throw new Error(
                  '`selector` option must be specified when initializing ' +
                     this.type +
                     ' on the window.document object!'
               );
            for (var e = this.options.trigger.split(' '), f = e.length; f--; ) {
               var g = e[f];
               if ('click' == g)
                  this.$element.on(
                     'click.' + this.type,
                     this.options.selector,
                     a.proxy(this.toggle, this)
                  );
               else if ('manual' != g) {
                  var h = 'hover' == g ? 'mouseenter' : 'focusin',
                     i = 'hover' == g ? 'mouseleave' : 'focusout';
                  this.$element.on(
                     h + '.' + this.type,
                     this.options.selector,
                     a.proxy(this.enter, this)
                  ),
                     this.$element.on(
                        i + '.' + this.type,
                        this.options.selector,
                        a.proxy(this.leave, this)
                     );
               }
            }
            this.options.selector
               ? (this._options = a.extend({}, this.options, {
                    trigger: 'manual',
                    selector: '',
                 }))
               : this.fixTitle();
         }),
         (c.prototype.getDefaults = function () {
            return c.DEFAULTS;
         }),
         (c.prototype.getOptions = function (b) {
            return (
               (b = a.extend({}, this.getDefaults(), this.$element.data(), b)),
               b.delay &&
                  'number' == typeof b.delay &&
                  (b.delay = { show: b.delay, hide: b.delay }),
               b
            );
         }),
         (c.prototype.getDelegateOptions = function () {
            var b = {},
               c = this.getDefaults();
            return (
               this._options &&
                  a.each(this._options, function (a, d) {
                     c[a] != d && (b[a] = d);
                  }),
               b
            );
         }),
         (c.prototype.enter = function (b) {
            var c =
               b instanceof this.constructor
                  ? b
                  : a(b.currentTarget).data('bs.' + this.type);
            return (
               c ||
                  ((c = new this.constructor(
                     b.currentTarget,
                     this.getDelegateOptions()
                  )),
                  a(b.currentTarget).data('bs.' + this.type, c)),
               b instanceof a.Event &&
                  (c.inState['focusin' == b.type ? 'focus' : 'hover'] = !0),
               c.tip().hasClass('show') || 'show' == c.hoverState
                  ? void (c.hoverState = 'show')
                  : (clearTimeout(c.timeout),
                    (c.hoverState = 'show'),
                    c.options.delay && c.options.delay.show
                       ? void (c.timeout = setTimeout(function () {
                            'show' == c.hoverState && c.show();
                         }, c.options.delay.show))
                       : c.show())
            );
         }),
         (c.prototype.isInStateTrue = function () {
            for (var a in this.inState) if (this.inState[a]) return !0;
            return !1;
         }),
         (c.prototype.leave = function (b) {
            var c =
               b instanceof this.constructor
                  ? b
                  : a(b.currentTarget).data('bs.' + this.type);
            if (
               (c ||
                  ((c = new this.constructor(
                     b.currentTarget,
                     this.getDelegateOptions()
                  )),
                  a(b.currentTarget).data('bs.' + this.type, c)),
               b instanceof a.Event &&
                  (c.inState['focusout' == b.type ? 'focus' : 'hover'] = !1),
               !c.isInStateTrue())
            )
               return (
                  clearTimeout(c.timeout),
                  (c.hoverState = 'out'),
                  c.options.delay && c.options.delay.hide
                     ? void (c.timeout = setTimeout(function () {
                          'out' == c.hoverState && c.hide();
                       }, c.options.delay.hide))
                     : c.hide()
               );
         }),
         (c.prototype.show = function () {
            var b = a.Event('show.bs.' + this.type);
            if (this.hasContent() && this.enabled) {
               this.$element.trigger(b);
               var d = a.contains(
                  this.$element[0].ownerDocument.documentElement,
                  this.$element[0]
               );
               if (b.isDefaultPrevented() || !d) return;
               var e = this,
                  f = this.tip(),
                  g = this.getUID(this.type);
               this.setContent(),
                  f.attr('id', g),
                  this.$element.attr('aria-describedby', g),
                  this.options.animation && f.addClass('fade');
               var h =
                     'function' == typeof this.options.placement
                        ? this.options.placement.call(
                             this,
                             f[0],
                             this.$element[0]
                          )
                        : this.options.placement,
                  i = /\s?auto?\s?/i,
                  j = i.test(h);
               j && (h = h.replace(i, '') || 'top'),
                  f
                     .detach()
                     .css({ top: 0, left: 0, display: 'block' })
                     .addClass(h)
                     .data('bs.' + this.type, this),
                  this.options.container
                     ? f.appendTo(this.options.container)
                     : f.insertAfter(this.$element),
                  this.$element.trigger('inserted.bs.' + this.type);
               var k = this.getPosition(),
                  l = f[0].offsetWidth,
                  m = f[0].offsetHeight;
               if (j) {
                  var n = h,
                     o = this.getPosition(this.$viewport);
                  (h =
                     'bottom' == h && k.bottom + m > o.bottom
                        ? 'top'
                        : 'top' == h && k.top - m < o.top
                        ? 'bottom'
                        : 'right' == h && k.right + l > o.width
                        ? 'left'
                        : 'left' == h && k.left - l < o.left
                        ? 'right'
                        : h),
                     f.removeClass(n).addClass(h);
               }
               var p = this.getCalculatedOffset(h, k, l, m);
               this.applyPlacement(p, h);
               var q = function () {
                  var a = e.hoverState;
                  e.$element.trigger('shown.bs.' + e.type),
                     (e.hoverState = null),
                     'out' == a && e.leave(e);
               };
               a.support.transition && this.$tip.hasClass('fade')
                  ? f
                       .one('bsTransitionEnd', q)
                       .emulateTransitionEnd(c.TRANSITION_DURATION)
                  : q();
            }
         }),
         (c.prototype.applyPlacement = function (b, c) {
            var d = this.tip(),
               e = d[0].offsetWidth,
               f = d[0].offsetHeight,
               g = parseInt(d.css('margin-top'), 10),
               h = parseInt(d.css('margin-left'), 10);
            isNaN(g) && (g = 0),
               isNaN(h) && (h = 0),
               (b.top += g),
               (b.left += h),
               a.offset.setOffset(
                  d[0],
                  a.extend(
                     {
                        using: function (a) {
                           d.css({
                              top: Math.round(a.top),
                              left: Math.round(a.left),
                           });
                        },
                     },
                     b
                  ),
                  0
               ),
               d.addClass('show');
            var i = d[0].offsetWidth,
               j = d[0].offsetHeight;
            'top' == c && j != f && (b.top = b.top + f - j);
            var k = this.getViewportAdjustedDelta(c, b, i, j);
            k.left ? (b.left += k.left) : (b.top += k.top);
            var l = /top|bottom/.test(c),
               m = l ? 2 * k.left - e + i : 2 * k.top - f + j,
               n = l ? 'offsetWidth' : 'offsetHeight';
            d.offset(b), this.replaceArrow(m, d[0][n], l);
         }),
         (c.prototype.replaceArrow = function (a, b, c) {
            this.arrow()
               .css(c ? 'left' : 'top', 50 * (1 - a / b) + '%')
               .css(c ? 'top' : 'left', '');
         }),
         (c.prototype.setContent = function () {
            var a = this.tip(),
               b = this.getTitle();
            a.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](b),
               a.removeClass('fade show top bottom left right');
         }),
         (c.prototype.hide = function (b) {
            function d() {
               'show' != e.hoverState && f.detach(),
                  e.$element
                     .removeAttr('aria-describedby')
                     .trigger('hidden.bs.' + e.type),
                  b && b();
            }
            var e = this,
               f = a(this.$tip),
               g = a.Event('hide.bs.' + this.type);
            if ((this.$element.trigger(g), !g.isDefaultPrevented()))
               return (
                  f.removeClass('show'),
                  a.support.transition && f.hasClass('fade')
                     ? f
                          .one('bsTransitionEnd', d)
                          .emulateTransitionEnd(c.TRANSITION_DURATION)
                     : d(),
                  (this.hoverState = null),
                  this
               );
         }),
         (c.prototype.fixTitle = function () {
            var a = this.$element;
            (a.attr('title') ||
               'string' != typeof a.attr('data-original-title')) &&
               a
                  .attr('data-original-title', a.attr('title') || '')
                  .attr('title', '');
         }),
         (c.prototype.hasContent = function () {
            return this.getTitle();
         }),
         (c.prototype.getPosition = function (b) {
            b = b || this.$element;
            var c = b[0],
               d = 'BODY' == c.tagName,
               e = c.getBoundingClientRect();
            null == e.width &&
               (e = a.extend({}, e, {
                  width: e.right - e.left,
                  height: e.bottom - e.top,
               }));
            var f = d ? { top: 0, left: 0 } : b.offset(),
               g = {
                  scroll: d
                     ? document.documentElement.scrollTop ||
                       document.body.scrollTop
                     : b.scrollTop(),
               },
               h = d
                  ? { width: a(window).width(), height: a(window).height() }
                  : null;
            return a.extend({}, e, g, h, f);
         }),
         (c.prototype.getCalculatedOffset = function (a, b, c, d) {
            return 'bottom' == a
               ? { top: b.top + b.height, left: b.left + b.width / 2 - c / 2 }
               : 'top' == a
               ? { top: b.top - d, left: b.left + b.width / 2 - c / 2 }
               : 'left' == a
               ? { top: b.top + b.height / 2 - d / 2, left: b.left - c }
               : { top: b.top + b.height / 2 - d / 2, left: b.left + b.width };
         }),
         (c.prototype.getViewportAdjustedDelta = function (a, b, c, d) {
            var e = { top: 0, left: 0 };
            if (!this.$viewport) return e;
            var f =
                  (this.options.viewport && this.options.viewport.padding) || 0,
               g = this.getPosition(this.$viewport);
            if (/right|left/.test(a)) {
               var h = b.top - f - g.scroll,
                  i = b.top + f - g.scroll + d;
               h < g.top
                  ? (e.top = g.top - h)
                  : i > g.top + g.height && (e.top = g.top + g.height - i);
            } else {
               var j = b.left - f,
                  k = b.left + f + c;
               j < g.left
                  ? (e.left = g.left - j)
                  : k > g.right && (e.left = g.left + g.width - k);
            }
            return e;
         }),
         (c.prototype.getTitle = function () {
            var a,
               b = this.$element,
               c = this.options;
            return (a =
               b.attr('data-original-title') ||
               ('function' == typeof c.title ? c.title.call(b[0]) : c.title));
         }),
         (c.prototype.getUID = function (a) {
            do a += ~~(1e6 * Math.random());
            while (document.getElementById(a));
            return a;
         }),
         (c.prototype.tip = function () {
            if (
               !this.$tip &&
               ((this.$tip = a(this.options.template)), 1 != this.$tip.length)
            )
               throw new Error(
                  this.type +
                     ' `template` option must consist of exactly 1 top-level element!'
               );
            return this.$tip;
         }),
         (c.prototype.arrow = function () {
            return (this.$arrow =
               this.$arrow || this.tip().find('.arrow'));
         }),
         (c.prototype.enable = function () {
            this.enabled = !0;
         }),
         (c.prototype.disable = function () {
            this.enabled = !1;
         }),
         (c.prototype.toggleEnabled = function () {
            this.enabled = !this.enabled;
         }),
         (c.prototype.toggle = function (b) {
            var c = this;
            b &&
               ((c = a(b.currentTarget).data('bs.' + this.type)),
               c ||
                  ((c = new this.constructor(
                     b.currentTarget,
                     this.getDelegateOptions()
                  )),
                  a(b.currentTarget).data('bs.' + this.type, c))),
               b
                  ? ((c.inState.click = !c.inState.click),
                    c.isInStateTrue() ? c.enter(c) : c.leave(c))
                  : c.tip().hasClass('show')
                  ? c.leave(c)
                  : c.enter(c);
         }),
         (c.prototype.destroy = function () {
            var a = this;
            clearTimeout(this.timeout),
               this.hide(function () {
                  a.$element.off('.' + a.type).removeData('bs.' + a.type),
                     a.$tip && a.$tip.detach(),
                     (a.$tip = null),
                     (a.$arrow = null),
                     (a.$viewport = null);
               });
         });
      var d = a.fn.tooltip;
      (a.fn.tooltip = b),
         (a.fn.tooltip.Constructor = c),
         (a.fn.tooltip.noConflict = function () {
            return (a.fn.tooltip = d), this;
         });
   })(jQuery),
   (function (a) {
      'function' == typeof define && define.amd
         ? define(['jquery.validate'], a)
         : a(jQuery);
   })(function (a) {
      a.extend(a.fn, {
         validate: function (b) {
            if (!this.length)
               return void (
                  b &&
                  b.debug &&
                  window.console &&
                  console.warn(
                     "Nothing selected, can't validate, returning nothing."
                  )
               );
            var c = a.data(this[0], 'validator');
            return c
               ? c
               : (this.attr('novalidate', 'novalidate'),
                 (c = new a.validator(b, this[0])),
                 a.data(this[0], 'validator', c),
                 c.settings.onsubmit &&
                    (this.on('click.validate', ':submit', function (b) {
                       c.settings.submitHandler && (c.submitButton = b.target),
                          a(this).hasClass('cancel') && (c.cancelSubmit = !0),
                          void 0 !== a(this).attr('formnovalidate') &&
                             (c.cancelSubmit = !0);
                    }),
                    this.on('submit.validate', function (b) {
                       function d() {
                          var d, e;
                          return (
                             !c.settings.submitHandler ||
                             (c.submitButton &&
                                (d = a("<input type='hidden'/>")
                                   .attr('name', c.submitButton.name)
                                   .val(a(c.submitButton).val())
                                   .appendTo(c.currentForm)),
                             (e = c.settings.submitHandler.call(
                                c,
                                c.currentForm,
                                b
                             )),
                             c.submitButton && d.remove(),
                             void 0 !== e && e)
                          );
                       }
                       return (
                          c.settings.debug && b.preventDefault(),
                          c.cancelSubmit
                             ? ((c.cancelSubmit = !1), d())
                             : c.form()
                             ? c.pendingRequest
                                ? ((c.formSubmitted = !0), !1)
                                : d()
                             : (c.focusInvalid(), !1)
                       );
                    })),
                 c);
         },
         valid: function () {
            var b, c, d;
            return (
               a(this[0]).is('form')
                  ? (b = this.validate().form())
                  : ((d = []),
                    (b = !0),
                    (c = a(this[0].form).validate()),
                    this.each(function () {
                       (b = c.element(this) && b), (d = d.concat(c.errorList));
                    }),
                    (c.errorList = d)),
               b
            );
         },
         rules: function (b, c) {
            var d,
               e,
               f,
               g,
               h,
               i,
               j = this[0];
            if (b)
               switch (
                  ((d = a.data(j.form, 'validator').settings),
                  (e = d.rules),
                  (f = a.validator.staticRules(j)),
                  b)
               ) {
                  case 'add':
                     a.extend(f, a.validator.normalizeRule(c)),
                        delete f.messages,
                        (e[j.name] = f),
                        c.messages &&
                           (d.messages[j.name] = a.extend(
                              d.messages[j.name],
                              c.messages
                           ));
                     break;
                  case 'remove':
                     return c
                        ? ((i = {}),
                          a.each(c.split(/\s/), function (b, c) {
                             (i[c] = f[c]),
                                delete f[c],
                                'required' === c &&
                                   a(j).removeAttr('aria-required');
                          }),
                          i)
                        : (delete e[j.name], f);
               }
            return (
               (g = a.validator.normalizeRules(
                  a.extend(
                     {},
                     a.validator.classRules(j),
                     a.validator.attributeRules(j),
                     a.validator.dataRules(j),
                     a.validator.staticRules(j)
                  ),
                  j
               )),
               g.required &&
                  ((h = g.required),
                  delete g.required,
                  (g = a.extend({ required: h }, g)),
                  a(j).attr('aria-required', 'true')),
               g.remote &&
                  ((h = g.remote),
                  delete g.remote,
                  (g = a.extend(g, { remote: h }))),
               g
            );
         },
      }),
         a.extend(a.expr[':'], {
            blank: function (b) {
               return !a.trim('' + a(b).val());
            },
            filled: function (b) {
               return !!a.trim('' + a(b).val());
            },
            unchecked: function (b) {
               return !a(b).prop('checked');
            },
         }),
         (a.validator = function (b, c) {
            (this.settings = a.extend(!0, {}, a.validator.defaults, b)),
               (this.currentForm = c),
               this.init();
         }),
         (a.validator.format = function (b, c) {
            return 1 === arguments.length
               ? function () {
                    var c = a.makeArray(arguments);
                    return c.unshift(b), a.validator.format.apply(this, c);
                 }
               : (arguments.length > 2 &&
                    c.constructor !== Array &&
                    (c = a.makeArray(arguments).slice(1)),
                 c.constructor !== Array && (c = [c]),
                 a.each(c, function (a, c) {
                    b = b.replace(
                       new RegExp('\\{' + a + '\\}', 'g'),
                       function () {
                          return c;
                       }
                    );
                 }),
                 b);
         }),
         a.extend(a.validator, {
            defaults: {
               messages: {},
               groups: {},
               rules: {},
               errorClass: 'error',
               validClass: 'valid',
               errorElement: 'label',
               focusCleanup: !1,
               focusInvalid: !0,
               errorContainer: a([]),
               errorLabelContainer: a([]),
               onsubmit: !0,
               ignore: ':hidden',
               ignoreTitle: !1,
               onfocusin: function (a) {
                  (this.lastActive = a),
                     this.settings.focusCleanup &&
                        (this.settings.unhighlight &&
                           this.settings.unhighlight.call(
                              this,
                              a,
                              this.settings.errorClass,
                              this.settings.validClass
                           ),
                        this.hideThese(this.errorsFor(a)));
               },
               onfocusout: function (a) {
                  this.checkable(a) ||
                     (!(a.name in this.submitted) && this.optional(a)) ||
                     this.element(a);
               },
               onkeyup: function (b, c) {
                  var d = [
                     16, 17, 18, 20, 35, 36, 37, 38, 39, 40, 45, 144, 225,
                  ];
                  (9 === c.which && '' === this.elementValue(b)) ||
                     a.inArray(c.keyCode, d) !== -1 ||
                     ((b.name in this.submitted || b === this.lastElement) &&
                        this.element(b));
               },
               onclick: function (a) {
                  a.name in this.submitted
                     ? this.element(a)
                     : a.parentNode.name in this.submitted &&
                       this.element(a.parentNode);
               },
               highlight: function (b, c, d) {
                  'radio' === b.type
                     ? this.findByName(b.name).addClass(c).removeClass(d)
                     : a(b).addClass(c).removeClass(d);
               },
               unhighlight: function (b, c, d) {
                  'radio' === b.type
                     ? this.findByName(b.name).removeClass(c).addClass(d)
                     : a(b).removeClass(c).addClass(d);
               },
            },
            setDefaults: function (b) {
               a.extend(a.validator.defaults, b);
            },
            messages: {
               required: 'This field is required.',
               remote: 'Please fix this field.',
               email: 'Please enter a valid email address.',
               url: 'Please enter a valid URL.',
               date: 'Please enter a valid date.',
               dateISO: 'Please enter a valid date ( ISO ).',
               number: 'Please enter a valid number.',
               digits: 'Please enter only digits.',
               creditcard: 'Please enter a valid credit card number.',
               equalTo: 'Please enter the same value again.',
               maxlength: a.validator.format(
                  'Please enter no more than {0} characters.'
               ),
               minlength: a.validator.format(
                  'Please enter at least {0} characters.'
               ),
               rangelength: a.validator.format(
                  'Please enter a value between {0} and {1} characters long.'
               ),
               range: a.validator.format(
                  'Please enter a value between {0} and {1}.'
               ),
               max: a.validator.format(
                  'Please enter a value less than or equal to {0}.'
               ),
               min: a.validator.format(
                  'Please enter a value greater than or equal to {0}.'
               ),
            },
            autoCreateRanges: !1,
            prototype: {
               init: function () {
                  function b(b) {
                     var c = a.data(this.form, 'validator'),
                        d = 'on' + b.type.replace(/^validate/, ''),
                        e = c.settings;
                     e[d] && !a(this).is(e.ignore) && e[d].call(c, this, b);
                  }
                  (this.labelContainer = a(this.settings.errorLabelContainer)),
                     (this.errorContext =
                        (this.labelContainer.length && this.labelContainer) ||
                        a(this.currentForm)),
                     (this.containers = a(this.settings.errorContainer).add(
                        this.settings.errorLabelContainer
                     )),
                     (this.submitted = {}),
                     (this.valueCache = {}),
                     (this.pendingRequest = 0),
                     (this.pending = {}),
                     (this.invalid = {}),
                     this.reset();
                  var c,
                     d = (this.groups = {});
                  a.each(this.settings.groups, function (b, c) {
                     'string' == typeof c && (c = c.split(/\s/)),
                        a.each(c, function (a, c) {
                           d[c] = b;
                        });
                  }),
                     (c = this.settings.rules),
                     a.each(c, function (b, d) {
                        c[b] = a.validator.normalizeRule(d);
                     }),
                     a(this.currentForm)
                        .on(
                           'focusin.validate focusout.validate keyup.validate',
                           ":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'], [type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'], [type='radio'], [type='checkbox']",
                           b
                        )
                        .on(
                           'click.validate',
                           "select, option, [type='radio'], [type='checkbox']",
                           b
                        ),
                     this.settings.invalidHandler &&
                        a(this.currentForm).on(
                           'invalid-form.validate',
                           this.settings.invalidHandler
                        ),
                     a(this.currentForm)
                        .find('[required], [data-rule-required], .required')
                        .attr('aria-required', 'true');
               },
               form: function () {
                  return (
                     this.checkForm(),
                     a.extend(this.submitted, this.errorMap),
                     (this.invalid = a.extend({}, this.errorMap)),
                     this.valid() ||
                        a(this.currentForm).triggerHandler('invalid-form', [
                           this,
                        ]),
                     this.showErrors(),
                     this.valid()
                  );
               },
               checkForm: function () {
                  this.prepareForm();
                  for (
                     var a = 0, b = (this.currentElements = this.elements());
                     b[a];
                     a++
                  )
                     this.check(b[a]);
                  return this.valid();
               },
               element: function (b) {
                  var c = this.clean(b),
                     d = this.validationTargetFor(c),
                     e = !0;
                  return (
                     (this.lastElement = d),
                     void 0 === d
                        ? delete this.invalid[c.name]
                        : (this.prepareElement(d),
                          (this.currentElements = a(d)),
                          (e = this.check(d) !== !1),
                          e
                             ? delete this.invalid[d.name]
                             : (this.invalid[d.name] = !0)),
                     a(b).attr('aria-invalid', !e),
                     this.numberOfInvalids() ||
                        (this.toHide = this.toHide.add(this.containers)),
                     this.showErrors(),
                     e
                  );
               },
               showErrors: function (b) {
                  if (b) {
                     a.extend(this.errorMap, b), (this.errorList = []);
                     for (var c in b)
                        this.errorList.push({
                           message: b[c],
                           element: this.findByName(c)[0],
                        });
                     this.successList = a.grep(this.successList, function (a) {
                        return !(a.name in b);
                     });
                  }
                  this.settings.showErrors
                     ? this.settings.showErrors.call(
                          this,
                          this.errorMap,
                          this.errorList
                       )
                     : this.defaultShowErrors();
               },
               resetForm: function () {
                  a.fn.resetForm && a(this.currentForm).resetForm(),
                     (this.submitted = {}),
                     (this.lastElement = null),
                     this.prepareForm(),
                     this.hideErrors();
                  var b,
                     c = this.elements()
                        .removeData('previousValue')
                        .removeAttr('aria-invalid');
                  if (this.settings.unhighlight)
                     for (b = 0; c[b]; b++)
                        this.settings.unhighlight.call(
                           this,
                           c[b],
                           this.settings.errorClass,
                           ''
                        );
                  else c.removeClass(this.settings.errorClass);
               },
               numberOfInvalids: function () {
                  return this.objectLength(this.invalid);
               },
               objectLength: function (a) {
                  var b,
                     c = 0;
                  for (b in a) c++;
                  return c;
               },
               hideErrors: function () {
                  this.hideThese(this.toHide);
               },
               hideThese: function (a) {
                  a.not(this.containers).text(''), this.addWrapper(a).hide();
               },
               valid: function () {
                  return 0 === this.size();
               },
               size: function () {
                  return this.errorList.length;
               },
               focusInvalid: function () {
                  if (this.settings.focusInvalid)
                     try {
                        a(
                           this.findLastActive() ||
                              (this.errorList.length &&
                                 this.errorList[0].element) ||
                              []
                        )
                           .filter(':visible')
                           .focus()
                           .trigger('focusin');
                     } catch (b) {}
               },
               findLastActive: function () {
                  var b = this.lastActive;
                  return (
                     b &&
                     1 ===
                        a.grep(this.errorList, function (a) {
                           return a.element.name === b.name;
                        }).length &&
                     b
                  );
               },
               elements: function () {
                  var b = this,
                     c = {};
                  return a(this.currentForm)
                     .find('input, select, textarea')
                     .not(':submit, :reset, :image, :disabled')
                     .not(this.settings.ignore)
                     .filter(function () {
                        return (
                           !this.name &&
                              b.settings.debug &&
                              window.console &&
                              console.error('%o has no name assigned', this),
                           !(
                              this.name in c || !b.objectLength(a(this).rules())
                           ) && ((c[this.name] = !0), !0)
                        );
                     });
               },
               clean: function (b) {
                  return a(b)[0];
               },
               errors: function () {
                  var b = this.settings.errorClass.split(' ').join('.');
                  return a(
                     this.settings.errorElement + '.' + b,
                     this.errorContext
                  );
               },
               reset: function () {
                  (this.successList = []),
                     (this.errorList = []),
                     (this.errorMap = {}),
                     (this.toShow = a([])),
                     (this.toHide = a([])),
                     (this.currentElements = a([]));
               },
               prepareForm: function () {
                  this.reset(),
                     (this.toHide = this.errors().add(this.containers));
               },
               prepareElement: function (a) {
                  this.reset(), (this.toHide = this.errorsFor(a));
               },
               elementValue: function (b) {
                  var c,
                     d = a(b),
                     e = b.type;
                  return 'radio' === e || 'checkbox' === e
                     ? this.findByName(b.name).filter(':checked').val()
                     : 'number' === e && 'undefined' != typeof b.validity
                     ? !b.validity.badInput && d.val()
                     : ((c = d.val()),
                       'string' == typeof c ? c.replace(/\r/g, '') : c);
               },
               check: function (b) {
                  b = this.validationTargetFor(this.clean(b));
                  var c,
                     d,
                     e,
                     f = a(b).rules(),
                     g = a.map(f, function (a, b) {
                        return b;
                     }).length,
                     h = !1,
                     i = this.elementValue(b);
                  for (d in f) {
                     e = { method: d, parameters: f[d] };
                     try {
                        if (
                           ((c = a.validator.methods[d].call(
                              this,
                              i,
                              b,
                              e.parameters
                           )),
                           'dependency-mismatch' === c && 1 === g)
                        ) {
                           h = !0;
                           continue;
                        }
                        if (((h = !1), 'pending' === c))
                           return void (this.toHide = this.toHide.not(
                              this.errorsFor(b)
                           ));
                        if (!c) return this.formatAndAdd(b, e), !1;
                     } catch (j) {
                        throw (
                           (this.settings.debug &&
                              window.console &&
                              console.log(
                                 'Exception occurred when checking element ' +
                                    b.id +
                                    ", check the '" +
                                    e.method +
                                    "' method.",
                                 j
                              ),
                           j instanceof TypeError &&
                              (j.message +=
                                 '.  Exception occurred when checking element ' +
                                 b.id +
                                 ", check the '" +
                                 e.method +
                                 "' method."),
                           j)
                        );
                     }
                  }
                  if (!h)
                     return (
                        this.objectLength(f) && this.successList.push(b), !0
                     );
               },
               customDataMessage: function (b, c) {
                  return (
                     a(b).data(
                        'msg' +
                           c.charAt(0).toUpperCase() +
                           c.substring(1).toLowerCase()
                     ) || a(b).data('msg')
                  );
               },
               customMessage: function (a, b) {
                  var c = this.settings.messages[a];
                  return c && (c.constructor === String ? c : c[b]);
               },
               findDefined: function () {
                  for (var a = 0; a < arguments.length; a++)
                     if (void 0 !== arguments[a]) return arguments[a];
               },
               defaultMessage: function (b, c) {
                  return this.findDefined(
                     this.customMessage(b.name, c),
                     this.customDataMessage(b, c),
                     (!this.settings.ignoreTitle && b.title) || void 0,
                     a.validator.messages[c],
                     '<strong>Warning: No message defined for ' +
                        b.name +
                        '</strong>'
                  );
               },
               formatAndAdd: function (b, c) {
                  var d = this.defaultMessage(b, c.method),
                     e = /\$?\{(\d+)\}/g;
                  'function' == typeof d
                     ? (d = d.call(this, c.parameters, b))
                     : e.test(d) &&
                       (d = a.validator.format(
                          d.replace(e, '{$1}'),
                          c.parameters
                       )),
                     this.errorList.push({
                        message: d,
                        element: b,
                        method: c.method,
                     }),
                     (this.errorMap[b.name] = d),
                     (this.submitted[b.name] = d);
               },
               addWrapper: function (a) {
                  return (
                     this.settings.wrapper &&
                        (a = a.add(a.parent(this.settings.wrapper))),
                     a
                  );
               },
               defaultShowErrors: function () {
                  var a, b, c;
                  for (a = 0; this.errorList[a]; a++)
                     (c = this.errorList[a]),
                        this.settings.highlight &&
                           this.settings.highlight.call(
                              this,
                              c.element,
                              this.settings.errorClass,
                              this.settings.validClass
                           ),
                        this.showLabel(c.element, c.message);
                  if (
                     (this.errorList.length &&
                        (this.toShow = this.toShow.add(this.containers)),
                     this.settings.success)
                  )
                     for (a = 0; this.successList[a]; a++)
                        this.showLabel(this.successList[a]);
                  if (this.settings.unhighlight)
                     for (a = 0, b = this.validElements(); b[a]; a++)
                        this.settings.unhighlight.call(
                           this,
                           b[a],
                           this.settings.errorClass,
                           this.settings.validClass
                        );
                  (this.toHide = this.toHide.not(this.toShow)),
                     this.hideErrors(),
                     this.addWrapper(this.toShow).show();
               },
               validElements: function () {
                  return this.currentElements.not(this.invalidElements());
               },
               invalidElements: function () {
                  return a(this.errorList).map(function () {
                     return this.element;
                  });
               },
               showLabel: function (b, c) {
                  var d,
                     e,
                     f,
                     g = this.errorsFor(b),
                     h = this.idOrName(b),
                     i = a(b).attr('aria-describedby');
                  g.length
                     ? (g
                          .removeClass(this.settings.validClass)
                          .addClass(this.settings.errorClass),
                       g.html(c))
                     : ((g = a('<' + this.settings.errorElement + '>')
                          .attr('id', h + '-error')
                          .addClass(this.settings.errorClass)
                          .html(c || '')),
                       (d = g),
                       this.settings.wrapper &&
                          (d = g
                             .hide()
                             .show()
                             .wrap('<' + this.settings.wrapper + '/>')
                             .parent()),
                       this.labelContainer.length
                          ? this.labelContainer.append(d)
                          : this.settings.errorPlacement
                          ? this.settings.errorPlacement(d, a(b))
                          : d.insertAfter(b),
                       g.is('label')
                          ? g.attr('for', h)
                          : 0 === g.parents("label[for='" + h + "']").length &&
                            ((f = g
                               .attr('id')
                               .replace(/(:|\.|\[|\]|\$)/g, '\\$1')),
                            i
                               ? i.match(new RegExp('\\b' + f + '\\b')) ||
                                 (i += ' ' + f)
                               : (i = f),
                            a(b).attr('aria-describedby', i),
                            (e = this.groups[b.name]),
                            e &&
                               a.each(this.groups, function (b, c) {
                                  c === e &&
                                     a(
                                        "[name='" + b + "']",
                                        this.currentForm
                                     ).attr('aria-describedby', g.attr('id'));
                               }))),
                     !c &&
                        this.settings.success &&
                        (g.text(''),
                        'string' == typeof this.settings.success
                           ? g.addClass(this.settings.success)
                           : this.settings.success(g, b)),
                     (this.toShow = this.toShow.add(g));
               },
               errorsFor: function (b) {
                  var c = this.idOrName(b),
                     d = a(b).attr('aria-describedby'),
                     e = "label[for='" + c + "'], label[for='" + c + "'] *";
                  return (
                     d && (e = e + ', #' + d.replace(/\s+/g, ', #')),
                     this.errors().filter(e)
                  );
               },
               idOrName: function (a) {
                  return (
                     this.groups[a.name] ||
                     (this.checkable(a) ? a.name : a.id || a.name)
                  );
               },
               validationTargetFor: function (b) {
                  return (
                     this.checkable(b) && (b = this.findByName(b.name)),
                     a(b).not(this.settings.ignore)[0]
                  );
               },
               checkable: function (a) {
                  return /radio|checkbox/i.test(a.type);
               },
               findByName: function (b) {
                  return a(this.currentForm).find("[name='" + b + "']");
               },
               getLength: function (b, c) {
                  switch (c.nodeName.toLowerCase()) {
                     case 'select':
                        return a('option:selected', c).length;
                     case 'input':
                        if (this.checkable(c))
                           return this.findByName(c.name).filter(':checked')
                              .length;
                  }
                  return b.length;
               },
               depend: function (a, b) {
                  return (
                     !this.dependTypes[typeof a] ||
                     this.dependTypes[typeof a](a, b)
                  );
               },
               dependTypes: {
                  boolean: function (a) {
                     return a;
                  },
                  string: function (b, c) {
                     return !!a(b, c.form).length;
                  },
                  function: function (a, b) {
                     return a(b);
                  },
               },
               optional: function (b) {
                  var c = this.elementValue(b);
                  return (
                     !a.validator.methods.required.call(this, c, b) &&
                     'dependency-mismatch'
                  );
               },
               startRequest: function (a) {
                  this.pending[a.name] ||
                     (this.pendingRequest++, (this.pending[a.name] = !0));
               },
               stopRequest: function (b, c) {
                  this.pendingRequest--,
                     this.pendingRequest < 0 && (this.pendingRequest = 0),
                     delete this.pending[b.name],
                     c &&
                     0 === this.pendingRequest &&
                     this.formSubmitted &&
                     this.form()
                        ? (a(this.currentForm).submit(),
                          (this.formSubmitted = !1))
                        : !c &&
                          0 === this.pendingRequest &&
                          this.formSubmitted &&
                          (a(this.currentForm).triggerHandler('invalid-form', [
                             this,
                          ]),
                          (this.formSubmitted = !1));
               },
               previousValue: function (b) {
                  return (
                     a.data(b, 'previousValue') ||
                     a.data(b, 'previousValue', {
                        old: null,
                        valid: !0,
                        message: this.defaultMessage(b, 'remote'),
                     })
                  );
               },
               destroy: function () {
                  this.resetForm(),
                     a(this.currentForm)
                        .off('.validate')
                        .removeData('validator');
               },
            },
            classRuleSettings: {
               required: { required: !0 },
               email: { email: !0 },
               url: { url: !0 },
               date: { date: !0 },
               dateISO: { dateISO: !0 },
               number: { number: !0 },
               digits: { digits: !0 },
               creditcard: { creditcard: !0 },
            },
            addClassRules: function (b, c) {
               b.constructor === String
                  ? (this.classRuleSettings[b] = c)
                  : a.extend(this.classRuleSettings, b);
            },
            classRules: function (b) {
               var c = {},
                  d = a(b).attr('class');
               return (
                  d &&
                     a.each(d.split(' '), function () {
                        this in a.validator.classRuleSettings &&
                           a.extend(c, a.validator.classRuleSettings[this]);
                     }),
                  c
               );
            },
            normalizeAttributeRule: function (a, b, c, d) {
               /min|max/.test(c) &&
                  (null === b || /number|range|text/.test(b)) &&
                  ((d = Number(d)), isNaN(d) && (d = void 0)),
                  d || 0 === d
                     ? (a[c] = d)
                     : b === c && 'range' !== b && (a[c] = !0);
            },
            attributeRules: function (b) {
               var c,
                  d,
                  e = {},
                  f = a(b),
                  g = b.getAttribute('type');
               for (c in a.validator.methods)
                  'required' === c
                     ? ((d = b.getAttribute(c)),
                       '' === d && (d = !0),
                       (d = !!d))
                     : (d = f.attr(c)),
                     this.normalizeAttributeRule(e, g, c, d);
               return (
                  e.maxlength &&
                     /-1|2147483647|524288/.test(e.maxlength) &&
                     delete e.maxlength,
                  e
               );
            },
            dataRules: function (b) {
               var c,
                  d,
                  e = {},
                  f = a(b),
                  g = b.getAttribute('type');
               for (c in a.validator.methods)
                  (d = f.data(
                     'rule' +
                        c.charAt(0).toUpperCase() +
                        c.substring(1).toLowerCase()
                  )),
                     this.normalizeAttributeRule(e, g, c, d);
               return e;
            },
            staticRules: function (b) {
               var c = {},
                  d = a.data(b.form, 'validator');
               return (
                  d.settings.rules &&
                     (c =
                        a.validator.normalizeRule(d.settings.rules[b.name]) ||
                        {}),
                  c
               );
            },
            normalizeRules: function (b, c) {
               return (
                  a.each(b, function (d, e) {
                     if (e === !1) return void delete b[d];
                     if (e.param || e.depends) {
                        var f = !0;
                        switch (typeof e.depends) {
                           case 'string':
                              f = !!a(e.depends, c.form).length;
                              break;
                           case 'function':
                              f = e.depends.call(c, c);
                        }
                        f
                           ? (b[d] = void 0 === e.param || e.param)
                           : delete b[d];
                     }
                  }),
                  a.each(b, function (d, e) {
                     b[d] = a.isFunction(e) ? e(c) : e;
                  }),
                  a.each(['minlength', 'maxlength'], function () {
                     b[this] && (b[this] = Number(b[this]));
                  }),
                  a.each(['rangelength', 'range'], function () {
                     var c;
                     b[this] &&
                        (a.isArray(b[this])
                           ? (b[this] = [
                                Number(b[this][0]),
                                Number(b[this][1]),
                             ])
                           : 'string' == typeof b[this] &&
                             ((c = b[this]
                                .replace(/[\[\]]/g, '')
                                .split(/[\s,]+/)),
                             (b[this] = [Number(c[0]), Number(c[1])])));
                  }),
                  a.validator.autoCreateRanges &&
                     (null != b.min &&
                        null != b.max &&
                        ((b.range = [b.min, b.max]),
                        delete b.min,
                        delete b.max),
                     null != b.minlength &&
                        null != b.maxlength &&
                        ((b.rangelength = [b.minlength, b.maxlength]),
                        delete b.minlength,
                        delete b.maxlength)),
                  b
               );
            },
            normalizeRule: function (b) {
               if ('string' == typeof b) {
                  var c = {};
                  a.each(b.split(/\s/), function () {
                     c[this] = !0;
                  }),
                     (b = c);
               }
               return b;
            },
            addMethod: function (b, c, d) {
               (a.validator.methods[b] = c),
                  (a.validator.messages[b] =
                     void 0 !== d ? d : a.validator.messages[b]),
                  c.length < 3 &&
                     a.validator.addClassRules(b, a.validator.normalizeRule(b));
            },
            methods: {
               required: function (b, c, d) {
                  if (!this.depend(d, c)) return 'dependency-mismatch';
                  if ('select' === c.nodeName.toLowerCase()) {
                     var e = a(c).val();
                     return e && e.length > 0;
                  }
                  return this.checkable(c)
                     ? this.getLength(b, c) > 0
                     : b.length > 0;
               },
               email: function (a, b) {
                  return (
                     this.optional(b) ||
                     /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(
                        a
                     )
                  );
               },
               url: function (a, b) {
                  return (
                     this.optional(b) ||
                     /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(
                        a
                     )
                  );
               },
               date: function (a, b) {
                  return (
                     this.optional(b) ||
                     !/Invalid|NaN/.test(new Date(a).toString())
                  );
               },
               dateISO: function (a, b) {
                  return (
                     this.optional(b) ||
                     /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(
                        a
                     )
                  );
               },
               number: function (a, b) {
                  return (
                     this.optional(b) ||
                     /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(a)
                  );
               },
               digits: function (a, b) {
                  return this.optional(b) || /^\d+$/.test(a);
               },
               creditcard: function (a, b) {
                  if (this.optional(b)) return 'dependency-mismatch';
                  if (/[^0-9 \-]+/.test(a)) return !1;
                  var c,
                     d,
                     e = 0,
                     f = 0,
                     g = !1;
                  if (
                     ((a = a.replace(/\D/g, '')),
                     a.length < 13 || a.length > 19)
                  )
                     return !1;
                  for (c = a.length - 1; c >= 0; c--)
                     (d = a.charAt(c)),
                        (f = parseInt(d, 10)),
                        g && (f *= 2) > 9 && (f -= 9),
                        (e += f),
                        (g = !g);
                  return e % 10 === 0;
               },
               minlength: function (b, c, d) {
                  var e = a.isArray(b) ? b.length : this.getLength(b, c);
                  return this.optional(c) || e >= d;
               },
               maxlength: function (b, c, d) {
                  var e = a.isArray(b) ? b.length : this.getLength(b, c);
                  return this.optional(c) || e <= d;
               },
               rangelength: function (b, c, d) {
                  var e = a.isArray(b) ? b.length : this.getLength(b, c);
                  return this.optional(c) || (e >= d[0] && e <= d[1]);
               },
               min: function (a, b, c) {
                  return this.optional(b) || a >= c;
               },
               max: function (a, b, c) {
                  return this.optional(b) || a <= c;
               },
               range: function (a, b, c) {
                  return this.optional(b) || (a >= c[0] && a <= c[1]);
               },
               equalTo: function (b, c, d) {
                  var e = a(d);
                  return (
                     this.settings.onfocusout &&
                        e
                           .off('.validate-equalTo')
                           .on('blur.validate-equalTo', function () {
                              a(c).valid();
                           }),
                     b === e.val()
                  );
               },
               remote: function (b, c, d) {
                  if (this.optional(c)) return 'dependency-mismatch';
                  var e,
                     f,
                     g = this.previousValue(c);
                  return (
                     this.settings.messages[c.name] ||
                        (this.settings.messages[c.name] = {}),
                     (g.originalMessage =
                        this.settings.messages[c.name].remote),
                     (this.settings.messages[c.name].remote = g.message),
                     (d = ('string' == typeof d && { url: d }) || d),
                     g.old === b
                        ? g.valid
                        : ((g.old = b),
                          (e = this),
                          this.startRequest(c),
                          (f = {}),
                          (f[c.name] = b),
                          a.ajax(
                             a.extend(
                                !0,
                                {
                                   mode: 'abort',
                                   port: 'validate' + c.name,
                                   dataType: 'json',
                                   data: f,
                                   context: e.currentForm,
                                   success: function (d) {
                                      var f,
                                         h,
                                         i,
                                         j = d === !0 || 'true' === d;
                                      (e.settings.messages[c.name].remote =
                                         g.originalMessage),
                                         j
                                            ? ((i = e.formSubmitted),
                                              e.prepareElement(c),
                                              (e.formSubmitted = i),
                                              e.successList.push(c),
                                              delete e.invalid[c.name],
                                              e.showErrors())
                                            : ((f = {}),
                                              (h =
                                                 d ||
                                                 e.defaultMessage(c, 'remote')),
                                              (f[c.name] = g.message =
                                                 a.isFunction(h) ? h(b) : h),
                                              (e.invalid[c.name] = !0),
                                              e.showErrors(f)),
                                         (g.valid = j),
                                         e.stopRequest(c, j);
                                   },
                                },
                                d
                             )
                          ),
                          'pending')
                  );
               },
            },
         });
      var b,
         c = {};
      a.ajaxPrefilter
         ? a.ajaxPrefilter(function (a, b, d) {
              var e = a.port;
              'abort' === a.mode && (c[e] && c[e].abort(), (c[e] = d));
           })
         : ((b = a.ajax),
           (a.ajax = function (d) {
              var e = ('mode' in d ? d : a.ajaxSettings).mode,
                 f = ('port' in d ? d : a.ajaxSettings).port;
              return 'abort' === e
                 ? (c[f] && c[f].abort(),
                   (c[f] = b.apply(this, arguments)),
                   c[f])
                 : b.apply(this, arguments);
           }));
   }),
   Object.create ||
      (Object.create = function (a, b) {
         function c() {}
         if ('object' != typeof a && 'function' != typeof a)
            throw new TypeError('Object prototype may only be an Object: ' + a);
         if (null === a)
            throw new Error(
               "This browser's implementation of Object.create is a shim and doesn't support 'null' as the first argument."
            );
         if ('undefined' != typeof b)
            throw new Error(
               "This browser's implementation of Object.create is a shim and doesn't support a second argument."
            );
         return (c.prototype = a), new c();
      }),
   ('undefined' != typeof console && 'undefined' != typeof console.log) ||
      (this.console = { log: function () {} });
var TaxService = function (a) {
   this.calculator = a;
};
TaxService.prototype.sumCalculator = function () {
   return this.calculator.calculate();
};
var Calculator = function (a) {
   this.dataUser = a;
};
(Calculator.prototype.firstStepA1 = function (a) {
   return (
      this.dataUser.sumByTax2 <= this.config.MS_VALUE
         ? ((a.result = this.dataUser.sumByTax2 - this.config.MS_VALUE_1),
           (a.benefits += this.config.MS_VALUE_1))
         : (a.result = this.dataUser.sumByTax2),
      (a.result = a.result < 0 ? 0 : a.result),
      console.log('Finish 1 step with result:', a.result),
      a
   );
}),
   (Calculator.prototype.firstStepA1NoDeduction = function (a) {
      return (
         (a.result = this.dataUser.sumByTax2),
         console.log('Finish 1 step (no deduction) with result:', a.result),
         a
      );
   }),
   (Calculator.prototype.secondStepA1 = function (a) {
      if (this.dataUser.oneParent5)
         (a.result =
            a.result -
            this.config.MS_VALUE_2 * this.dataUser.countChildBeforeEighteen6),
            (a.benefits +=
               this.config.MS_VALUE_2 *
               this.dataUser.countChildBeforeEighteen6);
      else if (
         0 === this.dataUser.countChildBeforeEighteen6 &&
         0 === this.dataUser.countChildInvalid7
      );
      else if (
         1 === this.dataUser.countChildBeforeEighteen6 &&
         0 === this.dataUser.countChildInvalid7
      )
         (a.result = a.result - this.config.MS_VALUE_3),
            (a.benefits += this.config.MS_VALUE_3);
      else if (
         1 === this.dataUser.countChildBeforeEighteen6 &&
         1 === this.dataUser.countChildInvalid7
      )
         (a.result = a.result - this.config.MS_VALUE_2),
            (a.benefits += this.config.MS_VALUE_2);
      else if (
         this.dataUser.countChildBeforeEighteen6 >= 2 &&
         this.dataUser.countChildInvalid7 <=
            this.dataUser.countChildBeforeEighteen6
      )
         (a.result =
            a.result -
            this.config.MS_VALUE_2 * this.dataUser.countChildBeforeEighteen6),
            (a.benefits +=
               this.config.MS_VALUE_2 *
               this.dataUser.countChildBeforeEighteen6);
      else if (
         this.dataUser.countChildInvalid7 >
         this.dataUser.countChildBeforeEighteen6
      )
         throw new CountChildInvalidError();
      return (
         (a.result = a.result < 0 ? 0 : a.result),
         console.log('Finish 2 step with result:', a.result),
         a
      );
   }),
   (Calculator.prototype.threeStepA1 = function (a) {
      return (
         this.dataUser.oneParent5
            ? ((a.result =
                 a.result -
                 this.config.MS_VALUE_2 * this.dataUser.countDependents8),
              (a.benefits +=
                 this.config.MS_VALUE_2 * this.dataUser.countDependents8))
            : ((a.result =
                 a.result -
                 this.config.MS_VALUE_3 * this.dataUser.countDependents8),
              (a.benefits +=
                 this.config.MS_VALUE_3 * this.dataUser.countDependents8)),
         (a.result = a.result < 0 ? 0 : a.result),
         console.log('Finish 3 step with result:', a.result),
         a
      );
   }),
   (Calculator.prototype.fourStepA1 = function (a) {
      return (
         this.dataUser.privileges9
            ? ((a.result = a.result - this.config.MS_VALUE_4),
              (a.benefits += this.config.MS_VALUE_4))
            : (a.result = a.result),
         (a.result = a.result < 0 ? 0 : a.result),
         console.log('Finish 4 step with result:', a.result),
         a
      );
   }),
   (Calculator.prototype.fiveStepA1 = function (a) {
      return (
         (a.result = a.result - this.dataUser.sumByEducation10),
         (a.benefits += this.dataUser.sumByEducation10),
         (a.result = a.result < 0 ? 0 : a.result),
         console.log('Finish 5 step with result:', a.result),
         a
      );
   }),
   (Calculator.prototype.sixStepA1 = function (a) {
      return (
         this.dataUser.sumSpendInsurancePremiums11 <= this.config.MS_VALUE_5
            ? ((a.result =
                 a.result - this.dataUser.sumSpendInsurancePremiums11),
              (a.benefits += this.dataUser.sumSpendInsurancePremiums11))
            : ((a.result = a.result - this.config.MS_VALUE_5),
              (a.benefits += this.config.MS_VALUE_5)),
         (a.result = a.result < 0 ? 0 : a.result),
         console.log('Finish 6 step with result:', a.result),
         a
      );
   }),
   (Calculator.prototype.sevenStepA1 = function (a) {
      return (
         (a.result = a.result - this.dataUser.costsForBuild12),
         (a.benefits += this.dataUser.costsForBuild12),
         (a.result = a.result < 0 ? 0 : a.result),
         console.log('Finish 7 step with result:', a.result),
         a
      );
   }),
   (Calculator.prototype.additionalStepA1 = function (a) {
      return (
         (a.result =
            a.result -
            this.dataUser.sumByEducation10 -
            this.dataUser.sumSpendInsurancePremiums11 -
            this.dataUser.costsForBuild12),
         (a.benefits =
            a.benefits +
            this.dataUser.sumByEducation10 +
            this.dataUser.sumSpendInsurancePremiums11 +
            this.dataUser.costsForBuild12),
         (a.result = a.result < 0 ? 0 : a.result),
         console.log('Finish additional step with result:', a.result),
         a
      );
   }),
   (Calculator.prototype.income = function (a, b) {
      if (a.selectYear > 2019)
         return (
            console.log(' > 2019'),
            ((1 == this.dataUser.incomeType1 ||
               2 == this.dataUser.incomeType1) &&
               this.dataUser.haveJob3 &&
               !this.dataUser.incomeFromJob4) ||
            5 == this.dataUser.incomeType1
               ? ((a = this.firstStepA1NoDeduction(a)),
                 2021 !== a.selectYear && (a = this.additionalStepA1(a)),
                 this.finishStep(a, b))
               : ((a = this.firstStepA1(a)),
                 (a = this.secondStepA1(a)),
                 (a = this.threeStepA1(a)),
                 (a = this.fourStepA1(a)),
                 ((1 != this.dataUser.incomeType1 &&
                    2 != this.dataUser.incomeType1) ||
                    this.dataUser.haveJob3) &&
                    ((a = this.fiveStepA1(a)),
                    (a = this.sixStepA1(a)),
                    (a = this.sevenStepA1(a))),
                 this.finishStep(a, b))
         );
      if (a.selectYear < 2019) {
         if (this.dataUser.haveJob3 && this.dataUser.incomeFromJob4)
            return (
               (a = this.firstStepA1(a)),
               (a = this.secondStepA1(a)),
               (a = this.threeStepA1(a)),
               (a = this.fourStepA1(a)),
               (a = this.fiveStepA1(a)),
               (a = this.sixStepA1(a)),
               (a = this.sevenStepA1(a)),
               this.finishStep(a, b)
            );
         if (this.dataUser.haveJob3 && !this.dataUser.incomeFromJob4)
            return (a.result = this.dataUser.sumByTax2), this.finishStep(a, b);
         if (!this.dataUser.haveJob3)
            return (
               (a = this.firstStepA1(a)),
               (a = this.secondStepA1(a)),
               (a = this.threeStepA1(a)),
               (a = this.fourStepA1(a)),
               this.finishStep(a, b)
            );
      }
      return 2019 === a.selectYear
         ? (1 != this.dataUser.incomeType1 && 2 != this.dataUser.incomeType1) ||
           !this.dataUser.haveJob3 ||
           this.dataUser.incomeFromJob4
            ? 5 == this.dataUser.incomeType1
               ? ((a = this.firstStepA1NoDeduction(a)),
                 (a = this.additionalStepA1(a)),
                 this.finishStep(a, b))
               : ((a = this.firstStepA1(a)),
                 (a = this.secondStepA1(a)),
                 (a = this.threeStepA1(a)),
                 (a = this.fourStepA1(a)),
                 (a = this.fiveStepA1(a)),
                 (a = this.sixStepA1(a)),
                 (a = this.sevenStepA1(a)),
                 this.finishStep(a, b))
            : ((a = this.firstStepA1NoDeduction(a)),
              (a = this.additionalStepA1(a)),
              this.finishStep(a, b))
         : void 0;
   }),
   (Calculator.prototype.finishStep = function (a, b) {
      return (
         console.log('Last step for get percent:', a, b),
         (a.result = (a.result / 100) * b),
         this.dataUser.sumByTax2 < a.benefits &&
            (a.benefits = this.dataUser.sumByTax2),
         a
      );
   }),
   (Calculator.prototype.setFormUserData = function (a) {
      this.dataUser = a;
   }),
   (CountChildInvalidError.property = Object.create(Error.prototype)),
   (CountChildInvalidError.constructor = CountChildInvalidError);
var Calculator2015 = function (a) {
   (this.config = {
      MS_VALUE: 442e4,
      MS_VALUE_1: 73e4,
      MS_VALUE_2: 41e4,
      MS_VALUE_3: 21e4,
      MS_VALUE_4: 103e4,
      MS_VALUE_5: 16e6,
      percent: { PERCENT_13: 13, PERCENT_9: 9, PERCENT_4: 4, PERCENT_16: 16 },
   }),
      Calculator.apply(this, arguments);
};
(Calculator2015.prototype = Object.create(Calculator.prototype)),
   (Calculator2015.constructor = Calculator2015),
   (Calculator2015.prototype.calculate = function () {
      var a = { result: 0, benefits: 0 };
      switch (this.dataUser.incomeType1) {
         case 1:
            return this.income(a, this.config.percent.PERCENT_13);
         case 2:
            return this.income(a, this.config.percent.PERCENT_9);
         default:
            throw new Error('not found');
      }
   });
var Calculator2016 = function (a) {
   (this.config = {
      MS_VALUE: 501e4,
      MS_VALUE_1: 83e4,
      MS_VALUE_2: 46e4,
      MS_VALUE_3: 24e4,
      MS_VALUE_4: 117e4,
      MS_VALUE_5: 1813e4,
      percent: { PERCENT_13: 13, PERCENT_9: 9, PERCENT_4: 4, PERCENT_16: 16 },
   }),
      Calculator.apply(this, arguments);
};
(Calculator2016.prototype = Object.create(Calculator.prototype)),
   (Calculator2016.constructor = Calculator2016),
   (Calculator2016.prototype.calculate = function () {
      var a = { result: 0, benefits: 0 };
      switch (this.dataUser.incomeType1) {
         case 1:
            return this.income(a, this.config.percent.PERCENT_13);
         case 2:
            return this.income(a, this.config.percent.PERCENT_9);
         case 3:
            return (
               (a.result = this.dataUser.sumByTax2),
               this.finishStep(a, this.config.percent.PERCENT_4)
            );
         case 4:
            return (
               (a.result = this.dataUser.sumByTax2),
               this.finishStep(a, this.config.percent.PERCENT_16)
            );
      }
   });
var Calculator2016after = function (a) {
   (this.config = {
      MS_VALUE: 501,
      MS_VALUE_1: 83,
      MS_VALUE_2: 46,
      MS_VALUE_3: 24,
      MS_VALUE_4: 117,
      MS_VALUE_5: 1813,
      percent: { PERCENT_13: 13, PERCENT_9: 9, PERCENT_4: 4, PERCENT_16: 16 },
   }),
      Calculator.apply(this, arguments);
};
(Calculator2016after.prototype = Object.create(Calculator.prototype)),
   (Calculator2016after.constructor = Calculator2016after),
   (Calculator2016after.prototype.calculate = function () {
      var a = { result: 0, benefits: 0 };
      switch (this.dataUser.incomeType1) {
         case 1:
            return this.income(a, this.config.percent.PERCENT_13);
         case 2:
            return this.income(a, this.config.percent.PERCENT_9);
         case 3:
            return (
               (a.result = this.dataUser.sumByTax2),
               this.finishStep(a, this.config.percent.PERCENT_4)
            );
         case 4:
            return (
               (a.result = this.dataUser.sumByTax2),
               this.finishStep(a, this.config.percent.PERCENT_16)
            );
      }
   });
var Calculator2017 = function (a) {
   (this.config = {
      MS_VALUE: 563,
      MS_VALUE_1: 93,
      MS_VALUE_2: 52,
      MS_VALUE_3: 27,
      MS_VALUE_4: 131,
      MS_VALUE_5: 2874,
      percent: { PERCENT_13: 13, PERCENT_9: 9, PERCENT_4: 4, PERCENT_16: 16 },
   }),
      Calculator.apply(this, arguments);
};
(Calculator2017.prototype = Object.create(Calculator.prototype)),
   (Calculator2017.constructor = Calculator2017),
   (Calculator2017.prototype.calculate = function () {
      var a = { result: 0, benefits: 0 };
      switch (this.dataUser.incomeType1) {
         case 1:
            return this.income(a, this.config.percent.PERCENT_13);
         case 2:
            return this.income(a, this.config.percent.PERCENT_9);
         case 3:
            return (
               (a.result = this.dataUser.sumByTax2),
               this.finishStep(a, this.config.percent.PERCENT_4)
            );
         case 4:
            return (
               (a.result = this.dataUser.sumByTax2),
               this.finishStep(a, this.config.percent.PERCENT_16)
            );
         case 5:
            return (
               (a.result = this.dataUser.sumByTax2),
               this.finishStep(a, this.config.percent.PERCENT_13)
            );
      }
   });
var Calculator2018 = function (a) {
   (this.config = {
      MS_VALUE: 620,
      MS_VALUE_1: 102,
      MS_VALUE_2: 57,
      MS_VALUE_3: 30,
      MS_VALUE_4: 144,
      MS_VALUE_5: 3164,
      percent: { PERCENT_13: 13, PERCENT_9: 9, PERCENT_4: 4, PERCENT_16: 16 },
   }),
      Calculator.apply(this, arguments);
};
(Calculator2018.prototype = Object.create(Calculator.prototype)),
   (Calculator2018.constructor = Calculator2018),
   (Calculator2018.prototype.calculate = function () {
      var a = { result: 0, benefits: 0 };
      switch (this.dataUser.incomeType1) {
         case 1:
            return this.income(a, this.config.percent.PERCENT_13);
         case 2:
            return this.income(a, this.config.percent.PERCENT_9);
         case 3:
            return (
               (a.result = this.dataUser.sumByTax2),
               this.finishStep(a, this.config.percent.PERCENT_4)
            );
         case 4:
            return (
               (a.result = this.dataUser.sumByTax2),
               this.finishStep(a, this.config.percent.PERCENT_16)
            );
         case 5:
            return (
               (a.result = this.dataUser.sumByTax2),
               this.finishStep(a, this.config.percent.PERCENT_13)
            );
      }
   });
var Calculator2019 = function (a) {
   (this.config = {
      MS_VALUE: 665,
      MS_VALUE_1: 110,
      MS_VALUE_2: 61,
      MS_VALUE_3: 32,
      MS_VALUE_4: 155,
      MS_VALUE_5: 99999999999,
      percent: { PERCENT_13: 13, PERCENT_9: 9, PERCENT_4: 4, PERCENT_16: 16 },
   }),
      Calculator.apply(this, arguments);
};
(Calculator2019.prototype = Object.create(Calculator.prototype)),
   (Calculator2019.constructor = Calculator2019),
   (Calculator2019.prototype.calculate = function () {
      var a = { result: 0, benefits: 0, selectYear: 2019 };
      switch (this.dataUser.incomeType1) {
         case 1:
            return this.income(a, this.config.percent.PERCENT_13);
         case 2:
            return this.income(a, this.config.percent.PERCENT_9);
         case 3:
            return (
               (a.result = this.dataUser.sumByTax2),
               this.finishStep(a, this.config.percent.PERCENT_4)
            );
         case 4:
            return (
               (a.result = this.dataUser.sumByTax2),
               this.finishStep(a, this.config.percent.PERCENT_16)
            );
         case 5:
            return this.income(a, this.config.percent.PERCENT_13);
      }
   });
var Calculator2020 = function (a) {
   (this.config = {
      MS_VALUE: 709,
      MS_VALUE_1: 117,
      MS_VALUE_2: 65,
      MS_VALUE_3: 34,
      MS_VALUE_4: 165,
      MS_VALUE_5: 99999999999,
      percent: { PERCENT_13: 13, PERCENT_9: 9, PERCENT_4: 4, PERCENT_16: 16 },
   }),
      Calculator.apply(this, arguments);
};
(Calculator2020.prototype = Object.create(Calculator.prototype)),
   (Calculator2020.constructor = Calculator2020),
   (Calculator2020.prototype.calculate = function () {
      var a = { result: 0, benefits: 0, selectYear: 2020 };
      switch (this.dataUser.incomeType1) {
         case 1:
            return this.income(a, this.config.percent.PERCENT_13);
         case 2:
            return this.income(a, this.config.percent.PERCENT_9);
         case 3:
            return (
               (a.result = this.dataUser.sumByTax2),
               this.finishStep(a, this.config.percent.PERCENT_4)
            );
         case 4:
            return (
               (a.result = this.dataUser.sumByTax2),
               this.finishStep(a, this.config.percent.PERCENT_16)
            );
         case 5:
            return this.income(a, this.config.percent.PERCENT_13);
      }
   });
var Calculator2021 = function (a) {
   (this.config = {
      MS_VALUE: 761,
      MS_VALUE_1: 126,
      MS_VALUE_2: 70,
      MS_VALUE_3: 37,
      MS_VALUE_4: 177,
      MS_VALUE_5: 99999999999,
      percent: { PERCENT_13: 13, PERCENT_9: 13, PERCENT_4: 4, PERCENT_16: 16 },
   }),
      Calculator.apply(this, arguments);
};
(Calculator2021.prototype = Object.create(Calculator.prototype)),
   (Calculator2021.constructor = Calculator2021),
   (Calculator2021.prototype.calculate = function () {
      var a = { result: 0, benefits: 0, selectYear: 2021 };
      switch (this.dataUser.incomeType1) {
         case 1:
            return this.income(a, this.config.percent.PERCENT_13);
         case 2:
            return this.income(a, this.config.percent.PERCENT_9);
         case 3:
            return (
               (a.result = this.dataUser.sumByTax2),
               this.finishStep(a, this.config.percent.PERCENT_4)
            );
         case 4:
            return (
               (a.result = this.dataUser.sumByTax2),
               this.finishStep(a, this.config.percent.PERCENT_16)
            );
         case 5:
            return this.income(a, this.config.percent.PERCENT_13);
      }
   }),
   (function (a) {
      function b(b) {
         var c = b,
            d = c.value.length;
         if ('selectionEnd' in c) {
            var e = c.selectionEnd;
            a(c).val(g(a(c).val().replace(/\s+/g, '').replace(/\,/, '.')));
            var f = c.value.length;
            c.setSelectionRange(e + (f - d), e + (f - d));
         } else {
            var h = c.createTextRange();
            h.expand('character', c.value.length);
            var i = document.selection.createRange();
            i.setEndPoint('StartToStart', h);
            var j = i.text.length;
            a(c).val(g(a(c).val().replace(/\s+/g, '').replace(/\,/, '.')));
            var f = c.value.length;
            i.move('character', j + (f - d)), i.select();
         }
      }
      function c(a, b) {
         var c = [],
            d = [];
         for (var e in a) a.hasOwnProperty(e) && c.push(e);
         for (var e in b) b.hasOwnProperty(e) && d.push(e);
         if (c.length != d.length) return !1;
         for (var f = 0; f < c.length; f++) {
            var g = c[f];
            if (a[g] !== b[g]) return !1;
         }
         return !0;
      }
      function d() {
         a('.modal-calculator .calc-sum-tax-label').text(0),
            a('.modal-calculator .calc-quantity-tax-label').text(0),
            a('.modal-calculator .calc-progress-complete').css('width', '0%'),
            a('.modal-calculator .calc-progress-2').css('width', '0%'),
            a('.modal-calculator .calc-benefits-result').text(0),
            a('.modal-calculator .calc-triangle').css('margin-left', '0%');
      }
      function e() {
         var a = null,
            b = null;
         if (
            ((p = !c(o.formUser, o.defaultUser)),
            2015 !== n &&
               2016 !== n &&
               '2016after' !== n &&
               2017 !== n &&
               2018 !== n &&
               2019 !== n &&
               2020 !== n &&
               2021 !== n)
         )
            throw new Error('Not found realization for the year');
         2015 === n &&
            ((b = new Calculator2015(f(o.formUser))), (a = new TaxService(b))),
            2016 === n &&
               ((b = new Calculator2016(f(o.formUser))),
               (a = new TaxService(b))),
            '2016after' === n &&
               ((b = new Calculator2016after(f(o.formUser))),
               (a = new TaxService(b))),
            2017 === n &&
               ((b = new Calculator2017(f(o.formUser))),
               (a = new TaxService(b))),
            2018 === n &&
               ((b = new Calculator2018(f(o.formUser))),
               (a = new TaxService(b))),
            2019 === n &&
               ((b = new Calculator2019(f(o.formUser))),
               (a = new TaxService(b))),
            2020 === n &&
               ((b = new Calculator2020(f(o.formUser))),
               (a = new TaxService(b))),
            2021 === n &&
               ((b = new Calculator2021(f(o.formUser))),
               (a = new TaxService(b)));
         try {
            var d = a.sumCalculator();
            i(d, b, n), console.log('Finish result:', d.result);
         } catch (e) {
            console.log(e.message), console.log('Finish result:', 0);
         }
      }
      function f(b) {
         return {
            incomeType1: +b.incomeType1,
            sumByTax2: +b.sumByTax2,
            haveJob3: a.parseJSON(b.haveJob3),
            incomeFromJob4: a.parseJSON(b.incomeFromJob4),
            oneParent5: a.parseJSON(b.oneParent5),
            countChildBeforeEighteen6: +b.countChildBeforeEighteen6,
            countChildInvalid7: +b.countChildInvalid7,
            countDependents8: +b.countDependents8,
            privileges9: a.parseJSON(b.privileges9),
            sumByEducation10: +b.sumByEducation10,
            sumSpendInsurancePremiums11: +b.sumSpendInsurancePremiums11,
            costsForBuild12: +b.costsForBuild12,
         };
      }
      function g(a) {
         return 0 === a
            ? 0
            : a.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
      }
      function h(a, b) {
         var b = b || 0,
            c = Math.pow(10, b),
            d = Math.abs(Math.round(a * c)),
            e = (a < 0 ? '-' : '') + String(Math.floor(d / c));
         if (b > 0) {
            var f = String(d % c),
               g = new Array(Math.max(b - f.length, 0) + 1).join('0');
            e += '.' + g + f;
         }
         return e;
      }
      function i(b, c, d) {
         a(
            '.modal-calculator .calc-right-part-gerb .if-not-by-agent-2021'
         ).hide(),
            a('.modal-calculator .calc-block-information')
               .find('.calc-not-privileges-agent')
               .hide(),
            2019 !== d &&
               2020 !== d &&
               2021 !== d &&
               ('false' === o.formUser.incomeFromJob4 &&
               'true' === o.formUser.haveJob3
                  ? (a('.txt').hide(),
                    3 == o.formUser.incomeType1 ||
                    4 == o.formUser.incomeType1 ||
                    5 == o.formUser.incomeType1
                       ? a('.txt').show()
                       : a('.txt').hide(),
                    a('.modal-calculator .calc-block-information')
                       .find(
                          '.calc-add-sum,.calc-add-privileges,.calc-show-tax,.calc-not-privileges'
                       )
                       .hide(),
                    a('.modal-calculator .calc-not-privileges').show())
                  : 0 !== +o.formUser.sumByTax2 ||
                    (1 != o.formUser.incomeType1 && 2 != o.formUser.incomeType1)
                  ? (3 != o.formUser.incomeType1 &&
                       4 != o.formUser.incomeType1 &&
                       5 != o.formUser.incomeType1) ||
                    (2016 !== d &&
                       '2016after' !== d &&
                       2017 !== d &&
                       2018 !== d)
                     ? (l(o) &&
                          ('false' === o.formUser.haveJob3 ||
                             'true' === o.formUser.haveJob3) &&
                          +o.formUser.sumByTax2 > 0) ||
                       b.benefits > 0
                        ? (a('.modal-calculator .calc-block-information')
                             .find(
                                '.calc-add-sum,.calc-add-privileges,.calc-show-tax,.calc-not-privileges'
                             )
                             .hide(),
                          a('.modal-calculator .calc-show-tax').show())
                        : ((+o.formUser.sumByTax2 > 0 &&
                             'true' === o.formUser.incomeFromJob4) ||
                             'false' === o.formUser.haveJob3 ||
                             'true' === o.formUser.haveJob3) &&
                          (a('.modal-calculator .calc-block-information')
                             .find(
                                '.calc-add-sum,.calc-add-privileges,.calc-show-tax,.calc-not-privileges'
                             )
                             .hide(),
                          a('.modal-calculator .calc-add-privileges').show())
                     : (a('.modal-calculator .calc-block-information')
                          .find(
                             '.calc-add-sum,.calc-add-privileges,.calc-show-tax,.calc-not-privileges'
                          )
                          .hide(),
                       a('.modal-calculator .calc-not-privileges').show(),
                       a('.txt').show())
                  : (a('.modal-calculator .calc-block-information')
                       .find(
                          '.calc-add-sum,.calc-add-privileges,.calc-show-tax,.calc-not-privileges'
                       )
                       .hide(),
                    a('.modal-calculator .calc-add-sum').show())),
            d >= 2019 &&
               (2021 !== d ||
               (((1 != o.formUser.incomeType1 && 2 != o.formUser.incomeType1) ||
                  'true' !== o.formUser.haveJob3 ||
                  'false' !== o.formUser.incomeFromJob4) &&
                  5 != o.formUser.incomeType1)
                  ? 0 !== +o.formUser.sumByTax2 ||
                    (1 != o.formUser.incomeType1 &&
                       2 != o.formUser.incomeType1 &&
                       5 != o.formUser.incomeType1)
                     ? 3 == o.formUser.incomeType1 ||
                       4 == o.formUser.incomeType1
                        ? (a('.modal-calculator .calc-block-information')
                             .find(
                                '.calc-add-sum,.calc-add-privileges,.calc-show-tax,.calc-not-privileges'
                             )
                             .hide(),
                          a('.modal-calculator .calc-not-privileges').show(),
                          a('.txt').show())
                        : !(+o.formUser.sumByTax2 > 0) ||
                          ((5 != o.formUser.incomeType1 ||
                             m(o) ||
                             0 !== b.benefits) &&
                             ((1 != o.formUser.incomeType1 &&
                                2 != o.formUser.incomeType1) ||
                                'true' !== o.formUser.haveJob3 ||
                                'true' !== o.formUser.incomeFromJob4 ||
                                l(o) ||
                                0 !== b.benefits) &&
                             ((1 != o.formUser.incomeType1 &&
                                2 != o.formUser.incomeType1) ||
                                'true' !== o.formUser.haveJob3 ||
                                'false' !== o.formUser.incomeFromJob4 ||
                                m(o) ||
                                0 !== b.benefits) &&
                             ((1 != o.formUser.incomeType1 &&
                                2 != o.formUser.incomeType1) ||
                                'false' !== o.formUser.haveJob3 ||
                                l(o) ||
                                0 !== b.benefits))
                        ? (a('.modal-calculator .calc-block-information')
                             .find(
                                '.calc-add-sum,.calc-add-privileges,.calc-show-tax,.calc-not-privileges'
                             )
                             .hide(),
                          a('.modal-calculator .calc-show-tax').show())
                        : (a('.modal-calculator .calc-block-information')
                             .find(
                                '.calc-add-sum,.calc-add-privileges,.calc-show-tax,.calc-not-privileges'
                             )
                             .hide(),
                          a('.modal-calculator .calc-add-privileges').show())
                     : (a('.modal-calculator .calc-block-information')
                          .find(
                             '.calc-add-sum,.calc-add-privileges,.calc-show-tax,.calc-not-privileges'
                          )
                          .hide(),
                       a('.modal-calculator .calc-add-sum').show())
                  : (a('.modal-calculator .calc-block-information')
                       .find(
                          '.calc-add-sum,.calc-add-privileges,.calc-show-tax,.calc-not-privileges'
                       )
                       .hide(),
                    a('.modal-calculator .calc-not-privileges-agent').show(),
                    a('.txt').show())),
            2021 === d && 5 == o.formUser.incomeType1
               ? (a('.modal-calculator .calc-right-part').hide(),
                 a('.modal-calculator .calc-right-part-gerb').show(),
                 a(
                    '.modal-calculator .calc-right-part-gerb .if-incomeFromJob4-is-false'
                 ).hide(),
                 a(
                    '.modal-calculator .calc-right-part-gerb .if-incomeFromJob4-is-true'
                 ).hide(),
                 a(
                    '.modal-calculator .calc-right-part-gerb .if-not-by-agent-2021'
                 ).show())
               : (2019 === d ||
                    2020 === d ||
                    2021 === d ||
                    (3 != o.formUser.incomeType1 &&
                       4 != o.formUser.incomeType1 &&
                       5 != o.formUser.incomeType1)) &&
                 ((2019 !== d && 2020 !== d) ||
                    (3 != o.formUser.incomeType1 &&
                       4 != o.formUser.incomeType1)) &&
                 (2021 !== d ||
                    (3 != o.formUser.incomeType1 &&
                       4 != o.formUser.incomeType1))
               ? d < 2019 &&
                 'true' === o.formUser.haveJob3 &&
                 'false' === o.formUser.incomeFromJob4
                  ? (a('.modal-calculator .calc-right-part').hide(),
                    a('.modal-calculator .calc-right-part-gerb').show(),
                    a(
                       '.modal-calculator .calc-right-part-gerb .if-incomeFromJob4-is-false'
                    ).show(),
                    a(
                       '.modal-calculator .calc-right-part-gerb .if-incomeFromJob4-is-true'
                    ).hide())
                  : 2021 !== d ||
                    (1 != o.formUser.incomeType1 &&
                       2 != o.formUser.incomeType1) ||
                    'true' !== o.formUser.haveJob3 ||
                    'false' !== o.formUser.incomeFromJob4
                  ? (a('.modal-calculator .calc-right-part-gerb').hide(),
                    a('.modal-calculator .calc-right-part').show(),
                    a(
                       '.modal-calculator .calc-right-part-gerb .if-incomeFromJob4-is-false'
                    ).hide(),
                    a(
                       '.modal-calculator .calc-right-part-gerb .if-incomeFromJob4-is-true'
                    ).show())
                  : (a('.modal-calculator .calc-right-part').hide(),
                    a('.modal-calculator .calc-right-part-gerb').show(),
                    a(
                       '.modal-calculator .calc-right-part-gerb .if-not-by-agent-2021'
                    ).show(),
                    a(
                       '.modal-calculator .calc-right-part-gerb .if-incomeFromJob4-is-false'
                    ).hide(),
                    a(
                       '.modal-calculator .calc-right-part-gerb .if-incomeFromJob4-is-true'
                    ).hide())
               : (a('.modal-calculator .calc-right-part').hide(),
                 a('.modal-calculator .calc-right-part-gerb').show(),
                 a(
                    '.modal-calculator .calc-right-part-gerb .if-incomeFromJob4-is-false'
                 ).hide(),
                 a(
                    '.modal-calculator .calc-right-part-gerb .if-incomeFromJob4-is-true'
                 ).show()),
            3 == o.formUser.incomeType1 ||
            4 == o.formUser.incomeType1 ||
            5 == o.formUser.incomeType1
               ? a('.display-calcblock').hide()
               : 2019 !== d &&
                 2020 !== d &&
                 2021 !== d &&
                 'false' === o.formUser.haveJob3
               ? (a('.modal-calculator .calc-block-not-work').hide(),
                 a('.modal-calculator .calc-form-border').show())
               : 2019 === d ||
                 2020 === d ||
                 2021 === d ||
                 (1 != o.formUser.incomeType1 && 2 != o.formUser.incomeType1) ||
                 'true' !== o.formUser.haveJob3
               ? (2019 !== d && 2020 !== d && 2021 !== d) ||
                 (1 != o.formUser.incomeType1 && 2 != o.formUser.incomeType1) ||
                 (a('.modal-calculator .tax-deductions').show(),
                 a('.display-calcblock').hide(),
                 a('.modal-calculator .calc-form-border').show(),
                 2021 === d && 'false' === o.formUser.haveJob3
                    ? a('.modal-calculator .calc-block-not-work').hide()
                    : a('.modal-calculator .calc-block-not-work').show(),
                 'false' === o.formUser.haveJob3
                    ? a('.modal-calculator .income-from-job').hide()
                    : 'true' === o.formUser.haveJob3 &&
                      'false' === o.formUser.incomeFromJob4 &&
                      a('.modal-calculator .tax-deductions').hide())
               : (a('.modal-calculator .calc-form-border').show(),
                 a('.modal-calculator .calc-block-not-work').show()),
            (2019 !== d && 2020 !== d) ||
               5 != o.formUser.incomeType1 ||
               (a('.modal-calculator .tax-deductions').hide(),
               a('.modal-calculator .calc-form-border').show(),
               a('.modal-calculator .calc-block-not-work').show(),
               a('.display-calcblock').hide()),
            2015 == d || 2016 == d
               ? (a('.calc-sum-tax-label').text(g(Math.round(b.result))),
                 a('.calc-benefits-result').text(g(b.benefits)),
                 a('.calc-quantity-tax-label').text(g(o.formUser.sumByTax2)))
               : ('2016after' != d &&
                    2017 !== d &&
                    2018 !== d &&
                    2019 !== d &&
                    2020 !== d &&
                    2021 !== d) ||
                 (a('.calc-sum-tax-label').text(g(h(b.result, 2))),
                 a('.calc-quantity-tax-label').text(
                    g(h(o.formUser.sumByTax2, 2))
                 ),
                 a('.calc-benefits-result').text(g(h(b.benefits, 2))));
         var e =
            0 === b.result
               ? 0
               : Math.round((100 * b.result) / +o.formUser.sumByTax2);
         a('.calc-progress-complete').css('width', e + '%'),
            a('.calc-triangle').css('margin-left', e + '%');
      }
      function j(b) {
         a.extend(o.formUser, o.defaultUser);
         for (var c in o.formUser)
            'incomeType1' !== c &&
               (a('.modal-calculator input[name=' + c + ']').val(o.formUser[c]),
               a('.modal-calculator input[name=' + c + ']').val(o.formUser[c]));
         a('.modal-calculator .calc-income-tooltip').tooltip('enable'),
            a('.modal-calculator .calc-income-tooltip:first').tooltip(
               'disable'
            ),
            a('.modal-calculator .calc-income-type').removeClass('select');
         var f = 2019 === b || 2020 === b ? '#for2019' : '#notFor2019';
         2021 === b && (f = '#for2021');
         var g = a('.modal-calculator .calc-income .calc-income-type:eq(0)');
         g.addClass('select', 3e3).find(f).prop('checked', !0),
            g
               .find('.calc-income-type-text.calc-income-first')
               .removeClass('calc-dots')
               .find('span')
               .show(),
            a(
               '.modal-calculator .calc-income .calc-income-type:eq(1) .calc-income-type-text'
            ).addClass('calc-dots'),
            a(
               '.modal-calculator .calc-income .calc-income-type:eq(2) .calc-income-type-text'
            ).addClass('calc-dots'),
            a(
               '.modal-calculator .calc-income .calc-income-type:eq(3) .calc-income-type-text'
            ).addClass('calc-dots'),
            a(
               '.modal-calculator .calc-income .calc-income-type:eq(4) .calc-income-type-text'
            ).addClass('calc-dots'),
            a('.modal-calculator .btn-group')
               .find('.calc-button')
               .removeClass('calc-check'),
            a(
               '.modal-calculator .btn-group:eq(0) .calc-button:eq(0),.btn-group:eq(1) .calc-button:eq(0)'
            ).addClass('calc-check'),
            a(
               '.modal-calculator .btn-group:eq(2) .calc-button:eq(1),.btn-group:eq(3) .calc-button:eq(1)'
            ).addClass('calc-check'),
            a('.modal-calculator .calc-block-not-work').show(),
            a('.modal-calculator .calc-right-part-gerb').hide(),
            a('.display-calcblock').show(),
            a('.modal-calculator .calc-right-part').show(),
            a('.modal-calculator .calc-block-information')
               .find(
                  '.calc-add-sum,.calc-add-privileges,.calc-show-tax,.calc-not-privileges,.calc-not-privileges-agent'
               )
               .hide(),
            a('.modal-calculator .calc-add-sum').show(),
            a('.modal-calculator .calc-amount-tax-block').hide(),
            (p = !1),
            d();
         a('.modal-calculator .form').valid();
         e();
      }
      function k() {
         var b = a(this).find('.modal-calc-container');
         b.css(
            'margin-top',
            Math.max(0, (a(window).height() - b.height()) / 2)
         );
      }
      function l(a) {
         return (
            'false' !== a.formUser.oneParent5 ||
            '' !== a.formUser.countChildBeforeEighteen6 ||
            '' !== a.formUser.countChildInvalid7 ||
            '' !== a.formUser.countDependents8 ||
            'false' !== a.formUser.privileges9 ||
            '' !== a.formUser.sumByEducation10 ||
            '' !== a.formUser.sumSpendInsurancePremiums11 ||
            '' !== a.formUser.costsForBuild12
         );
      }
      function m(a) {
         return (
            '' !== a.formUser.sumByEducation10 ||
            '' !== a.formUser.sumSpendInsurancePremiums11 ||
            '' !== a.formUser.costsForBuild12
         );
      }
      var n = 2015,
         o = {
            formUser: {
               incomeType1: '1',
               sumByTax2: '',
               haveJob3: 'true',
               incomeFromJob4: 'true',
               oneParent5: 'false',
               countChildBeforeEighteen6: '',
               countChildInvalid7: '',
               countDependents8: '',
               privileges9: 'false',
               sumByEducation10: '',
               sumSpendInsurancePremiums11: '',
               costsForBuild12: '',
            },
            defaultUser: {
               incomeType1: '1',
               sumByTax2: '',
               haveJob3: 'true',
               incomeFromJob4: 'true',
               oneParent5: 'false',
               countChildBeforeEighteen6: '',
               countChildInvalid7: '',
               countDependents8: '',
               privileges9: 'false',
               sumByEducation10: '',
               sumSpendInsurancePremiums11: '',
               costsForBuild12: '',
            },
         },
         p = !1;
      a(document).ready(function () {
         function c() {
            return 'Введенные данные и расчеты не будут сохранены.';
         }
         console.log('DEBUG MODE!'),
            p && (window.onbeforeunload = c),
            a('.modal').on('shown.bs.modal', k),
            a(window).on('resize', function () {
               a('.modal:visible').each(k);
            }),
            a('.modal-calculator .calc-income-tooltip').tooltip({
               trigger: 'hover',
               html: !0,
               placement: 'auto',
            }),
            a('.modal-calculator .calc-income-tooltip:first').tooltip(
               'disable'
            ),
            a('.modal-calculator .calc-info-icon').tooltip({
               placement: 'auto',
            }),
            a.validator.addMethod(
               'checkInvalidChild',
               function (b, c, d) {
                  var e = !0;
                  return (
                     +a('.modal-calculator [name=countChildInvalid7]').val() >
                        +a(
                           '.modal-calculator [name=countChildBeforeEighteen6]'
                        ).val() &&
                        a('.modal-calculator [name=countChildInvalid7]').val()
                           .length > 0 &&
                        (e = !1),
                     e
                  );
               },
               'Your error message!'
            ),
            a.validator.addMethod('maxLength', function (b, c, d) {
               if (2015 == n || 2016 == n) {
                  if (b.length > 15) {
                     var e = 0;
                     (e =
                        c.value.indexOf(' ') !== -1
                           ? a(c).val().slice(0, 15)
                           : a(c).val().slice(0, 12)),
                        a(
                           '.modal-calculator [name=' + a(c).attr('name') + ']'
                        ).val(e);
                  }
                  return !0;
               }
               if (
                  '2016after' == n ||
                  2017 == n ||
                  2018 === n ||
                  2019 === n ||
                  2020 === n ||
                  2021 === n
               ) {
                  if (b.length > 11) {
                     var e = 0;
                     (e =
                        c.value.indexOf(' ') !== -1
                           ? a(c).val().slice(0, 13)
                           : a(c).val().slice(0, 1)),
                        a(
                           '.modal-calculator [name=' + a(c).attr('name') + ']'
                        ).val(e);
                  }
                  return !0;
               }
            }),
            a.validator.addMethod('regNumber', function (a, b, c) {
               return /^(\d?)+$/.test(a.replace(/\s+/g, ''));
            }),
            a.validator.addMethod('addAmount', function (a, b, c) {
               return 2015 == n || 2016 == n
                  ? /^(\d?)+$/.test(a.replace(/\s+/g, ''))
                  : ('2016after' != n &&
                       2017 != n &&
                       2018 !== n &&
                       2019 !== n &&
                       2020 !== n &&
                       2021 !== n) ||
                       /^(\d?)+(\.?)(\d?){2}$/.test(
                          a.replace(/\,+/g, '.').replace(/\s+/g, '')
                       );
            }),
            a.validator.addMethod('', function (a, b, c) {
               return 2015 == n || 2016 == n
                  ? /^(\d?)+$/.test(a.replace(/\s+/g, ''))
                  : ('2016after' != n &&
                       2017 != n &&
                       2018 !== n &&
                       2019 !== n &&
                       2020 !== n &&
                       2021 !== n) ||
                       /^(\d?)+(\.?)(\d?){2}$/.test(
                          a.replace(/\,+/g, '.').replace(/\s+/g, '')
                       );
            });
         var d = a('.modal-calculator .form').validate({
            errorPlacement: function (a, b) {
               return !0;
            },
            rules: {
               sumByTax2: { maxLength: !0, addAmount: !0 },
               countChildBeforeEighteen6: { maxLength: !0, regNumber: !0 },
               countChildInvalid7: {
                  maxLength: !0,
                  regNumber: !0,
                  checkInvalidChild: !0,
               },
               countDependents8: { maxLength: !0, regNumber: !0 },
               sumByEducation10: { maxLength: !0, addAmount: !0 },
               sumSpendInsurancePremiums11: { maxLength: !0, addAmount: !0 },
               costsForBuild12: { maxLength: !0, addAmount: !0 },
            },
         });
         a('.modal-calculator [name=incomeType1]').on('change', function (b) {
            a('.modal-calculator .calc-income')
               .find('.calc-income-type')
               .removeClass('select')
               .find('.calc-income-type-text')
               .addClass('calc-dots')
               .find(),
               a(this).closest('.calc-income-type').addClass('select'),
               a('.modal-calculator .calc-income-tooltip').tooltip('enable');
            var c = a(this)
               .closest('.calc-income-tooltip')
               .tooltip('disable')
               .parent('.calc-income-type')
               .find('.calc-income-type-text');
            c.hasClass('calc-income-first')
               ? c.find('span').show()
               : a(
                    '.modal-calculator .calc-income-type-text.calc-income-first span'
                 ).hide(),
               c.removeClass('calc-dots'),
               (o.formUser[a(this).attr('name')] = a(this).val()),
               e();
         }),
            a('button[name = "yearButton2015"]').click(function () {
               a('#calculatorModalChooser').modal('hide'),
                  (n = 2015),
                  a('.additional-for-2016, .hide-2017, .hide-2019').hide(),
                  a('.for2016').hide(),
                  a(
                     '.for2016after, .radio-for-2017б, .for2017, .for2018, .for2019, .radio-for-2019-g, .radio-for-2017-g'
                  ).hide(),
                  a('.for2020, .for2021').hide(),
                  a('.for2015, .not_for_2018, .not_for_2019').show(),
                  setTimeout(function () {
                     j();
                  }, 100),
                  e();
            }),
            a('button[name = "yearButton2016"]').click(function () {
               a('#calculatorModalChooser').modal('hide'),
                  (n = 2016),
                  a(
                     '.additional-for-2016, .hide-2017, .hide-2019, .tax-deductions'
                  ).show(),
                  a('.for2015').hide(),
                  a(
                     '.for2016after, .radio-for-2017, .for2017, .for2018, .for2019, .radio-for-2019-g, .radio-for-2017-g'
                  ).hide(),
                  a('.for2020, .for2021').hide(),
                  a('.for2016, .not_for_2018, .not_for_2019').show(),
                  setTimeout(function () {
                     j();
                  }, 100),
                  e();
            }),
            a('button[name = "yearButton2016after"]').click(function () {
               a('#calculatorModalChooser').modal('hide'),
                  (n = '2016after'),
                  a(
                     '.additional-for-2016, .hide-2017, .hide-2019, .tax-deductions'
                  ).show(),
                  a(
                     '.for2015, .for2016, .radio-for-2017, .for2017, .for2018, .for2019, .radio-for-2019-g, .radio-for-2017-g'
                  ).hide(),
                  a('.for2020, .for2021').hide(),
                  a('.for2016after, .not_for_2018, .not_for_2019').show(),
                  setTimeout(function () {
                     j();
                  }, 100),
                  e();
            }),
            a('button[name = "yearButton2017"]').click(function () {
               a('#calculatorModalChooser').modal('hide'),
                  (n = 2017),
                  a(
                     '.additional-for-2016, .radio-for-2017, .radio-for-2017-g, .hide-2019, .tax-deductions'
                  ).show(),
                  a(
                     '.for2015, .for2016, .for2016after, .hide-2017, .for2018, .for2019, .radio-for-2019-g'
                  ).hide(),
                  a('.for2020, .for2021').hide(),
                  a(
                     '.for2017, .radio-for-2017, .not_for_2018, .not_for_2019, .radio-for-2017-g'
                  ).show(),
                  setTimeout(function () {
                     j();
                  }, 100),
                  e();
            }),
            a('button[name = "yearButton2018"]').click(function () {
               a('#calculatorModalChooser').modal('hide'),
                  (n = 2018),
                  a(
                     '.additional-for-2016, .radio-for-2017, .radio-for-2017-g, .hide-2019, .tax-deductions'
                  ).show(),
                  a(
                     '.for2015, .for2016, .for2016after, .hide-2017, .for2017, .not_for_2018, .for2019, .radio-for-2019-g'
                  ).hide(),
                  a('.for2020, .for2021').hide(),
                  a(
                     '.for2018, .radio-for-2017, .not_for_2019, .radio-for-2017-g'
                  ).show(),
                  setTimeout(function () {
                     j();
                  }, 100),
                  e();
            }),
            a('button[name = "yearButton2019"]').click(function () {
               a('#calculatorModalChooser').modal('hide'),
                  (n = 2019),
                  a(
                     '.additional-for-2016, .radio-for-2017, .tax-deductions'
                  ).show(),
                  a(
                     '.for2015, .for2016, .for2016after, .hide-2017, .for2017, .not_for_2018, .for2018, .not_for_2019, .radio-for-2017-g, .hide-2019'
                  ).hide(),
                  a('.for2020, .for2021').hide(),
                  a('.for2019, .radio-for-2017, .radio-for-2019-g').show(),
                  setTimeout(function () {
                     j(2019);
                  }, 100),
                  e();
            }),
            a('button[name = "yearButton2020"]').click(function () {
               a('#calculatorModalChooser').modal('hide'),
                  (n = 2020),
                  a(
                     '.additional-for-2016, .radio-for-2017, .tax-deductions'
                  ).show(),
                  a(
                     '.for2015, .for2016, .for2016after, .hide-2017, .for2017, .not_for_2018, .for2018, .not_for_2019, .radio-for-2017-g, .hide-2019'
                  ).hide(),
                  a('.radio-for-2017, .radio-for-2019-g').show(),
                  a('.for2019').hide(),
                  a('.for2021').hide(),
                  a('.for2020').show(),
                  setTimeout(function () {
                     j(2020);
                  }, 100),
                  e();
            }),
            a('button[name = "yearButton2021"]').click(function () {
               a('#calculatorModalChooser').modal('hide'),
                  (n = 2021),
                  a(
                     '.additional-for-2016, .radio-for-2017, .tax-deductions'
                  ).show(),
                  a(
                     '.for2015, .for2016, .for2016after, .hide-2017, .for2017, .not_for_2018, .for2018, .not_for_2019, .radio-for-2017-g, .hide-2019'
                  ).hide(),
                  a('.radio-for-2017, .radio-for-2019-g').show(),
                  a('.for2019, .for2020').hide(),
                  a('.for2021').show(),
                  setTimeout(function () {
                     j(2021);
                  }, 100),
                  e();
            }),
            a('.modal-calculator .btn-group').on('click', function (b) {
               a(this).find('.calc-button').removeClass('calc-check'),
                  (o.formUser[a(b.target).attr('name')] = a(b.target).val()),
                  a(b.target).addClass('calc-check'),
                  e();
            }),
            a('.modal-calculator .calc-custom-button').click(function (b) {
               var c = a(this)
                     .parent('.input-group-btn')
                     .prev('div')
                     .find('input')
                     .attr('name'),
                  d = +o.formUser[c];
               '+' === this.value
                  ? (d += 1)
                  : '-' === this.value && ((d -= 1), d < 0 && (d = 0)),
                  (o.formUser[c] = d + ''),
                  a('.modal-calculator [name=' + c + ']').val(o.formUser[c]),
                  a('.modal-calculator .form').valid(),
                  e();
            }),
            a(
               '.modal-calculator [name=sumByTax2],[name=countChildBeforeEighteen6],[name=countChildInvalid7],[name=countDependents8],[name=sumByEducation10],[name=sumSpendInsurancePremiums11],[name=costsForBuild12]'
            ).on({
               keyup: function () {
                  a('.modal-calculator .form').valid(),
                     d.element(
                        '.modal-calculator [name=' + a(this).attr('name') + ']'
                     )
                        ? ((o.formUser[a(this).attr('name')] = a(this)
                             .val()
                             .replace(/\s+/g, '')
                             .replace(/\,/, '.')),
                          b(this))
                        : (o.formUser[a(this).attr('name')] = '0'),
                     '0' === a('.modal-calculator [name=sumByTax2]').val() ||
                     (+o.formUser.sumByTax2 >= 0 &&
                        d.element('.modal-calculator [name=sumByTax2]') &&
                        '' !== a('.modal-calculator [name=sumByTax2]').val())
                        ? a('.modal-calculator .calc-amount-tax-block').show()
                        : a('.modal-calculator .calc-amount-tax-block').hide(),
                     e();
               },
            }),
            a(
               '.modal-calculator [name=sumByTax2],[name=sumByEducation10],[name=sumSpendInsurancePremiums11],[name=costsForBuild12]'
            ).blur(function () {
               var c = a(this);
               if (
                  d.element(
                     '.modal-calculator [name=' + c.attr('name') + ']'
                  ) &&
                  ('2016after' == n ||
                     2017 === n ||
                     2018 === n ||
                     2019 === n ||
                     2020 === n ||
                     2021 === n)
               )
                  if ('' === a(c).val()) a(c).val('');
                  else {
                     var f = c.val().replace(/\s+/g, '').replace(/\,/, '.'),
                        g = h(parseFloat(f), 2);
                     a(c).val(g), b(this);
                  }
               e();
            }),
            a('.modal-calculator .calc-reset').click(function () {
               j(n);
            });
      });
   })(jQuery),
   $(document).ready(function () {
      $('a[href*="#calculatorModal"]').click(function (a) {
         a.preventDefault(), $('#calculatorModalChooser').modal();
      });
   });

document.addEventListener('DOMContentLoaded', function() {
    const currentPath = window.location.pathname;
    const menuItems = document.querySelectorAll('.sidebar__list a');

    menuItems.forEach(function(item) {
        let currentHref = "/" + item.getAttribute('href') ;
        
        if (currentHref === currentPath) {
            item.classList.add('active');
        }
    });
});


document.addEventListener("DOMContentLoaded", function() {
  const currentPage = window.location.pathname;
  const menuItems = document.querySelectorAll('.cigarettes__menu-item a');

  menuItems.forEach(item => {
      const href = "/" + item.getAttribute('href');
      if (href.includes(currentPage)) {
          item.classList.add('active');
      }
  });
});
!function(i){"use strict";"function"==typeof define&&define.amd?define(["jquery"],i):"undefined"!=typeof exports?module.exports=i(require("jquery")):i(jQuery)}(function(i){"use strict";var e=window.Slick||{};(e=function(){var e=0;return function(t,o){var s,n=this;n.defaults={accessibility:!0,adaptiveHeight:!1,appendArrows:i(t),appendDots:i(t),arrows:!0,asNavFor:null,prevArrow:'<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',nextArrow:'<button class="slick-next" aria-label="Next" type="button">Next</button>',autoplay:!1,autoplaySpeed:3e3,centerMode:!1,centerPadding:"50px",cssEase:"ease",customPaging:function(e,t){return i('<button type="button" />').text(t+1)},dots:!1,dotsClass:"slick-dots",draggable:!0,easing:"linear",edgeFriction:.35,fade:!1,focusOnSelect:!1,focusOnChange:!1,infinite:!0,initialSlide:0,lazyLoad:"ondemand",mobileFirst:!1,pauseOnHover:!0,pauseOnFocus:!0,pauseOnDotsHover:!1,respondTo:"window",responsive:null,rows:1,rtl:!1,slide:"",slidesPerRow:1,slidesToShow:1,slidesToScroll:1,speed:500,swipe:!0,swipeToSlide:!1,touchMove:!0,touchThreshold:5,useCSS:!0,useTransform:!0,variableWidth:!1,vertical:!1,verticalSwiping:!1,waitForAnimate:!0,zIndex:1e3},n.initials={animating:!1,dragging:!1,autoPlayTimer:null,currentDirection:0,currentLeft:null,currentSlide:0,direction:1,$dots:null,listWidth:null,listHeight:null,loadIndex:0,$nextArrow:null,$prevArrow:null,scrolling:!1,slideCount:null,slideWidth:null,$slideTrack:null,$slides:null,sliding:!1,slideOffset:0,swipeLeft:null,swiping:!1,$list:null,touchObject:{},transformsEnabled:!1,unslicked:!1},i.extend(n,n.initials),n.activeBreakpoint=null,n.animType=null,n.animProp=null,n.breakpoints=[],n.breakpointSettings=[],n.cssTransitions=!1,n.focussed=!1,n.interrupted=!1,n.hidden="hidden",n.paused=!0,n.positionProp=null,n.respondTo=null,n.rowCount=1,n.shouldClick=!0,n.$slider=i(t),n.$slidesCache=null,n.transformType=null,n.transitionType=null,n.visibilityChange="visibilitychange",n.windowWidth=0,n.windowTimer=null,s=i(t).data("slick")||{},n.options=i.extend({},n.defaults,o,s),n.currentSlide=n.options.initialSlide,n.originalSettings=n.options,void 0!==document.mozHidden?(n.hidden="mozHidden",n.visibilityChange="mozvisibilitychange"):void 0!==document.webkitHidden&&(n.hidden="webkitHidden",n.visibilityChange="webkitvisibilitychange"),n.autoPlay=i.proxy(n.autoPlay,n),n.autoPlayClear=i.proxy(n.autoPlayClear,n),n.autoPlayIterator=i.proxy(n.autoPlayIterator,n),n.changeSlide=i.proxy(n.changeSlide,n),n.clickHandler=i.proxy(n.clickHandler,n),n.selectHandler=i.proxy(n.selectHandler,n),n.setPosition=i.proxy(n.setPosition,n),n.swipeHandler=i.proxy(n.swipeHandler,n),n.dragHandler=i.proxy(n.dragHandler,n),n.keyHandler=i.proxy(n.keyHandler,n),n.instanceUid=e++,n.htmlExpr=/^(?:\s*(<[\w\W]+>)[^>]*)$/,n.registerBreakpoints(),n.init(!0)}}()).prototype.activateADA=function(){this.$slideTrack.find(".slick-active").attr({"aria-hidden":"false"}).find("a, input, button, select").attr({tabindex:"0"})},e.prototype.addSlide=e.prototype.slickAdd=function(e,t,o){var s=this;if("boolean"==typeof t)o=t,t=null;else if(t<0||t>=s.slideCount)return!1;s.unload(),"number"==typeof t?0===t&&0===s.$slides.length?i(e).appendTo(s.$slideTrack):o?i(e).insertBefore(s.$slides.eq(t)):i(e).insertAfter(s.$slides.eq(t)):!0===o?i(e).prependTo(s.$slideTrack):i(e).appendTo(s.$slideTrack),s.$slides=s.$slideTrack.children(this.options.slide),s.$slideTrack.children(this.options.slide).detach(),s.$slideTrack.append(s.$slides),s.$slides.each(function(e,t){i(t).attr("data-slick-index",e)}),s.$slidesCache=s.$slides,s.reinit()},e.prototype.animateHeight=function(){var i=this;if(1===i.options.slidesToShow&&!0===i.options.adaptiveHeight&&!1===i.options.vertical){var e=i.$slides.eq(i.currentSlide).outerHeight(!0);i.$list.animate({height:e},i.options.speed)}},e.prototype.animateSlide=function(e,t){var o={},s=this;s.animateHeight(),!0===s.options.rtl&&!1===s.options.vertical&&(e=-e),!1===s.transformsEnabled?!1===s.options.vertical?s.$slideTrack.animate({left:e},s.options.speed,s.options.easing,t):s.$slideTrack.animate({top:e},s.options.speed,s.options.easing,t):!1===s.cssTransitions?(!0===s.options.rtl&&(s.currentLeft=-s.currentLeft),i({animStart:s.currentLeft}).animate({animStart:e},{duration:s.options.speed,easing:s.options.easing,step:function(i){i=Math.ceil(i),!1===s.options.vertical?(o[s.animType]="translate("+i+"px, 0px)",s.$slideTrack.css(o)):(o[s.animType]="translate(0px,"+i+"px)",s.$slideTrack.css(o))},complete:function(){t&&t.call()}})):(s.applyTransition(),e=Math.ceil(e),!1===s.options.vertical?o[s.animType]="translate3d("+e+"px, 0px, 0px)":o[s.animType]="translate3d(0px,"+e+"px, 0px)",s.$slideTrack.css(o),t&&setTimeout(function(){s.disableTransition(),t.call()},s.options.speed))},e.prototype.getNavTarget=function(){var e=this,t=e.options.asNavFor;return t&&null!==t&&(t=i(t).not(e.$slider)),t},e.prototype.asNavFor=function(e){var t=this.getNavTarget();null!==t&&"object"==typeof t&&t.each(function(){var t=i(this).slick("getSlick");t.unslicked||t.slideHandler(e,!0)})},e.prototype.applyTransition=function(i){var e=this,t={};!1===e.options.fade?t[e.transitionType]=e.transformType+" "+e.options.speed+"ms "+e.options.cssEase:t[e.transitionType]="opacity "+e.options.speed+"ms "+e.options.cssEase,!1===e.options.fade?e.$slideTrack.css(t):e.$slides.eq(i).css(t)},e.prototype.autoPlay=function(){var i=this;i.autoPlayClear(),i.slideCount>i.options.slidesToShow&&(i.autoPlayTimer=setInterval(i.autoPlayIterator,i.options.autoplaySpeed))},e.prototype.autoPlayClear=function(){var i=this;i.autoPlayTimer&&clearInterval(i.autoPlayTimer)},e.prototype.autoPlayIterator=function(){var i=this,e=i.currentSlide+i.options.slidesToScroll;i.paused||i.interrupted||i.focussed||(!1===i.options.infinite&&(1===i.direction&&i.currentSlide+1===i.slideCount-1?i.direction=0:0===i.direction&&(e=i.currentSlide-i.options.slidesToScroll,i.currentSlide-1==0&&(i.direction=1))),i.slideHandler(e))},e.prototype.buildArrows=function(){var e=this;!0===e.options.arrows&&(e.$prevArrow=i(e.options.prevArrow).addClass("slick-arrow"),e.$nextArrow=i(e.options.nextArrow).addClass("slick-arrow"),e.slideCount>e.options.slidesToShow?(e.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),e.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),e.htmlExpr.test(e.options.prevArrow)&&e.$prevArrow.prependTo(e.options.appendArrows),e.htmlExpr.test(e.options.nextArrow)&&e.$nextArrow.appendTo(e.options.appendArrows),!0!==e.options.infinite&&e.$prevArrow.addClass("slick-disabled").attr("aria-disabled","true")):e.$prevArrow.add(e.$nextArrow).addClass("slick-hidden").attr({"aria-disabled":"true",tabindex:"-1"}))},e.prototype.buildDots=function(){var e,t,o=this;if(!0===o.options.dots){for(o.$slider.addClass("slick-dotted"),t=i("<ul />").addClass(o.options.dotsClass),e=0;e<=o.getDotCount();e+=1)t.append(i("<li />").append(o.options.customPaging.call(this,o,e)));o.$dots=t.appendTo(o.options.appendDots),o.$dots.find("li").first().addClass("slick-active")}},e.prototype.buildOut=function(){var e=this;e.$slides=e.$slider.children(e.options.slide+":not(.slick-cloned)").addClass("slick-slide"),e.slideCount=e.$slides.length,e.$slides.each(function(e,t){i(t).attr("data-slick-index",e).data("originalStyling",i(t).attr("style")||"")}),e.$slider.addClass("slick-slider"),e.$slideTrack=0===e.slideCount?i('<div class="slick-track"/>').appendTo(e.$slider):e.$slides.wrapAll('<div class="slick-track"/>').parent(),e.$list=e.$slideTrack.wrap('<div class="slick-list"/>').parent(),e.$slideTrack.css("opacity",0),!0!==e.options.centerMode&&!0!==e.options.swipeToSlide||(e.options.slidesToScroll=1),i("img[data-lazy]",e.$slider).not("[src]").addClass("slick-loading"),e.setupInfinite(),e.buildArrows(),e.buildDots(),e.updateDots(),e.setSlideClasses("number"==typeof e.currentSlide?e.currentSlide:0),!0===e.options.draggable&&e.$list.addClass("draggable")},e.prototype.buildRows=function(){var i,e,t,o,s,n,r,l=this;if(o=document.createDocumentFragment(),n=l.$slider.children(),l.options.rows>1){for(r=l.options.slidesPerRow*l.options.rows,s=Math.ceil(n.length/r),i=0;i<s;i++){var d=document.createElement("div");for(e=0;e<l.options.rows;e++){var a=document.createElement("div");for(t=0;t<l.options.slidesPerRow;t++){var c=i*r+(e*l.options.slidesPerRow+t);n.get(c)&&a.appendChild(n.get(c))}d.appendChild(a)}o.appendChild(d)}l.$slider.empty().append(o),l.$slider.children().children().children().css({width:100/l.options.slidesPerRow+"%",display:"inline-block"})}},e.prototype.checkResponsive=function(e,t){var o,s,n,r=this,l=!1,d=r.$slider.width(),a=window.innerWidth||i(window).width();if("window"===r.respondTo?n=a:"slider"===r.respondTo?n=d:"min"===r.respondTo&&(n=Math.min(a,d)),r.options.responsive&&r.options.responsive.length&&null!==r.options.responsive){s=null;for(o in r.breakpoints)r.breakpoints.hasOwnProperty(o)&&(!1===r.originalSettings.mobileFirst?n<r.breakpoints[o]&&(s=r.breakpoints[o]):n>r.breakpoints[o]&&(s=r.breakpoints[o]));null!==s?null!==r.activeBreakpoint?(s!==r.activeBreakpoint||t)&&(r.activeBreakpoint=s,"unslick"===r.breakpointSettings[s]?r.unslick(s):(r.options=i.extend({},r.originalSettings,r.breakpointSettings[s]),!0===e&&(r.currentSlide=r.options.initialSlide),r.refresh(e)),l=s):(r.activeBreakpoint=s,"unslick"===r.breakpointSettings[s]?r.unslick(s):(r.options=i.extend({},r.originalSettings,r.breakpointSettings[s]),!0===e&&(r.currentSlide=r.options.initialSlide),r.refresh(e)),l=s):null!==r.activeBreakpoint&&(r.activeBreakpoint=null,r.options=r.originalSettings,!0===e&&(r.currentSlide=r.options.initialSlide),r.refresh(e),l=s),e||!1===l||r.$slider.trigger("breakpoint",[r,l])}},e.prototype.changeSlide=function(e,t){var o,s,n,r=this,l=i(e.currentTarget);switch(l.is("a")&&e.preventDefault(),l.is("li")||(l=l.closest("li")),n=r.slideCount%r.options.slidesToScroll!=0,o=n?0:(r.slideCount-r.currentSlide)%r.options.slidesToScroll,e.data.message){case"previous":s=0===o?r.options.slidesToScroll:r.options.slidesToShow-o,r.slideCount>r.options.slidesToShow&&r.slideHandler(r.currentSlide-s,!1,t);break;case"next":s=0===o?r.options.slidesToScroll:o,r.slideCount>r.options.slidesToShow&&r.slideHandler(r.currentSlide+s,!1,t);break;case"index":var d=0===e.data.index?0:e.data.index||l.index()*r.options.slidesToScroll;r.slideHandler(r.checkNavigable(d),!1,t),l.children().trigger("focus");break;default:return}},e.prototype.checkNavigable=function(i){var e,t;if(e=this.getNavigableIndexes(),t=0,i>e[e.length-1])i=e[e.length-1];else for(var o in e){if(i<e[o]){i=t;break}t=e[o]}return i},e.prototype.cleanUpEvents=function(){var e=this;e.options.dots&&null!==e.$dots&&(i("li",e.$dots).off("click.slick",e.changeSlide).off("mouseenter.slick",i.proxy(e.interrupt,e,!0)).off("mouseleave.slick",i.proxy(e.interrupt,e,!1)),!0===e.options.accessibility&&e.$dots.off("keydown.slick",e.keyHandler)),e.$slider.off("focus.slick blur.slick"),!0===e.options.arrows&&e.slideCount>e.options.slidesToShow&&(e.$prevArrow&&e.$prevArrow.off("click.slick",e.changeSlide),e.$nextArrow&&e.$nextArrow.off("click.slick",e.changeSlide),!0===e.options.accessibility&&(e.$prevArrow&&e.$prevArrow.off("keydown.slick",e.keyHandler),e.$nextArrow&&e.$nextArrow.off("keydown.slick",e.keyHandler))),e.$list.off("touchstart.slick mousedown.slick",e.swipeHandler),e.$list.off("touchmove.slick mousemove.slick",e.swipeHandler),e.$list.off("touchend.slick mouseup.slick",e.swipeHandler),e.$list.off("touchcancel.slick mouseleave.slick",e.swipeHandler),e.$list.off("click.slick",e.clickHandler),i(document).off(e.visibilityChange,e.visibility),e.cleanUpSlideEvents(),!0===e.options.accessibility&&e.$list.off("keydown.slick",e.keyHandler),!0===e.options.focusOnSelect&&i(e.$slideTrack).children().off("click.slick",e.selectHandler),i(window).off("orientationchange.slick.slick-"+e.instanceUid,e.orientationChange),i(window).off("resize.slick.slick-"+e.instanceUid,e.resize),i("[draggable!=true]",e.$slideTrack).off("dragstart",e.preventDefault),i(window).off("load.slick.slick-"+e.instanceUid,e.setPosition)},e.prototype.cleanUpSlideEvents=function(){var e=this;e.$list.off("mouseenter.slick",i.proxy(e.interrupt,e,!0)),e.$list.off("mouseleave.slick",i.proxy(e.interrupt,e,!1))},e.prototype.cleanUpRows=function(){var i,e=this;e.options.rows>1&&((i=e.$slides.children().children()).removeAttr("style"),e.$slider.empty().append(i))},e.prototype.clickHandler=function(i){!1===this.shouldClick&&(i.stopImmediatePropagation(),i.stopPropagation(),i.preventDefault())},e.prototype.destroy=function(e){var t=this;t.autoPlayClear(),t.touchObject={},t.cleanUpEvents(),i(".slick-cloned",t.$slider).detach(),t.$dots&&t.$dots.remove(),t.$prevArrow&&t.$prevArrow.length&&(t.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display",""),t.htmlExpr.test(t.options.prevArrow)&&t.$prevArrow.remove()),t.$nextArrow&&t.$nextArrow.length&&(t.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display",""),t.htmlExpr.test(t.options.nextArrow)&&t.$nextArrow.remove()),t.$slides&&(t.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function(){i(this).attr("style",i(this).data("originalStyling"))}),t.$slideTrack.children(this.options.slide).detach(),t.$slideTrack.detach(),t.$list.detach(),t.$slider.append(t.$slides)),t.cleanUpRows(),t.$slider.removeClass("slick-slider"),t.$slider.removeClass("slick-initialized"),t.$slider.removeClass("slick-dotted"),t.unslicked=!0,e||t.$slider.trigger("destroy",[t])},e.prototype.disableTransition=function(i){var e=this,t={};t[e.transitionType]="",!1===e.options.fade?e.$slideTrack.css(t):e.$slides.eq(i).css(t)},e.prototype.fadeSlide=function(i,e){var t=this;!1===t.cssTransitions?(t.$slides.eq(i).css({zIndex:t.options.zIndex}),t.$slides.eq(i).animate({opacity:1},t.options.speed,t.options.easing,e)):(t.applyTransition(i),t.$slides.eq(i).css({opacity:1,zIndex:t.options.zIndex}),e&&setTimeout(function(){t.disableTransition(i),e.call()},t.options.speed))},e.prototype.fadeSlideOut=function(i){var e=this;!1===e.cssTransitions?e.$slides.eq(i).animate({opacity:0,zIndex:e.options.zIndex-2},e.options.speed,e.options.easing):(e.applyTransition(i),e.$slides.eq(i).css({opacity:0,zIndex:e.options.zIndex-2}))},e.prototype.filterSlides=e.prototype.slickFilter=function(i){var e=this;null!==i&&(e.$slidesCache=e.$slides,e.unload(),e.$slideTrack.children(this.options.slide).detach(),e.$slidesCache.filter(i).appendTo(e.$slideTrack),e.reinit())},e.prototype.focusHandler=function(){var e=this;e.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick","*",function(t){t.stopImmediatePropagation();var o=i(this);setTimeout(function(){e.options.pauseOnFocus&&(e.focussed=o.is(":focus"),e.autoPlay())},0)})},e.prototype.getCurrent=e.prototype.slickCurrentSlide=function(){return this.currentSlide},e.prototype.getDotCount=function(){var i=this,e=0,t=0,o=0;if(!0===i.options.infinite)if(i.slideCount<=i.options.slidesToShow)++o;else for(;e<i.slideCount;)++o,e=t+i.options.slidesToScroll,t+=i.options.slidesToScroll<=i.options.slidesToShow?i.options.slidesToScroll:i.options.slidesToShow;else if(!0===i.options.centerMode)o=i.slideCount;else if(i.options.asNavFor)for(;e<i.slideCount;)++o,e=t+i.options.slidesToScroll,t+=i.options.slidesToScroll<=i.options.slidesToShow?i.options.slidesToScroll:i.options.slidesToShow;else o=1+Math.ceil((i.slideCount-i.options.slidesToShow)/i.options.slidesToScroll);return o-1},e.prototype.getLeft=function(i){var e,t,o,s,n=this,r=0;return n.slideOffset=0,t=n.$slides.first().outerHeight(!0),!0===n.options.infinite?(n.slideCount>n.options.slidesToShow&&(n.slideOffset=n.slideWidth*n.options.slidesToShow*-1,s=-1,!0===n.options.vertical&&!0===n.options.centerMode&&(2===n.options.slidesToShow?s=-1.5:1===n.options.slidesToShow&&(s=-2)),r=t*n.options.slidesToShow*s),n.slideCount%n.options.slidesToScroll!=0&&i+n.options.slidesToScroll>n.slideCount&&n.slideCount>n.options.slidesToShow&&(i>n.slideCount?(n.slideOffset=(n.options.slidesToShow-(i-n.slideCount))*n.slideWidth*-1,r=(n.options.slidesToShow-(i-n.slideCount))*t*-1):(n.slideOffset=n.slideCount%n.options.slidesToScroll*n.slideWidth*-1,r=n.slideCount%n.options.slidesToScroll*t*-1))):i+n.options.slidesToShow>n.slideCount&&(n.slideOffset=(i+n.options.slidesToShow-n.slideCount)*n.slideWidth,r=(i+n.options.slidesToShow-n.slideCount)*t),n.slideCount<=n.options.slidesToShow&&(n.slideOffset=0,r=0),!0===n.options.centerMode&&n.slideCount<=n.options.slidesToShow?n.slideOffset=n.slideWidth*Math.floor(n.options.slidesToShow)/2-n.slideWidth*n.slideCount/2:!0===n.options.centerMode&&!0===n.options.infinite?n.slideOffset+=n.slideWidth*Math.floor(n.options.slidesToShow/2)-n.slideWidth:!0===n.options.centerMode&&(n.slideOffset=0,n.slideOffset+=n.slideWidth*Math.floor(n.options.slidesToShow/2)),e=!1===n.options.vertical?i*n.slideWidth*-1+n.slideOffset:i*t*-1+r,!0===n.options.variableWidth&&(o=n.slideCount<=n.options.slidesToShow||!1===n.options.infinite?n.$slideTrack.children(".slick-slide").eq(i):n.$slideTrack.children(".slick-slide").eq(i+n.options.slidesToShow),e=!0===n.options.rtl?o[0]?-1*(n.$slideTrack.width()-o[0].offsetLeft-o.width()):0:o[0]?-1*o[0].offsetLeft:0,!0===n.options.centerMode&&(o=n.slideCount<=n.options.slidesToShow||!1===n.options.infinite?n.$slideTrack.children(".slick-slide").eq(i):n.$slideTrack.children(".slick-slide").eq(i+n.options.slidesToShow+1),e=!0===n.options.rtl?o[0]?-1*(n.$slideTrack.width()-o[0].offsetLeft-o.width()):0:o[0]?-1*o[0].offsetLeft:0,e+=(n.$list.width()-o.outerWidth())/2)),e},e.prototype.getOption=e.prototype.slickGetOption=function(i){return this.options[i]},e.prototype.getNavigableIndexes=function(){var i,e=this,t=0,o=0,s=[];for(!1===e.options.infinite?i=e.slideCount:(t=-1*e.options.slidesToScroll,o=-1*e.options.slidesToScroll,i=2*e.slideCount);t<i;)s.push(t),t=o+e.options.slidesToScroll,o+=e.options.slidesToScroll<=e.options.slidesToShow?e.options.slidesToScroll:e.options.slidesToShow;return s},e.prototype.getSlick=function(){return this},e.prototype.getSlideCount=function(){var e,t,o=this;return t=!0===o.options.centerMode?o.slideWidth*Math.floor(o.options.slidesToShow/2):0,!0===o.options.swipeToSlide?(o.$slideTrack.find(".slick-slide").each(function(s,n){if(n.offsetLeft-t+i(n).outerWidth()/2>-1*o.swipeLeft)return e=n,!1}),Math.abs(i(e).attr("data-slick-index")-o.currentSlide)||1):o.options.slidesToScroll},e.prototype.goTo=e.prototype.slickGoTo=function(i,e){this.changeSlide({data:{message:"index",index:parseInt(i)}},e)},e.prototype.init=function(e){var t=this;i(t.$slider).hasClass("slick-initialized")||(i(t.$slider).addClass("slick-initialized"),t.buildRows(),t.buildOut(),t.setProps(),t.startLoad(),t.loadSlider(),t.initializeEvents(),t.updateArrows(),t.updateDots(),t.checkResponsive(!0),t.focusHandler()),e&&t.$slider.trigger("init",[t]),!0===t.options.accessibility&&t.initADA(),t.options.autoplay&&(t.paused=!1,t.autoPlay())},e.prototype.initADA=function(){var e=this,t=Math.ceil(e.slideCount/e.options.slidesToShow),o=e.getNavigableIndexes().filter(function(i){return i>=0&&i<e.slideCount});e.$slides.add(e.$slideTrack.find(".slick-cloned")).attr({"aria-hidden":"true",tabindex:"-1"}).find("a, input, button, select").attr({tabindex:"-1"}),null!==e.$dots&&(e.$slides.not(e.$slideTrack.find(".slick-cloned")).each(function(t){var s=o.indexOf(t);i(this).attr({role:"tabpanel",id:"slick-slide"+e.instanceUid+t,tabindex:-1}),-1!==s&&i(this).attr({"aria-describedby":"slick-slide-control"+e.instanceUid+s})}),e.$dots.attr("role","tablist").find("li").each(function(s){var n=o[s];i(this).attr({role:"presentation"}),i(this).find("button").first().attr({role:"tab",id:"slick-slide-control"+e.instanceUid+s,"aria-controls":"slick-slide"+e.instanceUid+n,"aria-label":s+1+" of "+t,"aria-selected":null,tabindex:"-1"})}).eq(e.currentSlide).find("button").attr({"aria-selected":"true",tabindex:"0"}).end());for(var s=e.currentSlide,n=s+e.options.slidesToShow;s<n;s++)e.$slides.eq(s).attr("tabindex",0);e.activateADA()},e.prototype.initArrowEvents=function(){var i=this;!0===i.options.arrows&&i.slideCount>i.options.slidesToShow&&(i.$prevArrow.off("click.slick").on("click.slick",{message:"previous"},i.changeSlide),i.$nextArrow.off("click.slick").on("click.slick",{message:"next"},i.changeSlide),!0===i.options.accessibility&&(i.$prevArrow.on("keydown.slick",i.keyHandler),i.$nextArrow.on("keydown.slick",i.keyHandler)))},e.prototype.initDotEvents=function(){var e=this;!0===e.options.dots&&(i("li",e.$dots).on("click.slick",{message:"index"},e.changeSlide),!0===e.options.accessibility&&e.$dots.on("keydown.slick",e.keyHandler)),!0===e.options.dots&&!0===e.options.pauseOnDotsHover&&i("li",e.$dots).on("mouseenter.slick",i.proxy(e.interrupt,e,!0)).on("mouseleave.slick",i.proxy(e.interrupt,e,!1))},e.prototype.initSlideEvents=function(){var e=this;e.options.pauseOnHover&&(e.$list.on("mouseenter.slick",i.proxy(e.interrupt,e,!0)),e.$list.on("mouseleave.slick",i.proxy(e.interrupt,e,!1)))},e.prototype.initializeEvents=function(){var e=this;e.initArrowEvents(),e.initDotEvents(),e.initSlideEvents(),e.$list.on("touchstart.slick mousedown.slick",{action:"start"},e.swipeHandler),e.$list.on("touchmove.slick mousemove.slick",{action:"move"},e.swipeHandler),e.$list.on("touchend.slick mouseup.slick",{action:"end"},e.swipeHandler),e.$list.on("touchcancel.slick mouseleave.slick",{action:"end"},e.swipeHandler),e.$list.on("click.slick",e.clickHandler),i(document).on(e.visibilityChange,i.proxy(e.visibility,e)),!0===e.options.accessibility&&e.$list.on("keydown.slick",e.keyHandler),!0===e.options.focusOnSelect&&i(e.$slideTrack).children().on("click.slick",e.selectHandler),i(window).on("orientationchange.slick.slick-"+e.instanceUid,i.proxy(e.orientationChange,e)),i(window).on("resize.slick.slick-"+e.instanceUid,i.proxy(e.resize,e)),i("[draggable!=true]",e.$slideTrack).on("dragstart",e.preventDefault),i(window).on("load.slick.slick-"+e.instanceUid,e.setPosition),i(e.setPosition)},e.prototype.initUI=function(){var i=this;!0===i.options.arrows&&i.slideCount>i.options.slidesToShow&&(i.$prevArrow.show(),i.$nextArrow.show()),!0===i.options.dots&&i.slideCount>i.options.slidesToShow&&i.$dots.show()},e.prototype.keyHandler=function(i){var e=this;i.target.tagName.match("TEXTAREA|INPUT|SELECT")||(37===i.keyCode&&!0===e.options.accessibility?e.changeSlide({data:{message:!0===e.options.rtl?"next":"previous"}}):39===i.keyCode&&!0===e.options.accessibility&&e.changeSlide({data:{message:!0===e.options.rtl?"previous":"next"}}))},e.prototype.lazyLoad=function(){function e(e){i("img[data-lazy]",e).each(function(){var e=i(this),t=i(this).attr("data-lazy"),o=i(this).attr("data-srcset"),s=i(this).attr("data-sizes")||n.$slider.attr("data-sizes"),r=document.createElement("img");r.onload=function(){e.animate({opacity:0},100,function(){o&&(e.attr("srcset",o),s&&e.attr("sizes",s)),e.attr("src",t).animate({opacity:1},200,function(){e.removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading")}),n.$slider.trigger("lazyLoaded",[n,e,t])})},r.onerror=function(){e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),n.$slider.trigger("lazyLoadError",[n,e,t])},r.src=t})}var t,o,s,n=this;if(!0===n.options.centerMode?!0===n.options.infinite?s=(o=n.currentSlide+(n.options.slidesToShow/2+1))+n.options.slidesToShow+2:(o=Math.max(0,n.currentSlide-(n.options.slidesToShow/2+1)),s=n.options.slidesToShow/2+1+2+n.currentSlide):(o=n.options.infinite?n.options.slidesToShow+n.currentSlide:n.currentSlide,s=Math.ceil(o+n.options.slidesToShow),!0===n.options.fade&&(o>0&&o--,s<=n.slideCount&&s++)),t=n.$slider.find(".slick-slide").slice(o,s),"anticipated"===n.options.lazyLoad)for(var r=o-1,l=s,d=n.$slider.find(".slick-slide"),a=0;a<n.options.slidesToScroll;a++)r<0&&(r=n.slideCount-1),t=(t=t.add(d.eq(r))).add(d.eq(l)),r--,l++;e(t),n.slideCount<=n.options.slidesToShow?e(n.$slider.find(".slick-slide")):n.currentSlide>=n.slideCount-n.options.slidesToShow?e(n.$slider.find(".slick-cloned").slice(0,n.options.slidesToShow)):0===n.currentSlide&&e(n.$slider.find(".slick-cloned").slice(-1*n.options.slidesToShow))},e.prototype.loadSlider=function(){var i=this;i.setPosition(),i.$slideTrack.css({opacity:1}),i.$slider.removeClass("slick-loading"),i.initUI(),"progressive"===i.options.lazyLoad&&i.progressiveLazyLoad()},e.prototype.next=e.prototype.slickNext=function(){this.changeSlide({data:{message:"next"}})},e.prototype.orientationChange=function(){var i=this;i.checkResponsive(),i.setPosition()},e.prototype.pause=e.prototype.slickPause=function(){var i=this;i.autoPlayClear(),i.paused=!0},e.prototype.play=e.prototype.slickPlay=function(){var i=this;i.autoPlay(),i.options.autoplay=!0,i.paused=!1,i.focussed=!1,i.interrupted=!1},e.prototype.postSlide=function(e){var t=this;t.unslicked||(t.$slider.trigger("afterChange",[t,e]),t.animating=!1,t.slideCount>t.options.slidesToShow&&t.setPosition(),t.swipeLeft=null,t.options.autoplay&&t.autoPlay(),!0===t.options.accessibility&&(t.initADA(),t.options.focusOnChange&&i(t.$slides.get(t.currentSlide)).attr("tabindex",0).focus()))},e.prototype.prev=e.prototype.slickPrev=function(){this.changeSlide({data:{message:"previous"}})},e.prototype.preventDefault=function(i){i.preventDefault()},e.prototype.progressiveLazyLoad=function(e){e=e||1;var t,o,s,n,r,l=this,d=i("img[data-lazy]",l.$slider);d.length?(t=d.first(),o=t.attr("data-lazy"),s=t.attr("data-srcset"),n=t.attr("data-sizes")||l.$slider.attr("data-sizes"),(r=document.createElement("img")).onload=function(){s&&(t.attr("srcset",s),n&&t.attr("sizes",n)),t.attr("src",o).removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading"),!0===l.options.adaptiveHeight&&l.setPosition(),l.$slider.trigger("lazyLoaded",[l,t,o]),l.progressiveLazyLoad()},r.onerror=function(){e<3?setTimeout(function(){l.progressiveLazyLoad(e+1)},500):(t.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),l.$slider.trigger("lazyLoadError",[l,t,o]),l.progressiveLazyLoad())},r.src=o):l.$slider.trigger("allImagesLoaded",[l])},e.prototype.refresh=function(e){var t,o,s=this;o=s.slideCount-s.options.slidesToShow,!s.options.infinite&&s.currentSlide>o&&(s.currentSlide=o),s.slideCount<=s.options.slidesToShow&&(s.currentSlide=0),t=s.currentSlide,s.destroy(!0),i.extend(s,s.initials,{currentSlide:t}),s.init(),e||s.changeSlide({data:{message:"index",index:t}},!1)},e.prototype.registerBreakpoints=function(){var e,t,o,s=this,n=s.options.responsive||null;if("array"===i.type(n)&&n.length){s.respondTo=s.options.respondTo||"window";for(e in n)if(o=s.breakpoints.length-1,n.hasOwnProperty(e)){for(t=n[e].breakpoint;o>=0;)s.breakpoints[o]&&s.breakpoints[o]===t&&s.breakpoints.splice(o,1),o--;s.breakpoints.push(t),s.breakpointSettings[t]=n[e].settings}s.breakpoints.sort(function(i,e){return s.options.mobileFirst?i-e:e-i})}},e.prototype.reinit=function(){var e=this;e.$slides=e.$slideTrack.children(e.options.slide).addClass("slick-slide"),e.slideCount=e.$slides.length,e.currentSlide>=e.slideCount&&0!==e.currentSlide&&(e.currentSlide=e.currentSlide-e.options.slidesToScroll),e.slideCount<=e.options.slidesToShow&&(e.currentSlide=0),e.registerBreakpoints(),e.setProps(),e.setupInfinite(),e.buildArrows(),e.updateArrows(),e.initArrowEvents(),e.buildDots(),e.updateDots(),e.initDotEvents(),e.cleanUpSlideEvents(),e.initSlideEvents(),e.checkResponsive(!1,!0),!0===e.options.focusOnSelect&&i(e.$slideTrack).children().on("click.slick",e.selectHandler),e.setSlideClasses("number"==typeof e.currentSlide?e.currentSlide:0),e.setPosition(),e.focusHandler(),e.paused=!e.options.autoplay,e.autoPlay(),e.$slider.trigger("reInit",[e])},e.prototype.resize=function(){var e=this;i(window).width()!==e.windowWidth&&(clearTimeout(e.windowDelay),e.windowDelay=window.setTimeout(function(){e.windowWidth=i(window).width(),e.checkResponsive(),e.unslicked||e.setPosition()},50))},e.prototype.removeSlide=e.prototype.slickRemove=function(i,e,t){var o=this;if(i="boolean"==typeof i?!0===(e=i)?0:o.slideCount-1:!0===e?--i:i,o.slideCount<1||i<0||i>o.slideCount-1)return!1;o.unload(),!0===t?o.$slideTrack.children().remove():o.$slideTrack.children(this.options.slide).eq(i).remove(),o.$slides=o.$slideTrack.children(this.options.slide),o.$slideTrack.children(this.options.slide).detach(),o.$slideTrack.append(o.$slides),o.$slidesCache=o.$slides,o.reinit()},e.prototype.setCSS=function(i){var e,t,o=this,s={};!0===o.options.rtl&&(i=-i),e="left"==o.positionProp?Math.ceil(i)+"px":"0px",t="top"==o.positionProp?Math.ceil(i)+"px":"0px",s[o.positionProp]=i,!1===o.transformsEnabled?o.$slideTrack.css(s):(s={},!1===o.cssTransitions?(s[o.animType]="translate("+e+", "+t+")",o.$slideTrack.css(s)):(s[o.animType]="translate3d("+e+", "+t+", 0px)",o.$slideTrack.css(s)))},e.prototype.setDimensions=function(){var i=this;!1===i.options.vertical?!0===i.options.centerMode&&i.$list.css({padding:"0px "+i.options.centerPadding}):(i.$list.height(i.$slides.first().outerHeight(!0)*i.options.slidesToShow),!0===i.options.centerMode&&i.$list.css({padding:i.options.centerPadding+" 0px"})),i.listWidth=i.$list.width(),i.listHeight=i.$list.height(),!1===i.options.vertical&&!1===i.options.variableWidth?(i.slideWidth=Math.ceil(i.listWidth/i.options.slidesToShow),i.$slideTrack.width(Math.ceil(i.slideWidth*i.$slideTrack.children(".slick-slide").length))):!0===i.options.variableWidth?i.$slideTrack.width(5e3*i.slideCount):(i.slideWidth=Math.ceil(i.listWidth),i.$slideTrack.height(Math.ceil(i.$slides.first().outerHeight(!0)*i.$slideTrack.children(".slick-slide").length)));var e=i.$slides.first().outerWidth(!0)-i.$slides.first().width();!1===i.options.variableWidth&&i.$slideTrack.children(".slick-slide").width(i.slideWidth-e)},e.prototype.setFade=function(){var e,t=this;t.$slides.each(function(o,s){e=t.slideWidth*o*-1,!0===t.options.rtl?i(s).css({position:"relative",right:e,top:0,zIndex:t.options.zIndex-2,opacity:0}):i(s).css({position:"relative",left:e,top:0,zIndex:t.options.zIndex-2,opacity:0})}),t.$slides.eq(t.currentSlide).css({zIndex:t.options.zIndex-1,opacity:1})},e.prototype.setHeight=function(){var i=this;if(1===i.options.slidesToShow&&!0===i.options.adaptiveHeight&&!1===i.options.vertical){var e=i.$slides.eq(i.currentSlide).outerHeight(!0);i.$list.css("height",e)}},e.prototype.setOption=e.prototype.slickSetOption=function(){var e,t,o,s,n,r=this,l=!1;if("object"===i.type(arguments[0])?(o=arguments[0],l=arguments[1],n="multiple"):"string"===i.type(arguments[0])&&(o=arguments[0],s=arguments[1],l=arguments[2],"responsive"===arguments[0]&&"array"===i.type(arguments[1])?n="responsive":void 0!==arguments[1]&&(n="single")),"single"===n)r.options[o]=s;else if("multiple"===n)i.each(o,function(i,e){r.options[i]=e});else if("responsive"===n)for(t in s)if("array"!==i.type(r.options.responsive))r.options.responsive=[s[t]];else{for(e=r.options.responsive.length-1;e>=0;)r.options.responsive[e].breakpoint===s[t].breakpoint&&r.options.responsive.splice(e,1),e--;r.options.responsive.push(s[t])}l&&(r.unload(),r.reinit())},e.prototype.setPosition=function(){var i=this;i.setDimensions(),i.setHeight(),!1===i.options.fade?i.setCSS(i.getLeft(i.currentSlide)):i.setFade(),i.$slider.trigger("setPosition",[i])},e.prototype.setProps=function(){var i=this,e=document.body.style;i.positionProp=!0===i.options.vertical?"top":"left","top"===i.positionProp?i.$slider.addClass("slick-vertical"):i.$slider.removeClass("slick-vertical"),void 0===e.WebkitTransition&&void 0===e.MozTransition&&void 0===e.msTransition||!0===i.options.useCSS&&(i.cssTransitions=!0),i.options.fade&&("number"==typeof i.options.zIndex?i.options.zIndex<3&&(i.options.zIndex=3):i.options.zIndex=i.defaults.zIndex),void 0!==e.OTransform&&(i.animType="OTransform",i.transformType="-o-transform",i.transitionType="OTransition",void 0===e.perspectiveProperty&&void 0===e.webkitPerspective&&(i.animType=!1)),void 0!==e.MozTransform&&(i.animType="MozTransform",i.transformType="-moz-transform",i.transitionType="MozTransition",void 0===e.perspectiveProperty&&void 0===e.MozPerspective&&(i.animType=!1)),void 0!==e.webkitTransform&&(i.animType="webkitTransform",i.transformType="-webkit-transform",i.transitionType="webkitTransition",void 0===e.perspectiveProperty&&void 0===e.webkitPerspective&&(i.animType=!1)),void 0!==e.msTransform&&(i.animType="msTransform",i.transformType="-ms-transform",i.transitionType="msTransition",void 0===e.msTransform&&(i.animType=!1)),void 0!==e.transform&&!1!==i.animType&&(i.animType="transform",i.transformType="transform",i.transitionType="transition"),i.transformsEnabled=i.options.useTransform&&null!==i.animType&&!1!==i.animType},e.prototype.setSlideClasses=function(i){var e,t,o,s,n=this;if(t=n.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden","true"),n.$slides.eq(i).addClass("slick-current"),!0===n.options.centerMode){var r=n.options.slidesToShow%2==0?1:0;e=Math.floor(n.options.slidesToShow/2),!0===n.options.infinite&&(i>=e&&i<=n.slideCount-1-e?n.$slides.slice(i-e+r,i+e+1).addClass("slick-active").attr("aria-hidden","false"):(o=n.options.slidesToShow+i,t.slice(o-e+1+r,o+e+2).addClass("slick-active").attr("aria-hidden","false")),0===i?t.eq(t.length-1-n.options.slidesToShow).addClass("slick-center"):i===n.slideCount-1&&t.eq(n.options.slidesToShow).addClass("slick-center")),n.$slides.eq(i).addClass("slick-center")}else i>=0&&i<=n.slideCount-n.options.slidesToShow?n.$slides.slice(i,i+n.options.slidesToShow).addClass("slick-active").attr("aria-hidden","false"):t.length<=n.options.slidesToShow?t.addClass("slick-active").attr("aria-hidden","false"):(s=n.slideCount%n.options.slidesToShow,o=!0===n.options.infinite?n.options.slidesToShow+i:i,n.options.slidesToShow==n.options.slidesToScroll&&n.slideCount-i<n.options.slidesToShow?t.slice(o-(n.options.slidesToShow-s),o+s).addClass("slick-active").attr("aria-hidden","false"):t.slice(o,o+n.options.slidesToShow).addClass("slick-active").attr("aria-hidden","false"));"ondemand"!==n.options.lazyLoad&&"anticipated"!==n.options.lazyLoad||n.lazyLoad()},e.prototype.setupInfinite=function(){var e,t,o,s=this;if(!0===s.options.fade&&(s.options.centerMode=!1),!0===s.options.infinite&&!1===s.options.fade&&(t=null,s.slideCount>s.options.slidesToShow)){for(o=!0===s.options.centerMode?s.options.slidesToShow+1:s.options.slidesToShow,e=s.slideCount;e>s.slideCount-o;e-=1)t=e-1,i(s.$slides[t]).clone(!0).attr("id","").attr("data-slick-index",t-s.slideCount).prependTo(s.$slideTrack).addClass("slick-cloned");for(e=0;e<o+s.slideCount;e+=1)t=e,i(s.$slides[t]).clone(!0).attr("id","").attr("data-slick-index",t+s.slideCount).appendTo(s.$slideTrack).addClass("slick-cloned");s.$slideTrack.find(".slick-cloned").find("[id]").each(function(){i(this).attr("id","")})}},e.prototype.interrupt=function(i){var e=this;i||e.autoPlay(),e.interrupted=i},e.prototype.selectHandler=function(e){var t=this,o=i(e.target).is(".slick-slide")?i(e.target):i(e.target).parents(".slick-slide"),s=parseInt(o.attr("data-slick-index"));s||(s=0),t.slideCount<=t.options.slidesToShow?t.slideHandler(s,!1,!0):t.slideHandler(s)},e.prototype.slideHandler=function(i,e,t){var o,s,n,r,l,d=null,a=this;if(e=e||!1,!(!0===a.animating&&!0===a.options.waitForAnimate||!0===a.options.fade&&a.currentSlide===i))if(!1===e&&a.asNavFor(i),o=i,d=a.getLeft(o),r=a.getLeft(a.currentSlide),a.currentLeft=null===a.swipeLeft?r:a.swipeLeft,!1===a.options.infinite&&!1===a.options.centerMode&&(i<0||i>a.getDotCount()*a.options.slidesToScroll))!1===a.options.fade&&(o=a.currentSlide,!0!==t?a.animateSlide(r,function(){a.postSlide(o)}):a.postSlide(o));else if(!1===a.options.infinite&&!0===a.options.centerMode&&(i<0||i>a.slideCount-a.options.slidesToScroll))!1===a.options.fade&&(o=a.currentSlide,!0!==t?a.animateSlide(r,function(){a.postSlide(o)}):a.postSlide(o));else{if(a.options.autoplay&&clearInterval(a.autoPlayTimer),s=o<0?a.slideCount%a.options.slidesToScroll!=0?a.slideCount-a.slideCount%a.options.slidesToScroll:a.slideCount+o:o>=a.slideCount?a.slideCount%a.options.slidesToScroll!=0?0:o-a.slideCount:o,a.animating=!0,a.$slider.trigger("beforeChange",[a,a.currentSlide,s]),n=a.currentSlide,a.currentSlide=s,a.setSlideClasses(a.currentSlide),a.options.asNavFor&&(l=(l=a.getNavTarget()).slick("getSlick")).slideCount<=l.options.slidesToShow&&l.setSlideClasses(a.currentSlide),a.updateDots(),a.updateArrows(),!0===a.options.fade)return!0!==t?(a.fadeSlideOut(n),a.fadeSlide(s,function(){a.postSlide(s)})):a.postSlide(s),void a.animateHeight();!0!==t?a.animateSlide(d,function(){a.postSlide(s)}):a.postSlide(s)}},e.prototype.startLoad=function(){var i=this;!0===i.options.arrows&&i.slideCount>i.options.slidesToShow&&(i.$prevArrow.hide(),i.$nextArrow.hide()),!0===i.options.dots&&i.slideCount>i.options.slidesToShow&&i.$dots.hide(),i.$slider.addClass("slick-loading")},e.prototype.swipeDirection=function(){var i,e,t,o,s=this;return i=s.touchObject.startX-s.touchObject.curX,e=s.touchObject.startY-s.touchObject.curY,t=Math.atan2(e,i),(o=Math.round(180*t/Math.PI))<0&&(o=360-Math.abs(o)),o<=45&&o>=0?!1===s.options.rtl?"left":"right":o<=360&&o>=315?!1===s.options.rtl?"left":"right":o>=135&&o<=225?!1===s.options.rtl?"right":"left":!0===s.options.verticalSwiping?o>=35&&o<=135?"down":"up":"vertical"},e.prototype.swipeEnd=function(i){var e,t,o=this;if(o.dragging=!1,o.swiping=!1,o.scrolling)return o.scrolling=!1,!1;if(o.interrupted=!1,o.shouldClick=!(o.touchObject.swipeLength>10),void 0===o.touchObject.curX)return!1;if(!0===o.touchObject.edgeHit&&o.$slider.trigger("edge",[o,o.swipeDirection()]),o.touchObject.swipeLength>=o.touchObject.minSwipe){switch(t=o.swipeDirection()){case"left":case"down":e=o.options.swipeToSlide?o.checkNavigable(o.currentSlide+o.getSlideCount()):o.currentSlide+o.getSlideCount(),o.currentDirection=0;break;case"right":case"up":e=o.options.swipeToSlide?o.checkNavigable(o.currentSlide-o.getSlideCount()):o.currentSlide-o.getSlideCount(),o.currentDirection=1}"vertical"!=t&&(o.slideHandler(e),o.touchObject={},o.$slider.trigger("swipe",[o,t]))}else o.touchObject.startX!==o.touchObject.curX&&(o.slideHandler(o.currentSlide),o.touchObject={})},e.prototype.swipeHandler=function(i){var e=this;if(!(!1===e.options.swipe||"ontouchend"in document&&!1===e.options.swipe||!1===e.options.draggable&&-1!==i.type.indexOf("mouse")))switch(e.touchObject.fingerCount=i.originalEvent&&void 0!==i.originalEvent.touches?i.originalEvent.touches.length:1,e.touchObject.minSwipe=e.listWidth/e.options.touchThreshold,!0===e.options.verticalSwiping&&(e.touchObject.minSwipe=e.listHeight/e.options.touchThreshold),i.data.action){case"start":e.swipeStart(i);break;case"move":e.swipeMove(i);break;case"end":e.swipeEnd(i)}},e.prototype.swipeMove=function(i){var e,t,o,s,n,r,l=this;return n=void 0!==i.originalEvent?i.originalEvent.touches:null,!(!l.dragging||l.scrolling||n&&1!==n.length)&&(e=l.getLeft(l.currentSlide),l.touchObject.curX=void 0!==n?n[0].pageX:i.clientX,l.touchObject.curY=void 0!==n?n[0].pageY:i.clientY,l.touchObject.swipeLength=Math.round(Math.sqrt(Math.pow(l.touchObject.curX-l.touchObject.startX,2))),r=Math.round(Math.sqrt(Math.pow(l.touchObject.curY-l.touchObject.startY,2))),!l.options.verticalSwiping&&!l.swiping&&r>4?(l.scrolling=!0,!1):(!0===l.options.verticalSwiping&&(l.touchObject.swipeLength=r),t=l.swipeDirection(),void 0!==i.originalEvent&&l.touchObject.swipeLength>4&&(l.swiping=!0,i.preventDefault()),s=(!1===l.options.rtl?1:-1)*(l.touchObject.curX>l.touchObject.startX?1:-1),!0===l.options.verticalSwiping&&(s=l.touchObject.curY>l.touchObject.startY?1:-1),o=l.touchObject.swipeLength,l.touchObject.edgeHit=!1,!1===l.options.infinite&&(0===l.currentSlide&&"right"===t||l.currentSlide>=l.getDotCount()&&"left"===t)&&(o=l.touchObject.swipeLength*l.options.edgeFriction,l.touchObject.edgeHit=!0),!1===l.options.vertical?l.swipeLeft=e+o*s:l.swipeLeft=e+o*(l.$list.height()/l.listWidth)*s,!0===l.options.verticalSwiping&&(l.swipeLeft=e+o*s),!0!==l.options.fade&&!1!==l.options.touchMove&&(!0===l.animating?(l.swipeLeft=null,!1):void l.setCSS(l.swipeLeft))))},e.prototype.swipeStart=function(i){var e,t=this;if(t.interrupted=!0,1!==t.touchObject.fingerCount||t.slideCount<=t.options.slidesToShow)return t.touchObject={},!1;void 0!==i.originalEvent&&void 0!==i.originalEvent.touches&&(e=i.originalEvent.touches[0]),t.touchObject.startX=t.touchObject.curX=void 0!==e?e.pageX:i.clientX,t.touchObject.startY=t.touchObject.curY=void 0!==e?e.pageY:i.clientY,t.dragging=!0},e.prototype.unfilterSlides=e.prototype.slickUnfilter=function(){var i=this;null!==i.$slidesCache&&(i.unload(),i.$slideTrack.children(this.options.slide).detach(),i.$slidesCache.appendTo(i.$slideTrack),i.reinit())},e.prototype.unload=function(){var e=this;i(".slick-cloned",e.$slider).remove(),e.$dots&&e.$dots.remove(),e.$prevArrow&&e.htmlExpr.test(e.options.prevArrow)&&e.$prevArrow.remove(),e.$nextArrow&&e.htmlExpr.test(e.options.nextArrow)&&e.$nextArrow.remove(),e.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden","true").css("width","")},e.prototype.unslick=function(i){var e=this;e.$slider.trigger("unslick",[e,i]),e.destroy()},e.prototype.updateArrows=function(){var i=this;Math.floor(i.options.slidesToShow/2),!0===i.options.arrows&&i.slideCount>i.options.slidesToShow&&!i.options.infinite&&(i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false"),i.$nextArrow.removeClass("slick-disabled").attr("aria-disabled","false"),0===i.currentSlide?(i.$prevArrow.addClass("slick-disabled").attr("aria-disabled","true"),i.$nextArrow.removeClass("slick-disabled").attr("aria-disabled","false")):i.currentSlide>=i.slideCount-i.options.slidesToShow&&!1===i.options.centerMode?(i.$nextArrow.addClass("slick-disabled").attr("aria-disabled","true"),i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false")):i.currentSlide>=i.slideCount-1&&!0===i.options.centerMode&&(i.$nextArrow.addClass("slick-disabled").attr("aria-disabled","true"),i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false")))},e.prototype.updateDots=function(){var i=this;null!==i.$dots&&(i.$dots.find("li").removeClass("slick-active").end(),i.$dots.find("li").eq(Math.floor(i.currentSlide/i.options.slidesToScroll)).addClass("slick-active"))},e.prototype.visibility=function(){var i=this;i.options.autoplay&&(document[i.hidden]?i.interrupted=!0:i.interrupted=!1)},i.fn.slick=function(){var i,t,o=this,s=arguments[0],n=Array.prototype.slice.call(arguments,1),r=o.length;for(i=0;i<r;i++)if("object"==typeof s||void 0===s?o[i].slick=new e(o[i],s):t=o[i].slick[s].apply(o[i].slick,n),void 0!==t)return t;return o}});

// Dynamic Adapt v.1
// HTML data-da="where(uniq class name),position(digi),when(breakpoint)"
// e.x. data-da="item,2,992"
// Andrikanych Yevhen 2020
// https://www.youtube.com/c/freelancerlifestyle

"use strict";

(function () {
	let originalPositions = [];
	let daElements = document.querySelectorAll('[data-da]');
	let daElementsArray = [];
	let daMatchMedia = [];
	//Заполняем массивы
	if (daElements.length > 0) {
		let number = 0;
		for (let index = 0; index < daElements.length; index++) {
			const daElement = daElements[index];
			const daMove = daElement.getAttribute('data-da');
			if (daMove != '') {
				const daArray = daMove.split(',');
				const daPlace = daArray[1] ? daArray[1].trim() : 'last';
				const daBreakpoint = daArray[2] ? daArray[2].trim() : '767';
				const daType = daArray[3] === 'min' ? daArray[3].trim() : 'max';
				const daDestination = document.querySelector('.' + daArray[0].trim())
				if (daArray.length > 0 && daDestination) {
					daElement.setAttribute('data-da-index', number);
					//Заполняем массив первоначальных позиций
					originalPositions[number] = {
						"parent": daElement.parentNode,
						"index": indexInParent(daElement)
					};
					//Заполняем массив элементов 
					daElementsArray[number] = {
						"element": daElement,
						"destination": document.querySelector('.' + daArray[0].trim()),
						"place": daPlace,
						"breakpoint": daBreakpoint,
						"type": daType
					}
					number++;
				}
			}
		}
		dynamicAdaptSort(daElementsArray);

		//Создаем события в точке брейкпоинта
		for (let index = 0; index < daElementsArray.length; index++) {
			const el = daElementsArray[index];
			const daBreakpoint = el.breakpoint;
			const daType = el.type;

			daMatchMedia.push(window.matchMedia("(" + daType + "-width: " + daBreakpoint + "px)"));
			daMatchMedia[index].addListener(dynamicAdapt);
		}
	}
	//Основная функция
	function dynamicAdapt(e) {
		for (let index = 0; index < daElementsArray.length; index++) {
			const el = daElementsArray[index];
			const daElement = el.element;
			const daDestination = el.destination;
			const daPlace = el.place;
			const daBreakpoint = el.breakpoint;
			const daClassname = "_dynamic_adapt_" + daBreakpoint;

			if (daMatchMedia[index].matches) {
				//Перебрасываем элементы
				if (!daElement.classList.contains(daClassname)) {
					let actualIndex = indexOfElements(daDestination)[daPlace];
					if (daPlace === 'first') {
						actualIndex = indexOfElements(daDestination)[0];
					} else if (daPlace === 'last') {
						actualIndex = indexOfElements(daDestination)[indexOfElements(daDestination).length];
					}
					daDestination.insertBefore(daElement, daDestination.children[actualIndex]);
					daElement.classList.add(daClassname);
				}
			} else {
				//Возвращаем на место
				if (daElement.classList.contains(daClassname)) {
					dynamicAdaptBack(daElement);
					daElement.classList.remove(daClassname);
				}
			}
		}
		//customAdapt();
	}

	//Вызов основной функции
	dynamicAdapt();

	//Функция возврата на место
	function dynamicAdaptBack(el) {
		const daIndex = el.getAttribute('data-da-index');
		const originalPlace = originalPositions[daIndex];
		const parentPlace = originalPlace['parent'];
		const indexPlace = originalPlace['index'];
		const actualIndex = indexOfElements(parentPlace, true)[indexPlace];
		parentPlace.insertBefore(el, parentPlace.children[actualIndex]);
	}
	//Функция получения индекса внутри родителя
	function indexInParent(el) {
		var children = Array.prototype.slice.call(el.parentNode.children);
		return children.indexOf(el);
	}
	//Функция получения массива индексов элементов внутри родителя 
	function indexOfElements(parent, back) {
		const children = parent.children;
		const childrenArray = [];
		for (let i = 0; i < children.length; i++) {
			const childrenElement = children[i];
			if (back) {
				childrenArray.push(i);
			} else {
				//Исключая перенесенный элемент
				if (childrenElement.getAttribute('data-da') == null) {
					childrenArray.push(i);
				}
			}
		}
		return childrenArray;
	}
	//Сортировка объекта
	function dynamicAdaptSort(arr) {
		arr.sort(function (a, b) {
			if (a.breakpoint > b.breakpoint) { return -1 } else { return 1 }
		});
		arr.sort(function (a, b) {
			if (a.place > b.place) { return 1 } else { return -1 }
		});
	}
	//Дополнительные сценарии адаптации
	function customAdapt() {
		//const viewport_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	}
}());
'use strict';

/**
 * Copyright Marc J. Schmidt. See the LICENSE file at the top-level
 * directory of this distribution and at
 * https://github.com/marcj/css-element-queries/blob/master/LICENSE.
 */
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(factory);
    } else if (typeof exports === "object") {
        module.exports = factory();
    } else {
        root.ResizeSensor = factory();
    }
}(typeof window !== 'undefined' ? window : this, function () {

    // Make sure it does not throw in a SSR (Server Side Rendering) situation
    if (typeof window === "undefined") {
        return null;
    }
    // https://github.com/Semantic-Org/Semantic-UI/issues/3855
    // https://github.com/marcj/css-element-queries/issues/257
    var globalWindow = typeof window != 'undefined' && window.Math == Math
        ? window
        : typeof self != 'undefined' && self.Math == Math
            ? self
            : Function('return this')();
    // Only used for the dirty checking, so the event callback count is limited to max 1 call per fps per sensor.
    // In combination with the event based resize sensor this saves cpu time, because the sensor is too fast and
    // would generate too many unnecessary events.
    var requestAnimationFrame = globalWindow.requestAnimationFrame ||
        globalWindow.mozRequestAnimationFrame ||
        globalWindow.webkitRequestAnimationFrame ||
        function (fn) {
            return globalWindow.setTimeout(fn, 20);
        };

    var cancelAnimationFrame = globalWindow.cancelAnimationFrame ||
        globalWindow.mozCancelAnimationFrame ||
        globalWindow.webkitCancelAnimationFrame ||
        function (timer) {
            globalWindow.clearTimeout(timer);
        };

    /**
     * Iterate over each of the provided element(s).
     *
     * @param {HTMLElement|HTMLElement[]} elements
     * @param {Function}                  callback
     */
    function forEachElement(elements, callback){
        var elementsType = Object.prototype.toString.call(elements);
        var isCollectionTyped = ('[object Array]' === elementsType
            || ('[object NodeList]' === elementsType)
            || ('[object HTMLCollection]' === elementsType)
            || ('[object Object]' === elementsType)
            || ('undefined' !== typeof jQuery && elements instanceof jQuery) //jquery
            || ('undefined' !== typeof Elements && elements instanceof Elements) //mootools
        );
        var i = 0, j = elements.length;
        if (isCollectionTyped) {
            for (; i < j; i++) {
                callback(elements[i]);
            }
        } else {
            callback(elements);
        }
    }

    /**
    * Get element size
    * @param {HTMLElement} element
    * @returns {Object} {width, height}
    */
    function getElementSize(element) {
        if (!element.getBoundingClientRect) {
            return {
                width: element.offsetWidth,
                height: element.offsetHeight
            }
        }

        var rect = element.getBoundingClientRect();
        return {
            width: Math.round(rect.width),
            height: Math.round(rect.height)
        }
    }

    /**
     * Apply CSS styles to element.
     *
     * @param {HTMLElement} element
     * @param {Object} style
     */
    function setStyle(element, style) {
        Object.keys(style).forEach(function(key) {
            element.style[key] = style[key];
        });
    }

    /**
     * Class for dimension change detection.
     *
     * @param {Element|Element[]|Elements|jQuery} element
     * @param {Function} callback
     *
     * @constructor
     */
    var ResizeSensor = function(element, callback) {
        //Is used when checking in reset() only for invisible elements
        var lastAnimationFrameForInvisibleCheck = 0;

        /**
         *
         * @constructor
         */
        function EventQueue() {
            var q = [];
            this.add = function(ev) {
                q.push(ev);
            };

            var i, j;
            this.call = function(sizeInfo) {
                for (i = 0, j = q.length; i < j; i++) {
                    q[i].call(this, sizeInfo);
                }
            };

            this.remove = function(ev) {
                var newQueue = [];
                for(i = 0, j = q.length; i < j; i++) {
                    if(q[i] !== ev) newQueue.push(q[i]);
                }
                q = newQueue;
            };

            this.length = function() {
                return q.length;
            }
        }

        /**
         *
         * @param {HTMLElement} element
         * @param {Function}    resized
         */
        function attachResizeEvent(element, resized) {
            if (!element) return;
            if (element.resizedAttached) {
                element.resizedAttached.add(resized);
                return;
            }

            element.resizedAttached = new EventQueue();
            element.resizedAttached.add(resized);

            element.resizeSensor = document.createElement('div');
            element.resizeSensor.dir = 'ltr';
            element.resizeSensor.className = 'resize-sensor';

            var style = {
                pointerEvents: 'none',
                position: 'absolute',
                left: '0px',
                top: '0px',
                right: '0px',
                bottom: '0px',
                overflow: 'hidden',
                zIndex: '-1',
                visibility: 'hidden',
                maxWidth: '100%'
            };
            var styleChild = {
                position: 'absolute',
                left: '0px',
                top: '0px',
                transition: '0s',
            };

            setStyle(element.resizeSensor, style);

            var expand = document.createElement('div');
            expand.className = 'resize-sensor-expand';
            setStyle(expand, style);

            var expandChild = document.createElement('div');
            setStyle(expandChild, styleChild);
            expand.appendChild(expandChild);

            var shrink = document.createElement('div');
            shrink.className = 'resize-sensor-shrink';
            setStyle(shrink, style);

            var shrinkChild = document.createElement('div');
            setStyle(shrinkChild, styleChild);
            setStyle(shrinkChild, { width: '200%', height: '200%' });
            shrink.appendChild(shrinkChild);

            element.resizeSensor.appendChild(expand);
            element.resizeSensor.appendChild(shrink);
            element.appendChild(element.resizeSensor);

            var computedStyle = window.getComputedStyle(element);
            var position = computedStyle ? computedStyle.getPropertyValue('position') : null;
            if ('absolute' !== position && 'relative' !== position && 'fixed' !== position && 'sticky' !== position) {
                element.style.position = 'relative';
            }

            var dirty = false;

            //last request animation frame id used in onscroll event
            var rafId = 0;
            var size = getElementSize(element);
            var lastWidth = 0;
            var lastHeight = 0;
            var initialHiddenCheck = true;
            lastAnimationFrameForInvisibleCheck = 0;

            var resetExpandShrink = function () {
                var width = element.offsetWidth;
                var height = element.offsetHeight;

                expandChild.style.width = (width + 10) + 'px';
                expandChild.style.height = (height + 10) + 'px';

                expand.scrollLeft = width + 10;
                expand.scrollTop = height + 10;

                shrink.scrollLeft = width + 10;
                shrink.scrollTop = height + 10;
            };

            var reset = function() {
                // Check if element is hidden
                if (initialHiddenCheck) {
                    var invisible = element.offsetWidth === 0 && element.offsetHeight === 0;
                    if (invisible) {
                        // Check in next frame
                        if (!lastAnimationFrameForInvisibleCheck){
                            lastAnimationFrameForInvisibleCheck = requestAnimationFrame(function(){
                                lastAnimationFrameForInvisibleCheck = 0;
                                reset();
                            });
                        }

                        return;
                    } else {
                        // Stop checking
                        initialHiddenCheck = false;
                    }
                }

                resetExpandShrink();
            };
            element.resizeSensor.resetSensor = reset;

            var onResized = function() {
                rafId = 0;

                if (!dirty) return;

                lastWidth = size.width;
                lastHeight = size.height;

                if (element.resizedAttached) {
                    element.resizedAttached.call(size);
                }
            };

            var onScroll = function() {
                size = getElementSize(element);
                dirty = size.width !== lastWidth || size.height !== lastHeight;

                if (dirty && !rafId) {
                    rafId = requestAnimationFrame(onResized);
                }

                reset();
            };

            var addEvent = function(el, name, cb) {
                if (el.attachEvent) {
                    el.attachEvent('on' + name, cb);
                } else {
                    el.addEventListener(name, cb);
                }
            };

            addEvent(expand, 'scroll', onScroll);
            addEvent(shrink, 'scroll', onScroll);

            // Fix for custom Elements and invisible elements
            lastAnimationFrameForInvisibleCheck = requestAnimationFrame(function(){
                lastAnimationFrameForInvisibleCheck = 0;
                reset();
            });
        }

        forEachElement(element, function(elem){
            attachResizeEvent(elem, callback);
        });

        this.detach = function(ev) {
            // clean up the unfinished animation frame to prevent a potential endless requestAnimationFrame of reset
            if (lastAnimationFrameForInvisibleCheck) {
                cancelAnimationFrame(lastAnimationFrameForInvisibleCheck);
                lastAnimationFrameForInvisibleCheck = 0;
            }
            ResizeSensor.detach(element, ev);
        };

        this.reset = function() {
            //To prevent invoking element.resizeSensor.resetSensor if it's undefined
            if (element.resizeSensor.resetSensor) {
                element.resizeSensor.resetSensor();
            }
        };
    };

    ResizeSensor.reset = function(element) {
        forEachElement(element, function(elem){
            //To prevent invoking element.resizeSensor.resetSensor if it's undefined
            if (element.resizeSensor.resetSensor) {
                elem.resizeSensor.resetSensor();
            }
        });
    };

    ResizeSensor.detach = function(element, ev) {
        forEachElement(element, function(elem){
            if (!elem) return;
            if(elem.resizedAttached && typeof ev === "function"){
                elem.resizedAttached.remove(ev);
                if(elem.resizedAttached.length()) return;
            }
            if (elem.resizeSensor) {
                if (elem.contains(elem.resizeSensor)) {
                    elem.removeChild(elem.resizeSensor);
                }
                delete elem.resizeSensor;
                delete elem.resizedAttached;
            }
        });
    };

    if (typeof MutationObserver !== "undefined") {
        var observer = new MutationObserver(function (mutations) {
            for (var i in mutations) {
                if (mutations.hasOwnProperty(i)) {
                    var items = mutations[i].addedNodes;
                    for (var j = 0; j < items.length; j++) {
                        if (items[j].resizeSensor) {
                            ResizeSensor.reset(items[j]);
                        }
                    }
                }
            }
        });

        document.addEventListener("DOMContentLoaded", function (event) {
            observer.observe(document.body, {
                childList: true,
                subtree: true,
            });
        });
    }
    return ResizeSensor;
}));
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.StickySidebar = {})));
}(this, (function (exports) { 'use strict';

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};



function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var stickySidebar = createCommonjsModule(function (module, exports) {
(function (global, factory) {
  if (typeof undefined === "function" && undefined.amd) {
    undefined(['exports'], factory);
  } else {
    factory(exports);
  }
})(commonjsGlobal, function (exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  /**
   * Sticky Sidebar JavaScript Plugin.
   * @version 3.3.4
   * @author Ahmed Bouhuolia <a.bouhuolia@gmail.com>
   * @license The MIT License (MIT)
   */
  var StickySidebar = function () {

    // ---------------------------------
    // # Define Constants
    // ---------------------------------
    //
    var EVENT_KEY = '.stickySidebar';
    var DEFAULTS = {
      /**
       * Additional top spacing of the element when it becomes sticky.
       * @type {Numeric|Function}
       */
      topSpacing: 0,

      /**
       * Additional bottom spacing of the element when it becomes sticky.
       * @type {Numeric|Function}
       */
      bottomSpacing: 0,

      /**
       * Container sidebar selector to know what the beginning and end of sticky element.
       * @type {String|False}
       */
      containerSelector: false,

      /**
       * Inner wrapper selector.
       * @type {String}
       */
      innerWrapperSelector: '.inner-wrapper-sticky',

      /**
       * The name of CSS class to apply to elements when they have become stuck.
       * @type {String|False}
       */
      stickyClass: 'is-affixed',

      /**
       * Detect when sidebar and its container change height so re-calculate their dimensions.
       * @type {Boolean}
       */
      resizeSensor: true,

      /**
       * The sidebar returns to its normal position if its width below this value.
       * @type {Numeric}
       */
      minWidth: false
    };

    // ---------------------------------
    // # Class Definition
    // ---------------------------------
    //
    /**
     * Sticky Sidebar Class.
     * @public
     */

    var StickySidebar = function () {

      /**
       * Sticky Sidebar Constructor.
       * @constructor
       * @param {HTMLElement|String} sidebar - The sidebar element or sidebar selector.
       * @param {Object} options - The options of sticky sidebar.
       */
      function StickySidebar(sidebar) {
        var _this = this;

        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        _classCallCheck(this, StickySidebar);

        this.options = StickySidebar.extend(DEFAULTS, options);

        // Sidebar element query if there's no one, throw error.
        this.sidebar = 'string' === typeof sidebar ? document.querySelector(sidebar) : sidebar;
        if ('undefined' === typeof this.sidebar) throw new Error("There is no specific sidebar element.");

        this.sidebarInner = false;
        this.container = this.sidebar.parentElement;

        // Current Affix Type of sidebar element.
        this.affixedType = 'STATIC';
        this.direction = 'down';
        this.support = {
          transform: false,
          transform3d: false
        };

        this._initialized = false;
        this._reStyle = false;
        this._breakpoint = false;

        // Dimensions of sidebar, container and screen viewport.
        this.dimensions = {
          translateY: 0,
          maxTranslateY: 0,
          topSpacing: 0,
          lastTopSpacing: 0,
          bottomSpacing: 0,
          lastBottomSpacing: 0,
          sidebarHeight: 0,
          sidebarWidth: 0,
          containerTop: 0,
          containerHeight: 0,
          viewportHeight: 0,
          viewportTop: 0,
          lastViewportTop: 0
        };

        // Bind event handlers for referencability.
        ['handleEvent'].forEach(function (method) {
          _this[method] = _this[method].bind(_this);
        });

        // Initialize sticky sidebar for first time.
        this.initialize();
      }

      /**
       * Initializes the sticky sidebar by adding inner wrapper, define its container, 
       * min-width breakpoint, calculating dimensions, adding helper classes and inline style.
       * @private
       */


      _createClass(StickySidebar, [{
        key: 'initialize',
        value: function initialize() {
          var _this2 = this;

          this._setSupportFeatures();

          // Get sticky sidebar inner wrapper, if not found, will create one.
          if (this.options.innerWrapperSelector) {
            this.sidebarInner = this.sidebar.querySelector(this.options.innerWrapperSelector);

            if (null === this.sidebarInner) this.sidebarInner = false;
          }

          if (!this.sidebarInner) {
            var wrapper = document.createElement('div');
            wrapper.setAttribute('class', 'inner-wrapper-sticky');
            this.sidebar.appendChild(wrapper);

            while (this.sidebar.firstChild != wrapper) {
              wrapper.appendChild(this.sidebar.firstChild);
            }this.sidebarInner = this.sidebar.querySelector('.inner-wrapper-sticky');
          }

          // Container wrapper of the sidebar.
          if (this.options.containerSelector) {
            var containers = document.querySelectorAll(this.options.containerSelector);
            containers = Array.prototype.slice.call(containers);

            containers.forEach(function (container, item) {
              if (!container.contains(_this2.sidebar)) return;
              _this2.container = container;
            });

            if (!containers.length) throw new Error("The container does not contains on the sidebar.");
          }

          // If top/bottom spacing is not function parse value to integer.
          if ('function' !== typeof this.options.topSpacing) this.options.topSpacing = parseInt(this.options.topSpacing) || 0;

          if ('function' !== typeof this.options.bottomSpacing) this.options.bottomSpacing = parseInt(this.options.bottomSpacing) || 0;

          // Breakdown sticky sidebar if screen width below `options.minWidth`.
          this._widthBreakpoint();

          // Calculate dimensions of sidebar, container and viewport.
          this.calcDimensions();

          // Affix sidebar in proper position.
          this.stickyPosition();

          // Bind all events.
          this.bindEvents();

          // Inform other properties the sticky sidebar is initialized.
          this._initialized = true;
        }
      }, {
        key: 'bindEvents',
        value: function bindEvents() {
          window.addEventListener('resize', this, { passive: true, capture: false });
          window.addEventListener('scroll', this, { passive: true, capture: false });

          this.sidebar.addEventListener('update' + EVENT_KEY, this);

          if (this.options.resizeSensor && 'undefined' !== typeof ResizeSensor) {
            new ResizeSensor(this.sidebarInner, this.handleEvent);
            new ResizeSensor(this.container, this.handleEvent);
          }
        }
      }, {
        key: 'handleEvent',
        value: function handleEvent(event) {
          this.updateSticky(event);
        }
      }, {
        key: 'calcDimensions',
        value: function calcDimensions() {
          if (this._breakpoint) return;
          var dims = this.dimensions;

          // Container of sticky sidebar dimensions.
          dims.containerTop = StickySidebar.offsetRelative(this.container).top;
          dims.containerHeight = this.container.clientHeight;
          dims.containerBottom = dims.containerTop + dims.containerHeight;

          // Sidebar dimensions.
          dims.sidebarHeight = this.sidebarInner.offsetHeight;
          dims.sidebarWidth = this.sidebarInner.offsetWidth;

          // Screen viewport dimensions.
          dims.viewportHeight = window.innerHeight;

          // Maximum sidebar translate Y.
          dims.maxTranslateY = dims.containerHeight - dims.sidebarHeight;

          this._calcDimensionsWithScroll();
        }
      }, {
        key: '_calcDimensionsWithScroll',
        value: function _calcDimensionsWithScroll() {
          var dims = this.dimensions;

          dims.sidebarLeft = StickySidebar.offsetRelative(this.sidebar).left;

          dims.viewportTop = document.documentElement.scrollTop || document.body.scrollTop;
          dims.viewportBottom = dims.viewportTop + dims.viewportHeight;
          dims.viewportLeft = document.documentElement.scrollLeft || document.body.scrollLeft;

          dims.topSpacing = this.options.topSpacing;
          dims.bottomSpacing = this.options.bottomSpacing;

          if ('function' === typeof dims.topSpacing) dims.topSpacing = parseInt(dims.topSpacing(this.sidebar)) || 0;

          if ('function' === typeof dims.bottomSpacing) dims.bottomSpacing = parseInt(dims.bottomSpacing(this.sidebar)) || 0;

          if ('VIEWPORT-TOP' === this.affixedType) {
            // Adjust translate Y in the case decrease top spacing value.
            if (dims.topSpacing < dims.lastTopSpacing) {
              dims.translateY += dims.lastTopSpacing - dims.topSpacing;
              this._reStyle = true;
            }
          } else if ('VIEWPORT-BOTTOM' === this.affixedType) {
            // Adjust translate Y in the case decrease bottom spacing value.
            if (dims.bottomSpacing < dims.lastBottomSpacing) {
              dims.translateY += dims.lastBottomSpacing - dims.bottomSpacing;
              this._reStyle = true;
            }
          }

          dims.lastTopSpacing = dims.topSpacing;
          dims.lastBottomSpacing = dims.bottomSpacing;
        }
      }, {
        key: 'isSidebarFitsViewport',
        value: function isSidebarFitsViewport() {
          var dims = this.dimensions;
          var offset = this.scrollDirection === 'down' ? dims.lastBottomSpacing : dims.lastTopSpacing;
          return this.dimensions.sidebarHeight + offset < this.dimensions.viewportHeight;
        }
      }, {
        key: 'observeScrollDir',
        value: function observeScrollDir() {
          var dims = this.dimensions;
          if (dims.lastViewportTop === dims.viewportTop) return;

          var furthest = 'down' === this.direction ? Math.min : Math.max;

          // If the browser is scrolling not in the same direction.
          if (dims.viewportTop === furthest(dims.viewportTop, dims.lastViewportTop)) this.direction = 'down' === this.direction ? 'up' : 'down';
        }
      }, {
        key: 'getAffixType',
        value: function getAffixType() {
          this._calcDimensionsWithScroll();
          var dims = this.dimensions;
          var colliderTop = dims.viewportTop + dims.topSpacing;
          var affixType = this.affixedType;

          if (colliderTop <= dims.containerTop || dims.containerHeight <= dims.sidebarHeight) {
            dims.translateY = 0;
            affixType = 'STATIC';
          } else {
            affixType = 'up' === this.direction ? this._getAffixTypeScrollingUp() : this._getAffixTypeScrollingDown();
          }

          // Make sure the translate Y is not bigger than container height.
          dims.translateY = Math.max(0, dims.translateY);
          dims.translateY = Math.min(dims.containerHeight, dims.translateY);
          dims.translateY = Math.round(dims.translateY);

          dims.lastViewportTop = dims.viewportTop;
          return affixType;
        }
      }, {
        key: '_getAffixTypeScrollingDown',
        value: function _getAffixTypeScrollingDown() {
          var dims = this.dimensions;
          var sidebarBottom = dims.sidebarHeight + dims.containerTop;
          var colliderTop = dims.viewportTop + dims.topSpacing;
          var colliderBottom = dims.viewportBottom - dims.bottomSpacing;
          var affixType = this.affixedType;

          if (this.isSidebarFitsViewport()) {
            if (dims.sidebarHeight + colliderTop >= dims.containerBottom) {
              dims.translateY = dims.containerBottom - sidebarBottom;
              affixType = 'CONTAINER-BOTTOM';
            } else if (colliderTop >= dims.containerTop) {
              dims.translateY = colliderTop - dims.containerTop;
              affixType = 'VIEWPORT-TOP';
            }
          } else {
            if (dims.containerBottom <= colliderBottom) {
              dims.translateY = dims.containerBottom - sidebarBottom;
              affixType = 'CONTAINER-BOTTOM';
            } else if (sidebarBottom + dims.translateY <= colliderBottom) {
              dims.translateY = colliderBottom - sidebarBottom;
              affixType = 'VIEWPORT-BOTTOM';
            } else if (dims.containerTop + dims.translateY <= colliderTop && 0 !== dims.translateY && dims.maxTranslateY !== dims.translateY) {
              affixType = 'VIEWPORT-UNBOTTOM';
            }
          }

          return affixType;
        }
      }, {
        key: '_getAffixTypeScrollingUp',
        value: function _getAffixTypeScrollingUp() {
          var dims = this.dimensions;
          var sidebarBottom = dims.sidebarHeight + dims.containerTop;
          var colliderTop = dims.viewportTop + dims.topSpacing;
          var colliderBottom = dims.viewportBottom - dims.bottomSpacing;
          var affixType = this.affixedType;

          if (colliderTop <= dims.translateY + dims.containerTop) {
            dims.translateY = colliderTop - dims.containerTop;
            affixType = 'VIEWPORT-TOP';
          } else if (dims.containerBottom <= colliderBottom) {
            dims.translateY = dims.containerBottom - sidebarBottom;
            affixType = 'CONTAINER-BOTTOM';
          } else if (!this.isSidebarFitsViewport()) {

            if (dims.containerTop <= colliderTop && 0 !== dims.translateY && dims.maxTranslateY !== dims.translateY) {
              affixType = 'VIEWPORT-UNBOTTOM';
            }
          }

          return affixType;
        }
      }, {
        key: '_getStyle',
        value: function _getStyle(affixType) {
          if ('undefined' === typeof affixType) return;

          var style = { inner: {}, outer: {} };
          var dims = this.dimensions;

          switch (affixType) {
            case 'VIEWPORT-TOP':
              style.inner = { position: 'fixed', top: dims.topSpacing,
                left: dims.sidebarLeft - dims.viewportLeft, width: dims.sidebarWidth };
              break;
            case 'VIEWPORT-BOTTOM':
              style.inner = { position: 'fixed', top: 'auto', left: dims.sidebarLeft,
                bottom: dims.bottomSpacing, width: dims.sidebarWidth };
              break;
            case 'CONTAINER-BOTTOM':
            case 'VIEWPORT-UNBOTTOM':
              var translate = this._getTranslate(0, dims.translateY + 'px');

              if (translate) style.inner = { transform: translate };else style.inner = { position: 'absolute', top: dims.translateY, width: dims.sidebarWidth };
              break;
          }

          switch (affixType) {
            case 'VIEWPORT-TOP':
            case 'VIEWPORT-BOTTOM':
            case 'VIEWPORT-UNBOTTOM':
            case 'CONTAINER-BOTTOM':
              style.outer = { height: dims.sidebarHeight, position: 'relative' };
              break;
          }

          style.outer = StickySidebar.extend({ height: '', position: '' }, style.outer);
          style.inner = StickySidebar.extend({ position: 'relative', top: '', left: '',
            bottom: '', width: '', transform: '' }, style.inner);

          return style;
        }
      }, {
        key: 'stickyPosition',
        value: function stickyPosition(force) {
          if (this._breakpoint) return;

          force = this._reStyle || force || false;

          var offsetTop = this.options.topSpacing;
          var offsetBottom = this.options.bottomSpacing;

          var affixType = this.getAffixType();
          var style = this._getStyle(affixType);

          if ((this.affixedType != affixType || force) && affixType) {
            var affixEvent = 'affix.' + affixType.toLowerCase().replace('viewport-', '') + EVENT_KEY;
            StickySidebar.eventTrigger(this.sidebar, affixEvent);

            if ('STATIC' === affixType) StickySidebar.removeClass(this.sidebar, this.options.stickyClass);else StickySidebar.addClass(this.sidebar, this.options.stickyClass);

            for (var key in style.outer) {
              var unit = 'number' === typeof style.outer[key] ? 'px' : '';
              this.sidebar.style[key] = style.outer[key] + unit;
            }

            for (var _key in style.inner) {
              var _unit = 'number' === typeof style.inner[_key] ? 'px' : '';
              this.sidebarInner.style[_key] = style.inner[_key] + _unit;
            }

            var affixedEvent = 'affixed.' + affixType.toLowerCase().replace('viewport-', '') + EVENT_KEY;
            StickySidebar.eventTrigger(this.sidebar, affixedEvent);
          } else {
            if (this._initialized) this.sidebarInner.style.left = style.inner.left;
          }

          this.affixedType = affixType;
        }
      }, {
        key: '_widthBreakpoint',
        value: function _widthBreakpoint() {

          if (window.innerWidth <= this.options.minWidth) {
            this._breakpoint = true;
            this.affixedType = 'STATIC';

            this.sidebar.removeAttribute('style');
            StickySidebar.removeClass(this.sidebar, this.options.stickyClass);
            this.sidebarInner.removeAttribute('style');
          } else {
            this._breakpoint = false;
          }
        }
      }, {
        key: 'updateSticky',
        value: function updateSticky() {
          var _this3 = this;

          var event = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

          if (this._running) return;
          this._running = true;

          (function (eventType) {
            requestAnimationFrame(function () {
              switch (eventType) {
                // When browser is scrolling and re-calculate just dimensions
                // within scroll. 
                case 'scroll':
                  _this3._calcDimensionsWithScroll();
                  _this3.observeScrollDir();
                  _this3.stickyPosition();
                  break;

                // When browser is resizing or there's no event, observe width
                // breakpoint and re-calculate dimensions.
                case 'resize':
                default:
                  _this3._widthBreakpoint();
                  _this3.calcDimensions();
                  _this3.stickyPosition(true);
                  break;
              }
              _this3._running = false;
            });
          })(event.type);
        }
      }, {
        key: '_setSupportFeatures',
        value: function _setSupportFeatures() {
          var support = this.support;

          support.transform = StickySidebar.supportTransform();
          support.transform3d = StickySidebar.supportTransform(true);
        }
      }, {
        key: '_getTranslate',
        value: function _getTranslate() {
          var y = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
          var x = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
          var z = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

          if (this.support.transform3d) return 'translate3d(' + y + ', ' + x + ', ' + z + ')';else if (this.support.translate) return 'translate(' + y + ', ' + x + ')';else return false;
        }
      }, {
        key: 'destroy',
        value: function destroy() {
          window.removeEventListener('resize', this, { capture: false });
          window.removeEventListener('scroll', this, { capture: false });

          this.sidebar.classList.remove(this.options.stickyClass);
          this.sidebar.style.minHeight = '';

          this.sidebar.removeEventListener('update' + EVENT_KEY, this);

          var styleReset = { inner: {}, outer: {} };

          styleReset.inner = { position: '', top: '', left: '', bottom: '', width: '', transform: '' };
          styleReset.outer = { height: '', position: '' };

          for (var key in styleReset.outer) {
            this.sidebar.style[key] = styleReset.outer[key];
          }for (var _key2 in styleReset.inner) {
            this.sidebarInner.style[_key2] = styleReset.inner[_key2];
          }if (this.options.resizeSensor && 'undefined' !== typeof ResizeSensor) {
            ResizeSensor.detach(this.sidebarInner, this.handleEvent);
            ResizeSensor.detach(this.container, this.handleEvent);
          }
        }
      }], [{
        key: 'supportTransform',
        value: function supportTransform(transform3d) {
          var result = false,
              property = transform3d ? 'perspective' : 'transform',
              upper = property.charAt(0).toUpperCase() + property.slice(1),
              prefixes = ['Webkit', 'Moz', 'O', 'ms'],
              support = document.createElement('support'),
              style = support.style;

          (property + ' ' + prefixes.join(upper + ' ') + upper).split(' ').forEach(function (property, i) {
            if (style[property] !== undefined) {
              result = property;
              return false;
            }
          });
          return result;
        }
      }, {
        key: 'eventTrigger',
        value: function eventTrigger(element, eventName, data) {
          try {
            var event = new CustomEvent(eventName, { detail: data });
          } catch (e) {
            var event = document.createEvent('CustomEvent');
            event.initCustomEvent(eventName, true, true, data);
          }
          element.dispatchEvent(event);
        }
      }, {
        key: 'extend',
        value: function extend(defaults, options) {
          var results = {};
          for (var key in defaults) {
            if ('undefined' !== typeof options[key]) results[key] = options[key];else results[key] = defaults[key];
          }
          return results;
        }
      }, {
        key: 'offsetRelative',
        value: function offsetRelative(element) {
          var result = { left: 0, top: 0 };

          do {
            var offsetTop = element.offsetTop;
            var offsetLeft = element.offsetLeft;

            if (!isNaN(offsetTop)) result.top += offsetTop;

            if (!isNaN(offsetLeft)) result.left += offsetLeft;

            element = 'BODY' === element.tagName ? element.parentElement : element.offsetParent;
          } while (element);
          return result;
        }
      }, {
        key: 'addClass',
        value: function addClass(element, className) {
          if (!StickySidebar.hasClass(element, className)) {
            if (element.classList) element.classList.add(className);else element.className += ' ' + className;
          }
        }
      }, {
        key: 'removeClass',
        value: function removeClass(element, className) {
          if (StickySidebar.hasClass(element, className)) {
            if (element.classList) element.classList.remove(className);else element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
          }
        }
      }, {
        key: 'hasClass',
        value: function hasClass(element, className) {
          if (element.classList) return element.classList.contains(className);else return new RegExp('(^| )' + className + '( |$)', 'gi').test(element.className);
        }
      }, {
        key: 'defaults',
        get: function () {
          return DEFAULTS;
        }
      }]);

      return StickySidebar;
    }();

    return StickySidebar;
  }();

  exports.default = StickySidebar;


  // Global
  // -------------------------
  window.StickySidebar = StickySidebar;
});
});

var stickySidebar$1 = unwrapExports(stickySidebar);

exports['default'] = stickySidebar$1;
exports.__moduleExports = stickySidebar;

Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=sticky-sidebar.js.map

!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):a("object"==typeof exports?require("jquery"):jQuery)}(function(a){var b,c=navigator.userAgent,d=/iphone/i.test(c),e=/chrome/i.test(c),f=/android/i.test(c);a.mask={definitions:{9:"[0-9]",a:"[A-Za-z]","*":"[A-Za-z0-9]"},autoclear:!0,dataName:"rawMaskFn",placeholder:"_"},a.fn.extend({caret:function(a,b){var c;if(0!==this.length&&!this.is(":hidden"))return"number"==typeof a?(b="number"==typeof b?b:a,this.each(function(){this.setSelectionRange?this.setSelectionRange(a,b):this.createTextRange&&(c=this.createTextRange(),c.collapse(!0),c.moveEnd("character",b),c.moveStart("character",a),c.select())})):(this[0].setSelectionRange?(a=this[0].selectionStart,b=this[0].selectionEnd):document.selection&&document.selection.createRange&&(c=document.selection.createRange(),a=0-c.duplicate().moveStart("character",-1e5),b=a+c.text.length),{begin:a,end:b})},unmask:function(){return this.trigger("unmask")},mask:function(c,g){var h,i,j,k,l,m,n,o;if(!c&&this.length>0){h=a(this[0]);var p=h.data(a.mask.dataName);return p?p():void 0}return g=a.extend({autoclear:a.mask.autoclear,placeholder:a.mask.placeholder,completed:null},g),i=a.mask.definitions,j=[],k=n=c.length,l=null,a.each(c.split(""),function(a,b){"?"==b?(n--,k=a):i[b]?(j.push(new RegExp(i[b])),null===l&&(l=j.length-1),k>a&&(m=j.length-1)):j.push(null)}),this.trigger("unmask").each(function(){function h(){if(g.completed){for(var a=l;m>=a;a++)if(j[a]&&C[a]===p(a))return;g.completed.call(B)}}function p(a){return g.placeholder.charAt(a<g.placeholder.length?a:0)}function q(a){for(;++a<n&&!j[a];);return a}function r(a){for(;--a>=0&&!j[a];);return a}function s(a,b){var c,d;if(!(0>a)){for(c=a,d=q(b);n>c;c++)if(j[c]){if(!(n>d&&j[c].test(C[d])))break;C[c]=C[d],C[d]=p(d),d=q(d)}z(),B.caret(Math.max(l,a))}}function t(a){var b,c,d,e;for(b=a,c=p(a);n>b;b++)if(j[b]){if(d=q(b),e=C[b],C[b]=c,!(n>d&&j[d].test(e)))break;c=e}}function u(){var a=B.val(),b=B.caret();if(o&&o.length&&o.length>a.length){for(A(!0);b.begin>0&&!j[b.begin-1];)b.begin--;if(0===b.begin)for(;b.begin<l&&!j[b.begin];)b.begin++;B.caret(b.begin,b.begin)}else{for(A(!0);b.begin<n&&!j[b.begin];)b.begin++;B.caret(b.begin,b.begin)}h()}function v(){A(),B.val()!=E&&B.change()}function w(a){if(!B.prop("readonly")){var b,c,e,f=a.which||a.keyCode;o=B.val(),8===f||46===f||d&&127===f?(b=B.caret(),c=b.begin,e=b.end,e-c===0&&(c=46!==f?r(c):e=q(c-1),e=46===f?q(e):e),y(c,e),s(c,e-1),a.preventDefault()):13===f?v.call(this,a):27===f&&(B.val(E),B.caret(0,A()),a.preventDefault())}}function x(b){if(!B.prop("readonly")){var c,d,e,g=b.which||b.keyCode,i=B.caret();if(!(b.ctrlKey||b.altKey||b.metaKey||32>g)&&g&&13!==g){if(i.end-i.begin!==0&&(y(i.begin,i.end),s(i.begin,i.end-1)),c=q(i.begin-1),n>c&&(d=String.fromCharCode(g),j[c].test(d))){if(t(c),C[c]=d,z(),e=q(c),f){var k=function(){a.proxy(a.fn.caret,B,e)()};setTimeout(k,0)}else B.caret(e);i.begin<=m&&h()}b.preventDefault()}}}function y(a,b){var c;for(c=a;b>c&&n>c;c++)j[c]&&(C[c]=p(c))}function z(){B.val(C.join(""))}function A(a){var b,c,d,e=B.val(),f=-1;for(b=0,d=0;n>b;b++)if(j[b]){for(C[b]=p(b);d++<e.length;)if(c=e.charAt(d-1),j[b].test(c)){C[b]=c,f=b;break}if(d>e.length){y(b+1,n);break}}else C[b]===e.charAt(d)&&d++,k>b&&(f=b);return a?z():k>f+1?g.autoclear||C.join("")===D?(B.val()&&B.val(""),y(0,n)):z():(z(),B.val(B.val().substring(0,f+1))),k?b:l}var B=a(this),C=a.map(c.split(""),function(a,b){return"?"!=a?i[a]?p(b):a:void 0}),D=C.join(""),E=B.val();B.data(a.mask.dataName,function(){return a.map(C,function(a,b){return j[b]&&a!=p(b)?a:null}).join("")}),B.one("unmask",function(){B.off(".mask").removeData(a.mask.dataName)}).on("focus.mask",function(){if(!B.prop("readonly")){clearTimeout(b);var a;E=B.val(),a=A(),b=setTimeout(function(){B.get(0)===document.activeElement&&(z(),a==c.replace("?","").length?B.caret(0,a):B.caret(a))},10)}}).on("blur.mask",v).on("keydown.mask",w).on("keypress.mask",x).on("input.mask paste.mask",function(){B.prop("readonly")||setTimeout(function(){var a=A(!0);B.caret(a),h()},0)}),e&&f&&B.off("input.mask").on("input.mask",u),A()})}})});

/*!
 * JavaScript Cookie v2.2.1
 * https://github.com/js-cookie/js-cookie
 *
 * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
 * Released under the MIT license
 */
;(function (factory) {
	var registeredInModuleLoader;
	if (typeof define === 'function' && define.amd) {
		define(factory);
		registeredInModuleLoader = true;
	}
	if (typeof exports === 'object') {
		module.exports = factory();
		registeredInModuleLoader = true;
	}
	if (!registeredInModuleLoader) {
		var OldCookies = window.Cookies;
		var api = window.Cookies = factory();
		api.noConflict = function () {
			window.Cookies = OldCookies;
			return api;
		};
	}
}(function () {
	function extend () {
		var i = 0;
		var result = {};
		for (; i < arguments.length; i++) {
			var attributes = arguments[ i ];
			for (var key in attributes) {
				result[key] = attributes[key];
			}
		}
		return result;
	}

	function decode (s) {
		return s.replace(/(%[0-9A-Z]{2})+/g, decodeURIComponent);
	}

	function init (converter) {
		function api() {}

		function set (key, value, attributes) {
			if (typeof document === 'undefined') {
				return;
			}

			attributes = extend({
				path: '/'
			}, api.defaults, attributes);

			if (typeof attributes.expires === 'number') {
				attributes.expires = new Date(new Date() * 1 + attributes.expires * 864e+5);
			}

			// We're using "expires" because "max-age" is not supported by IE
			attributes.expires = attributes.expires ? attributes.expires.toUTCString() : '';

			try {
				var result = JSON.stringify(value);
				if (/^[\{\[]/.test(result)) {
					value = result;
				}
			} catch (e) {}

			value = converter.write ?
				converter.write(value, key) :
				encodeURIComponent(String(value))
					.replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);

			key = encodeURIComponent(String(key))
				.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent)
				.replace(/[\(\)]/g, escape);

			var stringifiedAttributes = '';
			for (var attributeName in attributes) {
				if (!attributes[attributeName]) {
					continue;
				}
				stringifiedAttributes += '; ' + attributeName;
				if (attributes[attributeName] === true) {
					continue;
				}

				// Considers RFC 6265 section 5.2:
				// ...
				// 3.  If the remaining unparsed-attributes contains a %x3B (";")
				//     character:
				// Consume the characters of the unparsed-attributes up to,
				// not including, the first %x3B (";") character.
				// ...
				stringifiedAttributes += '=' + attributes[attributeName].split(';')[0];
			}

			return (document.cookie = key + '=' + value + stringifiedAttributes);
		}

		function get (key, json) {
			if (typeof document === 'undefined') {
				return;
			}

			var jar = {};
			// To prevent the for loop in the first place assign an empty array
			// in case there are no cookies at all.
			var cookies = document.cookie ? document.cookie.split('; ') : [];
			var i = 0;

			for (; i < cookies.length; i++) {
				var parts = cookies[i].split('=');
				var cookie = parts.slice(1).join('=');

				if (!json && cookie.charAt(0) === '"') {
					cookie = cookie.slice(1, -1);
				}

				try {
					var name = decode(parts[0]);
					cookie = (converter.read || converter)(cookie, name) ||
						decode(cookie);

					if (json) {
						try {
							cookie = JSON.parse(cookie);
						} catch (e) {}
					}

					jar[name] = cookie;

					if (key === name) {
						break;
					}
				} catch (e) {}
			}

			return key ? jar[key] : jar;
		}

		api.set = set;
		api.get = function (key) {
			return get(key, false /* read as raw */);
		};
		api.getJSON = function (key) {
			return get(key, true /* read as json */);
		};
		api.remove = function (key, attributes) {
			set(key, '', extend(attributes, {
				expires: -1
			}));
		};

		api.defaults = {};

		api.withConverter = init;

		return api;
	}

	return init(function () {});
}));

jQuery(document).ready(function($){
    $.bvi({
        'bvi_target' : '.bvi-open', // Класс ссылки включения плагина
        "bvi_theme" : "white", // Цвет сайта
        "bvi_font" : "arial", // Шрифт
        "bvi_font_size" : 16, // Размер шрифта
        "bvi_letter_spacing" : "normal", // Межбуквенный интервал
        "bvi_line_height" : "normal", // Междустрочный интервал
        "bvi_images" : false, // Изображения
        "bvi_reload" : false, // Перезагрузка страницы при выключении плагина
        "bvi_fixed" : false, // Фиксирование панели для слабовидящих вверху страницы
        "bvi_tts" : true, // Синтез речи
        "bvi_flash_iframe" : true, // Встроенные элементы (видео, карты и тд.)
        "bvi_hide" : false // Скрывает панель для слабовидящих и показывает иконку панели.
    });
});
/*!
 * Button visually impaired v2.0
 */
(function ($) {
    "use strict";
    $.bvi = function (options) {
        var default_setting = $.extend({
            'bvi_target': '.bvi-open',
            'bvi_theme': 'white',
            'bvi_font': 'arial',
            'bvi_font_size': 16,
            'bvi_letter_spacing': 'normal',
            'bvi_line_height': 'normal',
            'bvi_images': true,
            'bvi_reload': false,
            'bvi_fixed': true,
            'bvi_tts': true,
            'bvi_flash_iframe': true,
            'bvi_hide': false
        }, options);

        var versionIE = detectIE();
        var selector = default_setting.bvi_target;
        var check_bvi_theme;
        var check_bvi_font;
        var check_bvi_letter_spacing;
        var check_bvi_line_height;
        var check_bvi_font_size;
        var check_bvi_images;
        var check_bvi_fixed;
        var check_bvi_tts;
        var check_bvi_flash_iframe;
        var check_bvi_hide;
        var checkError;
        var bvi_tts_synth = window.speechSynthesis;
        var bvi_tts_support_browser = (bvi_tts_synth !== undefined) ? true : false;
        var sm = '576';
        var md = '768';
        var lg = '992';
        var xl = '1200';
        var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;

        console.log('Bvi console: ready Button visually impaired v2.0');

        if (bvi_tts_support_browser) {
            setInterval(function () {
                if (bvi_tts_synth.speaking == false) {
                    $('.bvi-tts-play').removeClass('disabled');
                    $('.bvi-tts-pause').addClass('disabled');
                    $('.bvi-tts-resume').addClass('disabled');
                    $('.bvi-tts-stop').addClass('disabled');
                }
            }, 1000);
            console.log('Bvi console: Чтение речи поддерживается в данной браузере');
        } else {
            console.log('Bvi console: Чтение речи не поддерживается в данном браузере');
        }

        $(window).on('resize', function () {
            var width_resize = (window.innerWidth > 0) ? window.innerWidth : screen.width;

            if (width_resize >= lg) {
                $('.bvi-panel-container').show();
            }

            if (width_resize <= lg) {
                $('.bvi-panel-container').removeClass('bvi-container').addClass('bvi-container-fluid');
            } else {
                $('.bvi-panel-container').removeClass('bvi-container-fluid').addClass('bvi-container');
            }
        });

        function detectIE() {
            var ua = window.navigator.userAgent;
            var msie = ua.indexOf('MSIE ');

            if (msie > 0) {
                return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
            }

            var trident = ua.indexOf('Trident/');
            if (trident > 0) {
                var rv = ua.indexOf('rv:');
                return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
            }

            var edge = ua.indexOf('Edge/');
            if (edge > 0) {
                return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
            }

            return false;
        }

        function bvi_tts_speak(text) {
            if (Cookies.get('bvi-tts') === 'true' && bvi_tts_support_browser) {
                bvi_tts_synth.cancel();
                var voices = bvi_tts_synth.getVoices();
                var chunkLength = 120;
                var pattRegex = new RegExp('^[\\s\\S]{' + Math.floor(chunkLength / 2) + ',' + chunkLength + '}[.!?,]{1}|^[\\s\\S]{1,' + chunkLength + '}$|^[\\s\\S]{1,' + chunkLength + '} ');
                var $array = [];
                var $text = text;

                while ($text.length > 0) {
                    $array.push($text.match(pattRegex)[0]);
                    $text = $text.substring($array[$array.length - 1].length);
                }

                $.each($array, function () {
                    var speechUtterance = new SpeechSynthesisUtterance(this.trim());
                    speechUtterance.volume = 1;
                    speechUtterance.rate = 1;
                    speechUtterance.pitch = 1;
                    speechUtterance.lang = 'ru-RU';

                    speechUtterance.onstart = function (event) {
                        console.log(speechUtterance);
                        //console.log('Start called for: ' + event.utterance.text + '-' + event.charIndex);
                    };

                    speechUtterance.onend = function (event) {
                        //console.log(event.name + ' end ' + event.elapsedTime + ' milliseconds.');
                    };

                    speechUtterance.onpause = function (event) {
                        //console.log(event.name + ' pause ' + event.elapsedTime + ' milliseconds.');
                    };

                    speechUtterance.onresume = function (event) {
                        //console.log(event.name + ' resume ' + event.elapsedTime + ' milliseconds.');
                    };

                    speechUtterance.onboundary = function (event) {
                        /*
                        var world = bvi_getWordAt(event.utterance.text, event.charIndex);
                        var src_str = $(id).text();
                        var term = world.replace(/(\s+)/, "(<[^>]+>)*$1(<[^>]+>)*");
                        var pattern = new RegExp("(" + term + ")", "gi");
                        src_str = src_str.replace(pattern, "<mark>$1</mark>");
                        src_str = src_str.replace(/(<mark>[^<>]*)((<[^>]+>)+)([^<>]*<\/mark>)/, "$1</mark>$2<mark>$4");
                        $(id).html(src_str);
                        console.log(event.utterance.text);
                        */
                    };

                    for (var i = 0; i < voices.length; i++) {
                        if (voices[i].lang === 'ru-RU' && voices[i].voiceURI === 'Google русский') {
                            speechUtterance.voice = voices[i];
                            speechUtterance.voiceURI = voices[i].voiceURI;
                        } else if (voices[i].lang === 'ru-RU' && voices[i].voiceURI === 'Microsoft Irina Desktop - Russian') {
                            speechUtterance.voice = voices[i];
                            speechUtterance.voiceURI = voices[i].voiceURI;
                        } else if (voices[i].lang === 'ru-RU' && voices[i].voiceURI === 'urn:moz-tts:sapi:Microsoft Irina Desktop - Russian?ru-RU') {
                            speechUtterance.voice = voices[i];
                            speechUtterance.voiceURI = voices[i].voiceURI;
                        } else if (voices[i].lang === 'ru-RU' && voices[i].voiceURI === 'com.apple.speech.synthesis.voice.yuri') {
                            speechUtterance.voice = voices[i];
                            speechUtterance.voiceURI = voices[i].voiceURI;
                        }
                    }

                    bvi_tts_synth.speak(speechUtterance);
                });
            }
        }

        function bvi_getWordAt(str, pos) {
            str = String(str);
            pos = Number(pos) >>> 0;
            var left = str.slice(0, pos + 1).search(/\S+$/),
                right = str.slice(pos).search(/\s/);
            if (right < 0) {
                return str.slice(left);
            }
            return str.slice(left, right + pos);
        }

        function bvi_tts_player() {
            var bvi_tts_text_id;
            var bvi_tts_voice_target = $(".bvi-tts");

            $('.bvi-tts-link').remove();
            $('.bvi-tts-text').contents().unwrap();

            if (Cookies.get('bvi-tts') === 'true' && bvi_tts_support_browser) {
                bvi_tts_voice_target.each(function (index) {
                    bvi_tts_text_id = 'bvi-tts-text-id-' + index;
                    $(this).wrapInner('<div class="bvi-tts-text ' + bvi_tts_text_id + '"></div>');
                    $(this).prepend('<div class="bvi-tts-link bvi-tts-link-id-' + index + '" data-bvi-tts-class-text=".' + bvi_tts_text_id + '" data-bvi-tts-link-id=".bvi-tts-link-id-' + index + '">\n' +
                        '    <a href="#" class="bvi-tts-play bvi-link">Воспроизвести</a>\n' +
                        '    <a href="#" class="bvi-tts-pause bvi-link disabled">Пауза</i></a>\n' +
                        '    <a href="#" class="bvi-tts-resume bvi-link disabled">Продолжить</i></a>\n' +
                        '    <a href="#" class="bvi-tts-stop bvi-link disabled">Стоп</i></a>\n' +
                        '</div>');
                });

                $('.bvi-tts-link').show();

                $('.bvi-tts-play').click(function () {
                    bvi_tts_synth.cancel();
                    var bvi_tts_class = $(this).parent().data('bvi-tts-class-text');
                    var bvi_tts_links_id = $(this).parent().data('bvi-tts-link-id');
                    var bvi_tts_class_text = $(bvi_tts_class).text();

                    bvi_tts_speak(bvi_tts_class_text);

                    $('.bvi-tts-play').removeClass('disabled');
                    $('.bvi-tts-pause').addClass('disabled');
                    $('.bvi-tts-resume').addClass('disabled');
                    $('.bvi-tts-stop').addClass('disabled');
                    $(bvi_tts_links_id + ' .bvi-tts-play').addClass('disabled');
                    $(bvi_tts_links_id + ' .bvi-tts-pause').removeClass('disabled');
                    $(bvi_tts_links_id + ' .bvi-tts-stop').removeClass('disabled');
                    return false;
                });

                $('.bvi-tts-resume').click(function () {
                    var bvi_tts_links_id = $(this).parent().data('bvi-tts-link-id');
                    $(bvi_tts_links_id + ' .bvi-tts-pause').removeClass('disabled');
                    $(this).addClass('disabled');
                    bvi_tts_synth.resume();
                    return false;
                });

                $('.bvi-tts-pause').click(function () {
                    var bvi_tts_links_id = $(this).parent().data('bvi-tts-link-id');
                    $(bvi_tts_links_id + ' .bvi-tts-resume').removeClass('disabled');
                    $(this).addClass('disabled');
                    bvi_tts_synth.pause();
                    return false;
                });

                $('.bvi-tts-stop').click(function () {
                    bvi_tts_synth.cancel();
                    var bvi_tts_links_id = $(this).parent().data('bvi-tts-link-id');
                    $(this).addClass('disabled');
                    $(bvi_tts_links_id + ' .bvi-tts-play').removeClass('disabled');
                    $(bvi_tts_links_id + ' .bvi-tts-pause').addClass('disabled');
                    $(bvi_tts_links_id + ' .bvi-tts-resume').addClass('disabled');
                    return false;
                });
            } else {
                $('.bvi-tts-link').remove();
                $('.bvi-tts-text').contents().unwrap();
            }
        }

        function bvi_click() {
            $("#bvi-panel-close, .bvi-panel-close, #bvi-toggler-close").click(function () {

                bvi_tts_speak('Обычная версия сайта');

                if (Cookies.get("bvi-reload") === 'true') {
                    document.location.reload(true);
                }

                $(".bvi-body *").each(function () {
                    var $this = $(this);
                    var background_image = $this.css("background-image");
                    var pattern = background_image.replace(/.*\s?url\([\'\"]?/, '').replace(/[\'\"]?\).*/, '');
                    if (pattern != 'none') {
                        if (versionIE == 11 || versionIE == 10 || versionIE == 9) {
                            var data_bvi_img_original = $this.attr('data-bvi-background-image-original') || pattern;
                            $this.css("background-image", "url(" + data_bvi_img_original + ")");
                            $this.removeClass('bvi-background-image');
                        }
                    }
                });

                $("img").each(function () {
                    $(this).show();
                    $('div.bvi-img').remove();
                    $(this).removeClass("bvi-background-image");
                    if (versionIE == 11 || versionIE == 10 || versionIE == 9) {
                        var data_bvi_img_original = $(this).attr('data-bvi-img-original') || this.src;
                        this.src = data_bvi_img_original;
                    }
                });

                Cookies.remove("bvi-panel-active", {path: "/"});
                Cookies.remove("bvi-font-size", {path: "/"});
                Cookies.remove("bvi-theme", {path: "/"});
                Cookies.remove("bvi-images", {path: "/"});
                Cookies.remove("bvi-line-height", {path: "/"});
                Cookies.remove("bvi-letter-spacing", {path: "/"});
                Cookies.remove("bvi-tts", {path: "/"});
                Cookies.remove("bvi-font-family", {path: "/"});
                Cookies.remove("bvi-panel-hide", {path: "/"});
                Cookies.remove("bvi-flash-iframe", {path: "/"});
                Cookies.remove("bvi-reload", {path: "/"});

                active();
                return false;
            });

            $('#bvi-panel-hide, #bvi-toggler-menu-hide').click(function () {
                $('.bvi-panel').toggle(0);
                $('.bvi-link-top').toggle(0);
                set('data-bvi-panel-hide', 'bvi-panel-hide', true);
                bvi_tts_speak('Панель скрыта');
                return false;
            });

            $('#bvi-panel-show').click(function () {
                $('.bvi-panel').toggle(0);
                $('.bvi-link-top').toggle(0);
                set('data-bvi-panel-hide', 'bvi-panel-hide', false);
                bvi_tts_speak('Панель открыта');
                return false;
            });

            $('#bvi-setting').click(function () {
                $('.bvi-setting-menu').toggle(0);
                $(this).toggleClass("active");
                bvi_tts_speak('Дополнительные настройки');
                return false;
            });

            $('#bvi-toggler').click(function () {
                $('.bvi-panel-container').toggle(0);
                $(this).toggleClass("active");
                bvi_tts_speak('Меню');
                return false;
            });

            $('#bvi-setting-close').click(function () {
                $('.bvi-setting-menu').toggle(0);
                $('#bvi-setting').toggleClass("active");
                bvi_tts_speak('Дополнительные настройки закрыты');
                return false;
            });

            $('#bvi-font-size-less').click(function () {
                var size = parseFloat(Cookies.get("bvi-font-size")) - 1;
                $(this).addClass('active').siblings().removeClass('active');
                $('#bvi-font-size').text(size);
                if (size != 0) {
                    set('data-bvi-size', 'bvi-font-size', size);
                    bvi_tts_speak('Размер шрифта уменьшен');
                }
                return false;
            });

            $('#bvi-font-size-more').click(function () {
                var size = parseFloat(Cookies.get("bvi-font-size")) + 1;
                $(this).addClass('active').siblings().removeClass('active');
                $('#bvi-font-size').text(size);
                if (size != 40) {
                    set('data-bvi-size', 'bvi-font-size', size);
                    bvi_tts_speak('Размер шрифта увеличен');
                }
                return false;
            });

            $("#bvi-theme-white").click(function () {
                $(this).addClass('active').siblings().removeClass('active');
                set('data-bvi-theme', 'bvi-theme', 'white');
                bvi_tts_speak('Цвет сайта черным по белому');
                return false;
            });

            $("#bvi-theme-black").click(function () {
                $(this).addClass('active').siblings().removeClass('active');
                set('data-bvi-theme', 'bvi-theme', 'black');
                bvi_tts_speak('Цвет сайта белым по черному');
                return false;
            });

            $("#bvi-theme-blue").click(function () {
                $(this).addClass('active').siblings().removeClass('active');
                set('data-bvi-theme', 'bvi-theme', 'blue');
                bvi_tts_speak('Цвет сайта тёмно-синим по голубому');
                return false;
            });

            $("#bvi-theme-brown").click(function () {
                $(this).addClass('active').siblings().removeClass('active');
                set('data-bvi-theme', 'bvi-theme', 'brown');
                bvi_tts_speak('Цвет сайта коричневым по бежевому');
                return false;
            });

            $("#bvi-theme-green").click(function () {
                $(this).addClass('active').siblings().removeClass('active');
                set('data-bvi-theme', 'bvi-theme', 'green');
                bvi_tts_speak('Цвет сайта зеленым по тёмно-коричневому');
                return false;
            });

            $('#bvi-images-true').click(function () {
                $(this).addClass('active').siblings().removeClass('active');
                set('data-bvi-images', 'bvi-images', true);
                bvi_tts_speak('Изображения включены');
                return false;
            });

            $('#bvi-images-false').click(function () {
                $(this).addClass('active').siblings().removeClass('active');
                set('data-bvi-images', 'bvi-images', false);
                bvi_tts_speak('Изображения выключены');
                return false;
            });

            $('#bvi-images-grayscale').click(function () {
                $(this).addClass('active').siblings().removeClass('active');
                set('data-bvi-images', 'bvi-images', 'grayscale');
                bvi_tts_speak('Изображения чёрно-белые');
                return false;
            });

            $("#bvi-line-height-normal").click(function () {
                $(this).addClass('active').siblings().removeClass('active');
                set('data-bvi-line-height', 'bvi-line-height', 'normal');
                bvi_tts_speak('Междустрочный интервал cтандартный');
                return false;
            });

            $("#bvi-line-height-average").click(function () {
                $(this).addClass('active').siblings().removeClass('active');
                set('data-bvi-line-height', 'bvi-line-height', 'average');
                bvi_tts_speak('Междустрочный интервал средний');
                return false;
            });

            $("#bvi-line-height-big").click(function () {
                $(this).addClass('active').siblings().removeClass('active');
                set('data-bvi-line-height', 'bvi-line-height', 'big');
                bvi_tts_speak('Междустрочный интервал большой');
                return false;
            });

            $("#bvi-letter-spacing-normal").click(function () {
                $(this).addClass('active').siblings().removeClass('active');
                set('data-bvi-letter-spacing', 'bvi-letter-spacing', 'normal');
                bvi_tts_speak('Межбуквенный интервал одинарный');
                return false;
            });

            $("#bvi-letter-spacing-average").click(function () {
                $(this).addClass('active').siblings().removeClass('active');
                set('data-bvi-letter-spacing', 'bvi-letter-spacing', 'average');
                bvi_tts_speak('Межбуквенный интервал полуторный');
                return false;
            });

            $("#bvi-letter-spacing-big").click(function () {
                $(this).addClass('active').siblings().removeClass('active');
                set('data-bvi-letter-spacing', 'bvi-letter-spacing', 'big');
                bvi_tts_speak('Межбуквенный интервал двойной');
                return false;
            });

            $("#bvi-font-family-arial").click(function () {
                $(this).addClass('active').siblings().removeClass('active');
                set('data-bvi-font-family', 'bvi-font-family', 'arial');
                bvi_tts_speak('Шрифт без засечек');
                return false;
            });

            $("#bvi-font-family-times").click(function () {
                $(this).addClass('active').siblings().removeClass('active');
                set('data-bvi-font-family', 'bvi-font-family', 'times');
                bvi_tts_speak('Шрифт с засечками');
                return false;
            });

            $("#bvi-flash-iframe-true").click(function () {
                $(this).addClass('active').siblings().removeClass('active');
                set('data-bvi-flash-iframe', 'bvi-flash-iframe', true);
                bvi_tts_speak('Включить встроенные элементы');
                return false;
            });

            $("#bvi-flash-iframe-false").click(function () {
                $(this).addClass('active').siblings().removeClass('active');
                set('data-bvi-flash-iframe', 'bvi-flash-iframe', false);
                bvi_tts_speak('Выключить встроенные элементы');
                return false;
            });

            $("#bvi-tts-true").click(function () {
                $(this).addClass('active').siblings().removeClass('active');
                set('data-bvi-tts', 'bvi-tts', true);
                bvi_tts_speak('Синтез речи включён');
                bvi_tts_player();
                return false;
            });

            $("#bvi-tts-false").click(function () {
                $(this).addClass('active').siblings().removeClass('active');
                set('data-bvi-tts', 'bvi-tts', false);
                bvi_tts_speak('Синтез речи выключён');
                bvi_tts_player();
                return false;
            });

            $("#bvi-settings-default").click(function () {
                $('#bvi-theme-' + Cookies.get("bvi-theme")).removeClass('active');
                $('#bvi-images-' + Cookies.get("bvi-images")).removeClass('active');
                $('#bvi-line-height-' + Cookies.get("bvi-line-height")).removeClass('active');
                $('#bvi-letter-spacing-' + Cookies.get("bvi-letter-spacing")).removeClass('active');
                $('#bvi-font-family-' + Cookies.get("bvi-font-family")).removeClass('active');
                $('#bvi-flash-iframe-' + Cookies.get("bvi-flash-iframe")).removeClass('active');
                $('#bvi-tts-' + Cookies.get("bvi-tts")).removeClass('active');

                $('#bvi-theme-' + default_setting.bvi_theme).addClass('active');
                $('#bvi-images-' + default_setting.bvi_images).addClass('active');
                $('#bvi-line-height-' + default_setting.bvi_line_height).addClass('active');
                $('#bvi-letter-spacing-' + default_setting.bvi_letter_spacing).addClass('active');
                $('#bvi-font-family-' + default_setting.bvi_font).addClass('active');
                $('#bvi-flash-iframe-' + default_setting.bvi_flash_iframe).addClass('active');
                $('#bvi-tts-' + default_setting.bvi_tts).addClass('active');

                $('#bvi-font-size').text(default_setting.bvi_font_size);

                set('data-bvi-size', 'bvi-font-size', default_setting.bvi_font_size);
                set('data-bvi-theme', 'bvi-theme', default_setting.bvi_theme);
                set('data-bvi-images', 'bvi-images', default_setting.bvi_images);
                set('data-bvi-line-height', 'bvi-line-height', default_setting.bvi_line_height);
                set('data-bvi-letter-spacing', 'bvi-letter-spacing', default_setting.bvi_letter_spacing);
                set('data-bvi-font-family', 'bvi-font-family', default_setting.bvi_font);
                set('data-bvi-flash-iframe', 'bvi-flash-iframe', default_setting.bvi_flash_iframe);
                set('data-bvi-tts', 'bvi-tts', default_setting.bvi_tts);
                bvi_tts_speak('Настройки по умолчанию');
                bvi_tts_player();
                return false;
            });
        }

        function set(data, set_cookies, set_cookies_data) {
            Cookies.set(set_cookies, set_cookies_data, {path: "/", expires: 1});
            $(".bvi-body").attr(data, Cookies.get(set_cookies));
            get_image();
        }

        function set_active_link() {
            $('#bvi-theme-' + Cookies.get("bvi-theme")).addClass('active');
            $('#bvi-images-' + Cookies.get("bvi-images")).addClass('active');
            $('#bvi-line-height-' + Cookies.get("bvi-line-height")).addClass('active');
            $('#bvi-letter-spacing-' + Cookies.get("bvi-letter-spacing")).addClass('active');
            $('#bvi-font-family-' + Cookies.get("bvi-font-family")).addClass('active');
            $('#bvi-flash-iframe-' + Cookies.get("bvi-flash-iframe")).addClass('active');
            $('#bvi-tts-' + Cookies.get("bvi-tts")).addClass('active');
        }

        function get() {
            if (typeof Cookies.get("bvi-font-size") === 'undefined'
                || typeof Cookies.get("bvi-theme") === 'undefined'
                || typeof Cookies.get("bvi-images") === 'undefined'
                || typeof Cookies.get("bvi-line-height") === 'undefined'
                || typeof Cookies.get("bvi-letter-spacing") === 'undefined'
                || typeof Cookies.get("bvi-tts") === 'undefined'
                || typeof Cookies.get("bvi-font-family") === 'undefined'
                || typeof Cookies.get("bvi-panel-hide") === 'undefined'
                || typeof Cookies.get("bvi-flash-iframe") === 'undefined'
                || typeof Cookies.get("bvi-reload") === 'undefined'
                || typeof Cookies.get("bvi-fixed") === 'undefined'
            ) {
                Cookies.set("bvi-font-size", default_setting.bvi_font_size, {path: "/", expires: 1});
                Cookies.set("bvi-theme", default_setting.bvi_theme, {path: "/", expires: 1});
                Cookies.set("bvi-images", default_setting.bvi_images, {path: "/", expires: 1});
                Cookies.set("bvi-line-height", default_setting.bvi_line_height, {path: "/", expires: 1});
                Cookies.set("bvi-letter-spacing", default_setting.bvi_letter_spacing, {path: "/", expires: 1});
                Cookies.set("bvi-tts", default_setting.bvi_tts, {path: "/", expires: 1});
                Cookies.set("bvi-font-family", default_setting.bvi_font, {path: "/", expires: 1});
                Cookies.set("bvi-panel-hide", default_setting.bvi_hide, {path: "/", expires: 1});
                Cookies.set("bvi-flash-iframe", default_setting.bvi_flash_iframe, {path: "/", expires: 1});
                Cookies.set("bvi-reload", default_setting.bvi_reload, {path: "/", expires: 1});
                Cookies.set("bvi-fixed", default_setting.bvi_fixed, {path: "/", expires: 1});
            }

            $('.bvi-body').attr({
                'data-bvi-panel-hide': Cookies.get("bvi-panel-hide"),
                'data-bvi-size': Cookies.get("bvi-font-size"),
                'data-bvi-theme': Cookies.get("bvi-theme"),
                'data-bvi-images': Cookies.get("bvi-images"),
                'data-bvi-line-height': Cookies.get("bvi-line-height"),
                'data-bvi-letter-spacing': Cookies.get("bvi-letter-spacing"),
                'data-bvi-font-family': Cookies.get("bvi-font-family"),
                'data-bvi-flash-iframe': Cookies.get("bvi-flash-iframe"),
                'data-bvi-reload': Cookies.get("bvi-reload"),
                'data-bvi-tts': Cookies.get("bvi-tts"),
                'data-bvi-fixed': Cookies.get("bvi-fixed")
            });

            $('#bvi-font-size').text(Cookies.get("bvi-font-size"));

            var bvi_panel = Cookies.get("bvi-panel-hide");

            if (bvi_panel === 'false' || typeof bvi_panel === 'undefined') {
                $('.bvi-panel').show();
                $('.bvi-link-top').hide();
            } else {
                $('.bvi-panel').hide();
                $('.bvi-link-top').show("slow");
            }
        }

        function get_image() {
            var bvi_images = Cookies.get("bvi-images");

            $(".bvi-body *").each(function () {
                var $this = $(this);
                var background_image = $this.css("background-image");
                var pattern = background_image.replace(/^url\(['"]?/,'').replace(/['"]?\)$/,'');

                if (pattern != 'none') {
                    $(this).addClass('bvi-background-image');
                }
            });

            $("img").each(function () {
                $(this).addClass('bvi-img');
            });

				$(".img").each(function () {
						$(this).addClass('bvi-img-wrapper');
				});

            if (bvi_images === 'true') {
                $("img").each(function () {
                    $(this).show();
                    $('div.bvi-img').remove();
                    //$(this).removeClass("bvi-background-image");
                    if (versionIE == 11 || versionIE == 10 || versionIE == 9) {
                        var data_bvi_img_original = $(this).attr('data-bvi-img-original') || this.src;
                        this.src = data_bvi_img_original;
                    }
                });

                $(".bvi-body *").each(function () {
                    var $this = $(this);
                    var background_image = $this.css("background-image");
                    var pattern = background_image.replace(/^url\(['"]?/,'').replace(/['"]?\)$/,'');
                    if (pattern != 'none') {
                        if (versionIE == 11 || versionIE == 10 || versionIE == 9) {
                            var r = '^(https?|http)://[-a-zA-Z0-9+&@#/%?=~_|!:,.;]*[-a-zA-Z0-9+&@#/%=~_|]';
                            if(pattern.match(r)) {
                                var data_bvi_img_original = $this.attr('data-bvi-background-image-original') || pattern;
                                $this.css("background-image", "url(" + data_bvi_img_original + ")");
                            }
                        }
                    }
                });
            }

            if (bvi_images === 'false') {
                $('div.bvi-img').remove();

                $("img").each(function () {
                    $(this).hide();
                    //$(this).removeClass("bvi-background-image");
                    var alt = this.alt || 'Изображение';
                    var imgClass = $(this).attr("class") || 'bvi-class-none';
                    var imgId = $(this).attr("id") || 'bvi-id-none';
                    $(this).after($('<div class="' + imgClass + '" id="' + imgId + '" style="width: ' + $(this).get(0).naturalWidth + 'px; height: 100%;">').html(alt));
                });
            }

            if (bvi_images === 'grayscale') {
                $("img").each(function () {
                    $(this).show();
                    $('div.bvi-img').remove();
                    //$(this).removeClass("bvi-background-image");
                    if (versionIE == 11 || versionIE == 10 || versionIE == 9) {
                        $(this).attr('data-bvi-img-original', this.src);
                        if (location.hostname === extractHostname(this.src)) {
                            var src = grayscale(this.src);
                            this.src = src;
                        } else {
                            return false;
                        }
                    }
                });

                $(".bvi-body *").each(function () {
                    var $this = $(this);
                    var background_image = $this.css("background-image");
                    var pattern = background_image.replace(/^url\(['"]?/,'').replace(/['"]?\)$/,'');
                    if (pattern != 'none') {
                        if (versionIE == 11 || versionIE == 10 || versionIE == 9) {
                            var r = '^(https?|http)://[-a-zA-Z0-9+&@#/%?=~_|!:,.;]*[-a-zA-Z0-9+&@#/%=~_|]';
                            if(pattern.match(r)) {
                                var src_pattern = grayscale(pattern);
                                $this.attr('data-bvi-background-image-original', pattern);
                                $this.css("background-image", "url(" + src_pattern + ") !important");
                            }
                        }
                    }
                });
            }
        }

        function extractHostname(url) {
            var hostname;
            if (url.indexOf("//") > -1) {
                hostname = url.split('/')[2];
            } else {
                hostname = url.split('/')[0];
            }
            hostname = hostname.split(':')[0];
            hostname = hostname.split('?')[0];

            return hostname;
        }

        function grayscale(src) {
            var canvas = document.createElement('canvas');
            var ctx = canvas.getContext('2d');
            var imgObj = new Image();
            //imgObj.crossOrigin = "Anonymous";
            imgObj.src = src;
            canvas.width = imgObj.naturalWidth || imgObj.offsetWidth || imgObj.width;
            canvas.height = imgObj.naturalHeight || imgObj.offsetHeight || imgObj.height;
            ctx.drawImage(imgObj, 0, 0);
            var imgPixels = ctx.getImageData(0, 0, canvas.width, canvas.height);

            for (var y = 0; y < imgPixels.height; y++) {
                for (var x = 0; x < imgPixels.width; x++) {
                    var i = (y * 4) * imgPixels.width + x * 4;
                    var avg = (imgPixels.data[i] + imgPixels.data[i + 1] + imgPixels.data[i + 2]) / 3;
                    imgPixels.data[i] = avg;
                    imgPixels.data[i + 1] = avg;
                    imgPixels.data[i + 2] = avg;
                }
            }

            ctx.putImageData(imgPixels, 0, 0, 0, 0, imgPixels.width, imgPixels.height);

            return canvas.toDataURL();
        }

        function active() {
            if (versionIE == 8 || versionIE == 7 || versionIE == 6 || versionIE == 5) {
                console.log('Bvi console: Браузер не поддерживается.');
                alert(confirm('Браузер не поддерживается.'));
            } else {
                if (Cookies.get('bvi-panel-active') === 'true') {
                    $(selector).addClass('bvi-hide').after($('<a href="#" class="bvi-panel-close" title="Обычная версия сайта">Обычная версия сайта</a>'));
                    panel();
                    bvi_tts_player();
                    bvi_click();
                    set_active_link();
                    if (bvi_tts_support_browser === false) {
                        Cookies.set("bvi-tts", false, {path: "/", expires: 1});
                        $('#bvi-tts-true').remove();
                        $('#bvi-tts-false').remove();
                    }
                } else {
                    bvi_tts_player();
                    $(selector).removeClass('bvi-hide');
                    $('.bvi-panel-close').remove();
                    $(".bvi-panel").remove();
                    $(".bvi-link-top").remove();
                    $('body > .bvi-body').contents().unwrap();
                    $('.bvi-tts-link').remove();
                    $('.bvi-tts-text').contents().unwrap();
                }
            }
        }

        function panel() {
            $('head').append('<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">');
            $('body').wrapInner('<div class="bvi-body"></div>');
            $('body').prepend('<div class="bvi-panel">\n' +
                '    <div class="bvi-container-fluid">\n' +
                '        <div class="bvi-row bvi-no-gutters">\n' +
                '            <div class="bvi-col-12">\n' +
                '                <div class="bvi-panel-toggler">\n' +
                '                    <a href="#" id="bvi-toggler" class="bvi-link" title="Меню">Меню</a>\n' +
                '                    <a href="#" id="bvi-toggler-close" class="bvi-link" title="Обычная версия сайта">Обычная версия сайта</a>\n' +
                '                    <a href="#" id="bvi-toggler-menu-hide" class="bvi-link" title="Скрыть панель"><i class="bvi-images bvi-images-minus-square-o "></i></a>\n' +
                '                </div>\n' +
                '            </div>\n' +
                '        </div>\n' +
                '    </div>\n' +
                '    <div class="bvi-panel-container bvi-container">\n' +
                '        <div class="bvi-row bvi-no-gutters">\n' +
                '            <div class="bvi-col-6 bvi-col-sm-6 bvi-col-md-3 bvi-col-lg-3 bvi-col-xl-3 bvi-text-center">\n' +
                '                <div class="bvi-title">Размер шрифта <span id="bvi-font-size"></span> px</div>\n' +
                '                <a href="#" id="bvi-font-size-less" class="bvi-link" title="Уменьшить размер шрифта">A -</a>\n' +
                '                <a href="#" id="bvi-font-size-more" class="bvi-link" title="Увеличить размер шрифта">A +</a>\n' +
                '            </div>\n' +
                '            <div class="bvi-col-6 bvi-col-sm-6 bvi-col-md-3 bvi-col-lg-3 bvi-col-xl-3 bvi-text-center">\n' +
                '                <div class="bvi-title">Цвета сайта</div>\n' +
                '                <a href="#" id="bvi-theme-white" class="bvi-link bvi-link-white " title="Черным по белому">Ц</a>\n' +
                '                <a href="#" id="bvi-theme-black" class="bvi-link bvi-link-black" title="Белым по черному">Ц</a>\n' +
               //  '                <a href="#" id="bvi-theme-blue" class="bvi-link bvi-link-blue" title="Темно-синим по голубому">Ц</a>\n' +
               //  '                <a href="#" id="bvi-theme-brown" class="bvi-link bvi-link-brown" title="Коричневым по бежевому">Ц</a>\n' +
               //  '                <a href="#" id="bvi-theme-green" class="bvi-link bvi-link-green" title="Зеленым по темно-коричневому">Ц</a>\n' +
                '            </div>\n' +
                '            <div class="bvi-col-6 bvi-col-sm-6 bvi-col-md-3 bvi-col-lg-3 bvi-col-xl-2 bvi-text-center">\n' +
                '                <div class="bvi-title">Изображения</div>\n' +
                '                <a href="#" id="bvi-images-true" class="bvi-link" title="Изображения включены"><i class="bvi-images bvi-images-on"></i></a>\n' +
                '                <a href="#" id="bvi-images-false" class="bvi-link" title="Изображения выключены"><i class="bvi-images bvi-images-off"></i></a>\n' +
                '                <a href="#" id="bvi-images-grayscale" class="bvi-link" title="Изображения черно-белые"><i class="bvi-images bvi-images-adjust"></i></a>\n' +
                '            </div>\n' +
                '            <div class="bvi-col-6 bvi-col-sm-6 bvi-col-md-3 bvi-col-lg-3 bvi-col-xl-4 bvi-text-center">\n' +
                '                <div class="bvi-title">Дополнительно</div>\n' +
                '                <a href="#" id="bvi-tts-true" class="bvi-link" title=""><i class="bvi-images bvi-images-volume-on"></i></a>\n' +
                '                <a href="#" id="bvi-tts-false" class="bvi-link"><i class="bvi-images bvi-images-volume-off"></i></a>\n' +
                '                <a href="#" id="bvi-setting" class="bvi-link" title="Настройки">Настройки</a>\n' +
                '                <a href="#" id="bvi-panel-close" class="bvi-link" title="Обычная версия сайта"><i class="bvi-images bvi-images-eye-slash"></i></a>\n' +
                '                <a href="#" id="bvi-panel-hide" class="bvi-link" title="Скрыть панель"><i class="bvi-images bvi-images-minus-square-o"></i></a>\n' +
                '            </div>\n' +
                '        </div>\n' +
                '        <div class="bvi-setting-menu bvi-hide-lg">\n' +
                '            <div class="bvi-row bvi-no-gutters">\n' +
                '                <div class="bvi-col-sm-12 bvi-col-md-6 bvi-col-lg-4 bvi-col-xl-4 bvi-text-center">\n' +
                '                    <div class="bvi-title">Междустрочный интервал</div>\n' +
                '                    <a href="#" id="bvi-line-height-normal" class="bvi-link" title="Междустрочный интервал стандартный">Стандартный</a>\n' +
                '                    <a href="#" id="bvi-line-height-average" class="bvi-link" title="Междустрочный интервал средний">Средний</a>\n' +
                '                    <a href="#" id="bvi-line-height-big" class="bvi-link" title="Междустрочный интервал большой">Большой</a>\n' +
                '                </div>\n' +
                '                <div class="bvi-col-sm-12 bvi-col-md-6 bvi-col-lg-5 bvi-col-xl-5 bvi-text-center">\n' +
                '                    <div class="bvi-title">Межбуквенный интервал</div>\n' +
                '                    <a href="#" id="bvi-letter-spacing-normal" class="bvi-link" title="Межбуквенный интервал одинарный">Одинарный</a>\n' +
                '                    <a href="#" id="bvi-letter-spacing-average" class="bvi-link"\n' +
                '                       title="Межбуквенный интервал полуторный">Полуторный</a>\n' +
                '                    <a href="#" id="bvi-letter-spacing-big" class="bvi-link" title="Межбуквенный интервал двойной">Двойной</a>\n' +
                '                </div>\n' +
                '                <div class="bvi-col-sm-12 bvi-col-md-6 bvi-col-lg-3 bvi-col-xl-3 bvi-text-center">\n' +
                '                    <div class="bvi-title">Шрифт</div>\n' +
                '                    <a href="#" id="bvi-font-family-arial" class="bvi-link" title="Шрифт без засечек">Без засечек</a>\n' +
                '                    <a href="#" id="bvi-font-family-times" class="bvi-link" title="Шрифт с засечками">С засечками</a>\n' +
                '                </div>\n' +
                '                <div class="bvi-col-sm-12 bvi-col-md-6 bvi-col-lg-6 bvi-col-xl-6 bvi-text-center">\n' +
                '                    <div class="bvi-title">Встроенные элементы (Видео, карты и тд.)</div>\n' +
                '                    <a href="#" id="bvi-flash-iframe-true" class="bvi-link" title="Включить">Включить</a>\n' +
                '                    <a href="#" id="bvi-flash-iframe-false" class="bvi-link" title="Выключить">Выключить</a>\n' +
                '                </div>\n' +
                '                <div class="bvi-col-sm-12 bvi-col-md-12 bvi-col-lg-6 bvi-col-xl-6 bvi-text-right">\n' +
                '                    <div class="bvi-title">&nbsp;</div>\n' +
                '                    <a href="#" id="bvi-settings-default" class="bvi-link" title="Вернуть стандартные настройки">Настройки\n' +
                '                        по умолчанию</a>\n' +
                '                    <a href="#" id="bvi-setting-close" class="bvi-link" title="Закрыть панель">Закрыть панель</a>\n' +
                '                </div>\n' +
                '            </div>\n' +
                '            <div class="bvi-row bvi-mt">\n' +
                '                <div class="bvi-col-12 bvi-text-center">\n' +
                '                    <a href="http://bvi.isvek.ru/" class="bvi-link-copy" target="_blank" title="bvi.isvek.ru v2.0">bvi.isvek.ru</a>\n' +
                '                </div>\n' +
                '            </div>\n' +
                '        </div>\n' +
                '    </div>\n' +
                '</div>\n' +
                '<a href="#" id="bvi-panel-show" class="bvi-link bvi-link-top"><i class="bvi-images bvi-images-eye"></i></a>');

            if (width >= lg) {
                $('.bvi-panel-container').show();
            }

            if (width <= lg) {
                $('.bvi-panel-container').removeClass('bvi-container').addClass('bvi-container-fluid');
            } else {
                $('.bvi-panel-container').removeClass('bvi-container-fluid').addClass('bvi-container');
            }

            var scroll = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;

            if (scroll > 99) {
                if (Cookies.get("bvi-fixed") == 'true') {
                    $(".bvi-panel").addClass("bvi-fixed-top");
                }
            }

            $(window).scroll(function () {
                if ($(this).scrollTop() >= 99) {
                    if (Cookies.get("bvi-fixed") == 'true') {
                        $(".bvi-panel").addClass('bvi-fixed-top');
                    }
                } else {
                    $(".bvi-panel").removeClass("bvi-fixed-top");
                }
            });

            get();
            get_image();
        }

        if (default_setting.bvi_theme == 'white' ||
            default_setting.bvi_theme == 'black' ||
            default_setting.bvi_theme == 'blue' ||
            default_setting.bvi_theme == 'brown' ||
            default_setting.bvi_theme == 'green') {
            check_bvi_theme = true;
        } else {
            check_bvi_theme = false;
            checkError = ['bvi_theme'];
        }

        if (default_setting.bvi_font == 'times' || default_setting.bvi_font == 'arial') {
            check_bvi_font = true;
        } else {
            check_bvi_font = false;
            checkError = ['bvi_font'];
        }

        if (default_setting.bvi_letter_spacing == 'normal' || default_setting.bvi_letter_spacing == 'average' || default_setting.bvi_letter_spacing == 'big') {
            check_bvi_letter_spacing = true;
        } else {
            check_bvi_letter_spacing = false;
            checkError = ['bvi_letter_spacing'];
        }

        if (default_setting.bvi_line_height == 'normal' || default_setting.bvi_line_height == 'average' || default_setting.bvi_line_height == 'big') {
            check_bvi_line_height = true;
        } else {
            check_bvi_line_height = false;
            checkError = ['bvi_line_height'];
        }

        if (default_setting.bvi_font_size == 0) {
            check_bvi_font_size = false;
            checkError = ['bvi_font_size'];
        } else if (default_setting.bvi_font_size <= 40) {
            check_bvi_font_size = true;
        } else {
            check_bvi_font_size = false;
            checkError = ['bvi_font_size'];
        }

        if (default_setting.bvi_images === false || default_setting.bvi_images === true || default_setting.bvi_images === 'grayscale') {
            check_bvi_images = true;
        } else {
            check_bvi_images = false;
            checkError = ['bvi_images'];
        }

        if (default_setting.bvi_fixed === false || default_setting.bvi_fixed === true) {
            check_bvi_fixed = true;
        } else {
            check_bvi_fixed = false;
            checkError = ['bvi_fixed'];
        }

        if (default_setting.bvi_tts === false || default_setting.bvi_tts === true) {
            check_bvi_tts = true;
        } else {
            check_bvi_tts = false;
            checkError = ['bvi_tts'];
        }

        if (default_setting.bvi_flash_iframe === false || default_setting.bvi_flash_iframe === true) {
            check_bvi_flash_iframe = true;
        } else {
            check_bvi_flash_iframe = false;
            checkError = ['bvi_flash_iframe'];
        }

        if (default_setting.bvi_hide === false || default_setting.bvi_hide === true) {
            check_bvi_hide = true;
        } else {
            check_bvi_hide = false;
            checkError = ['bvi_hide'];
        }

        if (check_bvi_theme === true &&
            check_bvi_font === true &&
            check_bvi_letter_spacing === true &&
            check_bvi_line_height === true &&
            check_bvi_font_size === true &&
            check_bvi_images === true &&
            check_bvi_fixed === true &&
            check_bvi_flash_iframe === true &&
            check_bvi_tts === true &&
            check_bvi_hide === true) {
            if ($(selector).length) {
                $(selector).click(function () {
                    Cookies.set('bvi-panel-active', true, {path: "/", expires: 1});
                    active();
                    bvi_tts_speak('Версия сайта для слабовидящих');
                    return false;
                });
            } else {
                console.log('Bvi console: Неправильный параметр - [bvi_target]');
            }
            active();
        } else {
            console.log('Bvi console: Неправильный параметр - [' + checkError + ']');
        }
    };
})(jQuery);

'use strict';

// ==================  polyfill for method Closest  ================================
(function (ELEMENT) {
	ELEMENT.matches =
		ELEMENT.matches ||
		ELEMENT.mozMatchesSelector ||
		ELEMENT.msMatchesSelector ||
		ELEMENT.oMatchesSelector ||
		ELEMENT.webkitMatchesSelector;
	ELEMENT.closest =
		ELEMENT.closest ||
		function closest(selector) {
			if (!this) return null;
			if (this.matches(selector)) return this;
			if (!this.parentElement) {
				return null;
			} else return this.parentElement.closest(selector);
		};
})(Element.prototype);

// ===================  Toggle block menu  ========================================
const btnShowBlock = document.querySelectorAll('._btn-toggle');
const closeBlock = document.querySelector('.header-special__btn-close');
const body = document.querySelector('body');
const overlay = document.querySelector('.header__overlay');

Array.prototype.slice.call(btnShowBlock).forEach(function (item) {
	item.addEventListener('click', function () {
		if (item.classList.contains('_show-block')) {
			item.classList.remove('_show-block');
			overlay.classList.remove('_active');
		} else {
			addClass(item);
		}
	});
});

function addClass(currentItem) {
	Array.prototype.slice.call(btnShowBlock).forEach(function (item) {
		item.classList.remove('_show-block');
		overlay.classList.remove('_active');
		item = currentItem;
		item.classList.add('_show-block');
		overlay.classList.add('_active');
	});
}

document.addEventListener('click', function (e) {
	if (!e.target.closest('.hidden-block, ._btn-toggle')) {
		Array.prototype.slice.call(btnShowBlock).forEach(function (item) {
			if (item.classList.contains('_show-block')) {
				item.classList.remove('_show-block');
			}
		});
		overlay.classList.remove('_active');
	}
});

if (closeBlock) {
	closeBlock.addEventListener('click', function (e) {
		Array.prototype.slice.call(btnShowBlock).forEach(function (item) {
			item.classList.remove('_show-block');
		});
		overlay.classList.remove('_active');
	});
}

// ===========  Toggle language ===========================
$(function () {
	$('.language-select').click(function () {
		$(this).toggleClass('open');
	});

	$(document).click(function (e) {
		let s = $('.language-select');
		if (!s.is(e.target)) {
			s.removeClass('open');
		}
	});

	$('.language-select__item').click(function () {
		var setLang = $('.language-select').data('location'),
			dataLangSelect = $(this).data('lang');
		$('.language-select').data('location', dataLangSelect);
		$('.language-select__item').removeClass('_active');
		$(this).toggleClass('_active');
	});
});

// =============  Function ibg  ====================================================
function ibg() {
	let ibg = document.querySelectorAll('._ibg');
	for (var i = 0; i < ibg.length; i++) {
		if (ibg[i].querySelector('img') && ibg[i].querySelector('img').getAttribute('src') != null) {
			ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
		}
	}
}
ibg();

// ================   Tab To DropDown   ==============================================
(function ($) {
	$.fn.tabConvert = function (options) {
		var settings = $.extend(
			{
				activeClass: 'active',
				screenSize: 767,
			},
			options,
		);

		return this.each(function (i) {
			var wrap = $(this).wrap('<div class="tab-to-dropdown"></div>'),
				currentItem = $(this),
				container = $(this).closest('.tab-to-dropdown'),
				value = $(this)
					.find('.' + settings.activeClass)
					.text(),
				toggler = '<div class="selected-tab">' + value + '</div>';
			currentItem.addClass('converted-tab');
			container.prepend(toggler);

			function tabConvert_toggle() {
				currentItem.parent().find('.converted-tab').slideToggle(0);
			}

			container.find('.selected-tab').click(function () {
				tabConvert_toggle();
			});

			currentItem.find('a').click(function (e) {
				var windowWidth = window.innerWidth;
				if (settings.screenSize >= windowWidth) {
					tabConvert_toggle();
					var selected_text = $(this).text();
					$(this).closest('.tab-to-dropdown').find('.selected-tab').text(selected_text);
				}
			});

			function resize_function() {
				var windowWidth = window.innerWidth;
				if (settings.screenSize >= windowWidth) {
					currentItem.css('display', 'none');
					currentItem.parent().find('.selected-tab').css('display', '');
				} else {
					currentItem.css('display', '');
					currentItem.parent().find('.selected-tab').css('display', 'none');
				}
			}
			resize_function();

			$(window).resize(function () {
				resize_function();
			});
		});
	};

	// 	Toggle will appear on size 767px
	$('.nav-tab').tabConvert({
		activeClass: 'active',
		screenSize: 767,
	});
})(jQuery);

// ===========  Sticky Sidebar ===========================
const sidebarBlock = document.querySelector('.sidebar');

if (sidebarBlock && $(window).width() > 992) {
	var sidebar = new StickySidebar(sidebarBlock, {
		topSpacing: 20,
	});
	sidebar.updateSticky();
}

// ===========  Sticky nav-tab-vertical ===========================
const navTabVerticalBlock = document.querySelector('.nav-tab-vertical__sticky');
if (navTabVerticalBlock && $(window).width() > 768) {
	var sidebar = new StickySidebar(navTabVerticalBlock, {
		topSpacing: 20,
	});
	sidebar.updateSticky();
}

// ===========  Page personal-area, toggle link entries ===========================
const linksTab = document.querySelectorAll('.link-nav-tab');
const linksEntries = document.querySelectorAll('.link-entries');

Array.prototype.slice.call(linksTab).forEach(function (linkTab) {
	linkTab.addEventListener('click', function (e) {
		if (
			e.target.classList.contains('company') ||
			e.target.parentNode.classList.contains('company') ||
			e.target.parentNode.parentNode.classList.contains('company')
		) {
			Array.prototype.slice.call(linksEntries).forEach(function (link) {
				link.classList.add('hidden');
			});
		} else {
			Array.prototype.slice.call(linksEntries).forEach(function (link) {
				link.classList.remove('hidden');
			});
		}
	});
});

// ===========  Tooltips ===========================
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-toggle="tooltip"]'));
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
	return new bootstrap.Tooltip(tooltipTriggerEl);
});

// ====================   scroll accordion to top   ==========================
$('#accordionMns').on('shown.bs.collapse', function (event) {
	$('html, body').animate(
		{
			// scrollTop: $(event.target).parent().offset().top,
		},
		400,
	);
});
$('.item-block__title, .accordion-btn, .accordion-question__btn').click(function () {
	$('html, body').animate(
		{
			// scrollTop: $(this).offset().top,
		},
		300,
	);
});

// ==================  Select Tab   ===================================

$('.select-tab-content').hide();
$('#select-tab-1').show();

$('#select-tab-box').change(function () {
	var dropdown = $('#select-tab-box').val();
	$('.select-tab-content').hide();
	$('#' + 'select-tab-' + dropdown).show();
});

// ==================  Select Tab administrative-procedures ( Tab 2 )  ===================================

$('.select-tab-content-01').hide();
$('#select-tab-101').show();

$('#select-tab-box-01').change(function () {
	var dropdown = $('#select-tab-box-01').val();
	$('.select-tab-content-01').hide();
	$('#' + 'select-tab-' + dropdown).show();
});

// ============  tab to accordion  ========================================================
$('.nav-accordion-link').click(function () {
	if ($(this).hasClass('d_active')) {
		var d_activeTab = $(this).attr('rel');
		$('#' + d_activeTab).removeClass('active show');
		$(this).removeClass('d_active');
	} else {
		$('.content-accordion').removeClass('active show');
		$('.nav-accordion-link').removeClass('d_active');
		var d_activeTab = $(this).attr('rel');
		$('#' + d_activeTab).addClass('active show');
		$(this).addClass('d_active');
	}
});

// =============  clarifications Slider   =================================
$('.slider-clarifications__body').slick({
	infinite: true,
	slidesToShow: 1,
	arrows: true,
	dots: false,
});

$('.slickPrev').on('click', function (e) {
	e.preventDefault();
	let currentSlider = $(this).parents('.slider-clarifications').find('[data-slider="clarifications"]');
	currentSlider.slick('slickPrev');
});

$('.slickNext').on('click', function (e) {
	e.preventDefault();
	let currentSlider = $(this).parents('.slider-clarifications').find('[data-slider="clarifications"]');
	currentSlider.slick('slickNext');
});

// =============  Main Slider   =================================
$('.partners').slick({
	infinite: true,
	slidesToShow: 8,
	slidesToScroll: 1,
	arrows: true,
	autoplay: true,
	autoplaySpeed: 3000,
	dots: false,
	responsive: [
		{
			breakpoint: 1600,
			settings: {
				slidesToShow: 7,
			},
		},
		{
			breakpoint: 1400,
			settings: {
				slidesToShow: 6,
			},
		},
		{
			breakpoint: 1200,
			settings: {
				slidesToShow: 5,
			},
		},
		{
			breakpoint: 992,
			settings: {
				slidesToShow: 4,
			},
		},
		{
			breakpoint: 768,
			settings: {
				slidesToShow: 3,
			},
		},
		{
			breakpoint: 565,
			settings: {
				slidesToShow: 2,
			},
		},
		{
			breakpoint: 450,
			settings: {
				slidesToShow: 1,
			},
		},
	],
});

// =============  Modal for IE-11   =================================
$(window).on('load', function () {
	$('#browserUnsupport').modal('show');
});

// =============  Notification   =================================

const blockNotification = document.querySelector('.notification');
const closeBlockNotification = document.querySelector('.notification__close');
if (blockNotification) {
	(function showBlock() {
		setTimeout(function () {
			blockNotification.classList.add('open');
		}, 3000);
	})();

	closeBlockNotification.addEventListener('click', function () {
		blockNotification.classList.remove('open');
	});
}

// =============  Survey modal (главная)   =================================
// Cookie на 1 сутки, path: '/' — для всего сайта.
// Сброс для теста: resetSurveyModal() в консоли

const surveyModalEl = document.getElementById('surveyModal');
const surveyModalCloseBtn = document.getElementById('surveyModalClose');
const surveyModalStartBtn = document.getElementById('surveyModalStartBtn');
const SURVEY_MODAL_COOKIE = 'mns_survey_modal_dismissed';
const SURVEY_MODAL_COOKIE_OPTIONS = { expires: 1, path: '/' };

function isSurveyModalDismissed() {
	if (typeof Cookies === 'undefined') return false;
	return Cookies.get(SURVEY_MODAL_COOKIE) === '1';
}

function shouldShowSurveyModal() {
	return !isSurveyModalDismissed();
}

function markSurveyModalDismissed() {
	if (typeof Cookies !== 'undefined') {
		Cookies.set(SURVEY_MODAL_COOKIE, '1', SURVEY_MODAL_COOKIE_OPTIONS);
	}
}

function hideSurveyModal() {
	if (surveyModalEl && window.bootstrap) {
		const instance =
			bootstrap.Modal.getInstance(surveyModalEl) || bootstrap.Modal.getOrCreateInstance(surveyModalEl);
		instance.hide();
	}
}

window.resetSurveyModal = function () {
	if (typeof Cookies !== 'undefined') {
		Cookies.remove(SURVEY_MODAL_COOKIE, { path: '/' });
	}
};

if (surveyModalEl) {
	let surveyModalWasShown = false;

	if (surveyModalCloseBtn) {
		surveyModalCloseBtn.addEventListener('click', function (e) {
			e.preventDefault();
			hideSurveyModal();
		});
	}

	if (surveyModalStartBtn) {
		surveyModalStartBtn.addEventListener('click', function () {
			markSurveyModalDismissed();
		});
	}

	surveyModalEl.addEventListener('shown.bs.modal', function () {
		surveyModalWasShown = true;
	});

	surveyModalEl.addEventListener('hidden.bs.modal', function () {
		if (!surveyModalWasShown) return;
		surveyModalWasShown = false;
		markSurveyModalDismissed();
	});

	window.addEventListener('load', function () {
		if (shouldShowSurveyModal() && window.bootstrap) {
			setTimeout(function () {
				bootstrap.Modal.getOrCreateInstance(surveyModalEl).show();
			}, 800);
		}
	});
}

// =============  Form    =================================
$(function () {
	$("input[data-tel='tel']").mask('+375 (99) 999-99-99');
	$("input[data-date='date']").mask('9999');
});

function formAddError(input) {
	input.parentElement.classList.add('_error');
	input.classList.add('_error');
}

function formRemoveError(input) {
	input.parentElement.classList.remove('_error');
	input.classList.remove('_error');
}

function emailTest(input) {
	return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
}

document.addEventListener('DOMContentLoaded', function () {
	let form = document.getElementById('form-questionnaire');

	if (form) {
		form.addEventListener('submit', formSend);

		async function formSend(e) {
			e.preventDefault();

			let error = formValidate(form);

			let formData = new FormData(form);

			if (error === 0) {
				let response = await fetch('index.php', {
					method: 'POST',
					body: formData,
				});
				if (response.ok) {
					let result = await response.json();
					alert(result.message);
					formData.reset();
				} else {
					alert('Ошибка');
				}
			}

			function formValidate(form) {
				let error = 0;
				let formRequired = document.querySelectorAll('._required');

				for (let i = 0; i < formRequired.length; i++) {
					const input = formRequired[i];
					formRemoveError(input);
					if (input.classList.contains('_email')) {
						if (emailTest(input)) {
							formAddError(input);
							error++;
						}
					} else if (input.getAttribute('type') === 'checkbox' && input.checked === false) {
						formAddError(input);
						error++;
					} else if (input.selectedIndex === 0) {
						formAddError(input);
						error++;
					} else {
						if (input.value === '') {
							formAddError(input);
							error++;
						}
					}
				}
				return error;
			}
		}
	}
});

document.addEventListener('DOMContentLoaded', function () {
	let form = document.getElementById('form-ends');
	if (form) {
		form.addEventListener('submit', formSend);

		async function formSend(e) {
			e.preventDefault();

			let error = formValidate(form);

			let formData = new FormData(form);

			if (error === 0) {
				let response = await fetch('index.php', {
					method: 'POST',
					body: formData,
				});
				if (response.ok) {
					let result = await response.json();
					alert(result.message);
					formData.reset();
				} else {
					alert('Ошибка');
				}
			}

			function formValidate(form) {
				let error = 0;
				let formRequired = document.querySelectorAll('._required');

				for (let i = 0; i < formRequired.length; i++) {
					const input = formRequired[i];
					formRemoveError(input);
					if (input.classList.contains('_email')) {
						if (emailTest(input)) {
							formAddError(input);
							error++;
						}
					} else if (input.value === '') {
						formAddError(input);
						error++;
					}
				}
				return error;
			}
		}
	}
});

/// =============    Lazy load via iframe     ===========================
document.addEventListener('DOMContentLoaded', function () {
	const iframesLazy = document.querySelectorAll('iframe.iframe-lazy-video');
	if ('IntersectionObserver' in window) {
		const iframeObserver = new IntersectionObserver(function (entries, observer) {
			entries.forEach(function (entry) {
				if (entry.isIntersecting && entry.target.src.length == 0) {
					entry.target.src = entry.target.dataset.src;
					iframeObserver.unobserve(entry.target);
				}
			});
		});
		iframesLazy.forEach(function (iframe) {
			iframeObserver.observe(iframe);
		});
	} else {
		for (let i = 0; i < iframesLazy.length; i++) {
			if (lazyVids[i].getAttribute('data-src')) {
				lazyVids[i].setAttribute('src', lazyVids[i].getAttribute('data-src'));
			}
		}
	}
});

document.querySelectorAll('#app-popup').forEach((el) => {
	el.addEventListener('click', function () {
		let text = document.querySelector('#download-app-text');
		if (this.getAttribute('web-version') === 'true') {
			text.innerHTML = 'Будет доступно для использования с 1 января 2023 года.';
		} else {
			text.innerHTML =
				'Приложение «Налог на профессиональный доход» будет доступно для скачивания с 1 января 2023 года';
		}
	});
});

// $('.popover-dismiss').popover({
// 	trigger: 'focus',
// 	animation: true,
// });

// $("#user-nav-tabs li").on('click', function(e) {
//    var targetLink = $(e.currentTarget.children[0]).attr("href").slice(1);

//    var content_map = {
//          content1: "#tabs-content1",
//          content2: "#tabs-content2",
//          content3: "#tabs-content3",
//          content4: "#tabs-content4"
//    }

//    $(e.currentTarget).siblings().removeClass("active");

//    $.each(content_map, function(hash, elid) {
//       if (hash == targetLink) {
//             $(elid).show();
//             $(e.currentTarget).addClass("active");
//       } else {
//             $(elid).hide();
//       }
//    });
// });

function uploadFile(target) {
	document.getElementById('file-name').innerHTML = target.files[0].name;
}

// const swiperChildrenMain = new Swiper('.swiper.children-taxes-slider', {
// 	// Optional parameters
// 	direction: 'horizontal',
// 	loop: true,
// 	a11y: {
// 		prevSlideMessage: 'Previous slide',
// 		nextSlideMessage: 'Next slide',
// 	},
// 	allowTouchMove: true,
// 	autoplay: {
// 		delay: 5000,
// 	},
// 	breakpoints: {
// 		// when window width is >= 320px
// 		360: {
// 			slidesPerView: 1,
// 			spaceBetween: 4,
// 		},
// 		// when window width is >= 480px
// 		576: {
// 			slidesPerView: 2,
// 			spaceBetween: 8,
// 		},
// 		// when window width is >= 640px
// 		768: {
// 			slidesPerView: 3,
// 			spaceBetween: 16,
// 		},
// 	},

// 	// Navigation arrows
// 	navigation: {
// 		nextEl: '.children-taxes-slider .swiper-button-next',
// 		prevEl: '.children-taxes-slider .swiper-button-prev',
// 	},
// });

// const swiperChildrenEx = new Swiper('.swiper.children-taxes-slider-ex', {
// 	// Optional parameters
// 	direction: 'horizontal',
// 	loop: true,
// 	a11y: {
// 		prevSlideMessage: 'Previous slide',
// 		nextSlideMessage: 'Next slide',
// 	},
// 	allowTouchMove: true,
// 	autoplay: {
// 		delay: 5000,
// 	},
// 	breakpoints: {
// 		// when window width is >= 320px
// 		360: {
// 			slidesPerView: 1,
// 			spaceBetween: 4,
// 		},
// 		576: {
// 			slidesPerView: 2,
// 			spaceBetween: 8,
// 		},
// 		// when window width is >= 480px
// 		// when window width is >= 640px
// 		768: {
// 			slidesPerView: 2,
// 			spaceBetween: 16,
// 		},
// 	},
// 	navigation: {
// 		nextEl: '.children-taxes-slider-ex .swiper-button-next',
// 		prevEl: '.children-taxes-slider-ex .swiper-button-prev',
// 	},
// });

const swiperChildrenOnline = new Swiper('.swiper.children-taxes-slider-online', {
	// Optional parameters
	direction: 'horizontal',
	loop: true,
	a11y: {
		prevSlideMessage: 'Previous slide',
		nextSlideMessage: 'Next slide',
	},
	allowTouchMove: true,
	autoplay: {
		delay: 5000,
	},
	breakpoints: {
		// when window width is >= 320px
		360: {
			slidesPerView: 1,
			spaceBetween: 4,
		},
		576: {
			slidesPerView: 2,
			spaceBetween: 8,
		},
		// when window width is >= 480px
		// when window width is >= 640px
		768: {
			slidesPerView: 1,
			spaceBetween: 16,
		},
	},
	navigation: {
		nextEl: '.children-taxes-slider-online .swiper-button-next',
		prevEl: '.children-taxes-slider-online .swiper-button-prev',
	},
});

// const swiperChildrenEvent = new Swiper('.swiper.children-taxes-slider-event', {
// 	// Optional parameters
// 	direction: 'horizontal',
// 	loop: true,
// 	a11y: {
// 		prevSlideMessage: 'Previous slide',
// 		nextSlideMessage: 'Next slide',
// 	},
// 	allowTouchMove: true,
// 	autoplay: {
// 		delay: 5000,
// 	},
// 	breakpoints: {
// 		// when window width is >= 320px
// 		360: {
// 			slidesPerView: 1,
// 			spaceBetween: 4,
// 		},
// 		// when window width is >= 480px
// 		// when window width is >= 640px
// 		768: {
// 			slidesPerView: 3,
// 			spaceBetween: 16,
// 		},
// 	},
// 	navigation: {
// 		nextEl: '.children-taxes-slider-event .swiper-button-next',
// 		prevEl: '.children-taxes-slider-event .swiper-button-prev',
// 	},
// });
