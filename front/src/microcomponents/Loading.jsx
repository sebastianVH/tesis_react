import { Loading } from "notiflix/build/notiflix-loading-aio"

export const LoadStart = () => {Loading.pulse("Espere por favor...")}
export const LoadRemove = () => {Loading.remove()}