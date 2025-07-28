// components/ConfirmDialog.jsx
import Swal from 'sweetalert2';

const ConfirmDialog = ({ 
  title = "Are you sure?",
  text = "You won't be able to revert this!",
  confirmText = "Confirm",
  cancelText = "Cancel",
  icon = "warning",
  onConfirm,
  onCancel
}) => {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success mx-2",
      cancelButton: "btn btn-danger mx-2"
    },
    buttonsStyling: false
  });

  const showDialog = () => {
    swalWithBootstrapButtons.fire({
      title,
      text,
      icon,
      showCancelButton: true,
      confirmButtonText: confirmText,
      cancelButtonText: cancelText,
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed && onConfirm) {
        onConfirm();
      } else if (result.dismiss === Swal.DismissReason.cancel && onCancel) {
        onCancel();
      }
    });
  };

  return null; // This is just a utility component
};

export default ConfirmDialog;