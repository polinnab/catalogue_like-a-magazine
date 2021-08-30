"use strict";
var startX = 0;
var currIndex = 0;
var setStartX = function (event) {
    !event.targetTouches ? startX = event.clientX : startX = event.targetTouches[0].clientX;
};
var checkSwipeDirection = function (event) {
    var currX = event.changedTouches[0].clientX - startX;
    var swipeDistance = 30;
    if (Math.abs(currX) <= swipeDistance) {
        return;
    }
    var direction = currX > swipeDistance ? 'left' : 'right';
    direction === 'right' ? turnPageRight(currIndex) : turnPageLeft(currIndex);
};
var checkClickDirection = function (event) {
    var currX = event.clientX - startX;
    var swipeDistance = 30;
    if (Math.abs(currX) <= swipeDistance) {
        return;
    }
    var direction = currX > swipeDistance ? 'left' : 'right';
    direction === 'right' ? turnPageRight(currIndex) : turnPageLeft(currIndex);
};
var first;
var addTouchHandlers = function () {
    var catalog = document.querySelector('.catalogue');
    catalog.addEventListener('touchstart', setStartX, false);
    catalog.addEventListener('touchend', checkSwipeDirection, false);
    catalog.addEventListener('mousedown', setStartX, false);
    catalog.addEventListener('mouseup', checkClickDirection, false);
};
var numberOfPages = document.querySelectorAll('.catalogue > div').length;
var turnPageRight = function (index) {
    var paper = document.querySelector(".page-" + (index + 1) + " > .paper");
    var page = document.querySelector(".page-" + (index + 1));
    paper.classList.remove('animate-paper');
    page.classList.remove('animate-page');
    if (index === numberOfPages - 1) {
        return;
    }
    paper.classList.remove('return-paper');
    page.classList.remove('return-page');
    paper.classList.add('turn-paper');
    page.classList.add('turn-page');
    currIndex++;
};
var turnPageLeft = function (index) {
    if (index === 0) {
        return;
    }
    var paper = document.querySelector(".page-" + index + " > .paper");
    var page = document.querySelector(".page-" + index);
    paper.classList.remove('turn-paper');
    page.classList.remove('turn-page');
    paper.classList.add('return-paper');
    page.classList.add('return-page');
    currIndex--;
};
var initFirstAnimation = function () {
    var paper = document.querySelector(".page-1 > .paper");
    var page = document.querySelector(".page-1");
    paper.classList.add('animate-paper');
    page.classList.add('animate-page');
    paper.addEventListener('animationend', function () {
        paper.classList.remove('animate-paper');
        page.classList.remove('animate-page');
    });
};
initFirstAnimation();
addTouchHandlers();
