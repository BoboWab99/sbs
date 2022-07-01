// Line focus
function lineFocus(input, parent) {
   let floatingLabel = null;
   let hasFloatingLabel = parent.classList.contains('floating-label');

   if (hasFloatingLabel) {
      floatingLabel = parent.querySelector('label');
      let leftPadding = parseFloat(window.getComputedStyle(input, null).getPropertyValue('padding-left'));
      let topPadding = parseFloat(window.getComputedStyle(input, null).getPropertyValue('padding-top'));
      let bottomPadding = parseFloat(window.getComputedStyle(input, null).getPropertyValue('padding-bottom'));
      floatingLabel.style.paddingLeft = leftPadding + 'px';
      floatingLabel.style.paddingTop = topPadding + 'px';
      floatingLabel.style.paddingBottom = bottomPadding + 'px';
   }

   input.addEventListener('focus', () => {
      if (hasFloatingLabel) {
         floatingLabel.classList.add('active');
      }
      parent.classList.add('active');
   });

   input.addEventListener('focusout', () => {
      if (hasFloatingLabel) {
         if (input.value.length > 0) {
            floatingLabel.classList.add('active');
         } else {
            floatingLabel.classList.remove('active');
         }
      }
      parent.classList.remove('active');
   });
}

if (document.querySelector('.line-focus')) {
   document.querySelectorAll('.line-focus').forEach(elm => {
      lineFocus(elm.querySelector('.line-focus-input'), elm);
   });
}