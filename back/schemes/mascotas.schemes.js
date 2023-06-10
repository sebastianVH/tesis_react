import yup from 'yup'

const mascota = yup.object({
    name: yup.string().required(),
})

export {
  mascota,
}