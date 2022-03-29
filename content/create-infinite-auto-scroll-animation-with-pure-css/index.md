---
title: Create infinite auto-scroll animation with pure CSS
date: 2022-03-29
description: This guide is to help you understand the concept of how Infinite auto-scroll animations you see on websites like JamStack work, and how to implement them with just CSS!.
repo: damiisdandy/css-animation-auto-scroll
author: Damilola Jerugba
image: https://dev-to-uploads.s3.amazonaws.com/uploads/articles/km4x6h98qa6ya5fe1sym.png
---

This guide is to help you understand the concept of how Infinite auto-scroll animations you see on websites like [JamStack](https://jamstack.org/) work, and how to implement them with just CSS!.

## 🤨 What exactly is this animation?

When you open some websites like [JamStack](https://jamstack.org/), you'll see an animation that shows the frameworks compatible with the JamStack, also on some other websites they use this cool animation to show customer reviews, sponsors, testimonials, etc.

![brimble animation](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/xc6zt1o0e8d4krvdvk6b.gif)

## Concept behind it? 💻

To understand how this animation works let's break it down a little, it simply involves animating an element across the screen. To achieve this we'll need its parent element to have an `overflow: hidden`, so as the element animates out, it remains hidden.

## Structuring animation elements 🏛

We make the parent element `position: relative` with a discrete width like `width: 100vw`, and the child element `position: absolute` with `width: inherit` because we'll be animating it with the CSS [left](https://developer.mozilla.org/en-US/docs/Web/CSS/left) property. The animation will simply involve moving the element from `left: 0%` to `left: -100%`, this will animate the entire element away from the viewport.

```css
.scroll-parent {
  position: relative;
  width: 100vw;
  height: 20rem;
  overflow-x: hidden;
}

.scroll-element {
  width: inherit;
  height: inherit;
  position: absolute;
  left: 0%;
  top: 0%;
  animation: primary 3s linear infinite;
}

@keyframes primary {
  from {
    left: 0%;
  }
  to {
    left: -100%;
  }
}
```

This gives us..

![half animation](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/svlh5qbrlowt0hs1m36k.gif)

Not looking infinite is it 😬? to make it seem infinite we add a duplicate of the child element right next to the initial child element, making it move from `left: 100%` to `left: 0%`.
We'll create another [keyframe](https://developer.mozilla.org/en-US/docs/Web/CSS/@keyframes) for this second child element, calling it `secondary`, then we'll create classes for our keyframes.

```css
.primary {
  animation: primary 3s linear infinite;
}

.secondary {
  animation: secondary 3s linear infinite;
}

@keyframes primary {
  from {
    left: 0%;
  }
  to {
    left: -100%;
  }
}

@keyframes secondary {
  from {
    left: 100%;
  }
  to {
    left: 0%;
  }
}
```

We then structure our HTML code as follows.

```html
<div class="scroll-parent">
  <div class="scroll-element primary">...</div>
  <div class="scroll-element secondary">...</div>
</div>
```

And thats it!

![infinite scroll animations of character heads](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ce58kt2yvj7jyst1sl69.gif)

## How does it work? 🤔

We are simply animating two similar elements across the screen, the reason why we are using two is that as one leaves the other will fill in the gap, since the two elements are identical with the same `width` and `animation-duration`, when the first element, for example, leaves with `left: -20%` the second element enters in with `left: 80%`.

Notice the use of `infinite`, this is to ensure that the animation is looped over, once the animation finishes the illusion is created by replacing the second element with the first element and since they are exactly the same it looks like the animation moves towards the left direction infinitely.

The full source code is linked below 👇👇
