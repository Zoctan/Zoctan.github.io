(function (window, document, undefined) {

    var body = document.body,
        $ = document.querySelector.bind(document),
        $$ = document.querySelectorAll.bind(document),
        root = $('html'),
        gotop = $('#gotop'),
        menu = $('#menu'),
        header = $('#header'),
        mask = $('#mask'),
        menuToggle = $('#menu-toggle'),
        menuOff = $('#menu-off'),
        loading = $('#loading'),
        animate = window.requestAnimationFrame,
        scrollSpeed = 200 / (1000 / 60),
        forEach = Array.prototype.forEach,
        even = ('ontouchstart' in window && /Mobile|Android|iOS|iPhone|iPad|iPod|Windows Phone|KFAPWI/i.test(navigator.userAgent)) ? 'touchstart' : 'click',
        isWX = /micromessenger/i.test(navigator.userAgent),
        noop = function () {
        },
        offset = function (el) {
            var x = el.offsetLeft,
                y = el.offsetTop;

            if (el.offsetParent) {
                var pOfs = arguments.callee(el.offsetParent);
                x += pOfs.x;
                y += pOfs.y;
            }

            return {
                x: x,
                y: y
            };
        },
        rootScollTop = function () {
            return document.documentElement.scrollTop || document.body.scrollTop;
        };

    var Blog = {
        goTop: function (end) {
            var top = rootScollTop();
            var interval = arguments.length > 2 ? arguments[1] : Math.abs(top - end) / scrollSpeed;

            if (top && top > end) {
                window.scrollTo(0, Math.max(top - interval, 0));
                animate(arguments.callee.bind(this, end, interval));
            } else if (end && top < end) {
                window.scrollTo(0, Math.min(top + interval, end));
                animate(arguments.callee.bind(this, end, interval));
            } else {
                this.toc.actived(end);
            }
        },
        toggleGotop: function (top) {
            if (top > window.innerHeight / 2) {
                gotop.classList.add('in');
            } else {
                gotop.classList.remove('in');
            }
        },
        toggleMenu: function (flag) {
            var main = $('#main');
            if (flag) {
                menu.classList.remove('hide');

                if (window.innerWidth < 1241) {
                    mask.classList.add('in');
                    menu.classList.add('show');

                    if (isWX) {
                        main.classList.add('lock');
                        main.scrollTop = rootScollTop();
                    } else {
                        root.classList.add('lock');
                    }
                }

            } else {
                menu.classList.remove('show');
                mask.classList.remove('in');
                if (isWX) {
                    var top = main.scrollTop;
                    main.classList.remove('lock');
                    window.scrollTo(0, top);
                } else {
                    root.classList.remove('lock');
                }

            }
        },
        fixedHeader: function (top) {
            if (top > header.clientHeight) {
                header.classList.add('fixed');
            } else {
                header.classList.remove('fixed');
            }
        },
        toc: (function () {
            var toc = $('#post-toc');

            if (!toc || !toc.children.length) {
                return {
                    fixed: noop,
                    actived: noop
                }
            }

            var bannerH = $('.post-header').clientHeight,
                headerH = header.clientHeight,
                titles = $('#post-content').querySelectorAll('h1, h2, h3, h4, h5, h6');

            toc.querySelector('a[href="#' + titles[0].id + '"]').parentNode.classList.add('active');

            // Make every child shrink initially
            var tocChilds = toc.querySelectorAll('.post-toc-child');
            for (var i = 0, len = tocChilds.length; i < len; i++) {
                tocChilds[i].classList.add('post-toc-shrink');
            }
            var firstChild =
                toc.querySelector('a[href="#' + titles[0].id + '"]')
                    .nextElementSibling;
            if (firstChild) {
                firstChild.classList.add('post-toc-expand');
                firstChild.classList.remove('post-toc-shrink');
            }
            toc.classList.remove('post-toc-shrink');

            /**
             * Handle toc active and expansion
             * @param prevEle previous active li element
             * @param currEle current active li element
             */
            var handleTocActive = function (prevEle, currEle) {
                prevEle.classList.remove('active');
                currEle.classList.add('active');

                var siblingChilds = currEle.parentElement.querySelectorAll('.post-toc-child');
                for (var j = 0, len1 = siblingChilds.length; j < len1; j++) {
                    siblingChilds[j].classList.remove('post-toc-expand');
                    siblingChilds[j].classList.add('post-toc-shrink');
                }
                var myChild = currEle.querySelector('.post-toc-child');
                if (myChild) {
                    myChild.classList.remove('post-toc-shrink');
                    myChild.classList.add('post-toc-expand');
                }
            };

            return {
                fixed: function (top) {
                    top >= bannerH - headerH ? toc.classList.add('fixed') : toc.classList.remove('fixed');
                },
                actived: function (top) {
                    for (i = 0, len = titles.length; i < len; i++) {
                        if (top > offset(titles[i]).y - headerH - 5) {
                            var prevListEle = toc.querySelector('li.active');
                            var currListEle = toc.querySelector('a[href="#' + titles[i].id + '"]').parentNode;

                            handleTocActive(prevListEle, currListEle);
                        }
                    }

                    if (top < offset(titles[0]).y) {
                        handleTocActive(
                            toc.querySelector('li.active'),
                            toc.querySelector('a[href="#' + titles[0].id + '"]').parentNode
                        );
                    }
                }
            }
        })(),
        hideOnMask: [],
        modal: function (target) {
            this.$modal = $(target);
            this.$off = this.$modal.querySelector('.close');

            var _this = this;

            this.show = function () {
                mask.classList.add('in');
                _this.$modal.classList.add('ready');
                setTimeout(function () {
                    _this.$modal.classList.add('in');
                }, 0)
            }

            this.onHide = noop;

            this.hide = function () {
                _this.onHide();
                mask.classList.remove('in');
                _this.$modal.classList.remove('in');
                setTimeout(function () {
                    _this.$modal.classList.remove('ready');
                }, 300)
            }

            this.toggle = function () {
                return _this.$modal.classList.contains('in') ? _this.hide() : _this.show();
            }

            Blog.hideOnMask.push(this.hide);
            this.$off && this.$off.addEventListener(even, this.hide);
        },
        share: function () {

            var pageShare = $('#pageShare'),
                fab = $('#shareFab');

            var shareModal = new this.modal('#globalShare');

            $('#menuShare').addEventListener(even, shareModal.toggle);

            if (fab) {
                fab.addEventListener(even, function () {
                    pageShare.classList.toggle('in')
                }, false)

                document.addEventListener(even, function (e) {
                    !fab.contains(e.target) && pageShare.classList.remove('in')
                }, false)
            }

            var wxModal = new this.modal('#wxShare');
            wxModal.onHide = shareModal.hide;

            forEach.call($$('.wxFab'), function (el) {
                el.addEventListener(even, wxModal.toggle)
            })

        },
        search: function () {
            var searchWrap = $('#search-wrap');

            function toggleSearch() {
                searchWrap.classList.toggle('in');
            }

            $('#search').addEventListener(even, toggleSearch);
        },
        reward: function () {
            var modal = new this.modal('#reward');
            $('#rewardBtn').addEventListener(even, modal.toggle);

            var $rewardToggle = $('#rewardToggle');
            var $rewardCode = $('#rewardCode');
            if ($rewardToggle) {
                $rewardToggle.addEventListener('change', function () {
                    $rewardCode.src = this.checked ? this.dataset.alipay : this.dataset.wechat
                })
            }
        },
        waterfall: function () {

            if (window.innerWidth < 760) return;

            forEach.call($$('.waterfall'), function (el) {
                var childs = el.querySelectorAll('.waterfall-item');
                var columns = [0, 0];

                forEach.call(childs, function (item) {
                    var i = columns[0] <= columns[1] ? 0 : 1;
                    item.style.cssText = 'top:' + columns[i] + 'px;left:' + (i > 0 ? '50%' : 0);
                    columns[i] += item.offsetHeight;
                })

                el.style.height = Math.max(columns[0], columns[1]) + 'px';
                el.classList.add('in')
            })

        },
        tabBar: function (el) {
            el.parentNode.parentNode.classList.toggle('expand')
        },
        page: (function () {
            var $elements = $$('.fade, .fade-scale');
            var visible = false;

            return {
                loaded: function () {
                    forEach.call($elements, function (el) {
                        el.classList.add('in')
                    });
                    visible = true;
                },
                unload: function () {
                    forEach.call($elements, function (el) {
                        el.classList.remove('in')
                    });
                    visible = false;
                },
                visible: visible
            }

        })(),
        lightbox: (function () {

            function LightBox(element) {
                this.$img = element.querySelector('img');
                this.margin = 40;
                this.title = this.$img.title || this.$img.alt || '';
                this.isZoom = false;

                var naturalW, naturalH, imgRect, docW, docH;

                this.calcRect = function () {
                    docW = body.clientWidth;
                    docH = body.clientHeight;
                    var inH = docH - this.margin * 2;
                    var window = naturalW;
                    var h = naturalH;
                    var sw = window > docW ? docW / window : 1;
                    var sh = h > inH ? inH / h : 1;
                    var s = Math.min(sw, sh);

                    window = window * s;
                    h = h * s;

                    return {
                        window: window,
                        h: h,
                        t: (docH - h) / 2 - imgRect.top,
                        l: (docW - window) / 2 - imgRect.left + this.$img.offsetLeft
                    }
                }

                this.setImgRect = function (rect) {
                    this.$img.style.cssText = 'width: ' + rect.window + 'px; max-width: ' + rect.window + 'px; height:' + rect.h + 'px; top: ' + rect.t + 'px; left: ' + rect.l + 'px';
                }

                this.setFrom = function () {
                    this.setImgRect({
                        window: imgRect.width,
                        h: imgRect.height,
                        t: 0,
                        l: (element.offsetWidth - imgRect.width) / 2
                    })
                }

                this.setTo = function () {
                    this.setImgRect(this.calcRect());
                }

                // this.updateSize = function () {
                //     var sw = sh = 1;
                //     if (docW !== body.clientWidth) {
                //         sw = body.clientWidth / docW;
                //     }

                //     if (docH !== body.clientHeight) {
                //         sh = body.clientHeight / docH;
                //     }

                //     docW = body.clientWidth;
                //     docH = body.clientHeight;
                //     var rect = this.$img.getBoundingClientRect();
                //     var window = rect.width * sw;
                //     var h = rect.height * sh;

                //     this.$img.classList.remove('zoom-in');
                //     this.setImgRect({
                //         window: window,
                //         h: h,
                //         t: this.$img.offsetTop - (h - rect.height) / 2,
                //         l: this.$img.offsetLeft - (window - rect.width) / 2
                //     })
                // }

                this.addTitle = function () {
                    if (!this.title) {
                        return;
                    }
                    this.$caption = document.createElement('div');
                    this.$caption.innerHTML = this.title;
                    this.$caption.className = 'overlay-title';
                    element.appendChild(this.$caption);
                }

                this.removeTitle = function () {
                    this.$caption && element.removeChild(this.$caption)
                }

                var _this = this;

                this.zoomIn = function () {
                    naturalW = this.$img.naturalWidth || this.$img.width;
                    naturalH = this.$img.naturalHeight || this.$img.height;
                    imgRect = this.$img.getBoundingClientRect();
                    element.style.height = imgRect.height + 'px';
                    element.classList.add('ready');
                    this.setFrom();
                    this.addTitle();
                    this.$img.classList.add('zoom-in');

                    setTimeout(function () {
                        element.classList.add('active');
                        _this.setTo();
                        _this.isZoom = true;
                    }, 0);
                }

                this.zoomOut = function () {
                    this.isZoom = false;
                    element.classList.remove('active');
                    this.$img.classList.add('zoom-in');
                    this.setFrom();
                    setTimeout(function () {
                        _this.$img.classList.remove('zoom-in');
                        _this.$img.style.cssText = '';
                        _this.removeTitle();
                        element.classList.remove('ready');
                        element.removeAttribute('style');
                    }, 300);
                }

                element.addEventListener('click', function (e) {
                    _this.isZoom ? _this.zoomOut() : e.target.tagName === 'IMG' && _this.zoomIn()
                })

                document.addEventListener('scroll', function () {
                    _this.isZoom && _this.zoomOut()
                })

                window.addEventListener('resize', function () {
                    // _this.isZoom && _this.updateSize()
                    _this.isZoom && _this.zoomOut()
                })
            }

            forEach.call($$('.img-lightbox'), function (el) {
                new LightBox(el)
            })
        })(),
        loadScript: function (scripts) {
            scripts.forEach(function (src) {
                var s = document.createElement('script');
                s.src = src;
                s.async = true;
                body.appendChild(s);
            })
        }
    };

    window.addEventListener('load', function () {
        loading.classList.remove('active');
        Blog.page.loaded();
        window.lazyScripts && window.lazyScripts.length && Blog.loadScript(window.lazyScripts)
    });

    window.addEventListener('DOMContentLoaded', function () {
        Blog.waterfall();
        var top = rootScollTop();
        Blog.toc.fixed(top);
        Blog.toc.actived(top);
        Blog.page.loaded();
    });

    var ignoreUnload = false;
    var $mailTarget = $('a[href^="mailto"]');
    if ($mailTarget) {
        $mailTarget.addEventListener(even, function () {
            ignoreUnload = true;
        });
    }

    window.addEventListener('beforeunload', function (e) {
        if (!ignoreUnload) {
            Blog.page.unload();
        } else {
            ignoreUnload = false;
        }
    });

    window.addEventListener('pageshow', function () {
        // fix OSX safari #162
        !Blog.page.visible && Blog.page.loaded();
    });

    window.addEventListener('resize', function () {
        window.BLOG.even = even = 'ontouchstart' in window ? 'touchstart' : 'click';
        Blog.toggleMenu();
        Blog.waterfall();
    });

    gotop.addEventListener(even, function () {
        animate(Blog.goTop.bind(Blog, 0));
    }, false);

    menuToggle.addEventListener(even, function (e) {
        Blog.toggleMenu(true);
        e.preventDefault();
    }, false);

    menuOff.addEventListener(even, function () {
        menu.classList.add('hide');
    }, false);

    mask.addEventListener(even, function (e) {
        Blog.toggleMenu();
        Blog.hideOnMask.forEach(function (hide) {
            hide()
        });
        e.preventDefault();
    }, false);

    document.addEventListener('scroll', function () {
        var top = rootScollTop();
        Blog.toggleGotop(top);
        Blog.fixedHeader(top);
        Blog.toc.fixed(top);
        Blog.toc.actived(top);
    }, false);

    if (window.BLOG.SHARE) {
        Blog.share()
    }

    if (window.BLOG.REWARD) {
        Blog.reward()
    }

    Blog.noop = noop;
    Blog.even = even;
    Blog.$ = $;
    Blog.$$ = $$;

    Object.keys(Blog).reduce(function (g, e) {
        g[e] = Blog[e];
        return g
    }, window.BLOG);

    if (window.Waves) {
        Waves.init();
        Waves.attach('.global-share li', ['waves-block']);
        Waves.attach('.article-tag-list-link, #page-nav a, #page-nav span', ['waves-button']);
    } else {
        console.error('Waves loading failed.')
    }
})(window, document);