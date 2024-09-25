import Swal from "sweetalert2";

export class SwalMessages{

    //Mensaje de confirmacion
    sucessMessage(message: string){
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

    //Mensaje de error
    errorMessage(message: string){
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