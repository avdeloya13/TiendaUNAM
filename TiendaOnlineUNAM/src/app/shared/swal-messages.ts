import Swal from "sweetalert2";

export class SwalMessages {
    // Muestra mensaje para confirmar/aceptar una acción
    confirmMessage = Swal.mixin({
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Confirmar',
        customClass: {
            title: 'swal-title',
            icon: 'swal-icon',
            confirmButton: 'btn btn-primary swal-confirm-button',
            cancelButton: 'btn btn-danger swal-cancel-button',
        },
    });

    // Mensaje de éxito
    successMessage(message: string | null) {
        if (!message) {
            message = "No se pudo conectar con la base de datos.";
        }

        Swal.fire({
            position: 'top-end',
            icon: 'success',
            toast: true,
            text: message,
            background: '#E8F8F8',
            showConfirmButton: false,
            timer: 8000
        });
    }

    // Mensaje de error
    errorMessage(message: string | null) {
        if (!message) {
            message = "No se pudo conectar con la base de datos.";
        }

        Swal.fire({
            position: 'top-end',
            icon: 'error',
            toast: true,
            text: message,
            background: '#F8E8F8',
            showConfirmButton: false,
            timer: 8000
        });
    }
}