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

// notifications
var notification = {
   'INFO': 'primary',
   'SUCCESS': 'success',
   'WARNING': 'warning',
   'DANGER': 'danger',
};

var alertIcons = {
   'primary': '<i class="fs-5 fa-solid fa-circle-info"></i>',
   'success': '<i class="fs-5 fa-solid fa-circle-check"></i>',
   'warning': '<i class="fs-5 fa-solid fa-triangle-exclamation"></i>',
   'danger': '<i class="fs-5 fa-solid fa-triangle-exclamation"></i>',
};

var notifyContainer = '#notify .container';

// error
function notifyError(text, autohide=true) {
   if(autohide) notifyAutoHide(notification.DANGER, text);
   else notify(notification.DANGER, text);
}

// success
function notifySuccess(text, autohide =true) {
   if (autohide) notifyAutoHide(notification.SUCCESS, text);
   else notify(notification.SUCCESS, text);
}

// info
function notifyInfo(text, autohide=true) {
   if (autohide) notifyAutoHide(notification.INFO, text);
   else notify(notification.INFO, text);
}

// warning
function notifyWarning(text, autohide=true) {
   if (autohide) notifyAutoHide(notification.WARNING, text);
   else notify(notification.WARNING, text);
}

// implementation
(function ($) {
   $.fn.autoHideNotification = function () {
      setTimeout(function () {
         $(".alert-notify").alert('close');
      }, 3000);
   };
})(jQuery);

async function notifyAutoHide(alertType, text) {
   notify(alertType, text).then(() => {
      $(notifyContainer).autoHideNotification();
   });
}

async function notify(alertType, text) {
   let notifyDiv = document.querySelector(notifyContainer);
   if (!notifyDiv) return;

   let content = `
   <div class="alert-notify alert alert-${alertType} alert-dismissible fade show d-flex shadow mt-1" role="alert">
      <span class="flex-shrink-0 me-3" role="img" aria-label="${alertType}:">
         ${alertIcons[alertType]}
      </span>
      <div>${text}</div>
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
   </div>
   `;
   notifyDiv.innerHTML = content;
}
// END notifications