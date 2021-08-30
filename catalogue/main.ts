let startX: number = 0;
let currIndex: number = 0;

const setStartX = (event:any):void => {
    !event.targetTouches ? startX = event.clientX : startX = event.targetTouches[0].clientX;
};


const checkSwipeDirection = (event:any):void => {
    const currX:any = event.changedTouches[0].clientX - startX;
    const swipeDistance:number = 30;
    if (Math.abs(currX) <= swipeDistance) {
        return;
    }

    const direction:string = currX > swipeDistance ? 'left' : 'right';
    direction === 'right' ? turnPageRight(currIndex) : turnPageLeft(currIndex);
};

const checkClickDirection = (event:any):void => {
    const currX:any = event.clientX - startX;
    const swipeDistance:number = 30;
    if (Math.abs(currX) <= swipeDistance) {
        return;
    }

    const direction:string = currX > swipeDistance ? 'left' : 'right';
    direction === 'right' ? turnPageRight(currIndex) : turnPageLeft(currIndex);
};

let first

const addTouchHandlers = ():void => {
    const catalog:any = document.querySelector('.catalogue');
    
    catalog.addEventListener('touchstart', setStartX, false);
    catalog.addEventListener('touchend', checkSwipeDirection, false);
    catalog.addEventListener('mousedown', setStartX, false);
    catalog.addEventListener('mouseup', checkClickDirection, false);
    
};

let numberOfPages: number = document.querySelectorAll('.catalogue > div').length;

const turnPageRight = (index:number):void => {
    const paper = document.querySelector(`.page-${index+1} > .paper`) as HTMLDivElement;
    const page = document.querySelector(`.page-${index+1}`) as HTMLDivElement;
    paper.classList.remove('animate-paper')
    page.classList.remove('animate-page') 
    if (index === numberOfPages-1) {
        return
    }
        paper.classList.remove('return-paper');
        page.classList.remove('return-page');
        paper.classList.add('turn-paper');
        page.classList.add('turn-page');
        currIndex++;
}

const turnPageLeft = (index:number):void => {
    if (index === 0) {
        return
    }
    const paper = document.querySelector(`.page-${index} > .paper`)  as HTMLDivElement;
    const page = document.querySelector(`.page-${index}`)  as HTMLDivElement;
    paper.classList.remove('turn-paper');
    page.classList.remove('turn-page');
    paper.classList.add('return-paper');
    page.classList.add('return-page');
    currIndex--;
}

const initFirstAnimation = () => {
    const paper = document.querySelector(`.page-1 > .paper`) as HTMLDivElement;
    const page = document.querySelector(`.page-1`) as HTMLDivElement;
    paper.classList.add('animate-paper');
    page.classList.add('animate-page');
    paper.addEventListener('animationend',() => {
        paper.classList.remove('animate-paper');
        page.classList.remove('animate-page') ;
    });
}
initFirstAnimation()
addTouchHandlers();