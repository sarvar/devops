function _classCallCheck(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}
var _createClass = function () {
    function e(e, t) {
      for (var o = 0; o < t.length; o++) {
        var r = t[o];
        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
      }
    }
    return function (t, o, r) {
      return o && e(t.prototype, o), r && e(t, r), t
    }
  }(),
  SlideNav = function () {
    function e(t) {
      if (_classCallCheck(this, e), !t) var t = {};
      this.activeClass = t.activeClass || "active", this.toggleButtonSelector = t.toggleButtonSelector || !1, this.toggleBoxSelector = t.toggleBoxSelector || !1, this.speed = t.speed > 0 ? t.speed : 70, this.hideAfterSelect = t.hideBoxAfterSelect || !0, this.changeHash = t.changeHash || !1, this.navBoxToggleClass = t.navBoxToggleClass || !1, this.init()
    }
    return _createClass(e, [{
      key: "init",
      value: function () {
        this.scrollDoc = document.scrollingElement || document.documentElement, this.getElements(), this.observe(), this.setActiveAnchor()
      }
    }, {
      key: "getElements",
      value: function () {
        this.toggleButton = document.querySelector(this.toggleButtonSelector), this.toggleButton && (this.opened = !1), this.toggleBoxes = document.querySelectorAll(this.toggleBoxSelector), this.navAnchors = document.querySelectorAll('a:not([target="_blank"])')
      }
    }, {
      key: "observe",
      value: function () {
        var e = this;
        window.addEventListener("click", function (t) {
          !e.opened || e.isClosestElement(t.target, e.toggleButton) || e.isBoxNavTarget(t.target) || e.hideNavBox()
        }), this.toggleButton && this.toggleButton.addEventListener("click", function (t) {
          setTimeout(function () {
            e.opened ? e.hideNavBox() : e.showNavBox()
          })
        });
        var t = !0,
          o = !1,
          r = void 0;
        try {
          for (var n, l = this.navAnchors[Symbol.iterator](); !(t = (n = l.next()).done); t = !0) {
            var i = n.value;
            i.addEventListener("click", function (t) {
              t.preventDefault();
              var o = e.getHash(t.currentTarget.href);
              !e.goToSection(o) && t.currentTarget.href && e.goToUrl(t.currentTarget.href)
            })
          }
        } catch (e) {
          o = !0, r = e
        } finally {
          try {
            !t && l.return && l.return()
          } finally {
            if (o) throw r
          }
        }
        window.addEventListener("scroll", function () {
          e.setActiveAnchor()
        })
      }
    }, {
      key: "setActiveAnchor",
      value: function () {
        var e = !0,
          t = !1,
          o = void 0;
        try {
          for (var r, n = this.navAnchors[Symbol.iterator](); !(e = (r = n.next()).done); e = !0) {
            var l = r.value,
              i = this.getHash(l.href),
              s = this.getSection(i),
              a = this.scrollDoc.scrollTop,
              c = this.scrollDoc.scrollHeight;
            if (s && (s.offsetTop <= a && s.offsetTop + s.offsetHeight > a || a + window.innerHeight == c)) {
              var u = !0,
                h = !1,
                v = void 0;
              try {
                for (var f, g = this.navAnchors[Symbol.iterator](); !(u = (f = g.next()).done); u = !0) {
                  var d = f.value;
                  d.href != l.href && d.classList.remove("active")
                }
              } catch (e) {
                h = !0, v = e
              } finally {
                try {
                  !u && g.return && g.return()
                } finally {
                  if (h) throw v
                }
              }
              l.classList.add("active")
            }
          }
        } catch (e) {
          t = !0, o = e
        } finally {
          try {
            !e && n.return && n.return()
          } finally {
            if (t) throw o
          }
        }
      }
    }, {
      key: "goToSection",
      value: function (e) {
        var t = this.getSection(e);
        if (t) {
          var o = t.offsetTop;
          return this.scrollTo(o, this.speed), this.hideAfterSelect && this.hideNavBox(), this.changeHash && history.pushState({}, null, "#" + e), !0
        }
        return !1
      }
    }, {
      key: "scrollTo",
      value: function (e, t) {
        var o = this,
          r = e - this.scrollDoc.scrollTop,
          n = r / t * 1;
        t <= 0 || setTimeout(function () {
          o.scrollDoc.scrollTop = o.scrollDoc.scrollTop + n, o.scrollDoc.scrollTop != e && o.scrollTo(e, t - 1)
        }, 1)
      }
    }, {
      key: "goToUrl",
      value: function (e) {
        return window.location = e
      }
    }, {
      key: "getSection",
      value: function (e) {
        if (e) {
          var t = "#" + e;
          return document.querySelector(t)
        }
        return !1
      }
    }, {
      key: "getHash",
      value: function (e) {
        return e.split("#")[1]
      }
    }, {
      key: "isBoxNavTarget",
      value: function (e) {
        var t = !1,
          o = !0,
          r = !1,
          n = void 0;
        try {
          for (var l, i = this.toggleBoxes[Symbol.iterator](); !(o = (l = i.next()).done); o = !0) {
            var s = l.value;
            this.isClosestElement(e, s) && (t = !0)
          }
        } catch (e) {
          r = !0, n = e
        } finally {
          try {
            !o && i.return && i.return()
          } finally {
            if (r) throw n
          }
        }
        return t
      }
    }, {
      key: "isClosestElement",
      value: function (e, t) {
        for (; t != e;)
          if (e = e.parentNode, !e) return !1;
        return !0
      }
    }, {
      key: "hideNavBox",
      value: function () {
        var e = !0,
          t = !1,
          o = void 0;
        try {
          for (var r, n = this.toggleBoxes[Symbol.iterator](); !(e = (r = n.next()).done); e = !0) {
            var l = r.value;
            this.navBoxToggleClass ? l.classList.remove(this.navBoxToggleClass) : l.style.display = "none"
          }
        } catch (e) {
          t = !0, o = e
        } finally {
          try {
            !e && n.return && n.return()
          } finally {
            if (t) throw o
          }
        }
        this.opened = !1
      }
    }, {
      key: "showNavBox",
      value: function () {
        var e = !0,
          t = !1,
          o = void 0;
        try {
          for (var r, n = this.toggleBoxes[Symbol.iterator](); !(e = (r = n.next()).done); e = !0) {
            var l = r.value;
            this.navBoxToggleClass ? l.classList.add(this.navBoxToggleClass) : l.style.display = "block"
          }
        } catch (e) {
          t = !0, o = e
        } finally {
          try {
            !e && n.return && n.return()
          } finally {
            if (t) throw o
          }
        }
        this.opened = !0
      }
    }]), e
  }();

