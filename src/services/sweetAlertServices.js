import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export const sweetAlertSuccess = (text) => {
  MySwal.fire({
    icon: "success",
    title: "Success!",
    text,
    showConfirmButton: false,
    timer: 1500,
  });
};

export const sweetAlertError = (text) => {
  MySwal.fire({
    icon: "error",
    title: "Problem!",
    text,
  });
};

export const sweetAlertInfo = (text) => {
  MySwal.fire({
    icon: "info",
    title: "Info",
    text,
  });
};

export const sweetAlertConfirm = (title, text, imageUrl) => {
  return MySwal.fire({
    title,
    text,
    imageUrl,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "OK",
    cancelButtonText: "Cancel",
  }).then((resultado) => {
    if (resultado.value) {
      return true;
    } else {
      return false;
    }
  });
};
