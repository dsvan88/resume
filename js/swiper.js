class Swiper {
    xDown = null;                                                        
    yDown = null;
    handleTouchStart(evt) {
        const firstTouch = (evt.touches ||             // browser API
                            evt.originalEvent.touches)[0]; // jQuery                 
        this.xDown = firstTouch.clientX;                                      
        this.yDown = firstTouch.clientY;                                      
    }
    handleTouchMove(evt) {
        
        if ( ! this.xDown || ! this.yDown ) {
            return;
        }
        const leftSide = document.body.querySelector('aside.left-side');
        let computedStyle = getComputedStyle(leftSide);
  
        if (computedStyle.position !== "fixed") return;
        
        let [xUp, yUp] = [evt.touches[0].clientX, evt.touches[0].clientY];                                    

        let [xDiff, yDiff] = [this.xDown - xUp, this.yDown - yUp];
                                                                             
        if (Math.abs(xDiff) > Math.abs(yDiff)) {
            const contactBarButton = document.body.querySelector('input#show-contacts-bar');
            
            if ( xDiff > 0 ) {
                /* right swipe */
                if (contactBarButton.checked) {
                    leftSide.style.left = '-220px';
                    leftSide.style.width = 'auto';
                    contactBarButton.checked = false;
                }
            } else {
                /* left swipe */
                if (!contactBarButton.checked) {
                    leftSide.style.left = '0px';
                    leftSide.style.width = '60vw';
                    contactBarButton.checked = true;
                }
            }                       
        } else {
            if ( yDiff > 0 ) {
                /* down swipe */
            } else { 
                /* up swipe */
            }                                                                 
        }
        /* reset values */
        this.xDown = null;
        this.yDown = null;                                             
    };
}

const swiper = new Swiper();

document.addEventListener('touchstart', swiper.handleTouchStart, false);
// document.addEventListener('touchend', swiper.handleTouchEnd, false);
document.addEventListener('touchmove', swiper.handleTouchMove, false);