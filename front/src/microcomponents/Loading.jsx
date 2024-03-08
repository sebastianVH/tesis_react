import { Loading } from "notiflix/build/notiflix-loading-aio";

export const LoadStart = () => {
  Loading.standard("Cargando...", {
    backgroundColor: "rgba(255,255,255,0.8)",
  });
};
export const LoadRemove = () => {
  Loading.remove();
};