function modalWindows() {
  document.addEventListener("click", (e) => {
    let toggledElem = e.target.closest("[data-modal-toggle]");
    if (toggledElem) {
      toggle(toggledElem.dataset.modalToggle);
      event.preventDefault();
    }

    let closedElem = e.target.closest("[data-modal-close]");
    if (closedElem) {
      close(document.getElementById(closedElem.dataset.modalClose));
      event.preventDefault();
    }
  });

  function toggle(id) {
    let modal = document.getElementById(id);
    if (!modal.classList.contains("opened")) {
      open(modal);
    } else {
      close(modal);
    }
  }

  function open(modal) {
    let event = new CustomEvent("modalopened", {
      bubbles: true,
    });
    document.body.style.paddingRight = getScrollerWidth() + 'px';
    document.querySelector(".header").style.paddingRight = getScrollerWidth() + "px";
    document.body.style.overflow = "hidden";
    modal.classList.add("block");
    setTimeout(() => modal.classList.add('opened'), 40);
    modal.dispatchEvent(event);
  }

  function close(modal) {
    modal.classList.remove('opened');
    modal.addEventListener("transitionend", () => {
      document.body.style.paddingRight = '';
      document.querySelector(".header")
        .style.paddingRight = "";
      document.body.style.overflow = "";
      modal.classList.remove("block");
    }, {
      once: true
    });
  }
}

function getScrollerWidth() {
  return window.innerWidth - document.documentElement.clientWidth;
}

function animate() {
  window.addEventListener("load", () => {
    let items = document.querySelectorAll("[data-to-animate]");
    items.forEach(item => {
      let coords = item.getBoundingClientRect();
      let position = pageYOffset + coords.top;
      checkVisibility(item, () => {
        item.classList.add("animate");
      });
      window.addEventListener("scroll", function anim() {
        // if(pageYOffset >= position) {
        //   item.classList.add("animate");
        //   window.removeEventListener("scroll", anim);
        // }
        checkVisibility(item, () => {
          item.classList.add("animate");
          window.removeEventListener("scroll", anim);
        });
      });
    });
  });

  function checkVisibility(item, func) {
    let coords = item.getBoundingClientRect();
    // let condition1 = pageYOffset >= position || pageYOffset - document.clientHeight >= position;
    let condition2 = coords.top <= document.documentElement.clientHeight - 300;
    if (condition2) {
      func();
    }
  }
}

function slideNav() {
  var nav = new SlideNav({
    activeClass: "active",
    toggleButtonSelector: '.hamburger',
    toggleBoxSelector: '.navmenu',
    hideAfterSelect: false,
    speed: 100 //default 250
  });
}

const nav = document.querySelector('.intro__top');
const navTop = nav.offsetTop;

function stickyNavigation() {
  if (window.scrollY >= navTop) {
    // nav offsetHeight = height of nav
    document.body.style.paddingTop = nav.offsetHeight + 'px';
    document.body.classList.add('fixed-nav');
  } else {
    document.body.style.paddingTop = 0;
    document.body.classList.remove('fixed-nav');
  }
}

window.addEventListener('scroll', stickyNavigation);

stickyNavigation();
modalWindows();
animate();