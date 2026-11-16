/*
 * Live avatar: the eyes follow the cursor, the head turns toward it, it blinks,
 * and the mouth is closed in a smile until it laughs or talks.
 *
 * Layers: my-avatar-closed.png (closed mouth, irises painted out) as the page image;
 * an SVG on top that shows my-avatar-base.png (open mouth) through a growing ellipse
 * for the mouth, and the two eyes clipped to the real eye openings so the irises
 * can move without leaving the eye. If this script fails, the sidebar keeps the
 * original my-avatar.png, so nothing breaks.
 */
(function () {
  "use strict";

  var box = document.querySelector(".sidebar .avatar-box");
  if (!box) return;
  var img = box.querySelector("img");
  if (!img) return;

  var EYES = [{"path": "M188.8 268.4 L190.2 266.7 L191.5 265.2 L192.9 263.7 L194.3 262.3 L195.6 260.9 L197.0 259.7 L198.4 258.6 L199.7 257.5 L201.1 256.5 L202.5 255.6 L203.8 254.8 L205.2 254.1 L206.6 253.4 L207.9 252.9 L209.3 252.4 L210.7 252.0 L212.0 251.7 L213.4 251.5 L214.8 251.3 L216.1 251.3 L217.5 251.3 L218.9 251.4 L220.2 251.6 L221.6 251.9 L223.0 252.3 L224.3 252.7 L225.7 253.3 L227.1 253.9 L228.4 254.6 L229.8 255.4 L231.2 256.3 L232.5 257.2 L233.9 258.3 L235.3 259.4 L236.6 260.6 L238.0 261.9 L239.4 263.3 L240.7 264.8 L242.1 266.3 L243.5 267.9 L244.8 269.7 L246.2 271.5 L247.6 273.4 L248.9 275.3 L250.3 277.4 L251.7 279.5 L253.0 281.8 L253.0 281.8 L251.7 282.2 L250.3 282.6 L248.9 282.9 L247.6 283.2 L246.2 283.5 L244.8 283.8 L243.5 284.0 L242.1 284.2 L240.7 284.4 L239.4 284.5 L238.0 284.6 L236.6 284.7 L235.3 284.7 L233.9 284.7 L232.5 284.7 L231.2 284.7 L229.8 284.6 L228.4 284.5 L227.1 284.4 L225.7 284.2 L224.3 284.0 L223.0 283.8 L221.6 283.5 L220.2 283.3 L218.9 282.9 L217.5 282.6 L216.1 282.2 L214.8 281.8 L213.4 281.4 L212.0 280.9 L210.7 280.4 L209.3 279.9 L207.9 279.3 L206.6 278.8 L205.2 278.1 L203.8 277.5 L202.5 276.8 L201.1 276.1 L199.7 275.4 L198.4 274.6 L197.0 273.8 L195.6 273.0 L194.3 272.2 L192.9 271.3 L191.5 270.4 L190.2 269.4 L188.8 268.4Z", "cx": 222.5, "cy": 263.5, "r": 19.5, "ytop": 251.3, "ybot": 284.7, "x0": 188.8, "x1": 253.0}, {"path": "M299.2 286.3 L300.6 284.3 L302.0 282.3 L303.5 280.5 L304.9 278.7 L306.3 277.0 L307.7 275.4 L309.2 273.9 L310.6 272.5 L312.0 271.1 L313.4 269.9 L314.9 268.7 L316.3 267.6 L317.7 266.6 L319.1 265.6 L320.5 264.8 L322.0 264.0 L323.4 263.3 L324.8 262.7 L326.2 262.2 L327.7 261.8 L329.1 261.5 L330.5 261.2 L331.9 261.0 L333.4 260.9 L334.8 260.9 L336.2 261.0 L337.6 261.1 L339.1 261.4 L340.5 261.7 L341.9 262.1 L343.3 262.6 L344.8 263.2 L346.2 263.8 L347.6 264.6 L349.0 265.4 L350.4 266.3 L351.9 267.3 L353.3 268.4 L354.7 269.5 L356.1 270.8 L357.6 272.1 L359.0 273.5 L360.4 275.0 L361.8 276.6 L363.3 278.2 L364.7 280.0 L366.1 281.8 L366.1 282.0 L364.7 282.7 L363.3 283.3 L361.8 283.9 L360.4 284.4 L359.0 285.0 L357.6 285.5 L356.1 286.0 L354.7 286.5 L353.3 287.0 L351.9 287.4 L350.4 287.8 L349.0 288.2 L347.6 288.5 L346.2 288.9 L344.8 289.2 L343.3 289.5 L341.9 289.7 L340.5 290.0 L339.1 290.2 L337.6 290.4 L336.2 290.5 L334.8 290.7 L333.4 290.8 L331.9 290.9 L330.5 291.0 L329.1 291.0 L327.7 291.0 L326.2 291.0 L324.8 291.0 L323.4 291.0 L322.0 290.9 L320.5 290.8 L319.1 290.7 L317.7 290.5 L316.3 290.4 L314.9 290.2 L313.4 290.0 L312.0 289.7 L310.6 289.5 L309.2 289.2 L307.7 288.9 L306.3 288.5 L304.9 288.2 L303.5 287.8 L302.0 287.4 L300.6 286.9 L299.2 286.5Z", "cx": 326.0, "cy": 271.0, "r": 19.0, "ytop": 260.9, "ybot": 291.0, "x0": 299.2, "x1": 366.1}];
  var SCLERA = "#ebe7e3";
  var LID = "#ecb489";
  var NS = "http://www.w3.org/2000/svg";

  // ---------- build the layers ----------
  var wrap = document.createElement("div");
  wrap.className = "avatar-live";
  var svg = document.createElementNS(NS, "svg");
  svg.setAttribute("class", "avatar-live__eyes");
  svg.setAttribute("viewBox", "0 0 540 530");
  svg.setAttribute("preserveAspectRatio", "xMidYMid slice");
  svg.setAttribute("aria-hidden", "true");

  var defs =
    '<defs>' +
    '<radialGradient id="avIris" cx="50%" cy="50%" r="50%">' +
    '<stop offset="0" stop-color="#040201"/><stop offset=".42" stop-color="#080503"/>' +
    '<stop offset=".48" stop-color="#2b1a10"/><stop offset=".8" stop-color="#4a2f1f"/>' +
    '<stop offset=".94" stop-color="#26170e"/><stop offset="1" stop-color="#120b06"/>' +
    '</radialGradient>' +
    '<linearGradient id="avShade" x1="0" y1="0" x2="0" y2="1">' +
    '<stop offset="0" stop-color="#5a3a2a" stop-opacity=".5"/>' +
    '<stop offset=".38" stop-color="#5a3a2a" stop-opacity="0"/>' +
    '</linearGradient>' +
    '<linearGradient id="avLid" x1="0" y1="0" x2="0" y2="1">' +
    '<stop offset="0" stop-color="' + LID + '"/><stop offset=".85" stop-color="' + LID + '"/>' +
    '<stop offset="1" stop-color="#c98d66"/>' +
    '</linearGradient>';
  var body = "";
  EYES.forEach(function (e, i) {
    defs += '<clipPath id="avClip' + i + '"><path d="' + e.path + '"/></clipPath>';
    var h = e.ybot - e.ytop + 6;
    body +=
      '<g clip-path="url(#avClip' + i + ')">' +
      '<path d="' + e.path + '" fill="' + SCLERA + '"/>' +
      '<g class="av-iris">' +
      '<circle cx="' + e.cx + '" cy="' + e.cy + '" r="' + e.r + '" fill="url(#avIris)"/>' +
      '<circle cx="' + (e.cx - e.r * 0.3) + '" cy="' + (e.cy - e.r * 0.2) + '" r="' + (e.r * 0.19) + '" fill="#fff" opacity=".95"/>' +
      '<circle cx="' + (e.cx + e.r * 0.28) + '" cy="' + (e.cy + e.r * 0.3) + '" r="' + (e.r * 0.07) + '" fill="#fff" opacity=".55"/>' +
      '</g>' +
      '<path d="' + e.path + '" fill="url(#avShade)"/>' +
      '<g class="av-lid" transform="translate(0 ' + (-h) + ')">' +
      '<rect x="' + (e.x0 - 2) + '" y="' + (e.ytop - 3) + '" width="' + (e.x1 - e.x0 + 4) + '" height="' + h + '" fill="url(#avLid)"/>' +
      '<rect x="' + (e.x0 - 2) + '" y="' + (e.ytop - 3 + h - 3) + '" width="' + (e.x1 - e.x0 + 4) + '" height="3.2" fill="#2a1b12"/>' +
      '</g>' +
      '</g>';
    e.h = h;
  });
  // The page shows the closed-mouth face; the open mouth is the same face drawn on top
  // through an ellipse that grows from the line between the lips.
  var src = img.getAttribute("src");
  var openSrc = src.replace("my-avatar.png", "my-avatar-base.png");
  var closedSrc = src.replace("my-avatar.png", "my-avatar-closed.png");
  var MOUTH = { cx: 276, cy: 371, rx: 66, ry: 40 };
  defs += '<clipPath id="avMouth"><ellipse cx="' + MOUTH.cx + '" cy="' + MOUTH.cy + '" rx="0" ry="0"/></clipPath>';
  svg.innerHTML =
    defs + "</defs>" +
    '<image href="' + openSrc + '" x="0" y="0" width="540" height="530" clip-path="url(#avMouth)"/>' +
    body;

  var irises = svg.querySelectorAll(".av-iris");
  var lids = svg.querySelectorAll(".av-lid");
  var mouthEl = svg.querySelector("#avMouth ellipse");

  // swap in the layered face only once both pictures are loaded
  var pending = 2;
  function ready() {
    if (--pending) return;
    img.parentNode.insertBefore(wrap, img);
    wrap.appendChild(img);
    wrap.appendChild(svg);
    img.src = closedSrc;
    box.classList.add("avatar-box--live");
    requestAnimationFrame(tick);
    scheduleBlink();
    scheduleMouth();
  }
  [openSrc, closedSrc].forEach(function (s) {
    var pic = new Image();
    pic.onload = ready;
    pic.src = s;
  });

  // ---------- motion ----------
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var target = { hx: 0, hy: 0, ex: 0, ey: 0 };
  var cur = { hx: 0, hy: 0, ex: 0, ey: 0 };
  var lastMove = 0;
  var wanderAt = 0;

  function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }

  function lookAt(x, y) {
    var r = box.getBoundingClientRect();
    var cx = r.left + r.width / 2;
    var cy = r.top + r.height * 0.5;
    var dx = x - cx;
    var dy = y - cy;
    target.hx = clamp(dx / (window.innerWidth * 0.45), -1, 1);
    target.hy = clamp(dy / (window.innerHeight * 0.45), -1, 1);
    var d = Math.sqrt(dx * dx + dy * dy) || 1;
    var reach = clamp(d / (r.width * 0.9), 0, 1);
    target.ex = (dx / d) * reach;
    target.ey = (dy / d) * reach;
    lastMove = performance.now();
  }

  window.addEventListener("pointermove", function (ev) {
    lookAt(ev.clientX, ev.clientY);
    // smile while a mouse is over the avatar (checked on every move, so leaving always counts)
    var r = box.getBoundingClientRect();
    hovering = ev.pointerType === "mouse" && ev.clientX >= r.left && ev.clientX <= r.right && ev.clientY >= r.top && ev.clientY <= r.bottom;
  }, { passive: true });
  window.addEventListener("pointerdown", function (ev) { lookAt(ev.clientX, ev.clientY); }, { passive: true });
  document.addEventListener("mouseleave", function () { lastMove = 0; hovering = false; });

  function wander(now) {
    // no pointer for a while (or a phone): glance around now and then
    if (now - lastMove < 3500 || reduce) return;
    if (now < wanderAt) return;
    var pick = Math.random();
    if (pick < 0.35) { target.ex = 0; target.ey = 0; target.hx = 0; target.hy = 0; }
    else {
      target.ex = (Math.random() * 2 - 1) * 0.9;
      target.ey = (Math.random() * 2 - 1) * 0.6;
      target.hx = target.ex * 0.45;
      target.hy = target.ey * 0.35;
    }
    wanderAt = now + 1600 + Math.random() * 2600;
  }

  function tick(now) {
    wander(now);
    var k = 0.12;
    cur.hx += (target.hx - cur.hx) * k;
    cur.hy += (target.hy - cur.hy) * k;
    cur.ex += (target.ex - cur.ex) * 0.22;
    cur.ey += (target.ey - cur.ey) * 0.22;

    if (!reduce) {
      var bob = Math.sin(now / 1400) * 1.2;
      wrap.style.transform =
        "perspective(700px) rotateY(" + (cur.hx * 16).toFixed(2) + "deg) rotateX(" + (-cur.hy * 12).toFixed(2) + "deg)" +
        " translate3d(" + (cur.hx * 5).toFixed(2) + "px," + (cur.hy * 4 + bob).toFixed(2) + "px,0)";
    }
    var tx = (cur.ex * 9).toFixed(2);
    var ty = (cur.ey * 4.5).toFixed(2);
    for (var i = 0; i < irises.length; i++) irises[i].setAttribute("transform", "translate(" + tx + " " + ty + ")");

    // mouth: 0 closed, 1 wide open
    var goal = hovering ? 1 : mouth.target;
    mouth.cur += (goal - mouth.cur) * 0.28;
    if (mouth.cur < 0.004) mouth.cur = 0;
    var o = mouth.cur;
    var ease = o * o * (3 - 2 * o);
    mouthEl.setAttribute("rx", o ? (MOUTH.rx * (0.55 + 0.45 * ease)).toFixed(2) : "0");
    mouthEl.setAttribute("ry", (MOUTH.ry * ease).toFixed(2));
    requestAnimationFrame(tick);
  }

  // ---------- blinking ----------
  function setLids(t) { // t: 0 open, 1 closed
    for (var i = 0; i < lids.length; i++) {
      var h = EYES[i].h;
      lids[i].setAttribute("transform", "translate(0 " + (-h + h * t).toFixed(2) + ")");
    }
  }

  function blink(done) {
    var start = performance.now();
    var close = 75, hold = 45, open = 120;
    function step(now) {
      var e = now - start, t;
      if (e < close) t = e / close;
      else if (e < close + hold) t = 1;
      else if (e < close + hold + open) t = 1 - (e - close - hold) / open;
      else { setLids(0); if (done) done(); return; }
      setLids(t);
      requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  // ---------- mouth ----------
  // Closed with a smile most of the time; now and then a big laugh or a few words,
  // a smile while the cursor is on the avatar, and a short laugh on a click or tap.
  var mouth = { cur: 0, target: 0 };
  var hovering = false;
  var timers = [];

  function later(fn, ms) { timers.push(setTimeout(fn, ms)); }

  function laugh(ms) {
    mouth.target = 1;
    later(function () { mouth.target = 0; }, ms);
  }

  function talk(words) {
    var t = 0;
    for (var i = 0; i < words; i++) {
      (function (open, gap) {
        later(function () { mouth.target = 0.35 + Math.random() * 0.45; }, t);
        later(function () { mouth.target = 0; }, t + open);
        t += open + gap;
      })(140 + Math.random() * 160, 90 + Math.random() * 160);
    }
    return t;
  }

  function scheduleMouth() {
    later(function () {
      var r = Math.random();
      var busy = r < 0.45 ? (laugh(1200 + Math.random() * 1400), 2600) : talk(3 + Math.floor(Math.random() * 4));
      later(scheduleMouth, busy);
    }, 4500 + Math.random() * 5500);
  }

  box.addEventListener("click", function () { laugh(900); });

  function scheduleBlink() {
    setTimeout(function () {
      blink(function () {
        if (Math.random() < 0.2) setTimeout(function () { blink(scheduleBlink); }, 160);
        else scheduleBlink();
      });
    }, 2200 + Math.random() * 3800);
  }
})();
