// form field 'ff' focus effects

function fffocus(input, parent) {
   let floatingLabel = null;
   let hasFloatingLabel = parent.classList.contains('floating-label');

   let topPadding = null;
   let leftPadding = null;
   let borderWidth = null;

   let moveLabel = function(direction) {
      let labelUp = floatingLabel.classList.contains('active');
      
      if(direction == 'up') {
         if(labelUp) return;
         floatingLabel.style.marginTop = 0;
         floatingLabel.classList.add('active');
      }
      if(direction == 'down') {
         if(!labelUp) return;
         floatingLabel.style.marginTop = topPadding + borderWidth + 'px';
         floatingLabel.classList.remove('active');
      }
   };

   if (hasFloatingLabel) {
      floatingLabel = parent.querySelector('label');
      leftPadding = parseFloat(window.getComputedStyle(input, null).getPropertyValue('padding-left'));
      topPadding = parseFloat(window.getComputedStyle(input, null).getPropertyValue('padding-top'));
      borderWidth = parseFloat(window.getComputedStyle(input, null).getPropertyValue('border-width'));
      floatingLabel.style.marginLeft = leftPadding + borderWidth + 'px';
      floatingLabel.style.marginTop = topPadding + borderWidth + 'px';
   }

   input.addEventListener('focus', () => {
      if (hasFloatingLabel) moveLabel('up');
      parent.classList.add('active');
   });

   input.addEventListener('focusout', () => {
      if (hasFloatingLabel && input.value.length == 0) moveLabel('down');
      parent.classList.remove('active');
   });
}

['.line-focus', '.floating-label'].forEach(focusEffect => {
   if(document.querySelector(focusEffect)) {
      document.querySelectorAll(focusEffect).forEach(ff => {
         fffocus(ff.querySelector('input'), ff);
      });
   }
});

// modals: focus on first form field 'ff'

document.querySelectorAll('.modal').forEach(modal => {
   modal.addEventListener('shown.bs.modal', () => {

      ffs = ['input', 'textarea', 'select'];
      for (let i = 0; i < ffs.length; i++) {
         if (modal.querySelector(ffs[i])) {
            modal.querySelector(ffs[i]).focus();
            break;
         }         
      }

   });
});