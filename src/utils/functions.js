import CPMexico from 'src/utils/CPMexico.json'

const viasRespiratorias = 'Vías Respiratorias'
const activacionMental = 'Activación Mental'
const generacionMuscular = 'Regeneración Muscular'
const saludHormonal = 'Salud Hormonal'
const pielCabelloUñas = 'Piel, Cabello y Uñas'
const digestion = 'Digestión'
const relajación = 'Relajación'
const sistemaOseo = 'Sistema Óseo'
const sistemaInmune = 'Sistema Inmune'
const circulaciónArterial = 'Circulación Arterial'
const propertiesName = {
  parse: {
    viasRespiratorias,
    activacionMental,
    generacionMuscular,
    saludHormonal,
    pielCabelloUñas,
    digestion,
    relajación,
    sistemaOseo,
    sistemaInmune,
    circulaciónArterial
  }
}
export function getCustomStructureMainComponents(obj) {
  return obj.map((o, index) => ({ label: o.property, value: o.property, fieldIndex: index }))
}
export function getCustomStructure(obj) {
  return Object.entries(obj).map(([property, value]) => ({ property: propertiesName.parse[property], value: value }))
}
export function parseDate(dateString) {
  const months = [
    'enero',
    'febrero',
    'marzo',
    'abril',
    'mayo',
    'junio',
    'julio',
    'agosto',
    'septiembre',
    'octubre',
    'noviembre',
    'diciembre'
  ]
  const parts = dateString.split(' ')
  const day = parseInt(parts[0])
  const month = months.indexOf(parts[2]) + 1
  const year = parseInt(parts[4])

  return new Date(year, month - 1, day)
}

export function compareByPurchaseDate(a, b) {
  const dateA = new Date(parseDate(a.purchaseDate))
  const dateB = new Date(parseDate(b.purchaseDate))
  return dateB - dateA // Orden descendente
}

const parseDataToEdit = properties => {
  const initialValues = properties.reduce((acc, { property, value }) => {
    switch (property) {
      case viasRespiratorias:
        acc.viasRespiratorias = value
        break
      case activacionMental:
        acc.activacionMental = value
        break
      case generacionMuscular:
        acc.generacionMuscular = value
        break
      case saludHormonal:
        acc.saludHormonal = value
        break
      case pielCabelloUñas:
        acc.pielCabelloUñas = value
        break
      case digestion:
        acc.digestion = value
        break
      case relajación:
        acc.relajación = value
        break
      case sistemaOseo:
        acc.sistemaOseo = value
        break
      case sistemaInmune:
        acc.sistemaInmune = value
        break
      case circulaciónArterial:
        acc.circulaciónArterial = value
        break
    }
    return acc
  }, {})

  return initialValues
}

export {
  viasRespiratorias,
  activacionMental,
  generacionMuscular,
  saludHormonal,
  pielCabelloUñas,
  digestion,
  relajación,
  sistemaOseo,
  sistemaInmune,
  circulaciónArterial,

  //parseDataToEdit
  parseDataToEdit
}

export const getColonies = zipCode => {
  return CPMexico.filter(colony => colony.zipCode === String(zipCode)).map(colony => colony)
}
export const onZipCodeChange = (value, onChange = () => {}, setColonies) => {
  if (onChange) onChange(value)
  if (value.length >= 4 && value.length <= 5) {
    setColonies(getColonies(value) ?? [])
  } else {
    setColonies([])
  }
}
