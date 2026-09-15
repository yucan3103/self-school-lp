/* ==========================================================================
   Coaching School SELF! — main.js
   --------------------------------------------------------------------------
   役割はごくシンプル：
   スクロールに合わせて要素を「ふわっと」表示する（fade-in）だけ。
   ・IntersectionObserver で画面に入った .reveal 要素に .is-visible を付与
   ・prefers-reduced-motion（動きを減らす設定）の場合はすぐ全表示
   外部ライブラリは使用していません。
   ========================================================================== */

(function () {
  "use strict";

  var targets = document.querySelectorAll(".reveal");

  // 動きを減らす設定、または IntersectionObserver 非対応なら即表示
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduceMotion || !("IntersectionObserver" in window)) {
    targets.forEach(function (el) {
      el.classList.add("is-visible");
    });
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target); // 一度表示したら監視解除
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -8% 0px",
    }
  );

  targets.forEach(function (el) {
    observer.observe(el);
  });
})();


/* ==========================================================================
   受講生の変化スライダー（矢印・ドット）
   --------------------------------------------------------------------------
   ・横スクロール自体はCSSのスクロールスナップで動作（スワイプ対応）
   ・ここでは「前後の矢印」と「現在位置を示すドット」を制御します
   ========================================================================== */
(function () {
  "use strict";

  var track = document.getElementById("voicesTrack");
  var dotsWrap = document.getElementById("voicesDots");
  if (!track) return;

  var slides = Array.prototype.slice.call(track.children);
  var prev = document.querySelector(".voices__arrow--prev");
  var next = document.querySelector(".voices__arrow--next");

  // 1枚分のスクロール量（カード幅＋隙間）
  function step() {
    if (slides.length < 2) return track.clientWidth;
    return slides[1].offsetLeft - slides[0].offsetLeft;
  }

  // ドットを生成
  slides.forEach(function (_, i) {
    var dot = document.createElement("button");
    dot.className = "voices__dot" + (i === 0 ? " is-active" : "");
    dot.type = "button";
    dot.setAttribute("aria-label", i + 1 + "番目の声へ");
    dot.addEventListener("click", function () {
      track.scrollTo({ left: step() * i, behavior: "smooth" });
    });
    dotsWrap.appendChild(dot);
  });
  var dots = Array.prototype.slice.call(dotsWrap.children);

  // 現在表示中のカードに合わせてドットを更新
  function setActive() {
    var idx = Math.round(track.scrollLeft / step());
    idx = Math.max(0, Math.min(slides.length - 1, idx));
    dots.forEach(function (d, i) {
      d.classList.toggle("is-active", i === idx);
    });
  }

  var ticking = false;
  track.addEventListener("scroll", function () {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(function () {
      setActive();
      ticking = false;
    });
  });

  // 前後の矢印
  if (prev) prev.addEventListener("click", function () {
    track.scrollBy({ left: -step(), behavior: "smooth" });
  });
  if (next) next.addEventListener("click", function () {
    track.scrollBy({ left: step(), behavior: "smooth" });
  });
})();


/* ==========================================================================
   ヘッダー画像スライドショー（2枚を3秒ごとにふわっとクロスフェード）
   --------------------------------------------------------------------------
   ・入れ替えは .is-active の付け替えだけ。フェードはCSSの transition が担当
   ・「動きを減らす」設定では自動切り替えせず、1枚目を表示したままにします
   ========================================================================== */
(function () {
  "use strict";

  // スマホ用の正方形スライドのみ切替（PCの横長バナーは静止表示）
  var slides = document.querySelectorAll(".hero__slide--sp");
  if (slides.length < 2) return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  var current = 0;
  setInterval(function () {
    slides[current].classList.remove("is-active");
    current = (current + 1) % slides.length;
    slides[current].classList.add("is-active");
  }, 3000); // 3秒ごと
})();
